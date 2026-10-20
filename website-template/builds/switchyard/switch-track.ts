import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Scene } from "../../lib/runtime";

gsap.registerPlugin(ScrollTrigger);

/**
 * Signature move for /switchyard: the reader throws the switch. See BRIEF.md › Score.
 *
 * The yard renders finished: the switch thrown to the exact-checkout line, the
 * amber route drawn to its last station, every stop and station lit. In full
 * motion the route retracts to the library and the switch lies set for the
 * look-alike side track. Then the scroll plays it as four beats:
 *   1. approach: the route draws to the switch and the Library lights;
 *   2. throw: as the route reaches the switch, the lever swings to the main line
 *      (a CSS transition in the feedback register, reversed if you scroll back);
 *   3. run: the route draws along the exact-checkout line, the marker rides its
 *      leading edge, and each stop and station lights as the marker reaches it;
 *   4. arrive: the marker parks at the end of the line.
 * The side tracks never light. On a phone the station list carries the same
 * progress down a vertical rail (`--p`). Reverting restores the finished drawing.
 */
export function switchTrack(): Scene {
  return () => {
    const yard = document.querySelector<SVGSVGElement>("[data-yard]");
    const card = yard?.closest<HTMLElement>(".sy-yard");
    const route = yard?.querySelector<SVGPathElement>("[data-route]");
    const marker = yard?.querySelector<SVGCircleElement>("[data-marker]");
    const lever = yard?.querySelector<SVGGElement>("[data-switch]");
    if (!yard || !card || !route || !marker) return;
    const stations = Array.from(card.querySelectorAll<Element>("[data-at]"));
    const length = route.getTotalLength();
    // The route's first leg is a straight run from x=20 to the switch.
    const throwAt = lever ? (Number(lever.dataset.x ?? 200) - 20) / length : 0;
    const first = Number(stations[0]?.getAttribute("data-at") ?? 0);
    const last = Number(stations[stations.length - 1]?.getAttribute("data-at") ?? 1);
    const end = { cx: marker.getAttribute("cx"), cy: marker.getAttribute("cy") };

    const paint = (p: number) => {
      route.style.strokeDasharray = `${length}`;
      route.style.strokeDashoffset = `${length * (1 - p)}`;
      const pt = route.getPointAtLength(length * p);
      marker.setAttribute("cx", pt.x.toFixed(1));
      marker.setAttribute("cy", pt.y.toFixed(1));
      lever?.classList.toggle("is-waiting", p < throwAt);
      card.style.setProperty("--p", gsap.utils.clamp(0, 1, (p - first) / (last - first)).toFixed(4));
      for (const station of stations) station.classList.toggle("is-dim", p < Number(station.getAttribute("data-at")));
    };

    paint(0.02);

    // Desktop: from the whole yard sitting in the lower part of the screen to sitting
    // near the top (about 400px of scroll). Phone, where the station list is the line:
    // from the card entering to the end of the list. Functions re-run on refresh.
    // Progress maps 1:1 to scroll; Lenis, on the runtime's ticker, is the smoothing.
    const phone = () => window.matchMedia("(max-width: 600px)").matches;
    const trigger = ScrollTrigger.create({
      trigger: card,
      start: () => (phone() ? "top 75%" : "top 60%"),
      end: () => (phone() ? "bottom 85%" : "bottom 67%"),
      onUpdate: (self) => paint(0.02 + self.progress * 0.98),
    });

    return () => {
      trigger.kill();
      route.style.removeProperty("stroke-dasharray");
      route.style.removeProperty("stroke-dashoffset");
      card.style.removeProperty("--p");
      lever?.classList.remove("is-waiting");
      if (end.cx) marker.setAttribute("cx", end.cx);
      if (end.cy) marker.setAttribute("cy", end.cy);
      for (const station of stations) station.classList.remove("is-dim");
    };
  };
}
