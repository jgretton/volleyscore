import { Metadata } from "next";

// Reachable by URL so it can be tested on production, but kept out of
// search entirely until the match page can use a squad and lineup.
// Crawling is still allowed so the noindex is actually seen.
export const metadata: Metadata = {
  title: "Match Setup",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
