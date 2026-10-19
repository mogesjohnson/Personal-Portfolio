import type { ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import { ChevronDown, type LucideIcon } from "lucide-react";
import { DispatchBar } from "../projects-page/DispatchBar";

/**
 * Shared building blocks for the project detail pages (/replay-studio, /switchyard).
 * They sit on the /projects "dispatch" skeleton (bar, serif headings, mono labels,
 * site tokens) and borrow the homepage's glass cards, metrics and chips, so a
 * detail page reads as part of the same site. Every block renders complete
 * without JavaScript; motion only adds to it.
 */

export function DetailShell({ current, mark, children }: { current: string; mark: string; children: ReactNode }) {
  return (
    <article className="dispatch pd">
      <DispatchBar current={current} mark={mark} />
      {children}
    </article>
  );
}

export type Fact = { label: string; value: string };

export function DetailHero({
  kicker,
  title,
  status,
  lead,
  facts,
  tags,
  children,
}: {
  kicker: string;
  title: string;
  status: string;
  lead: string;
  facts?: Fact[];
  tags?: string[];
  children?: ReactNode;
}) {
  return (
    <header className="pd-hero">
      <div className="pd-hero-copy">
        <p className="dispatch-kicker">
          <span className="pip" aria-hidden="true" /> {kicker}
        </p>
        <h1 className="pd-hero-title">{title}</h1>
        <p className="dispatch-legacy pd-status">{status}</p>
        <p className="dispatch-lead pd-lead" data-scrub>
          {lead}
        </p>
      </div>
      {facts?.length ? (
        <dl className="metrics pd-facts" data-reveal>
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {tags?.length ? (
        <ul className="chips pd-chips" aria-label="Technologies" data-reveal>
          {tags.map((tag) => (
            <li className="chip" key={tag}>
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
      {children}
    </header>
  );
}

export function Section({
  id,
  index,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="pd-section" id={id} aria-labelledby={`${id}-title`}>
      <div className="pd-section-head">
        <p className="dispatch-index">
          {index} <span className="pd-eyebrow">/ {eyebrow}</span>
        </p>
        <h2 id={`${id}-title`} className="dispatch-title pd-title">
          {title}
        </h2>
        {intro ? (
          <p className="pd-intro" data-reveal>
            {intro}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

/**
 * The app-window frame every figure on a detail page uses: chrome bar, HUD corners
 * and a "Fig." caption. Shot puts a real screenshot in it; a page can also frame
 * something drawn in code (a terminal, a diagram) so it lines up with the shots.
 */
export function Frame({
  figure,
  caption,
  chrome,
  className,
  children,
}: {
  figure: string;
  caption: string;
  chrome: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <figure className={["pd-shot glass", className].filter(Boolean).join(" ")} data-reveal>
      <div className="pd-shot-bar" aria-hidden="true">
        <span className="pd-dots">
          <i />
          <i />
          <i />
        </span>
        <span>{chrome}</span>
        <span>{figure}</span>
      </div>
      <div className="pd-shot-frame">
        {children}
        <span className="pd-hud" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
      </div>
      <figcaption>
        <span>{figure}</span>
        {caption}
      </figcaption>
    </figure>
  );
}

/** A real screenshot in an app-window frame with HUD corners and a figure caption. */
export function Shot({
  src,
  alt,
  figure,
  caption,
  chrome,
  priority = false,
  className,
}: {
  src: StaticImageData;
  alt: string;
  figure: string;
  caption: string;
  chrome: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Frame figure={figure} caption={caption} chrome={chrome} className={className}>
      <Image
        src={src}
        alt={alt}
        sizes="(max-width: 900px) 100vw, 72rem"
        placeholder="empty"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
      />
    </Frame>
  );
}

export type Feature = { icon: LucideIcon; title: string; body: ReactNode; tag?: string };

export function FeatureGrid({ features, columns = 3 }: { features: Feature[]; columns?: 2 | 3 }) {
  return (
    <ul className={`pd-features pd-features-${columns}`}>
      {features.map((feature, i) => {
        const Icon = feature.icon;
        return (
          <li key={feature.title} className="pd-feature glass" data-reveal>
            <div className="pd-feature-top">
              <span className="pd-feature-icon" aria-hidden="true">
                <Icon size={18} strokeWidth={1.6} />
              </span>
              <span className="pd-feature-num">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
            {feature.tag ? <span className="pd-feature-tag">{feature.tag}</span> : null}
          </li>
        );
      })}
    </ul>
  );
}

/** Two-column ledger: what the project does, and what it deliberately leaves alone. */
export function Ledger({ yes, no, yesLabel, noLabel }: { yes: string[]; no: string[]; yesLabel: string; noLabel: string }) {
  return (
    <div className="pd-ledger">
      <div className="pd-ledger-col glass" data-reveal>
        <p className="pd-ledger-label pd-ledger-yes">{yesLabel}</p>
        <ul>
          {yes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="pd-ledger-col glass" data-reveal>
        <p className="pd-ledger-label pd-ledger-no">{noLabel}</p>
        <ul>
          {no.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export type StackRow = { layer: string; tech: string; note: string };

export function StackTable({ rows }: { rows: StackRow[] }) {
  return (
    <ol className="flow pd-stack" data-reveal>
      {rows.map((row, i) => (
        <li key={row.layer}>
          <span className="flow-step">{String(i + 1).padStart(2, "0")}</span>
          <strong>{row.layer}</strong>
          <em>{row.tech}</em>
          <p>{row.note}</p>
        </li>
      ))}
    </ol>
  );
}

export type Stat = { value: string; label: string; note: string };

export function Stats({ stats }: { stats: Stat[] }) {
  return (
    <ul className="pd-stats">
      {stats.map((stat) => (
        <li key={stat.label} className="pd-stat" data-reveal>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
          <p>{stat.note}</p>
        </li>
      ))}
    </ul>
  );
}

export function Limits({ items }: { items: string[] }) {
  return (
    <ul className="dispatch-soldiers pd-limits" data-reveal>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

/**
 * One status line that opens into the long-form evidence (tests, limits, stack).
 * A native <details>, so it works without JavaScript and stays closed by default.
 */
export function StatusDetails({ status, children }: { status: string; children: ReactNode }) {
  return (
    <details className="pd-details glass" data-reveal>
      <summary>
        <span className="pd-details-label">Status</span>
        <span className="pd-details-line">{status}</span>
        <span className="pd-details-toggle" aria-hidden="true">
          Details
          <ChevronDown size={14} />
        </span>
      </summary>
      <div className="pd-details-body">{children}</div>
    </details>
  );
}

/** A small mono heading inside StatusDetails. */
export function DetailsHeading({ children }: { children: ReactNode }) {
  return <h3 className="pd-details-heading">{children}</h3>;
}
