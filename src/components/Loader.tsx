"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [statusText, setStatusText] = useState("Initializing...");

  useEffect(() => {
    const duration = 2200;
    const startTime = Date.now();
    const statuses = [
      { at: 0, text: "$ boot system..." },
      { at: 15, text: "$ loading modules..." },
      { at: 35, text: "$ compiling assets..." },
      { at: 55, text: "$ injecting animations..." },
      { at: 75, text: "$ establishing connection..." },
      { at: 90, text: "$ finalizing..." },
      { at: 100, text: "$ system.ready()" },
    ];

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - rawProgress, 3);
      const currentProgress = Math.round(easedProgress * 100);
      setProgress(currentProgress);

      const currentStatus = [...statuses].reverse().find((s) => currentProgress >= s.at);
      if (currentStatus) setStatusText(currentStatus.text);

      if (rawProgress < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setIsComplete(true);
          setTimeout(onComplete, 800);
        }, 300);
      }
    };

    requestAnimationFrame(animate);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div className="loader-screen" exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          {/* Grid bg */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: "linear-gradient(rgba(0,255,65,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }} />

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="text-center relative z-10">
            <p className="text-[11px] tracking-[0.15em] uppercase mb-3"
              style={{ color: "rgba(0,255,65,0.5)", fontFamily: "var(--font-mono)" }}>
              {statusText}
            </p>
            <p className="text-[56px] font-light tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-mono)", color: "#00ff41" }}>
              {progress}<span className="text-[24px] opacity-50">%</span>
            </p>
          </motion.div>

          <div className="loader-bar mt-6" style={{ background: "rgba(0,255,65,0.1)" }}>
            <div className="loader-bar-inner" style={{ width: `${progress}%`, background: "#00ff41" }} />
          </div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="mt-4 text-[10px] tracking-[0.1em]"
            style={{ color: "rgba(0,255,65,0.3)", fontFamily: "var(--font-mono)" }}>
            ENCRYPTED CONNECTION • SECURE TUNNEL
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
