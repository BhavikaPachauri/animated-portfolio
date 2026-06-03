import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  title: "Bhavika Pachauri — Full Stack Developer",
  description: "Full Stack Developer with expertise in React, Next.js, Node.js, and modern web technologies. Building scalable, immersive digital experiences.",
  keywords: ["Bhavika Pachauri", "Full Stack Developer", "React", "Next.js", "Node.js", "TypeScript", "Web Developer"],
  authors: [{ name: "Bhavika Pachauri" }],
  openGraph: {
    title: "Bhavika Pachauri — Full Stack Developer",
    description: "Building scalable web applications with modern technologies.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${jetbrains.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
