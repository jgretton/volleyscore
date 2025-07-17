import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "VolleyScore - Online Volleyball Scoreboard",
    template: "%s | VolleyScore"
  },
  description:
    "Track your volleyball games easily with our online volleyball scoreboard. Perfect for teams, coaches, and volleyball enthusiasts.",
  keywords: [
    "volleyball scoreboard",
    "online volleyball scoreboard", 
    "volleyball score tracker",
    "live volleyball scores",
    "volleyball",
    "digital scoreboard",
    "sports scoring",
    "volleyball match tracker"
  ],
  authors: [{ name: "VolleyScore" }],
  creator: "VolleyScore",
  publisher: "VolleyScore",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.volleyscore.co.uk"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "VolleyScore - Online Volleyball Scoreboard",
    description:
      "Track your volleyball games easily with our online volleyball scoreboard. Perfect for teams, coaches, and volleyball enthusiasts.",
    url: "https://www.volleyscore.co.uk",
    siteName: "VolleyScore",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VolleyScore - Online Volleyball Scoreboard"
      }
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VolleyScore - Online Volleyball Scoreboard",
    description: "Track your volleyball games easily with our online volleyball scoreboard.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "VolleyScore",
              "description": "Online volleyball scoreboard for tracking volleyball games",
              "url": "https://www.volleyscore.co.uk",
              "applicationCategory": "SportsApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "GBP"
              },
              "featureList": [
                "Real-time volleyball scoring",
                "Team management",
                "Match history tracking",
                "Dark mode support"
              ]
            })
          }}
        />
      </head>
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
