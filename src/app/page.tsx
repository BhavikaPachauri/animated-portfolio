"use client";

import { useState, useCallback } from "react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import Loader from "@/components/Loader";
import CursorGlow from "@/components/CursorGlow";
import NoiseOverlay from "@/components/NoiseOverlay";
import ScrollProgress from "@/components/ScrollProgress";
import MatrixRain from "@/components/MatrixRain";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SVGDraw from "@/components/SVGDraw";
import ImageScroll from "@/components/ImageScroll";
import HorizontalScroll from "@/components/HorizontalScroll";
import ParallaxLayers from "@/components/ParallaxLayers";
import Projects from "@/components/Projects";
import TerminalSection from "@/components/TerminalSection";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  useSmoothScroll();

  const handleLoaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

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
            <Hero />
            <SVGDraw />
            <ImageScroll />
            <ParallaxLayers />
            <HorizontalScroll />
            <Projects />
            <TerminalSection />
            <About />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
