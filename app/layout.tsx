import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const graphik = localFont({
  src: [
    {
      path: "../public/fonts/Graphik-Regular.otf",
      weight: "400",
      style: "regular",
    },
    {
      path: "../public/fonts/Graphik-Semibold.otf",
      weight: "600",
      style: "semibold",
    },
  ],
  variable: "--font-graphik",
});

export const metadata: Metadata = {
  title: "EO Valgomat",
  description: "En valgomat laget av Elevorganisasjonen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${graphik.variable} ${geistSans.variable} ${geistMono.variable}`}>
      <body
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
