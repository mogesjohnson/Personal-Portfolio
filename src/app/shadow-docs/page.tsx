import type { Metadata } from "next";
import { OverviewPage } from "../../../website-template/builds/shadow-docs/src/docs/OverviewPage";

export const metadata: Metadata = {
  title: "Overview | Shadow Docs",
  description: "Shadow Docs: documentation for Shadow Army, the CLI that commands other AI CLIs as an army.",
};

export default function Page() {
  return <OverviewPage />;
}
