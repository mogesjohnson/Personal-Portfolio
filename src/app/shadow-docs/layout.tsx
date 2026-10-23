import ThemeToggle from "@/components/live/ThemeToggle";
import { ShadowDocsHost } from "../../../website-template/builds/shadow-docs/src/docs/host";
import "../../../website-template/builds/shadow-docs/src/docs/shadow-docs.css";

/**
 * Shadow Docs comes from the mogesjohnson/shadow-docs submodule. The site adds
 * its shared theme toggle (one theme choice for the whole site), a link home
 * and its own footer columns.
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ShadowDocsHost
      themeToggle={<ThemeToggle className="sd-icon-btn" />}
      homeLink={{ label: "Main site", href: "/" }}
      footerColumns={[
        {
          title: "See it run",
          links: [
            { label: "Shadow Army mock-up", href: "/shadow-army" },
            { label: "Agent protocol", href: "/agent-protocol" },
          ],
        },
        {
          title: "Portfolio",
          links: [
            { label: "Main website", href: "/" },
            { label: "Projects", href: "/projects" },
            { label: "Now", href: "/now" },
          ],
        },
      ]}
    >
      {children}
    </ShadowDocsHost>
  );
}
