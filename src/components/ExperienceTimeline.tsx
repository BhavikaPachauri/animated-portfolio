"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES = [
  {
    id: "01",
    role: "Full Stack Developer",
    company: "Plus IN Distribution Pvt Ltd",
    location: "Gurugram",
    period: "Aug 2025 — Present",
    type: "CURRENT",
    highlights: [
      "Building scalable full-stack apps for distribution management",
      "Leading frontend architecture with React.js and TypeScript",
      "Designing RESTful APIs and optimized database schemas",
      "Delivering production-grade features cross-functionally",
    ],
    stack: ["React.js", "TypeScript", "Node.js", "MySQL"],
  },
  {
    id: "02",
    role: "Full Stack Developer",
    company: "Technosters Pvt Ltd",
    location: "Agra",
    period: "Sep 2024 — Jul 2025",
    type: "FULL-TIME",
    highlights: [
      "Developed responsive UIs with React.js and Material UI",
      "Built Node.js + Express.js backend services",
      "Integrated REST APIs with seamless frontend flows",
      "Reduced API response time by ~40% through optimization",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MySQL", "Material UI"],
  },
  {
    id: "03",
    role: "Full Stack Developer Intern",
    company: "Technosters Technologies Pvt Ltd",
    location: "Agra",
    period: "Feb 2024 — Aug 2024",
    type: "INTERNSHIP",
    highlights: [
      "Contributed to full-stack features across client projects",
      "Built reusable React.js UI component libraries",
      "Worked on School ERP with dynamic forms & REST APIs",
      "Gained hands-on agile development experience",
    ],
    stack: ["React.js", "JavaScript", "Node.js", "MySQL"],
  },
  {
    id: "04",
    role: "Open Source Contributor",
    company: "GirlScript Summer of Code (GSSoC)",
    location: "Remote",
    period: "Oct 2024 — Nov 2024",
    type: "OPEN SOURCE",
    highlights: [
      "Contributed bug fixes to open source repositories",
      "Collaborated with global developer community on GitHub",
      "Reviewed and merged PRs following CI/CD best practices",
    ],
    stack: ["JavaScript", "React.js", "GitHub"],
  },
];

function ExpCard({ exp, index }: { exp: typeof EXPERIENCES[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { x: isEven ? -60 : 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" } }
      );
    }, el);
    return () => ctx.revert();
  }, [isEven]);

  return (
    <div ref={cardRef} className={`relative flex items-start mb-10 ${isEven ? "flex-row" : "flex-row-reverse"}`}>
      {/* Card */}
      <div className={`w-[calc(50%-28px)] ${isEven ? "pr-8" : "pl-8"}`}>
        <motion.div whileHover={{ scale: 1.015 }} transition={{ duration: 0.4 }} className="exp-card group">
          <div className={`flex items-start justify-between gap-3 mb-4 ${isEven ? "" : "flex-row-reverse"}`}>
            <div className={isEven ? "" : "text-right"}>
              <span className="inline-block px-2 py-[3px] text-[8px] tracking-[0.15em] uppercase mb-2"
                style={{ background: "rgba(0,255,65,0.08)", color: "#00ff41", fontFamily: "var(--font-mono)", border: "1px solid rgba(0,255,65,0.2)" }}>
                {exp.type}
              </span>
              <h3 className="text-[15px] font-bold">{exp.role}</h3>
              <p className="text-[12px] mt-0.5" style={{ color: "#00ff41" }}>{exp.company}</p>
              <p className="text-[10px] mt-0.5" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
                {exp.location} · {exp.period}
              </p>
            </div>
            <span className="text-[26px] font-light opacity-10 leading-none" style={{ color: "#00ff41", fontFamily: "var(--font-mono)" }}>{exp.id}</span>
          </div>
          <ul className={`space-y-1 mb-4 ${isEven ? "" : "text-right"}`}>
            {exp.highlights.map((h, i) => (
              <li key={i} className={`text-[11px] leading-relaxed flex items-start gap-2 ${isEven ? "" : "flex-row-reverse"}`}
                style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)" }}>
                <span style={{ color: "#00ff41", flexShrink: 0, marginTop: "2px" }}>›</span>{h}
              </li>
            ))}
          </ul>
          <div className={`flex flex-wrap gap-1.5 ${isEven ? "" : "justify-end"}`}>
            {exp.stack.map(t => (
              <span key={t} className="text-[8px] tracking-[0.08em] uppercase px-2 py-1"
                style={{ border: "1px solid rgba(0,255,65,0.15)", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>{t}</span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Center node */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 top-5">
        <motion.div
          initial={{ scale: 0 }} whileInView={{ scale: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true }}
          className="w-3 h-3 rounded-full relative"
          style={{ background: "#00ff41", boxShadow: "0 0 16px rgba(0,255,65,0.5)" }}>
          <div className="absolute inset-0 rounded-full animate-ping opacity-25" style={{ background: "#00ff41" }} />
        </motion.div>
      </div>

      <div className="w-[calc(50%-28px)]" />
    </div>
  );
}

export default function ExperienceTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!section || !line) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(line,
        { scaleY: 0, transformOrigin: "top center" },
        { scaleY: 1, duration: 2, ease: "none",
          scrollTrigger: { trigger: section, start: "top 70%", end: "bottom 30%", scrub: 1 } }
      );
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "linear-gradient(rgbQ  a(0,255,65,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.4) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
      }} />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="section-accent" style={{ justifyContent: "center" }}>
            <span className="w-5 h-[1px] inline-block mr-3" style={{ background: "linear-gradient(90deg, transparent, #00ff41)" }} />
            CAREER PATH
            <span className="w-5 h-[1px] inline-block ml-3" style={{ background: "linear-gradient(90deg, #00ff41, transparent)" }} />
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.03em] text-gradient">EXPERIENCE</h2>
          <p className="mt-3 text-[12px]" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)" }}>
            A journey through code, clients, and continuous growth
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div ref={lineRef} className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[3px]"
            style={{ background: "linear-gradient(180deg, transparent, rgba(0, 255, 64, 0.57) 20%, rgba(0, 255, 64, 0.49) 80%, transparent)" }} />
          {EXPERIENCES.map((exp, i) => <ExpCard key={exp.id} exp={exp} index={i} />)}
        </div>

        {/* Education + Certs */}
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true }}
          className="mt-16 pt-12 border-t" style={{ borderColor: "rgba(0,255,65,0.06)" }}>
          <p className="section-accent">EDUCATION</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {[
              { degree: "B.Sc. Computer Science", inst: "Dayalbagh Educational Institution, Agra", period: "2021 — 2024", score: "86.3%" },
              { degree: "XII (PCM)", inst: "Prem Vidhyalay Girl's Intermediate College, Agra", period: "2020 — 2021", score: "93.3%" },
            ].map(e => (
              <motion.div key={e.degree} whileHover={{ scale: 1.015 }} className="exp-card">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-[14px] font-bold">{e.degree}</h3>
                    <p className="text-[11px] mt-1" style={{ color: "#00ff41" }}>{e.inst}</p>
                    <p className="text-[10px] mt-1" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>{e.period}</p>
                  </div>
                  <span className="text-[20px] font-bold text-gradient" style={{ fontFamily: "var(--font-mono)", whiteSpace: "nowrap" }}>{e.score}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="section-accent mt-8">CERTIFICATIONS</p>
          <div className="flex flex-wrap gap-3 mt-5">
            {[{ name: "SQL Advanced", issuer: "HackerRank", year: "2024" }, { name: "JavaScript Basics", issuer: "HackerRank", year: "2024" }].map(c => (
              <div key={c.name} className="flex items-center gap-3 px-4 py-3"
                style={{ border: "1px solid rgba(0,255,65,0.1)", background: "rgba(0,255,65,0.02)" }}>
                <span style={{ color: "#00ff41", fontSize: "14px" }}>✓</span>
                <div>
                  <p className="text-[12px] font-semibold">{c.name}</p>
                  <p className="text-[9px]" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>{c.issuer} · {c.year}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
