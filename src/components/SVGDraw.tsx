"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SVGDraw() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const paths = container.querySelectorAll<SVGPathElement>(".draw-path");

    const ctx = gsap.context(() => {
      paths.forEach((path) => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;

        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          },
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full py-20 overflow-hidden" style={{ minHeight: "600px" }}>
      <svg
        viewBox="0 0 1200 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full absolute inset-0"
        style={{ opacity: 0.30 }}
      >
        {/* Circuit board pattern */}
        <path className="draw-path" d="M0 300 H200 L250 250 H450 L500 300 H700 L750 200 H900 L950 300 H1200" stroke="#00ff41" strokeWidth="1.5" />
        <path className="draw-path" d="M100 100 V200 H300 V400 H500 V150 H700 V350 H900 V100" stroke="#00ff41" strokeWidth="1.5" />
        <path className="draw-path" d="M0 500 H150 L200 450 H400 V350 H600 V500 H800 L850 450 H1200" stroke="#00ff41" strokeWidth="1.5" />
        {/* Nodes */}
        <path className="draw-path" d="M200 300 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0" stroke="#26ff00" strokeWidth="1.5" />
        <path className="draw-path" d="M500 300 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0" stroke="#00ff41" strokeWidth="1.5" />
        <path className="draw-path" d="M750 200 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0" stroke="#00ff41" strokeWidth="1.5" />
        <path className="draw-path" d="M950 300 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0" stroke="#00ff41" strokeWidth="1.5" />
        {/* Diagonal lines */}
        <path className="draw-path" d="M300 0 L600 300 L900 0" stroke="#00ff40" strokeWidth="0.5" strokeDasharray="4 4" />
        <path className="draw-path" d="M0 200 L300 400 L600 200 L900 400 L1200 200" stroke="#00ff41" strokeWidth="1.5" />
        {/* Grid crosses */}
        <path className="draw-path" d="M400 250 L400 270 M390 260 L410 260" stroke="#00ff41" strokeWidth="5" />
        <path className="draw-path" d="M800 350 L800 370 M790 360 L810 360" stroke="#00ff41" strokeWidth="5" />
        <path className="draw-path" d="M600 150 L600 170 M590 160 L610 160" stroke="#2fff00" strokeWidth="5" />
      </svg>

      {/* Center text */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-[500px] px-6">
        <p className="text-[11px] tracking-[0.3em] uppercase mb-6" style={{ color: "#00ff41", fontFamily: "var(--font-mono)" }}>
          &lt;/&gt; system.architecture
        </p>
        <h2 className="text-[clamp(2rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[1] text-center" style={{ fontFamily: "var(--font-display)" }}>
          <span style={{ color: "#02a12a" }}>Building</span>{" "}
          <span className="text-[var(--color-text-primary)]">the</span>{" "}
          <span style={{ color: "#049128" }}>Matrix</span>
        </h2>
        <p className="text-[var(--color-text-muted)] text-[14px] mt-4 text-center max-w-md" style={{ fontFamily: "var(--font-mono)" }}>
          // Architecting systems that push boundaries
        </p>
      </div>
    </div>
  );
}
