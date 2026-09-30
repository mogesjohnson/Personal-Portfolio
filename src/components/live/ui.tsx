import type { ReactNode } from "react";

export function cls(...names: (string | false | null | undefined)[]) {
  return names.filter(Boolean).join(" ");
}

export function Eyebrow({ index, children }: { index: string; children: ReactNode }) {
  return (
    <p className="eyebrow">
      <span className="eyebrow-index">{index}</span>
      <span className="eyebrow-text">{children}</span>
      <span className="wipe" aria-hidden="true" />
    </p>
  );
}

interface SectionHeadProps {
  index: string;
  eyebrow: string;
  title: ReactNode;
  titleId: string;
  aside?: ReactNode;
}

export function SectionHead({ index, eyebrow, title, titleId, aside }: SectionHeadProps) {
  return (
    <div className="section-head">
      <span className="section-index" data-speed="0.35" aria-hidden="true">
        {index}
      </span>
      <div>
        <Eyebrow index={index}>{eyebrow}</Eyebrow>
        <h2 id={titleId} className="section-title">
          {title}
        </h2>
      </div>
      {aside && (
        <p className="section-aside" data-reveal>
          {aside}
        </p>
      )}
    </div>
  );
}

interface MarqueeProps {
  items: string[];
  direction?: 1 | -1;
  duration?: number;
  size?: "md" | "lg";
}

/** Decorative ticker; the content is duplicated so the loop is seamless. */
export function Marquee({ items, direction = 1, duration = 40, size = "md" }: MarqueeProps) {
  const row = items.map((item, i) => (
    <span className="marquee-item" key={`${item}-${i}`}>
      {item}
    </span>
  ));
  return (
    <div className={cls("marquee", size === "lg" && "marquee-lg")} data-direction={direction} data-duration={duration} aria-hidden="true">
      <div className="marquee-track">
        <div className="marquee-row">{row}</div>
        <div className="marquee-row">{row}</div>
      </div>
    </div>
  );
}

/** Corner brackets that frame a live signal anchor. */
export function HudFrame() {
  return (
    <span className="hud" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}
