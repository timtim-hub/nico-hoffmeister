import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nico Hoffmeister | Comedy aus Köln",
  description: "Nico Hoffmeister - Der Comedy-Mastermind aus Köln. Direkter, kompromissloser Humor. HAHA Comedy, Podcast 'Nicole', Instagram @hoffelpantoffel",
  keywords: ["Nico Hoffmeister", "Comedy", "Köln", "HAHA Comedy", "Satire Slam", "Podcast Nicole"],
  authors: [{ name: "Nico Hoffmeister" }],
  openGraph: {
    title: "Nico Hoffmeister | Comedy aus Köln",
    description: "Der Comedy-Mastermind aus Köln. Direkter, kompromissloser Humor.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${playfair.variable} ${inter.variable} antialiased bg-[#0a0612]`}>
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
