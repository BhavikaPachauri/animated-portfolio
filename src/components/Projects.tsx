"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: "01",
    title: "School ERP System",
    type: "Frontend",
    description: "Responsive ERP interface managing student records, attendance, fee modules and academic data. Reusable UI components, dynamic forms, REST API integration.",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=85",
    stack: ["React.js", "JavaScript", "Material UI", "REST APIs"],
    year: "2024",
  },
  {
    id: "02",
    title: "Sangam Challengers Website",
    type: "Frontend + SEO",
    description: "High-performance business website with SSR, structured metadata, sitemap config and performance optimization for maximum search visibility.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=85",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "SEO"],
    year: "2024",
  },
  {
    id: "03",
    title: "E-Commerce Platform",
    type: "Full Stack",
    description: "Scalable e-commerce with product catalog, cart system, authentication and Stripe payments. Optimized RESTful APIs for order and payment processing.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=85",
    stack: ["React.js", "Node.js", "Express.js", "Stripe", "MySQL"],
    year: "2024",
  },
  {
    id: "04",
    title: "Admin Dashboard",
    type: "Backend-Focused",
    description: "Role-based admin panel with dynamic permission management and reporting. Optimized MySQL schemas, secure JWT auth, modular REST APIs.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=85",
    stack: ["Next.js", "Node.js", "MySQL", "JWT Auth"],
    year: "2024",
  },
  {
    id: "05",
    title: "Portfolio Website",
    type: "SEO + Performance",
    description: "Personal portfolio with SSR, responsive layouts, image optimization and metadata management for fast loading and improved search rankings.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=85",
    stack: ["Next.js", "TypeScript", "GSAP", "Three.js"],
    year: "2025",
  },
];

/* ── Single project row ── */
function ProjectRow({
  project,
  index,
  isActive,
  onEnter,
  onLeave,
}: {
  project: typeof PROJECTS[0];
  index: number;
  isActive: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "expo.out",
          delay: index * 0.08,
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [index]);

  // Animate the bottom line on hover
  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;
    gsap.to(line, {
      scaleX: isActive ? 1 : 0,
      duration: 0.4,
      ease: "expo.out",
      transformOrigin: "left center",
    });
  }, [isActive]);

  return (
    <div
      ref={rowRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group relative cursor-pointer"
      style={{ opacity: 0 }}
    >
      {/* Top divider */}
      <div className="w-full h-[1px]" style={{ background: "rgba(0,255,65,0.08)" }} />

      <div className="flex items-center gap-4 md:gap-8 py-5 px-2 transition-all duration-300"
        style={{ background: isActive ? "rgba(0,255,65,0.025)" : "transparent" }}>

        {/* Number */}
        <span className="text-[11px] w-8 flex-shrink-0 tabular-nums"
          style={{ color: isActive ? "#00ff41" : "rgba(0,255,65,0.2)", fontFamily: "var(--font-mono)", transition: "color 0.3s" }}>
          {project.id}
        </span>

        {/* Title */}
        <h3 className="flex-1 font-bold tracking-[-0.02em] transition-all duration-300"
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.6rem)",
            color: isActive ? "#00ff41" : "rgba(232,255,232,0.85)",
            textShadow: isActive ? "0 0 30px rgba(0,255,65,0.3)" : "none",
          }}>
          {project.title}
        </h3>

        {/* Type badge — hide on small screens */}
        <span className="hidden sm:block text-[9px] tracking-[0.15em] uppercase px-2.5 py-1 flex-shrink-0 transition-all duration-300"
          style={{
            border: `1px solid ${isActive ? "rgba(0,255,65,0.3)" : "rgba(0,255,65,0.1)"}`,
            color: isActive ? "#00ff41" : "rgba(0,255,65,0.3)",
            fontFamily: "var(--font-mono)",
            background: isActive ? "rgba(0,255,65,0.05)" : "transparent",
          }}>
          {project.type}
        </span>

        {/* Tech stack — only on large screens */}
        <div className="hidden lg:flex items-center gap-1.5 flex-shrink-0">
          {project.stack.slice(0, 3).map(t => (
            <span key={t} className="text-[8px] tracking-[0.06em] uppercase px-2 py-0.5 transition-colors duration-300"
              style={{
                color: isActive ? "rgba(0,255,65,0.7)" : "rgba(0,255,65,0.18)",
                fontFamily: "var(--font-mono)",
                border: `1px solid ${isActive ? "rgba(0,255,65,0.2)" : "rgba(0,255,65,0.06)"}`,
              }}>
              {t}
            </span>
          ))}
        </div>

        {/* Year */}
        <span className="hidden md:block text-[10px] flex-shrink-0 tabular-nums"
          style={{ color: isActive ? "rgba(0,255,65,0.5)" : "rgba(0,255,65,0.15)", fontFamily: "var(--font-mono)", transition: "color 0.3s" }}>
          {project.year}
        </span>

        {/* Arrow */}
        <motion.span
          animate={{ x: isActive ? 0 : -6, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-[14px] flex-shrink-0"
          style={{ color: "#00ff41" }}
        >
          →
        </motion.span>
      </div>

      {/* Active line */}
      <div ref={lineRef} className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{ background: "linear-gradient(90deg, #00ff41, rgba(0,255,65,0.2))", transform: "scaleX(0)", transformOrigin: "left" }} />
    </div>
  );
}

/* ── Main component ── */
export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef   = useRef<HTMLDivElement>(null);
  const imgRef     = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [displayIdx, setDisplayIdx] = useState(0);

  useEffect(() => {
    if (activeIdx !== null) setDisplayIdx(activeIdx);
  }, [activeIdx]);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      // Stagger header elements
      const items = el.querySelectorAll(".proj-header-item");
      gsap.fromTo(items,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  // Image parallax on hover
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    gsap.to(img, {
      scale: activeIdx !== null ? 1.05 : 1,
      duration: 0.8,
      ease: "expo.out",
    });
  }, [activeIdx]);

  const activeProject = PROJECTS[displayIdx];

  return (
    <section ref={sectionRef} id="projects" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "linear-gradient(rgba(0,255,65,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.3) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
      }} />
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 50% 60% at 80% 50%, rgba(0,255,65,0.04) 0%, transparent 70%)",
      }} />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <div ref={titleRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="proj-header-item section-accent" style={{ opacity: 0 }}>SELECTED WORK</p>
            <h2 className="proj-header-item text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.03em] text-gradient"
              style={{ opacity: 0 }}>PROJECTS</h2>
          </div>
          <p className="proj-header-item text-[11px] max-w-xs"
            style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)", opacity: 0 }}>
            // 5 production-grade projects — hover to explore each one
          </p>
        </div>

        {/* Main layout: list left, preview right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_400px] gap-8 items-start">

          {/* Project list */}
          <div>
            {PROJECTS.map((p, i) => (
              <ProjectRow
                key={p.id}
                project={p}
                index={i}
                isActive={activeIdx === i}
                onEnter={() => setActiveIdx(i)}
                onLeave={() => setActiveIdx(null)}
              />
            ))}
            {/* Bottom divider */}
            <div className="w-full h-[1px]" style={{ background: "rgba(0,255,65,0.08)" }} />

            {/* Description strip — appears below list on hover */}
            <AnimatePresence mode="wait">
              {activeIdx !== null && (
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-5 px-2"
                >
                  <p className="text-[11px] leading-relaxed mb-3"
                    style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)", maxWidth: "540px" }}>
                    <span style={{ color: "#00ff41" }}>//</span> {PROJECTS[activeIdx].description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {PROJECTS[activeIdx].stack.map(t => (
                      <span key={t} className="text-[8px] tracking-[0.08em] uppercase px-2.5 py-1"
                        style={{ color: "#00ff41", fontFamily: "var(--font-mono)", border: "1px solid rgba(0,255,65,0.2)", background: "rgba(0,255,65,0.04)" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="inline-flex items-center gap-2 px-4 py-2 text-[10px] tracking-[0.08em] uppercase font-bold transition-all duration-200 hover:bg-[#00cc33]"
                      style={{ background: "#00ff41", color: "#050505", fontFamily: "var(--font-mono)", border: "none", cursor: "pointer" }}>
                      View Project →
                    </button>
                    <button className="inline-flex items-center gap-2 px-4 py-2 text-[10px] tracking-[0.08em] uppercase transition-all duration-200 cursor-pointer"
                      style={{ border: "1px solid rgba(0,255,65,0.2)", color: "rgba(0,255,65,0.5)", fontFamily: "var(--font-mono)", background: "transparent" }}>
                      Source Code
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Image preview — sticky on desktop */}
          <div className="hidden lg:block sticky top-24">
            <div className="relative overflow-hidden" style={{ aspectRatio: "4/3", border: "1px solid rgba(0,255,65,0.1)" }}>
              {/* Image */}
              <div
                ref={imgRef}
                className="absolute inset-0 bg-cover bg-center transition-none"
                style={{
                  backgroundImage: `url('${activeProject.image}')`,
                  filter: "brightness(0.55) saturate(0.3)",
                }}
              />

              {/* Green overlay */}
              <div className="absolute inset-0" style={{
                background: "linear-gradient(to top, rgba(5,5,5,0.85) 0%, rgba(5,5,5,0.3) 60%, transparent 100%)",
              }} />

              {/* Active tint on hover */}
              <AnimatePresence>
                {activeIdx !== null && (
                  <motion.div
                    key="tint"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0"
                    style={{ background: "rgba(0,255,65,0.06)", mixBlendMode: "screen" }}
                  />
                )}
              </AnimatePresence>

              {/* Corner brackets */}
              <div className="absolute top-3 left-3 w-5 h-5 border-t border-l" style={{ borderColor: "rgba(0,255,65,0.3)" }} />
              <div className="absolute top-3 right-3 w-5 h-5 border-t border-r" style={{ borderColor: "rgba(0,255,65,0.3)" }} />
              <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l" style={{ borderColor: "rgba(0,255,65,0.3)" }} />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r" style={{ borderColor: "rgba(0,255,65,0.3)" }} />

              {/* Image number + codename */}
              <div className="absolute bottom-4 left-4 right-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={displayIdx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-[9px] tracking-[0.2em] uppercase mb-1"
                      style={{ color: "rgba(0,255,65,0.4)", fontFamily: "var(--font-mono)" }}>
                      [{activeProject.id}] — {activeProject.type}
                    </p>
                    <p className="text-[15px] font-bold tracking-[-0.01em]"
                      style={{ color: "#e8ffe8" }}>
                      {activeProject.title}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Scanline */}
              <div className="absolute left-0 right-0 h-[1px] pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(0,255,65,0.2), transparent)",
                  top: `${(displayIdx / (PROJECTS.length - 1)) * 80 + 10}%`,
                  transition: "top 0.5s cubic-bezier(0.16,1,0.3,1)",
                }} />
            </div>

            {/* Index dots */}
            <div className="flex items-center justify-center gap-2 mt-3">
              {PROJECTS.map((_, i) => (
                <div key={i} className="transition-all duration-300 rounded-full"
                  style={{
                    width: displayIdx === i ? "16px" : "4px",
                    height: "3px",
                    background: displayIdx === i ? "#00ff41" : "rgba(0,255,65,0.2)",
                    boxShadow: displayIdx === i ? "0 0 6px rgba(0,255,65,0.4)" : "none",
                  }} />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: compact card grid for < lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 lg:hidden">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="relative overflow-hidden group"
              style={{ aspectRatio: "16/9", border: "1px solid rgba(0,255,65,0.1)" }}
            >
              <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                style={{ backgroundImage: `url('${p.image}')`, filter: "brightness(0.4) saturate(0.2)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,5,5,0.95) 0%, transparent 60%)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-[7px] tracking-[0.15em] uppercase mb-0.5" style={{ color: "rgba(0,255,65,0.4)", fontFamily: "var(--font-mono)" }}>[{p.id}]</p>
                <h3 className="text-[13px] font-bold leading-tight">{p.title}</h3>
                <p className="text-[9px] mt-1" style={{ color: "rgba(0,255,65,0.4)", fontFamily: "var(--font-mono)" }}>{p.type}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
