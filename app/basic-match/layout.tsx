import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Volleyball Match",
  description: "Track your live volleyball match with real-time scoring and match history.",
  alternates: {
    canonical: "/basic-match",
  },
  openGraph: {
    title: "Live Volleyball Match | VolleyScore",
    description: "Track your live volleyball match with real-time scoring and match history.",
    url: "https://www.volleyscore.co.uk/basic-match",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BasicMatchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}