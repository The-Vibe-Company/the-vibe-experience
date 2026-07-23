import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProgressSync from "@/components/ProgressSync";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Vibe Experience",
  description: "Le parcours The Vibe Experience : apprendre à construire avec l'IA ou automatiser ton business.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <ProgressSync />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
