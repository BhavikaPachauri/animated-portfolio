"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const codeLines = [
  '$ whoami',
  '> creative_developer',
  '',
  '$ cat skills.json',
  '{',
  '  "frontend": ["React", "Next.js"],',
  '  "backend": ["Node.js"],',
  '  "database": ["MySQL"],',
  '}',
  '',
  '$ uptime',
  '> 5+ years building digital experiences',
  '',
  '$ cat philosophy.txt',
  '> "Code is poetry. The terminal is my canvas."',
  '> "I don\'t just build apps — I engineer experiences."',
  '',
  '$ neofetch',
  '  ╔══════════════════════════╗',
  '  ║  OS: Creative Dev v5.0  ║',
  '  ║  Host: The Internet     ║',
  '  ║  Shell: zsh + tmux      ║',
  '  ║  Editor: Neovim         ║',
  '  ║  Theme: Dark Mode Only  ║',
  '  ╚══════════════════════════╝',
];

export default function TerminalSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const linesEl = linesRef.current;
    if (!container || !linesEl) return;

    const lines = linesEl.querySelectorAll<HTMLElement>(".terminal-line");

    const ctx = gsap.context(() => {
      // Reveal each line sequentially on scroll
      lines.forEach((line, i) => {
        gsap.fromTo(
          line,
          { opacity: 0, x: -20, filter: "blur(4px)" },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.3,
            scrollTrigger: {
              trigger: container,
              start: `top+=${i * 20} 70%`,
              end: `top+=${i * 20 + 40} 50%`,
              scrub: 1,
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });

      // Scanline effect
      const scanline = container.querySelector(".scanline");
      if (scanline) {
        gsap.to(scanline, {
          y: "100%",
          duration: 4,
          repeat: -1,
          ease: "none",
        });
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="section-padding relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(0,255,65,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.3) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      <div className="max-w-[900px] mx-auto relative z-10">
        <div className="rounded-xl overflow-hidden border border-[rgba(0,255,65,0.15)]" style={{ background: "rgba(0,10,0,0.8)", backdropFilter: "blur(20px)" }}>
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[rgba(0,255,65,0.1)]" style={{ background: "rgba(0,255,65,0.03)" }}>
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-[11px] tracking-[0.1em] text-[rgba(0,255,65,0.5)]" style={{ fontFamily: "var(--font-mono)" }}>
              hacker@portfolio:~/about
            </span>
          </div>

          {/* Terminal body */}
          <div ref={linesRef} className="p-6 md:p-8 relative min-h-[400px]">
            {/* Scanline */}
            <div className="scanline absolute left-0 right-0 h-[2px] bg-[rgba(0,255,65,0.05)] pointer-events-none z-10" style={{ top: 0 }} />

            {codeLines.map((line, i) => (
              <div
                key={i}
                className="terminal-line opacity-0"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  lineHeight: "2",
                  color: line.startsWith("$")
                    ? "#00ff41"
                    : line.startsWith(">")
                    ? "#c4a1ff"
                    : line.includes('"') && !line.startsWith('>')
                    ? "#7dd3fc"
                    : line.startsWith("  ║") || line.startsWith("  ╔") || line.startsWith("  ╚")
                    ? "#00ff41"
                    : "rgba(0,255,65,0.6)",
                  whiteSpace: "pre",
                }}
              >
                {line || "\u00A0"}
              </div>
            ))}

            {/* Blinking cursor */}
            <span className="inline-block w-[8px] h-[16px] bg-[#00ff41] animate-pulse ml-1" />
          </div>
        </div>
      </div>
    </section>
  );
}
