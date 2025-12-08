import type { Metadata } from "next";
import { Geist, Geist_Mono, Mountains_of_Christmas } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const mountainsOfChristmas = Mountains_of_Christmas({
  variable: "--font-mountains-of-christmas",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Galdora Linktree",
  description: "Galdora Personalmanagement Linktree",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${mountainsOfChristmas.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
