"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxLayers() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const layers = container.querySelectorAll<HTMLElement>(".p-layer");
      layers.forEach((layer) => {
        const speed = parseFloat(layer.dataset.speed || "1");
        gsap.to(layer, {
          y: speed * -200,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative h-[80vh] overflow-hidden" style={{ perspective: "1000px" }}>
      {/* Background grid - slowest */}
      <div className="p-layer absolute inset-0 opacity-[0.04]" data-speed="0.3" style={{
        backgroundImage: "linear-gradient(rgba(0,255,65,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.5) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      {/* Floating code fragments */}
      <div className="p-layer absolute inset-0" data-speed="0.6">
        {["const", "async", "import", "export", "return", "await", "class", "=>"].map((word, i) => (
          <span key={i} className="absolute text-[rgba(0,255,65,0.06)] text-[40px] md:text-[80px] font-bold" style={{
            fontFamily: "var(--font-mono)",
            left: `${(i * 13 + 5) % 90}%`,
            top: `${(i * 17 + 10) % 80}%`,
            transform: `rotate(${(i * 15 - 30)}deg)`,
          }}>
            {word}
          </span>
        ))}
      </div>

      {/* Mid circles */}
      <div className="p-layer absolute inset-0" data-speed="1">
        <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full border border-[rgba(0,255,65,0.08)]" />
        <div className="absolute top-[40%] right-[15%] w-[200px] h-[200px] rounded-full border border-[rgba(196,161,255,0.08)]" />
        <div className="absolute bottom-[20%] left-[40%] w-[400px] h-[400px] rounded-full border border-[rgba(125,211,252,0.06)]" />
      </div>

      {/* Foreground dots - fastest */}
      <div className="p-layer absolute inset-0" data-speed="1.8">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="absolute rounded-full" style={{
            width: `${2 + (i % 4)}px`,
            height: `${2 + (i % 4)}px`,
            background: i % 3 === 0 ? "#00ff41" : i % 3 === 1 ? "#c4a1ff" : "#7dd3fc",
            opacity: 0.15 + (i % 5) * 0.05,
            left: `${(i * 7 + 3) % 95}%`,
            top: `${(i * 11 + 5) % 90}%`,
          }} />
        ))}
      </div>

      {/* Center content */}
      <div className="p-layer absolute inset-0 flex items-center justify-center" data-speed="1.2">
        <div className="text-center px-6">
          <div className="inline-block px-4 py-2 border border-[rgba(0,255,65,0.2)] rounded mb-6" style={{ background: "rgba(0,255,65,0.03)" }}>
            <span className="text-[11px] tracking-[0.2em] uppercase" style={{ color: "#00ff41", fontFamily: "var(--font-mono)" }}>
              // depth_perception.exe
            </span>
          </div>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold tracking-[-0.03em] leading-[1.1]" style={{ fontFamily: "var(--font-display)" }}>
            <span className="text-[var(--color-text-primary)]">Layers of </span>
            <span style={{ color: "#00ff41" }}>Complexity</span>
          </h2>
        </div>
      </div>
    </div>
  );
}
