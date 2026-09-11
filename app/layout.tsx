import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pooja Singh · pooja.monitor",
  description:
    "Pooja Singh — Senior engineer building Azure Monitor things (data collection rules, workbooks, log analytics) and the AI agents that test the UI so you don't have to.",
  openGraph: {
    title: "Pooja Singh · pooja.monitor",
    description:
      "Azure Monitor, workbooks, log analytics & E2E testing agents. Personal observability dashboard, minus the incidents.",
    type: "website",
    url: "https://poojasingh.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pooja Singh · pooja.monitor",
    description:
      "Azure Monitor, workbooks, log analytics & E2E testing agents. Personal observability dashboard, minus the incidents.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0e1a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
