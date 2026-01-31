import type { Metadata } from "next";
import {
  Bodoni_Moda,
  Dancing_Script,
  Inter,
  Noto_Sans,
  Pixelify_Sans,
  Quantico,
} from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dancing = Dancing_Script({
  variable: "--font-cursive",
  subsets: ["latin"],
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
});

const quantico = Quantico({
  variable: "--font-quantico",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const pixelify = Pixelify_Sans({
  variable: "--font-pixelify",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const noto = Noto_Sans({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Jashwanth SA — Portfolio",
  description: "Developer portfolio for Jashwanth SA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${dancing.variable} ${bodoni.variable} ${quantico.variable} ${pixelify.variable} ${noto.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
