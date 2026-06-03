"use client";

import { useMousePosition } from "@/hooks/useMousePosition";
import { motion } from "framer-motion";

export default function CursorGlow() {
  const { x, y } = useMousePosition();

  return (
    <>
      <motion.div className="hidden md:block fixed rounded-full pointer-events-none z-[1]"
        animate={{ x: x - 200, y: y - 200 }}
        transition={{ type: "spring", stiffness: 100, damping: 22, mass: 0.6 }}
        style={{ width: "400px", height: "400px", background: "radial-gradient(circle, rgba(0,255,65,0.05) 0%, transparent 70%)" }} />
      <motion.div className="hidden md:block fixed rounded-full pointer-events-none z-[9997]"
        animate={{ x: x - 16, y: y - 16 }}
        transition={{ type: "spring", stiffness: 250, damping: 25 }}
        style={{ width: "32px", height: "32px", border: "1px solid rgba(0,255,65,0.35)", mixBlendMode: "screen" }} />
      <motion.div className="hidden md:block fixed rounded-full pointer-events-none z-[9998]"
        animate={{ x: x - 3, y: y - 3 }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
        style={{ width: "6px", height: "6px", background: "#00ff41", boxShadow: "0 0 10px rgba(0,255,65,0.7)", mixBlendMode: "screen" }} />
    </>
  );
}
