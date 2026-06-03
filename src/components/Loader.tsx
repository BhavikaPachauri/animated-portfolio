"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_SEQUENCE = [
  { at: 0,   text: "INITIALIZING SYSTEM..." },
  { at: 18,  text: "LOADING PROJECTS..." },
  { at: 38,  text: "LOADING EXPERIENCE..." },
  { at: 58,  text: "LOADING SKILLS..." },
  { at: 78,  text: "ESTABLISHING CONNECTION..." },
  { at: 92,  text: "ACCESS GRANTED" },
];

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!?";

function scramble(el: HTMLSpanElement, finalText: string, duration = 500) {
  let frame = 0;
  const totalFrames = Math.round(duration / 16);
  const id = setInterval(() => {
    const progress = frame / totalFrames;
    const revealed = Math.floor(progress * finalText.length);
    el.textContent = finalText.split("").map((ch, i) => {
      if (ch === " ") return " ";
      if (i < revealed) return ch;
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    }).join("");
    frame++;
    if (frame > totalFrames) { el.textContent = finalText; clearInterval(id); }
  }, 16);
  return () => clearInterval(id);
}

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const statusRef = useRef<HTMLSpanElement>(null);
  const prevText = useRef("");

  useEffect(() => {
    const duration = 2600;
    const start = Date.now();
    const run = () => {
      const raw = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - raw, 3);
      const pct = Math.round(eased * 100);
      setProgress(pct);
      const cur = [...BOOT_SEQUENCE].reverse().find(s => pct >= s.at);
      if (cur && statusRef.current && cur.text !== prevText.current) {
        prevText.current = cur.text;
        scramble(statusRef.current, cur.text, 400);
      }
      if (raw < 1) requestAnimationFrame(run);
      else setTimeout(() => { setDone(true); setTimeout(onComplete, 800); }, 300);
    };
    requestAnimationFrame(run);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="loader-screen"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
        >
          {/* Grid */}
          <div className="absolute inset-0" style={{
            backgroundImage: "linear-gradient(rgba(0,255,65,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.04) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }} />
          {/* Radial */}
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(0,255,65,0.06) 0%, transparent 70%)",
          }} />
          <div className="scan-line" />

          {/* Corners */}
          {[["top-6 left-6", "border-t border-l"], ["top-6 right-6", "border-t border-r"], ["bottom-6 left-6", "border-b border-l"], ["bottom-6 right-6", "border-b border-r"]].map(([pos, b]) => (
            <div key={pos} className={`absolute ${pos} w-10 h-10 ${b}`} style={{ borderColor: "rgba(0,255,65,0.2)" }} />
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center relative z-10 flex flex-col items-center"
          >
            <p className="text-[10px] tracking-[0.4em] uppercase mb-2" style={{ color: "rgba(0,255,65,0.4)", fontFamily: "var(--font-mono)" }}>
              PORTFOLIO — v2.0
            </p>
            <h1 className="text-[clamp(1.6rem,4vw,2.6rem)] font-bold tracking-[-0.02em] mb-1 text-gradient" style={{ fontFamily: "var(--font-display)" }}>
              BHAVIKA PACHAURI
            </h1>
            <p className="text-[10px] tracking-[0.25em] uppercase mb-10" style={{ color: "rgba(0,255,65,0.4)", fontFamily: "var(--font-mono)" }}>
              FULL STACK DEVELOPER
            </p>

            <p className="text-[56px] font-light tabular-nums leading-none mb-2" style={{
              fontFamily: "var(--font-mono)", color: "#00ff41", textShadow: "0 0 30px rgba(0,255,65,0.4)",
            }}>
              {String(progress).padStart(3, "0")}<span className="text-[22px] opacity-40">%</span>
            </p>

            <p className="text-[10px] tracking-[0.15em] uppercase mb-8 h-4" style={{ color: "rgba(0,255,65,0.5)", fontFamily: "var(--font-mono)" }}>
              <span ref={statusRef}>INITIALIZING SYSTEM...</span>
            </p>

            <div className="loader-bar">
              <div className="loader-bar-inner" style={{ width: `${progress}%` }} />
            </div>

            <p className="mt-5 text-[9px] tracking-[0.15em]" style={{ color: "rgba(0,255,65,0.2)", fontFamily: "var(--font-mono)" }}>
              ENCRYPTED ∙ SECURE ∙ OPTIMIZED
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
