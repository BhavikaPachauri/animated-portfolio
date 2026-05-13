"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = [
  {
    url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1400&q=80",
    title: "// EXPLOIT.systems",
    subtitle: "Penetrating the boundaries of web technology",
  },
  {
    url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=80",
    title: "// DEPLOY.infrastructure",
    subtitle: "Cloud-native architecture at scale",
  },
  {
    url: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=1400&q=80",
    title: "// RENDER.reality",
    subtitle: "Where code meets visual perfection",
  },
  {
    url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1400&q=80",
    title: "// ENCRYPT.data",
    subtitle: "Zero-trust security architecture",
  },
];

export default function ImageScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = container.querySelectorAll<HTMLElement>(".img-scroll-panel");

    const ctx = gsap.context(() => {
      sections.forEach((section, i) => {
        const img = section.querySelector<HTMLElement>(".img-scroll-image");
        const overlay = section.querySelector<HTMLElement>(".img-scroll-overlay");
        const text = section.querySelector<HTMLElement>(".img-scroll-text");
        const grid = section.querySelector<HTMLElement>(".img-scroll-grid");

        if (!img || !overlay || !text) return;

        // Image scale and depth
        gsap.fromTo(img,
          { scale: 1.4, filter: "blur(6px) brightness(0.3)" },
          { scale: 1, filter: "blur(0px) brightness(0.6)", scrollTrigger: { trigger: section, start: "top bottom", end: "top 20%", scrub: 1 } }
        );

        // Zoom past on exit
        gsap.to(img, {
          scale: 1.6, filter: "blur(8px) brightness(0.2)",
          scrollTrigger: { trigger: section, start: "bottom 80%", end: "bottom top", scrub: 1 },
        });

        // Overlay
        gsap.fromTo(overlay, { opacity: 0.85 }, { opacity: 0.4, scrollTrigger: { trigger: section, start: "top bottom", end: "top 30%", scrub: 1 } });

        // Grid reveal
        if (grid) {
          gsap.fromTo(grid, { opacity: 0 }, { opacity: 0.05, scrollTrigger: { trigger: section, start: "top 60%", end: "top 20%", scrub: 1 } });
          gsap.to(grid, { opacity: 0, scrollTrigger: { trigger: section, start: "bottom 80%", end: "bottom 40%", scrub: 1 } });
        }

        // Text
        gsap.fromTo(text, { y: 100, opacity: 0, filter: "blur(8px)" }, { y: 0, opacity: 1, filter: "blur(0px)", scrollTrigger: { trigger: section, start: "top 60%", end: "top 20%", scrub: 1 } });
        gsap.to(text, { y: -60, opacity: 0, filter: "blur(4px)", scrollTrigger: { trigger: section, start: "bottom 80%", end: "bottom 40%", scrub: 1 } });

        // 3D tilt
        if (i > 0) {
          gsap.fromTo(section, { rotateX: 10, transformOrigin: "center bottom", opacity: 0.4 },
            { rotateX: 0, opacity: 1, scrollTrigger: { trigger: section, start: "top bottom", end: "top 40%", scrub: 1 } });
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative" style={{ perspective: "1200px" }}>
      {images.map((img, i) => (
        <div key={i} className="img-scroll-panel relative h-[100vh] flex items-center justify-center overflow-hidden" style={{ transformStyle: "preserve-3d" }}>
          <div className="img-scroll-image absolute inset-0 bg-cover bg-center will-change-transform" style={{ backgroundImage: `url('${img.url}')` }} />
          <div className="img-scroll-overlay absolute inset-0 bg-[var(--color-bg)]" />

          {/* Grid overlay */}
          <div className="img-scroll-grid absolute inset-0 opacity-0" style={{
            backgroundImage: "linear-gradient(rgba(0,255,65,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.3) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }} />

          {/* Corner brackets */}
          <div className="absolute top-8 left-8 w-10 h-10 border-t border-l border-[rgba(0,255,65,0.2)] z-10" />
          <div className="absolute top-8 right-8 w-10 h-10 border-t border-r border-[rgba(0,255,65,0.2)] z-10" />
          <div className="absolute bottom-8 left-8 w-10 h-10 border-b border-l border-[rgba(0,255,65,0.2)] z-10" />
          <div className="absolute bottom-8 right-8 w-10 h-10 border-b border-r border-[rgba(0,255,65,0.2)] z-10" />

          {/* Text */}
          <div className="img-scroll-text relative z-10 text-center px-6">
            <p className="text-[11px] tracking-[0.25em] uppercase mb-5" style={{ color: "#00ff41", fontFamily: "var(--font-mono)" }}>
              [{String(i + 1).padStart(2, "0")}] — SECTOR_{String.fromCharCode(65 + i)}
            </p>
            <h2 className="text-[clamp(1.8rem,5vw,4rem)] font-bold tracking-[-0.03em] leading-[1.1] mb-3"
              style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-primary)" }}>
              {img.title}
            </h2>
            <p className="text-[13px] font-light" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)" }}>
              {img.subtitle}
            </p>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-[var(--color-bg)] to-transparent z-[5]" />
        </div>
      ))}
    </div>
  );
}
