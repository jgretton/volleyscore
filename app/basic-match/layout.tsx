import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Volleyball Match",
  description: "Track your live volleyball match with real-time scoring and match history.",
  openGraph: {
    title: "Live Volleyball Match | VolleyScore",
    description: "Track your live volleyball match with real-time scoring and match history.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function BasicMatchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}