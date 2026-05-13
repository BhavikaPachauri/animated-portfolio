"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMousePosition } from "@/hooks/useMousePosition";
import GlitchText from "@/components/GlitchText";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { normalizedX, normalizedY } = useMousePosition();

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const bg = bgRef.current;
    if (!section || !heading || !bg) return;

    const ctx = gsap.context(() => {
      gsap.to(bg, {
        yPercent: 30,
        scale: 1.3,
        filter: "blur(8px)",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 1 },
      });

      gsap.to(heading, {
        y: -150,
        opacity: 0,
        scale: 0.85,
        scrollTrigger: { trigger: section, start: "top top", end: "50% top", scrub: 1 },
      });

      // Scan line animation
      const scanline = section.querySelector(".hero-scanline");
      if (scanline) {
        gsap.to(scanline, { y: "100vh", duration: 3, repeat: -1, ease: "none" });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const bgX = normalizedX * -20;
  const bgY = normalizedY * -15;

  return (
    <section ref={sectionRef} id="hero" className="relative h-[100vh] min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Grid background */}
      <div ref={gridRef} className="absolute inset-0 z-[1] opacity-[0.06]" style={{
        backgroundImage: "linear-gradient(rgba(0,255,65,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.4) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
        transform: `translate(${bgX * 0.3}px, ${bgY * 0.3}px)`,
        transition: "transform 0.3s ease-out",
      }} />

      {/* Background image with parallax */}
      <div ref={bgRef} className="absolute inset-0 z-0" style={{ transform: `translate(${bgX}px, ${bgY}px) scale(1.1)`, transition: "transform 0.3s ease-out" }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1920&q=80')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(5,5,5,0.7)] via-[rgba(5,5,5,0.5)] to-[var(--color-bg)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,65,0.06)_0%,transparent_60%)]" />
      </div>

      {/* Scanline */}
      <div className="hero-scanline absolute left-0 right-0 h-[1px] bg-[rgba(0,255,65,0.1)] z-[3] pointer-events-none" style={{ top: 0 }} />

      {/* Content */}
      <div ref={headingRef} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 2.8, ease: [0.16, 1, 0.3, 1] }}>
          <div className="inline-block px-4 py-2 border border-[rgba(0,255,65,0.2)] rounded mb-8" style={{ background: "rgba(0,255,65,0.03)" }}>
            <span className="text-[11px] tracking-[0.2em] uppercase" style={{ color: "#00ff41", fontFamily: "var(--font-mono)" }}>
              ⚡ System.online() — Ready to deploy
            </span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 3, ease: [0.16, 1, 0.3, 1] }}>
          <h1 className="hero-heading mb-4">
            <span className="block" style={{ color: "#00ff41" }}>I Build</span>
          </h1>
          <GlitchText
            text="Digital Realities"
            as="h1"
            className="hero-heading mb-4 text-gradient"
          />
          <h1 className="hero-heading">
            <span className="block text-[var(--color-text-primary)]">From Code</span>
          </h1>
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 3.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-[var(--color-text-secondary)] text-[14px] md:text-[16px] max-w-lg mx-auto leading-relaxed mt-8"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <span style={{ color: "#00ff41" }}>$</span> Full-stack developer & creative engineer.
          <br />
          <span style={{ color: "#00ff41" }}>$</span> Turning complex problems into elegant solutions.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 3.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex items-center justify-center gap-5 flex-wrap"
        >
          <button onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
            className="magnetic-btn" style={{ borderColor: "#00ff41", color: "#00ff41" }}>
            <span>./view_work.sh</span>
          </button>
          <button onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="magnetic-btn" style={{ background: "#00ff41", borderColor: "#00ff41", color: "#050505", fontWeight: 600 }}>
            <span>./connect.sh</span>
          </button>
        </motion.div>
      </div>

      {/* Corner HUD elements */}
      <div className="absolute top-6 left-6 z-10 hidden md:block">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4 }}>
          <p className="text-[10px] tracking-[0.1em]" style={{ color: "rgba(0,255,65,0.4)", fontFamily: "var(--font-mono)" }}>
            SYS.STATUS: ONLINE<br />UPTIME: 99.9%<br />LOCATION: 127.0.0.1
          </p>
        </motion.div>
      </div>
      <div className="absolute top-6 right-6 z-10 hidden md:block">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.2 }}>
          <p className="text-[10px] tracking-[0.1em] text-right" style={{ color: "rgba(0,255,65,0.4)", fontFamily: "var(--font-mono)" }}>
            BUILD: v2.0.26<br />ENV: PRODUCTION<br />NODE: 20.x LTS
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-[10px] tracking-[0.15em] uppercase" style={{ color: "rgba(0,255,65,0.4)", fontFamily: "var(--font-mono)" }}>
          scroll_down
        </span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-8 bg-gradient-to-b from-[#00ff41] to-transparent opacity-40" />
      </motion.div>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <div key={i} className="particle hidden md:block" style={{
          left: `${10 + i * 12}%`, top: `${15 + (i % 4) * 20}%`,
          animationDelay: `${i * 1}s`, animationDuration: `${5 + i * 1.5}s`,
          width: `${1 + (i % 3)}px`, height: `${1 + (i % 3)}px`,
          background: i % 2 === 0 ? "#00ff41" : "#c4a1ff",
          opacity: 0.2 + (i % 3) * 0.08,
        }} />
      ))}
    </section>
  );
}
