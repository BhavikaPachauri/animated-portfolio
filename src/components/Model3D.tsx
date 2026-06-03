"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINES = [
  { prompt: "$", cmd: "npx create-next-app portfolio", delay: 0 },
  { prompt: ">", cmd: "npm install gsap three framer-motion", delay: 0.6 },
  { prompt: ">", cmd: "git commit -m 'ship it 🚀'", delay: 1.2 },
  { prompt: ">", cmd: "npm run build && npm run start", delay: 1.8 },
  { prompt: "✓", cmd: "Compiled successfully in 3.7s", delay: 2.4, success: true },
];

const STACK_COLS = [
  {
    heading: "FRONTEND",
    items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Material UI", "GSAP"],
  },
  {
    heading: "BACKEND",
    items: ["Node.js", "Express.js", "Python", "Django", "REST APIs", "JWT Auth"],
  },
  {
    heading: "DATABASE & TOOLS",
    items: ["MySQL", "Git / GitHub", "Postman", "VS Code", "Jira", "Slack"],
  },
];

function TerminalWindow() {
  const linesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = linesRef.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>(".t-line");
    const ctx = gsap.context(() => {
      gsap.fromTo(items,
        { opacity: 0, x: -12 },
        {
          opacity: 1, x: 0, stagger: 0.55, duration: 0.5, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div className="rounded overflow-hidden h-full"
      style={{ border: "1px solid rgba(0,255,65,0.12)", background: "rgba(0,5,0,0.65)", backdropFilter: "blur(16px)" }}>
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ borderColor: "rgba(0,255,65,0.07)" }}>
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[9px] tracking-[0.1em]"
          style={{ color: "rgba(0,255,65,0.3)", fontFamily: "var(--font-mono)" }}>
          bash — bhavika@portfolio
        </span>
        <span className="ml-auto text-[9px]" style={{ color: "rgba(0,255,65,0.2)", fontFamily: "var(--font-mono)" }}>zsh</span>
      </div>

      {/* Terminal body */}
      <div ref={linesRef} className="p-5 space-y-3">
        {LINES.map((line, i) => (
          <div key={i} className="t-line flex items-start gap-3 opacity-0">
            <span className="text-[11px] mt-[1px] flex-shrink-0"
              style={{
                color: line.success ? "#28c840" : "#00ff41",
                fontFamily: "var(--font-mono)",
                textShadow: "0 0 8px rgba(0,255,65,0.4)",
              }}>
              {line.prompt}
            </span>
            <span className="text-[11px] leading-relaxed"
              style={{
                color: line.success ? "rgba(40,200,64,0.7)" : "rgba(232,255,232,0.6)",
                fontFamily: "var(--font-mono)",
              }}>
              {line.cmd}
            </span>
          </div>
        ))}

        {/* Blinking cursor */}
        <div className="t-line flex items-center gap-3 opacity-0">
          <span className="text-[11px]" style={{ color: "#00ff41", fontFamily: "var(--font-mono)" }}>$</span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="inline-block w-[7px] h-[14px]"
            style={{ background: "#00ff41" }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Model3D() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(".m3d-heading",
        { y: 60, opacity: 0, skewY: 3 },
        {
          y: 0, opacity: 1, skewY: 0, duration: 1.1, ease: "expo.out",
          scrollTrigger: { trigger: section, start: "top 75%", toggleActions: "play none none none" },
        }
      );

      // Line draw
      gsap.fromTo(".m3d-line",
        { scaleX: 0, transformOrigin: "left" },
        {
          scaleX: 1, duration: 1.2, ease: "expo.out",
          scrollTrigger: { trigger: section, start: "top 70%", toggleActions: "play none none none" },
        }
      );

      // Stack cols stagger
      gsap.fromTo(".stack-col",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: "expo.out",
          scrollTrigger: { trigger: ".stack-row", start: "top 82%", toggleActions: "play none none none" },
        }
      );

      // Terminal slide in
      gsap.fromTo(".terminal-wrap",
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: section, start: "top 70%", toggleActions: "play none none none" },
        }
      );

      // Scan line
      const scan = section.querySelector<HTMLElement>(".m3d-scan");
      if (scan) gsap.to(scan, { y: "100%", duration: 4, repeat: -1, ease: "none" });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="model3d"
      className="section-padding relative overflow-hidden"
    >
      {/* BG grid */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: "linear-gradient(rgba(0,255,65,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.4) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
      }} />
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,255,65,0.04) 0%, transparent 70%)",
      }} />
      <div className="m3d-scan absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,65,0.15), transparent)" }} />

      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* ── Header ── */}
        <div className="mb-12">
          <p className="section-accent">DEVELOPER SETUP</p>
          <div className="m3d-heading opacity-0">
            <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-bold tracking-[-0.04em] leading-[1.0]"
              style={{ fontFamily: "var(--font-display)" }}>
              <span style={{ color: "#e8ffe8" }}>WHERE CODE</span><br />
              <span className="text-gradient">MEETS CRAFT</span>
            </h2>
          </div>
          <div className="m3d-line mt-6 h-[1px] w-full"
            style={{ background: "linear-gradient(90deg, #00ff41, rgba(0,255,65,0.15), transparent)" }} />
        </div>

        {/* ── Main 2-col layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Left — Stack columns */}
          <div>
            {/* Stack grid */}
            <div className="stack-row grid grid-cols-3 gap-4 mb-8">
              {STACK_COLS.map((col) => (
                <div key={col.heading} className="stack-col opacity-0">
                  <p className="text-[8px] tracking-[0.2em] uppercase mb-3 pb-2"
                    style={{ color: "#00ff41", fontFamily: "var(--font-mono)", borderBottom: "1px solid rgba(0,255,65,0.12)" }}>
                    {col.heading}
                  </p>
                  <ul className="space-y-2">
                    {col.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 group">
                        <span className="w-1 h-1 rounded-full flex-shrink-0 transition-all duration-300 group-hover:w-3"
                          style={{ background: "#00ff41", opacity: 0.5 }} />
                        <span className="text-[11px] transition-colors duration-300 group-hover:text-[#00ff41]"
                          style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)" }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { v: "1+",  l: "Years" },
                { v: "5",   l: "Projects" },
                { v: "3+",  l: "Companies" },
                { v: "99%", l: "Uptime" },
              ].map((s, i) => (
                <motion.div
                  key={s.l}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className="p-4 text-center"
                  style={{ border: "1px solid rgba(0,255,65,0.1)", background: "rgba(0,255,65,0.02)" }}
                >
                  <p className="text-[1.6rem] font-bold tabular-nums leading-none"
                    style={{ color: "#00ff41", fontFamily: "var(--font-mono)", textShadow: "0 0 16px rgba(0,255,65,0.3)" }}>
                    {s.v}
                  </p>
                  <p className="text-[8px] tracking-[0.12em] uppercase mt-1.5"
                    style={{ color: "rgba(0,255,65,0.3)", fontFamily: "var(--font-mono)" }}>
                    {s.l}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — Terminal */}
          <div className="terminal-wrap opacity-0" style={{ minHeight: "320px" }}>
            <TerminalWindow />
          </div>
        </div>

        {/* ── Bottom marquee strip ── */}
        <div className="mt-12 overflow-hidden border-t border-b py-4" style={{ borderColor: "rgba(0,255,65,0.06)" }}>
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 18, ease: "linear", repeat: Infinity }}
            className="flex gap-12 whitespace-nowrap"
          >
            {[...Array(2)].map((_, ri) =>
              ["React.js", "Next.js", "Node.js", "TypeScript", "MySQL", "Express.js", "Python", "Django", "Tailwind CSS", "Material UI", "Git", "REST APIs"].map((t) => (
                <span key={`${ri}-${t}`} className="text-[10px] tracking-[0.2em] uppercase"
                  style={{ color: "rgba(0,255,65,0.2)", fontFamily: "var(--font-mono)" }}>
                  {t} <span style={{ color: "rgba(0,255,65,0.1)", margin: "0 12px" }}>◆</span>
                </span>
              ))
            )}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
