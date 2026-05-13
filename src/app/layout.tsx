import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  title: "JD Studio — Creative Developer Portfolio",
  description: "Immersive 3D portfolio showcasing cutting-edge web experiences, creative development, and modern design.",
  keywords: ["portfolio", "developer", "creative", "3D", "web design"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${jetbrains.variable}`}>
      <body style={{ fontFamily: "var(--font-body)", background: "var(--color-bg)", color: "var(--color-text-primary)" }}>
        {children}
      </body>
    </html>
  );
}
