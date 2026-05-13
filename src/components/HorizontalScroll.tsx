"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Animate each panel
      const panels = track.querySelectorAll<HTMLElement>(".h-panel");
      panels.forEach((panel) => {
        const img = panel.querySelector<HTMLElement>(".h-panel-img");
        if (img) {
          gsap.fromTo(img,
            { scale: 1.3, filter: "brightness(0.4)" },
            {
              scale: 1,
              filter: "brightness(0.7)",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: gsap.getById("hscroll") || undefined,
                start: "left right",
                end: "left center",
                scrub: 1,
              },
            }
          );
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const panels = [
    { title: "EXPLOIT", subtitle: "Security Research", img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&q=80", color: "#00ff41" },
    { title: "DEPLOY", subtitle: "Cloud Architecture", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=80", color: "#c4a1ff" },
    { title: "DISRUPT", subtitle: "Innovation Lab", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=900&q=80", color: "#7dd3fc" },
    { title: "CREATE", subtitle: "Design Systems", img: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=900&q=80", color: "#00ff41" },
    { title: "EXECUTE", subtitle: "Full Stack Dev", img: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=900&q=80", color: "#c4a1ff" },
  ];

  return (
    <section ref={containerRef} className="relative overflow-hidden" style={{ background: "var(--color-bg)" }}>
      <div ref={trackRef} className="flex h-screen" style={{ width: `${panels.length * 100}vw` }}>
        {panels.map((panel, i) => (
          <div key={i} className="h-panel relative w-screen h-screen flex-shrink-0 flex items-center justify-center overflow-hidden">
            {/* BG image */}
            <div className="h-panel-img absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${panel.img}')` }} />
            <div className="absolute inset-0 bg-[rgba(5,5,5,0.7)]" />

            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-[0.05]" style={{
              backgroundImage: "linear-gradient(rgba(0,255,65,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }} />

            {/* Content */}
            <div className="relative z-10 text-center px-6">
              <p className="text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: panel.color, fontFamily: "var(--font-mono)" }}>
                [{String(i + 1).padStart(2, "0")}]
              </p>
              <h2 className="text-[clamp(4rem,12vw,10rem)] font-bold tracking-[-0.05em] leading-[0.9]" style={{ fontFamily: "var(--font-display)", color: panel.color, textShadow: `0 0 60px ${panel.color}40` }}>
                {panel.title}
              </h2>
              <p className="text-[14px] tracking-[0.15em] uppercase mt-4 text-[var(--color-text-muted)]" style={{ fontFamily: "var(--font-mono)" }}>
                {panel.subtitle}
              </p>
            </div>

            {/* Corner brackets */}
            <div className="absolute top-8 left-8 w-12 h-12 border-t border-l opacity-20" style={{ borderColor: panel.color }} />
            <div className="absolute top-8 right-8 w-12 h-12 border-t border-r opacity-20" style={{ borderColor: panel.color }} />
            <div className="absolute bottom-8 left-8 w-12 h-12 border-b border-l opacity-20" style={{ borderColor: panel.color }} />
            <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r opacity-20" style={{ borderColor: panel.color }} />
          </div>
        ))}
      </div>
    </section>
  );
}
