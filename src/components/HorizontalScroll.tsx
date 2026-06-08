"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PANELS = [
  {
    id: "01",
    title: "CODE",
    subtitle: "Full Stack Development",
    tag: "React · Next.js · Node.js",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=85",
  },
  {
    id: "02",
    title: "BUILD",
    subtitle: "API Architecture",
    tag: "Express · MySQL · REST",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=85",
  },
  {
    id: "03",
    title: "DEPLOY",
    subtitle: "Production Ready",
    tag: "Git · CI/CD · Cloud",
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=85",
  },
  {
    id: "04",
    title: "DESIGN",
    subtitle: "UI / UX Systems",
    tag: "Tailwind · Material UI · CSS",
    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=85",
  },
 
];

export default function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth - window.innerWidth;

      // Main horizontal scroll
      const hTween = gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          id: "hscroll",
          trigger: container,
          start: "top top",
          end: `+=${totalWidth}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });

      // Per-panel animations
      const panels = track.querySelectorAll<HTMLElement>(".h-panel");
      panels.forEach((panel, i) => {
        const img   = panel.querySelector<HTMLElement>(".h-img");
        const title = panel.querySelector<HTMLElement>(".h-title");
        const sub   = panel.querySelector<HTMLElement>(".h-sub");
        const tag   = panel.querySelector<HTMLElement>(".h-tag");
        const num   = panel.querySelector<HTMLElement>(".h-num");

        const st = {
          trigger: panel,
          containerAnimation: hTween,
          start: "left 90%",
          end: "left 30%",
          scrub: 1,
        };

        if (img) gsap.fromTo(img, { scale: 1.35, filter: "brightness(0.3) saturate(0)" }, { scale: 1.0, filter: "brightness(0.6) saturate(0.3)", scrollTrigger: st });
        if (title) gsap.fromTo(title, { y: 80, opacity: 0 }, { y: 0, opacity: 1, scrollTrigger: st });
        if (sub) gsap.fromTo(sub, { y: 40, opacity: 0 }, { y: 0, opacity: 1, scrollTrigger: { ...st, start: "left 80%", end: "left 25%" } });
        if (tag) gsap.fromTo(tag, { y: 30, opacity: 0 }, { y: 0, opacity: 1, scrollTrigger: { ...st, start: "left 70%", end: "left 20%" } });
        if (num) gsap.fromTo(num, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, scrollTrigger: { ...st, start: "left 85%", end: "left 40%" } });

        // Scanline per panel
        const scanEl = panel.querySelector<HTMLElement>(".h-scan");
        if (scanEl) {
          gsap.fromTo(scanEl,
            { scaleX: 0, transformOrigin: "left center" },
            { scaleX: 1, duration: 0.8, ease: "expo.out",
              scrollTrigger: { trigger: panel, containerAnimation: hTween, start: "left 70%", toggleActions: "play none none none" } }
          );
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden" style={{ background: "var(--color-bg)" }}>
      {/* Scroll progress bar */}
      <div className="fixed bottom-0 left-0 right-0 h-[2px] z-50" style={{ background: "rgba(0,255,65,0.08)" }}>
        <div ref={progressRef} className="h-full transition-none" style={{ background: "#00ff41", width: "0%", boxShadow: "0 0 8px rgba(0,255,65,0.5)" }} />
      </div>

      <div ref={trackRef} className="flex h-screen" style={{ width: `${PANELS.length * 100}vw` }}>
        {PANELS.map((panel, i) => (
          <div key={i} className="h-panel relative w-screen h-screen flex-shrink-0 flex items-end justify-start overflow-hidden">

            {/* Background photo */}
            <div className="h-img absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${panel.img}')` }} />

            {/* Overlays */}
            <div className="absolute inset-0" style={{ background: "rgba(5,5,5,0.62)" }} />
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: "linear-gradient(rgba(0,255,65,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.6) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }} />
            {/* Vignette */}
            <div className="absolute inset-0" style={{
              background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(5,5,5,0.7) 100%)",
            }} />

            {/* Scanline accent */}
            <div className="h-scan absolute top-[45%] left-0 right-0 h-[1px]"
              style={{ background: "linear-gradient(90deg, #00ff41, rgba(0,255,65,0.1))" }} />

            {/* Corner brackets */}
            <div className="absolute top-8 left-8 w-14 h-14 border-t border-l opacity-30" style={{ borderColor: "#00ff41" }} />
            <div className="absolute top-8 right-8 w-14 h-14 border-t border-r opacity-30" style={{ borderColor: "#00ff41" }} />
            <div className="absolute bottom-8 left-8 w-14 h-14 border-b border-l opacity-30" style={{ borderColor: "#00ff41" }} />
            <div className="absolute bottom-8 right-8 w-14 h-14 border-b border-r opacity-30" style={{ borderColor: "#00ff41" }} />

            {/* Panel number - huge background */}
            <div className="h-num absolute right-0 bottom-0 text-[clamp(10rem,20vw,18rem)] font-bold leading-none select-none pointer-events-none"
              style={{ color: "rgba(0,255,65,0.04)", fontFamily: "var(--font-mono)", lineHeight: 0.9 }}>
              {panel.id}
            </div>

            {/* Main content — centered */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-10 w-full h-full">
              <p className="h-num text-[9px] tracking-[0.35em] uppercase mb-6 flex items-center gap-3"
                style={{ color: "rgba(0,255,65,0.5)", fontFamily: "var(--font-mono)" }}>
                <span className="inline-block w-6 h-[1px]" style={{ background: "rgba(0,255,65,0.4)" }} />
                {panel.id} / 0{PANELS.length}
                <span className="inline-block w-6 h-[1px]" style={{ background: "rgba(0,255,65,0.4)" }} />
              </p>

              <h2 className="h-title text-[clamp(4.5rem,13vw,11rem)] font-bold tracking-[-0.05em] leading-[0.88] mb-5"
                style={{ fontFamily: "var(--font-display)", color: "#00ff41", textShadow: "0 0 60px rgba(0,255,65,0.2)" }}>
                {panel.title}
              </h2>

              <p className="h-sub text-[11px] tracking-[0.12em] uppercase mb-6"
                style={{ color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-mono)" }}>
                {panel.subtitle}
              </p>

              <div className="h-tag inline-flex items-center gap-2 px-4 py-2"
                style={{ border: "1px solid rgba(0,255,65,0.18)", background: "rgba(0,255,65,0.03)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff41] opacity-60 animate-pulse" />
                <span className="text-[9px] tracking-[0.12em] uppercase"
                  style={{ color: "rgba(0,255,65,0.55)", fontFamily: "var(--font-mono)" }}>
                  {panel.tag}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
