import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";
// import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "VolleyScore",
  description:
    "Track your volleyball games easily with our online volleyball scoreboard. Perfect for teams, coaches, and volleyball enthusiasts.",
  keywords:
    "volleyball scoreboard, online volleyball scoreboard, volleyball score tracker, live volleyball scores, volleyball",
  alternatives: {
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
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark:bg-[#15202b] bg-white`}>
        <ThemeProvider attribute="class">
          {/* <Navbar /> */}
          {children}
        </ThemeProvider>
      </body>
      <Analytics />
    </html>
  );
}
