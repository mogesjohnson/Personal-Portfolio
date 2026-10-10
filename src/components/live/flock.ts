/**
 * Spatial-hash boids for the homepage signal field.
 *
 * Separation distance is clamped so a near-overlap cannot produce an infinite kick.
 * Flock weight is 0 once a particle has arrived on a formation target. Dust keeps a
 * low weight. A stable subset flocks at full weight only while it is traveling.
 */

export const FLOCK_CELL = 48;
export const PERCEPT_SQ = 48 * 48;
export const SEP_SQ = 22 * 22;
export const MIN_DIST_SQ = 4;
export const ARRIVE_SQ = 8 * 8;
export const ARRIVE_LOOSE_SQ = 20 * 20;
export const ARRIVE_SPEED_SQ = 0.25;

const SEP_W = 0.85;
const ALI_W = 0.06;
const COH_W = 0.004;
const MAX_FORCE = 0.7;
const PACKET_EVERY = 7;

export function makePacketMask(max: number): Uint8Array {
  const mask = new Uint8Array(max);
  for (let i = 0; i < max; i++) mask[i] = i % PACKET_EVERY === 0 ? 1 : 0;
  return mask;
}

export type FlockGrid = {
  head: Int32Array;
  cols: number;
  rows: number;
  numCells: number;
};

export function createFlockGrid(): FlockGrid {
  return { head: new Int32Array(1), cols: 1, rows: 1, numCells: 1 };
}

export function resizeFlockGrid(grid: FlockGrid, w: number, h: number): void {
  const cols = Math.max(1, Math.ceil(Math.max(w, 1) / FLOCK_CELL));
  const rows = Math.max(1, Math.ceil(Math.max(h, 1) / FLOCK_CELL));
  const numCells = cols * rows;
  if (grid.head.length < numCells) grid.head = new Int32Array(numCells);
  grid.cols = cols;
  grid.rows = rows;
  grid.numCells = numCells;
}

/**
 * 1 for a traveling packet, about 0.32 for drifting dust, fading to 0 on arrival.
 * `inForm` means the spring has started. Arrival is distance or speed, not that flag.
 */
export function flockScale(inForm: boolean, flow: boolean, packet: boolean, dist2: number, speed2: number): number {
  if (!inForm) return packet ? 1 : 0.32;
  if (flow) return 0;
  const arrived = dist2 < ARRIVE_SQ || (dist2 < ARRIVE_LOOSE_SQ && speed2 < ARRIVE_SPEED_SQ);
  if (arrived) return 0;
  const dist = Math.sqrt(dist2);
  const fade = Math.min(1, Math.max(0, (dist - 8) / 96));
  return (packet ? 0.4 : 0.18) * fade;
}

export function applyFlock(
  i: number,
  px: Float32Array,
  py: Float32Array,
  vx: Float32Array,
  vy: Float32Array,
  flockW: Float32Array,
  packet: Uint8Array,
  head: Int32Array,
  next: Int32Array,
  cols: number,
  rows: number,
  f: number,
): void {
  const w = flockW[i];
  if (w < 0.01) return;

  const x = px[i];
  const y = py[i];
  let gx = Math.floor(x / FLOCK_CELL);
  let gy = Math.floor(y / FLOCK_CELL);
  if (gx < 0) gx = 0;
  else if (gx >= cols) gx = cols - 1;
  if (gy < 0) gy = 0;
  else if (gy >= rows) gy = rows - 1;

  let sx = 0;
  let sy = 0;
  let ax = 0;
  let ay = 0;
  let cx = 0;
  let cy = 0;
  let n = 0;
  const mine = packet[i];

  for (let oy = -1; oy <= 1; oy++) {
    const yy = gy + oy;
    if (yy < 0 || yy >= rows) continue;
    const row = yy * cols;
    for (let ox = -1; ox <= 1; ox++) {
      const xx = gx + ox;
      if (xx < 0 || xx >= cols) continue;
      let j = head[xx + row];
      while (j !== -1) {
        if (j !== i) {
          const dx = x - px[j];
          const dy = y - py[j];
          const d2 = dx * dx + dy * dy;
          if (d2 > 0 && d2 < PERCEPT_SQ) {
            if (d2 < SEP_SQ) {
              const sd = d2 < MIN_DIST_SQ ? MIN_DIST_SQ : d2;
              sx += dx / sd;
              sy += dy / sd;
            } else if (mine === 1 && packet[j] === 1) {
              // Cohesion only outside the separation radius, so a flock keeps daylight between dots.
              ax += vx[j];
              ay += vy[j];
              cx += px[j];
              cy += py[j];
              n++;
            }
          }
        }
        j = next[j];
      }
    }
  }

  let fx = SEP_W * sx;
  let fy = SEP_W * sy;
  if (mine === 1 && n > 0) {
    const inv = 1 / n;
    fx += ALI_W * (ax * inv - vx[i]);
    fy += ALI_W * (ay * inv - vy[i]);
    fx += COH_W * (cx * inv - x);
    fy += COH_W * (cy * inv - y);
  }
  fx *= w;
  fy *= w;

  const mag2 = fx * fx + fy * fy;
  const cap = MAX_FORCE * MAX_FORCE;
  if (mag2 > cap) {
    const inv = MAX_FORCE / Math.sqrt(mag2);
    fx *= inv;
    fy *= inv;
  }

  vx[i] += fx * f;
  vy[i] += fy * f;
}
