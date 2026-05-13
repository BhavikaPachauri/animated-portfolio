"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlitchText from "@/components/GlitchText";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 50, suffix: "+", label: "Deployments" },
  { value: 5, suffix: "+", label: "Years Active" },
  { value: 30, suffix: "+", label: "Clients" },
  { value: 99, suffix: "%", label: "Uptime" },
];

const skills = [
  { name: "React / Next.js", level: 95, icon: "⚛" },
  { name: "TypeScript", level: 90, icon: "TS" },
  { name: "Node.js / Rust", level: 85, icon: "⚙" },
  { name: "Three.js / WebGL", level: 80, icon: "◆" },
  { name: "GSAP / Motion", level: 92, icon: "◎" },
  { name: "DevOps / AWS", level: 85, icon: "☁" },
  { name: "Security / Crypto", level: 78, icon: "🔐" },
  { name: "System Design", level: 88, icon: "△" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;
        const duration = 2000;
        const startTime = Date.now();
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      },
    });
    return () => trigger.kill();
  }, [target]);

  return (
    <div ref={ref} className="stat-number" style={{ color: "#00ff41", fontFamily: "var(--font-mono)" }}>
      {count}{suffix}
    </div>
  );
}

function SkillBar({ name, level, icon, index }: { name: string; level: number; icon: string; index: number }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const inner = bar.querySelector<HTMLElement>(".skill-bar-fill");
    if (!inner) return;
    gsap.fromTo(inner, { width: "0%" }, {
      width: `${level}%`, duration: 1.2, ease: "expo.out",
      scrollTrigger: { trigger: bar, start: "top 90%", toggleActions: "play none none none" },
    });
  }, [level]);

  return (
    <div ref={barRef} className="group p-4 rounded-lg border border-[rgba(0,255,65,0.06)] hover:border-[rgba(0,255,65,0.2)] transition-all duration-300" style={{ background: "rgba(0,255,65,0.02)" }}>
      <div className="flex justify-between items-center mb-3">
        <span className="text-[13px] font-medium group-hover:text-[#00ff41] transition-colors duration-300" style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-secondary)" }}>
          <span className="mr-2 opacity-60">{icon}</span>{name}
        </span>
        <span className="text-[11px]" style={{ color: "#00ff41", fontFamily: "var(--font-mono)" }}>{level}%</span>
      </div>
      <div className="h-[2px] rounded-full bg-[rgba(0,255,65,0.08)] overflow-hidden">
        <div className="skill-bar-fill h-full rounded-full" style={{ background: "linear-gradient(90deg, #00ff41, #7dd3fc)", width: "0%" }} />
      </div>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      const items = section.querySelectorAll<HTMLElement>(".about-reveal");
      items.forEach((item, i) => {
        gsap.fromTo(item, { y: 60, opacity: 0, filter: "blur(4px)" }, {
          y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8,
          delay: i * 0.1, ease: "expo.out",
          scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play none none none" },
        });
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section-padding relative overflow-hidden">
      {/* Grid bg */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(0,255,65,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.3) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <div className="about-reveal mb-16">
          <p className="text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: "#00ff41", fontFamily: "var(--font-mono)" }}>
            $ cat ./about_me.md
          </p>
          <GlitchText text="WHO_AM_I" as="h2" className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-[-0.03em] leading-[1.1] text-[var(--color-text-primary)]" />
        </div>

        {/* Bio + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Terminal bio */}
          <div className="about-reveal">
            <div className="rounded-xl overflow-hidden border border-[rgba(0,255,65,0.12)]" style={{ background: "rgba(0,10,0,0.6)", backdropFilter: "blur(20px)" }}>
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[rgba(0,255,65,0.08)]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-2 text-[10px] text-[rgba(0,255,65,0.4)]" style={{ fontFamily: "var(--font-mono)" }}>about.sh</span>
              </div>
              <div className="p-6 md:p-8 text-[13px] leading-[2]" style={{ fontFamily: "var(--font-mono)" }}>
                <p style={{ color: "#00ff41" }}>$ echo $BIO</p>
                <p className="text-[var(--color-text-secondary)]">
                  Creative developer with 5+ years of experience building immersive web experiences. I live at the intersection of design and engineering.
                </p>
                <br />
                <p style={{ color: "#00ff41" }}>$ echo $PHILOSOPHY</p>
                <p className="text-[var(--color-text-secondary)]">
                  I believe code should be beautiful — both under the hood and on the screen. Every project is a chance to push boundaries.
                </p>
                <br />
                <p style={{ color: "#00ff41" }}>$ echo $STACK</p>
                <p style={{ color: "#7dd3fc" }}>
                  React · Next.js · TypeScript · Node.js · Three.js · GSAP · Rust · Docker · AWS · PostgreSQL
                </p>
                <br />
                <span className="inline-block w-[7px] h-[14px] bg-[#00ff41] animate-pulse" />
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div key={stat.label} className="about-reveal p-6 rounded-xl border border-[rgba(0,255,65,0.08)] flex flex-col justify-center items-center text-center"
                style={{ background: "rgba(0,255,65,0.02)", animationDelay: `${i * 0.1}s` }}>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <p className="text-[11px] tracking-[0.1em] uppercase mt-2" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills grid */}
        <div className="about-reveal mb-4">
          <p className="text-[11px] tracking-[0.3em] uppercase mb-8" style={{ color: "#00ff41", fontFamily: "var(--font-mono)" }}>
            $ ls -la ./skills/
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill, i) => (
            <div key={skill.name} className="about-reveal">
              <SkillBar name={skill.name} level={skill.level} icon={skill.icon} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
