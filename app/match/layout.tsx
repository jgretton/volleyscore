import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Volleyball Match",
  description: "Track your live volleyball match with real-time scoring and match history.",
  alternates: {
    canonical: "/match",
  },
  openGraph: {
    title: "Live Volleyball Match | VolleyScore",
    description: "Track your live volleyball match with real-time scoring and match history.",
    url: "https://www.volleyscore.co.uk/match",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function MatchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}