import { diagrams, type Shape } from "./formations";

function ShapeEl({ shape }: { shape: Shape }) {
  const tone = shape.tone ? `shape shape-${shape.tone}` : "shape";
  switch (shape.type) {
    case "line":
      return <line className={tone} x1={shape.x1} y1={shape.y1} x2={shape.x2} y2={shape.y2} />;
    case "rect":
      return <rect className={tone} x={shape.x} y={shape.y} width={shape.w} height={shape.h} rx={4} />;
    case "circle":
      return <circle className={tone} cx={shape.cx} cy={shape.cy} r={shape.r} />;
  }
}

/**
 * The project figure as SVG. In full-motion mode the shapes are faint guides and
 * the live particles draw the structure over them; in reduced motion (or without
 * JavaScript) the SVG is the whole diagram.
 */
export default function ProjectDiagram({ signal }: { signal: keyof typeof diagrams }) {
  const d = diagrams[signal];
  return (
    <svg className="diagram" viewBox={`0 0 ${d.width} ${d.height}`} role="img" aria-label={d.description}>
      <g className="diagram-shapes">
        {d.shapes.map((shape, i) => (
          <ShapeEl shape={shape} key={i} />
        ))}
      </g>
      <g className="diagram-labels">
        {d.labels.map((label, i) => (
          <text
            key={i}
            x={label.x}
            y={label.y}
            textAnchor={label.anchor ?? "start"}
            className={label.size === "lg" ? "diagram-label diagram-label-lg" : "diagram-label"}
            style={{ animationDelay: `${0.35 + i * 0.05}s` }}
          >
            {label.text}
          </text>
        ))}
      </g>
    </svg>
  );
}
