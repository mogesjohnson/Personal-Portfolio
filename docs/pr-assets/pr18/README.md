# PR #18 assets

Screenshots for the TRACE Workbench project page and its homepage wiring.

- `before/`: `grok/add-replay-studio-switchyard` at `7d87e2c` (PR #17 head). The Work section has five projects, the mobile menu has no TRACE entry, and Switchyard's "Next project" goes to Shadow Army.
- `after/`: this branch. The Work section has a sixth project, "Computer control for agents", with its own `trace` formation. One shot uses reduced motion (SVG) and one uses full motion (live particles). The mobile menu lists TRACE Workbench, and Switchyard's "Next project" goes to TRACE Workbench.
- `new-page/`: `/trace-workbench` full page, in dark and light, with reduced motion.

Desktop shots were taken at 1440 px wide (downscaled to 1200 px here); mobile shots at 390 px wide, 2x. Production build (`next build` + `next start`), headless Chrome.
