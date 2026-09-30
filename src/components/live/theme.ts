export type Theme = "dark" | "light";

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

/**
 * Switches theme with a circular reveal that grows from `origin` (the toggle
 * button), using the View Transitions API where the browser supports it.
 */
export function setTheme(next: Theme, origin?: { x: number; y: number }) {
  const root = document.documentElement;
  const apply = () => {
    root.dataset.theme = next;
    try {
      localStorage.setItem("mj-theme", next);
    } catch {}
  };

  if (typeof document.startViewTransition !== "function" || root.dataset.motion === "reduce") {
    apply();
    return;
  }

  const x = origin?.x ?? window.innerWidth / 2;
  const y = origin?.y ?? window.innerHeight / 2;
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  const transition = document.startViewTransition(apply);
  transition.ready
    .then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 750, easing: "cubic-bezier(0.7, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    })
    .catch(() => {});
}

export function toggleTheme(origin?: { x: number; y: number }) {
  setTheme(getTheme() === "dark" ? "light" : "dark", origin);
}
