"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative" style={{ borderTop: "1px solid rgba(0,255,65,0.06)" }}>
      <div className="section-padding py-10 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }} viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-5"
        >
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            <span className="text-[14px] font-semibold" style={{ fontFamily: "var(--font-mono)" }}>
              <span style={{ color: "#00ff41" }}>&gt;_</span>
              <span style={{ color: "rgba(0,255,65,0.4)" }} className="font-light ml-1">bhavika.dev</span>
            </span>
          </a>
          <p className="text-[10px] tracking-[0.05em] text-center" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
            © 2026 Bhavika Pachauri · Built with Next.js, GSAP &amp; Three.js
          </p>
          <motion.button whileHover={{ scale: 1.05, color: "#00ff41" }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-4 py-2 text-[10px] tracking-[0.1em] uppercase cursor-pointer bg-transparent transition-all duration-300"
            style={{ border: "1px solid rgba(0,255,65,0.1)", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
            BACK TO TOP ↑
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}
