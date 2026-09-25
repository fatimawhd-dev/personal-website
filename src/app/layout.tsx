import type { Metadata } from "next";
import { Archivo_Black, Outfit, Syne } from "next/font/google";
import "./globals.css";

const display = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const loader = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-loader",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fatima Waheed · Full Stack Developer",
  description:
    "Portfolio of Fatima Waheed — Full Stack Developer building meaningful, user-focused products across AI, web, and mobile.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${loader.variable} h-full`}
    >
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
