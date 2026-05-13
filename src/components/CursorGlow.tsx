"use client";

import { useMousePosition } from "@/hooks/useMousePosition";
import { motion } from "framer-motion";

export default function CursorGlow() {
  const { x, y } = useMousePosition();

  return (
    <>
      {/* Main glow */}
      <motion.div className="hidden md:block fixed w-[350px] h-[350px] rounded-full pointer-events-none z-[1]"
        animate={{ x: x - 175, y: y - 175 }}
        transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.5 }}
        style={{ background: "radial-gradient(circle, rgba(0,255,65,0.04) 0%, transparent 70%)" }} />
      {/* Small dot */}
      <motion.div className="hidden md:block fixed w-[6px] h-[6px] rounded-full pointer-events-none z-[9998]"
        animate={{ x: x - 3, y: y - 3 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        style={{ background: "#00ff41", boxShadow: "0 0 10px rgba(0,255,65,0.5)" }} />
    </>
  );
}
