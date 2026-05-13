"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlitchText from "@/components/GlitchText";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  description: string;
  image: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  codename: string;
}

const projects: Project[] = [
  {
    title: "Nebula Dashboard",
    codename: "PROJECT_NEBULA",
    description: "Real-time analytics dashboard with 3D data visualization and AI-powered insights for enterprise-level monitoring systems.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80",
    techStack: ["React", "Three.js", "D3.js", "Node.js"],
    liveUrl: "#", githubUrl: "#",
  },
  {
    title: "Aurora Commerce",
    codename: "PROJECT_AURORA",
    description: "Premium e-commerce platform with cinematic product reveals, AI personalization, and real-time inventory management.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80",
    techStack: ["Next.js", "Stripe", "Prisma", "Tailwind"],
    liveUrl: "#", githubUrl: "#",
  },
  {
    title: "Cipher Network",
    codename: "PROJECT_CIPHER",
    description: "End-to-end encrypted communication platform with zero-knowledge architecture and real-time WebRTC collaboration.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=900&q=80",
    techStack: ["Rust", "WebRTC", "PostgreSQL", "AWS"],
    liveUrl: "#", githubUrl: "#",
  },
  {
    title: "Synthwave Engine",
    codename: "PROJECT_SYNTH",
    description: "WebAudio-powered music production tool with real-time waveform visualization, collaborative mixing, and AI composition.",
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=900&q=80",
    techStack: ["TypeScript", "WebAudio", "Canvas", "Firebase"],
    liveUrl: "#", githubUrl: "#",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(card,
        { y: 120, opacity: 0, rotateX: 8 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" },
        }
      );
    }, card);
    return () => ctx.revert();
  }, [index]);

  return (
    <motion.div ref={cardRef} className="project-card group relative h-[500px] md:h-[600px] cursor-pointer border border-[rgba(0,255,65,0.06)] hover:border-[rgba(0,255,65,0.2)]"
      whileHover={{ scale: 1.02 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
        style={{ backgroundImage: `url('${project.image}')` }} />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,5,5,0.95)] via-[rgba(5,5,5,0.4)] to-[rgba(5,5,5,0.2)] opacity-80 group-hover:opacity-95 transition-opacity duration-500 z-[1]" />

      {/* Grid overlay on hover */}
      <div className="absolute inset-0 z-[2] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
        backgroundImage: "linear-gradient(rgba(0,255,65,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.03) 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }} />

      {/* Top label */}
      <div className="absolute top-5 left-5 z-[3] flex items-center gap-3">
        <span className="text-[10px] tracking-[0.15em] uppercase px-2 py-1 rounded border border-[rgba(0,255,65,0.2)]"
          style={{ color: "#00ff41", fontFamily: "var(--font-mono)", background: "rgba(0,255,65,0.05)" }}>
          [{String(index + 1).padStart(2, "0")}]
        </span>
        <span className="text-[10px] tracking-[0.1em]" style={{ color: "rgba(0,255,65,0.4)", fontFamily: "var(--font-mono)" }}>
          {project.codename}
        </span>
      </div>

      {/* Corner brackets */}
      <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-[rgba(0,255,65,0.15)] z-[3] opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-[rgba(0,255,65,0.15)] z-[3] opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-7 md:p-9 z-[3] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
        <h3 className="text-[26px] md:text-[32px] font-bold tracking-[-0.02em] mb-2 leading-tight" style={{ fontFamily: "var(--font-display)" }}>
          {project.title}
        </h3>
        <p className="text-[var(--color-text-secondary)] text-[13px] leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 max-w-md" style={{ fontFamily: "var(--font-mono)" }}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
          {project.techStack.map((tech) => (
            <span key={tech} className="text-[10px] tracking-[0.05em] uppercase px-3 py-[5px] rounded border border-[rgba(0,255,65,0.12)]"
              style={{ color: "#00ff41", fontFamily: "var(--font-mono)", background: "rgba(0,255,65,0.04)" }}>
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-[8px] rounded text-[11px] tracking-[0.05em] uppercase font-medium transition-all duration-300"
            style={{ background: "#00ff41", color: "#050505", fontFamily: "var(--font-mono)" }}>
            <span>./deploy</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-[8px] rounded border border-[rgba(0,255,65,0.2)] text-[11px] tracking-[0.05em] uppercase hover:border-[#00ff41] hover:text-[#00ff41] transition-all duration-300"
            style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)" }}>
            <span>./source</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="section-padding relative">
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "linear-gradient(rgba(0,255,65,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.3) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div ref={titleRef} className="mb-16">
          <p className="text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: "#00ff41", fontFamily: "var(--font-mono)" }}>
            $ ls -la ./projects/
          </p>
          <GlitchText text="DEPLOYED_WORK" as="h2" className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-[-0.03em] leading-[1.1] text-[var(--color-text-primary)]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
