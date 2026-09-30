"use client";

import { useSyncExternalStore } from "react";

const format = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

let current = "";
const read = () => (current ||= format.format(new Date()));

function subscribe(onChange: () => void) {
  const id = window.setInterval(() => {
    current = format.format(new Date());
    onChange();
  }, 1000);
  return () => window.clearInterval(id);
}

/** Ticking Eastern-time clock; the server renders a placeholder. */
export default function LiveClock() {
  const time = useSyncExternalStore(subscribe, read, () => "--:--:--");
  return (
    <time className="live-clock" aria-label="Local time in New Jersey">
      {time}
    </time>
  );
}
