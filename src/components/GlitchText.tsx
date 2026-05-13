"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export default function GlitchText({ text, className = "", as: Tag = "h2" }: GlitchTextProps) {
  const [glitchText, setGlitchText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const chars = "!@#$%^&*()_+-=[]{}|;:',.<>?/\\~`01";

  const startGlitch = () => {
    if (isGlitching) return;
    setIsGlitching(true);
    let iteration = 0;

    intervalRef.current = setInterval(() => {
      setGlitchText(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration) return text[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      iteration += 1 / 2;

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setGlitchText(text);
        setIsGlitching(false);
      }
    }, 30);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <motion.div
      onViewportEnter={() => startGlitch()}
      viewport={{ once: true, margin: "-100px" }}
    >
      <Tag
        className={`${className} cursor-pointer select-none`}
        onMouseEnter={startGlitch}
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {glitchText}
      </Tag>
    </motion.div>
  );
}
