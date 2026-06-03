"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Canvas glitch renderer ── */
function GlitchCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef  = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = canvas.width  = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;

    const HEX = "0123456789ABCDEF";
    const CHARS = "01アイウエオカキクケコ@#$%&!?/\\<>[]{}";
    const COL_W = 18;
    const cols  = Math.ceil(W / COL_W);

    /* Each column: y position, speed, char, opacity */
    const streams = Array.from({ length: cols }, (_, i) => ({
      x: i * COL_W,
      y: Math.random() * -H,
      speed: 0.8 + Math.random() * 2.5,
      char: CHARS[Math.floor(Math.random() * CHARS.length)],
      opacity: 0.05 + Math.random() * 0.18,
      tail: 4 + Math.floor(Math.random() * 12),
      bright: Math.random() > 0.85,   // occasional bright lead char
    }));

    /* Random horizontal glitch slices */
    let glitchTimer = 0;
    const glitches: Array<{ y: number; h: number; dx: number; life: number }> = [];

    const spawnGlitch = () => {
      glitches.push({
        y: Math.random() * H,
        h: 1 + Math.random() * 8,
        dx: (Math.random() - 0.5) * 30,
        life: 2 + Math.random() * 6,
      });
    };

    const draw = () => {
      /* Dim the canvas slightly each frame — creates trails */
      ctx.fillStyle = "rgba(5, 5, 5, 0.12)";
      ctx.fillRect(0, 0, W, H);

      ctx.font = `${COL_W - 2}px monospace`;

      streams.forEach((s) => {
        /* Randomly mutate chars */
        if (Math.random() > 0.9) {
          s.char = CHARS[Math.floor(Math.random() * CHARS.length)];
        }

        /* Draw trail */
        for (let t = 0; t < s.tail; t++) {
          const alpha = (s.tail - t) / s.tail * s.opacity * 0.5;
          ctx.fillStyle = `rgba(0,255,65,${alpha})`;
          ctx.fillText(
            CHARS[Math.floor(Math.random() * CHARS.length)],
            s.x, s.y - t * COL_W,
          );
        }

        /* Draw lead char */
        if (s.bright) {
          ctx.fillStyle = `rgba(180,255,190,${s.opacity * 3})`;
        } else {
          ctx.fillStyle = `rgba(0,255,65,${s.opacity * 2.2})`;
        }
        ctx.fillText(s.char, s.x, s.y);

        s.y += s.speed;
        if (s.y > H + s.tail * COL_W) {
          s.y = Math.random() * -80;
          s.speed = 0.8 + Math.random() * 2.5;
          s.opacity = 0.05 + Math.random() * 0.18;
          s.bright = Math.random() > 0.85;
        }
      });

      /* Glitch slices */
      glitchTimer++;
      if (glitchTimer % 40 === 0) spawnGlitch();

      glitches.forEach((g, i) => {
        const imgData = ctx.getImageData(0, g.y, W, g.h);
        ctx.putImageData(imgData, g.dx, g.y);
        /* Color aberration on glitch */
        const rd = ctx.getImageData(0, g.y, W, g.h);
        ctx.putImageData(rd, g.dx + 2, g.y);
        g.life -= 0.4;
        if (g.life <= 0) glitches.splice(i, 1);
      });

      frameRef.current = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.75 }}
      aria-hidden
    />
  );
}

/* ── Glitch text animation ── */
const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%!?";

function useScramble(target: string, ref: React.RefObject<HTMLSpanElement | null>, trigger: boolean) {
  useEffect(() => {
    if (!trigger || !ref.current) return;
    const el = ref.current;
    let frame = 0;
    const total = 30;
    const id = setInterval(() => {
      const p = frame / total;
      const revealed = Math.floor(p * target.length);
      el.textContent = target.split("").map((ch, i) => {
        if (ch === " ") return " ";
        if (i < revealed) return ch;
        return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
      }).join("");
      frame++;
      if (frame > total) { el.textContent = target; clearInterval(id); }
    }, 40);
    return () => clearInterval(id);
  }, [trigger, target, ref]);
}

export default function GlitchBanner() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const line1Ref   = useRef<HTMLSpanElement>(null);
  const line2Ref   = useRef<HTMLSpanElement>(null);
  const line3Ref   = useRef<HTMLSpanElement>(null);

  const triggered = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Slide up the overlay content
      gsap.fromTo(".glitch-content",
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "expo.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none",
            onEnter: () => {
              if (triggered.current) return;
              triggered.current = true;
              // Scramble the three lines sequentially
              const texts = [
                { el: line1Ref.current, text: "FULL STACK DEVELOPER" },
                { el: line2Ref.current, text: "BUILDING THE FUTURE" },
                { el: line3Ref.current, text: "ONE COMMIT AT A TIME" },
              ];
              texts.forEach(({ el, text }, i) => {
                if (!el) return;
                setTimeout(() => {
                  let f = 0;
                  const total = 28;
                  const id2 = setInterval(() => {
                    const p = f / total;
                    const rev = Math.floor(p * text.length);
                    el.textContent = text.split("").map((ch, ci) => {
                      if (ch === " ") return " ";
                      if (ci < rev) return ch;
                      return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
                    }).join("");
                    f++;
                    if (f > total) { el.textContent = text; clearInterval(id2); }
                  }, 40);
                }, i * 500);
              });
            },
          },
        }
      );

      // Line draw
      gsap.fromTo(".glitch-line",
        { scaleX: 0, transformOrigin: "left" },
        {
          scaleX: 1, duration: 1.4, ease: "expo.out",
          scrollTrigger: { trigger: section, start: "top 70%", toggleActions: "play none none none" },
        }
      );

      // Stats pop in
      gsap.fromTo(".glitch-stat",
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "expo.out",
          scrollTrigger: { trigger: section, start: "top 65%", toggleActions: "play none none none" },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ height: "420px" }}
    >
      {/* Canvas glitch background */}
      <GlitchCanvas />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(to bottom, rgba(5,5,5,0.5) 0%, rgba(5,5,5,0.25) 50%, rgba(5,5,5,0.6) 100%)",
      }} />

      {/* Scanlines overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
      }} />

      {/* Content */}
      <div className="glitch-content absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10 opacity-0">
        {/* Top accent */}
        <p className="text-[9px] tracking-[0.4em] uppercase mb-5" style={{ color: "rgba(0,255,65,0.5)", fontFamily: "var(--font-mono)" }}>
          ⬡ SYSTEM ONLINE ⬡
        </p>

        {/* Main scramble text */}
        <div className="mb-4">
          <p className="text-[clamp(1rem,2.5vw,1.3rem)] font-bold tracking-[0.15em] uppercase"
            style={{ color: "rgba(0,255,65,0.4)", fontFamily: "var(--font-mono)" }}>
            <span ref={line1Ref}>FULL STACK DEVELOPER</span>
          </p>
        </div>

        <h2 className="text-[clamp(2.8rem,8vw,7rem)] font-bold tracking-[-0.04em] leading-[0.92] mb-3"
          style={{ fontFamily: "var(--font-display)" }}>
          <span ref={line2Ref} className="text-gradient" style={{ display: "block" }}>BUILDING THE FUTURE</span>
        </h2>

        <p className="text-[clamp(0.9rem,2vw,1.1rem)] font-bold tracking-[0.12em] uppercase mb-8"
          style={{ color: "rgba(0,255,65,0.35)", fontFamily: "var(--font-mono)" }}>
          <span ref={line3Ref}>ONE COMMIT AT A TIME</span>
        </p>

        {/* Divider line */}
        <div className="glitch-line w-48 h-[1px] mb-8" style={{ background: "linear-gradient(90deg, transparent, #00ff41, transparent)" }} />

        {/* Stat pills */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            "React.js", "Next.js", "Node.js", "TypeScript", "MySQL",
          ].map((tag, i) => (
            <motion.span
              key={tag}
              className="glitch-stat opacity-0 px-4 py-1.5 text-[9px] tracking-[0.15em] uppercase"
              style={{
                border: "1px solid rgba(0,255,65,0.2)",
                background: "rgba(0,255,65,0.04)",
                color: "rgba(0,255,65,0.6)",
                fontFamily: "var(--font-mono)",
                backdropFilter: "blur(8px)",
              }}
              whileHover={{ borderColor: "#00ff41", color: "#00ff41", scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Side glitch accent bars */}
      <motion.div
        animate={{ opacity: [0, 1, 0, 1, 0] }}
        transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 3 }}
        className="absolute top-[30%] left-0 w-2 h-8 pointer-events-none"
        style={{ background: "#00ff41" }}
      />
      <motion.div
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 4.5 }}
        className="absolute top-[55%] right-0 w-2 h-5 pointer-events-none"
        style={{ background: "#00ff41" }}
      />
    </section>
  );
}
