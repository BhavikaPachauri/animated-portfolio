"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import Loader from "@/components/Loader";
import CursorGlow from "@/components/CursorGlow";
import NoiseOverlay from "@/components/NoiseOverlay";
import ScrollProgress from "@/components/ScrollProgress";
import MatrixRain from "@/components/MatrixRain";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SVGDraw from "@/components/SVGDraw";
import GlitchBanner from "@/components/GlitchBanner";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Heavy Three.js / GSAP sections — no SSR
const HorizontalScroll   = dynamic(() => import("@/components/HorizontalScroll"),   { ssr: false });
const Model3D            = dynamic(() => import("@/components/Model3D"),             { ssr: false });
const VantaBirds         = dynamic(() => import("@/components/VantaBirds"),          { ssr: false });
const VantaWaves         = dynamic(() => import("@/components/VantaWaves"),          { ssr: false });
const SkillsOrbit        = dynamic(() => import("@/components/SkillsOrbit"),         { ssr: false });
const ExperienceTimeline = dynamic(() => import("@/components/ExperienceTimeline"),  { ssr: false });
const NeuralStats        = dynamic(() => import("@/components/NeuralStats"),         { ssr: false });

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  useSmoothScroll();

  const handleLoaderComplete = useCallback(() => setLoaded(true), []);

  return (
    <>
      {!loaded && <Loader onComplete={handleLoaderComplete} />}
      {loaded && (
        <>
          <NoiseOverlay />
          <MatrixRain />
          <CursorGlow />
          <ScrollProgress />
          <Navbar />
          <main>
            {/* Scene 1 — Starfield hero */}
            <Hero />

            {/* Circuit board GSAP draw */}
            <SVGDraw />

            {/* Horizontal scroll — developer photos */}
            <HorizontalScroll />

            {/* Glitch banner — matrix canvas + scramble text */}
            <GlitchBanner />

            {/* VANTA BIRDS — interactive 3D flock */}
            <VantaBirds />

            {/* Developer setup + terminal */}
            <Model3D />

            {/* About / bio */}
            <About />

            {/* Skills orbit sphere */}
            <SkillsOrbit />

            {/* Projects vault */}
            <Projects />

            {/* Career timeline */}
            <ExperienceTimeline />

            {/* Neural stats network */}
            <NeuralStats />

            {/* VANTA WAVES — before contact */}
            <VantaWaves />

            {/* Contact */}
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
