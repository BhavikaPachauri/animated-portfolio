"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Extend window with VANTA */
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    VANTA: any;
  }
}

/** Append a <script> and resolve when loaded */
function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();          // already in DOM
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(s);
  });
}

export default function VantaBirds() {
  const vantaRef   = useRef<HTMLDivElement>(null);
  const effectRef  = useRef<{ destroy: () => void } | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  /* ── Load scripts in order, then init ── */
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        // 1️⃣ Three.js must be on window before vanta reads it
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        );
        // 2️⃣ Now load vanta birds (it will find window.THREE automatically)
        await loadScript(
          "https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.birds.min.js"
        );

        if (cancelled || !vantaRef.current) return;

        // 3️⃣ window.VANTA.BIRDS is now available
        effectRef.current = window.VANTA.BIRDS({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1.0,
          scaleMobile: 1.0,
          /* ── green / black hacker theme ── */
          backgroundColor: 0x050505,
          color1: 0x00ff41,
          color2: 0x003300,
          colorMode: "lerp",
          birdSize: 1.4,
          wingSpan: 30,
          speedLimit: 5,
          separation: 60,
          alignment: 40,
          cohesion: 40,
          quantity: 4,
        });
      } catch (err) {
        console.warn("Vanta Birds failed to load:", err);
      }
    };

    run();

    return () => {
      cancelled = true;
      effectRef.current?.destroy();
      effectRef.current = null;
    };
  }, []);

  /* ── GSAP scroll animations ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".vb-content",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: "expo.out",
          scrollTrigger: { trigger: section, start: "top 70%", toggleActions: "play none none none" } }
      );
      gsap.fromTo(".vb-line",
        { scaleX: 0, transformOrigin: "center" },
        { scaleX: 1, duration: 1.4, ease: "expo.out",
          scrollTrigger: { trigger: section, start: "top 65%", toggleActions: "play none none none" } }
      );
      gsap.fromTo(".vb-tag",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: "expo.out",
          scrollTrigger: { trigger: section, start: "top 60%", toggleActions: "play none none none" } }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="vanta"
      className="relative overflow-hidden"
      style={{ height: "100vh", minHeight: "600px" }}
    >
      {/* VANTA target */}
      <div ref={vantaRef} className="absolute inset-0 z-0" />

      {/* Vignette */}
      <div className="absolute inset-0 z-[1]" style={{
        background: "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 30%, rgba(5,5,5,0.55) 80%, rgba(5,5,5,0.88) 100%)",
      }} />
      <div className="absolute top-0 left-0 right-0 h-24 z-[1]" style={{ background: "linear-gradient(to bottom, #050505, transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-24 z-[1]" style={{ background: "linear-gradient(to top, #050505, transparent)" }} />

      {/* Scan line */}
      <div className="scan-line z-[2]" />

      {/* HUD corners */}
      {[["top-8 left-8","border-t border-l"],["top-8 right-8","border-t border-r"],["bottom-8 left-8","border-b border-l"],["bottom-8 right-8","border-b border-r"]].map(([pos,b]) => (
        <div key={pos} className={`absolute ${pos} w-12 h-12 ${b} z-[3]`} style={{ borderColor: "rgba(0,255,65,0.18)" }} />
      ))}

      {/* HUD text */}
      <div className="absolute top-10 left-16 z-[4] hidden md:block">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }} viewport={{ once: true }}
          className="text-[9px] tracking-[0.12em] leading-[2.2]" style={{ color: "rgba(0,255,65,0.22)", fontFamily: "var(--font-mono)" }}>
          SYS: ONLINE<br />ENTITY: DEVELOPER<br />THREAT: ZERO
        </motion.p>
      </div>
      <div className="absolute top-10 right-16 z-[4] hidden md:block">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.7 }} viewport={{ once: true }}
          className="text-[9px] tracking-[0.12em] leading-[2.2] text-right" style={{ color: "rgba(0,255,65,0.22)", fontFamily: "var(--font-mono)" }}>
          REACT: 19.x<br />NEXT: 16.x<br />STATUS: DEPLOYED
        </motion.p>
      </div>

      {/* Main content */}
      <div className="vb-content absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-[3] opacity-0">
        <p className="text-[9px] tracking-[0.4em] uppercase mb-6" style={{ color: "rgba(0,255,65,0.4)", fontFamily: "var(--font-mono)" }}>
          ⬡ BHAVIKA PACHAURI ⬡
        </p>

        <h2 className="text-[clamp(2.8rem,9vw,8rem)] font-bold tracking-[-0.04em] leading-[0.92] mb-6" style={{ fontFamily: "var(--font-display)" }}>
          <span style={{ color: "#e8ffe8" }}>CREATIVE</span><br />
          <span className="text-gradient">DEVELOPER</span>
        </h2>

        <p className="text-[12px] max-w-md mb-8 leading-relaxed" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)" }}>
          <span style={{ color: "#00ff41" }}>$</span> Building scalable digital experiences — one line of code at a time.
        </p>

        <div className="vb-line w-40 h-[1px] mb-8" style={{ background: "linear-gradient(90deg, transparent, #00ff41, transparent)" }} />

        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {["React.js", "Next.js", "Node.js", "TypeScript", "MySQL", "Express.js"].map((t) => (
            <motion.span key={t} className="vb-tag opacity-0 px-4 py-1.5 text-[9px] tracking-[0.15em] uppercase"
              style={{ border: "1px solid rgba(0,255,65,0.18)", background: "rgba(0,255,65,0.04)", color: "rgba(0,255,65,0.55)", fontFamily: "var(--font-mono)", backdropFilter: "blur(8px)" }}
              whileHover={{ borderColor: "#00ff41", color: "#00ff41", scale: 1.06 }} transition={{ duration: 0.2 }}>
              {t}
            </motion.span>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }} viewport={{ once: true }}
          onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
          className="magnetic-btn"
          style={{ background: "#00ff41", color: "#050505", borderColor: "#00ff41", fontWeight: 700 }}>
          <span>./hire_me.sh</span>
        </motion.button>
      </div>
    </section>
  );
}
