"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SKILLS_BARS = [
  { name: "React.js / Next.js",       level: 92 },
  { name: "JavaScript / TypeScript",  level: 88 },
  { name: "Node.js / Express.js",     level: 85 },
  { name: "HTML5 / CSS3 / Tailwind",  level: 90 },
  { name: "Python / Django",          level: 76 },
  { name: "MySQL / Databases",        level: 82 },
];

function SkillBar({ name, level, index }: { name: string; level: number; index: number }) {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const inner = bar.querySelector<HTMLElement>(".skill-bar-fill");
    if (!inner) return;
    gsap.fromTo(inner, { width: "0%" }, {
      width: `${level}%`, duration: 1.4, ease: "expo.out",
      scrollTrigger: { trigger: bar, start: "top 88%", toggleActions: "play none none none" },
    });
  }, [level]);

  return (
    <motion.div ref={barRef}
      initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[11px]" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)" }}>{name}</span>
        <span className="text-[10px]" style={{ color: "#00ff41", fontFamily: "var(--font-mono)" }}>{level}%</span>
      </div>
      <div className="h-[1px] rounded-full overflow-hidden" style={{ background: "rgba(0,255,65,0.08)" }}>
        <div className="skill-bar-fill h-full" style={{ background: "#00ff41", width: "0%", boxShadow: "0 0 8px rgba(0,255,65,0.5)" }} />
      </div>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: "linear-gradient(rgba(0,255,65,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.3) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
      }} />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true }} className="mb-12">
          <p className="section-accent">ABOUT ME</p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.03em] text-gradient">WHO AM I</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 mb-16">
          {/* Terminal bio */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true }}>
            <div className="rounded overflow-hidden" style={{ border: "1px solid rgba(0,255,65,0.1)", background: "rgba(0,5,0,0.6)", backdropFilter: "blur(20px)" }}>
              <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ borderColor: "rgba(0,255,65,0.06)" }}>
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-2 text-[9px]" style={{ color: "rgba(0,255,65,0.35)", fontFamily: "var(--font-mono)" }}>bhavika@portfolio ~ about.sh</span>
              </div>
              <div className="p-6 text-[12px] leading-[2.2]" style={{ fontFamily: "var(--font-mono)" }}>
                <p style={{ color: "#00ff41" }}>$ whoami</p>
                <p style={{ color: "var(--color-text-secondary)" }}>Bhavika Pachauri — Full Stack Developer</p>
                <br />
                <p style={{ color: "#00ff41" }}>$ cat bio.txt</p>
                <p style={{ color: "var(--color-text-secondary)" }}>
                  Experienced Full Stack Developer with 1+ years of expertise building scalable web applications.
                  Proven track record in delivering responsive solutions, API integrations, and enhancing user engagement.
                </p>
                <br />
                <p style={{ color: "#00ff41" }}>$ cat contact.txt</p>
                <p style={{ color: "rgba(0,255,65,0.6)" }}>bhavikapachauri02@gmail.com</p>
                <p style={{ color: "rgba(0,255,65,0.6)" }}>+91 8449296898</p>
                <p style={{ color: "rgba(0,255,65,0.4)" }}>linkedin.com/in/bhavika-pachauri</p>
                <br />
                <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }}
                  className="inline-block w-[7px] h-[14px]" style={{ background: "#00ff41" }} />
              </div>
            </div>
          </motion.div>

          {/* Skill bars */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true }}
            className="flex flex-col justify-center">
            <p className="section-accent mb-6">PROFICIENCY</p>
            <div className="space-y-4">
              {SKILLS_BARS.map((s, i) => <SkillBar key={s.name} name={s.name} level={s.level} index={i} />)}
            </div>
            <div className="mt-8">
              <p className="text-[9px] tracking-[0.2em] uppercase mb-3" style={{ color: "rgba(0,255,65,0.35)", fontFamily: "var(--font-mono)" }}>TOOLS</p>
              <div className="flex flex-wrap gap-2">
                {["Git", "GitHub", "Postman", "VS Code", "Jira", "Slack"].map(t => (
                  <span key={t} className="skill-tag text-[10px] px-3 py-1" style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-muted)" }}>{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: "◈", title: "Clean Code",        desc: "Readable, maintainable, scalable code is not optional — it's a standard." },
            { icon: "◆", title: "User First",         desc: "Every feature, every interaction starts and ends with the user." },
            { icon: "▲", title: "Continuous Growth",  desc: "Technology evolves fast. I stay ahead by learning continuously." },
          ].map((item, i) => (
            <motion.div key={item.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1 }} viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="p-5" style={{ background: "rgba(0,255,65,0.02)", border: "1px solid rgba(0,255,65,0.07)" }}>
              <div className="text-lg mb-2" style={{ color: "#00ff41" }}>{item.icon}</div>
              <h3 className="text-[13px] font-semibold mb-1.5">{item.title}</h3>
              <p className="text-[11px] leading-relaxed" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)" }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
