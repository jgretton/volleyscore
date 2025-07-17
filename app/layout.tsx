import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VolleyScore",
  description:
    "Track your volleyball games easily with our online volleyball scoreboard. Perfect for teams, coaches, and volleyball enthusiasts.",
  keywords:
    "volleyball scoreboard, online volleyball scoreboard, volleyball score tracker, live volleyball scores, volleyball",
  alternates: {
    canonical: "https://www.volleyscore.co.uk/",
  },
  openGraph: {
    title: "Volleyball Scoreboard | VolleyScore",
    description:
      "Track your volleyball games easily with our online volleyball scoreboard. Perfect for teams, coaches, and volleyball enthusiasts.",
    url: "https://www.volleyscore.co.uk",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white dark:bg-[#15202b]`}>
        <ThemeProvider attribute="class">
          {/* <Navbar /> */}
          <main className="h-dvh">{children}</main>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
