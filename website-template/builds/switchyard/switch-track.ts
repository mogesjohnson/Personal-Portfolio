import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Scene } from "../../lib/runtime";

gsap.registerPlugin(ScrollTrigger);

/**
 * Signature move for /switchyard: the reader throws the switch.
 *
 * The yard renders finished: the amber route is drawn to its last station and
 * every station is lit. In full motion the route retracts to the switch, then
 * the scroll draws it out along the exact-checkout line while a marker rides the
 * leading edge and each station lights as the marker reaches it. The side tracks
 * never light. Reverting restores the finished drawing.
 */
export function switchTrack(): Scene {
  return () => {
    const yard = document.querySelector<SVGSVGElement>("[data-yard]");
    const route = yard?.querySelector<SVGPathElement>("[data-route]");
    const marker = yard?.querySelector<SVGCircleElement>("[data-marker]");
    if (!yard || !route || !marker) return;
    const stations = Array.from(document.querySelectorAll<HTMLElement>("[data-at]"));
    const length = route.getTotalLength();
    const end = { cx: marker.getAttribute("cx"), cy: marker.getAttribute("cy") };

    const paint = (p: number) => {
      route.style.strokeDasharray = `${length}`;
      route.style.strokeDashoffset = `${length * (1 - p)}`;
      const pt = route.getPointAtLength(length * p);
      marker.setAttribute("cx", pt.x.toFixed(1));
      marker.setAttribute("cy", pt.y.toFixed(1));
      for (const station of stations) station.classList.toggle("is-dim", p < Number(station.dataset.at));
    };

    paint(0.02);

    const trigger = ScrollTrigger.create({
      trigger: yard.closest("section") ?? yard,
      start: "top 62%",
      end: "bottom 80%",
      scrub: 0.6,
      onUpdate: (self) => paint(0.02 + self.progress * 0.98),
    });

    return () => {
      trigger.kill();
      route.style.removeProperty("stroke-dasharray");
      route.style.removeProperty("stroke-dashoffset");
      if (end.cx) marker.setAttribute("cx", end.cx);
      if (end.cy) marker.setAttribute("cy", end.cy);
      for (const station of stations) station.classList.remove("is-dim");
    };
  };
}
