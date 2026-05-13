"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          isScrolled ? "border-b border-[rgba(0,255,65,0.06)]" : ""
        }`}
        style={{ background: isScrolled ? "rgba(5,5,5,0.85)" : "transparent", backdropFilter: isScrolled ? "blur(20px)" : "none" }}
      >
        <nav className="flex items-center justify-between px-6 md:px-12 py-4 max-w-[1800px] mx-auto">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="relative z-[1001]">
            <span className="text-[16px] font-semibold tracking-[-0.01em]" style={{ fontFamily: "var(--font-mono)" }}>
              <span style={{ color: "#00ff41" }}>&gt;_</span>
              <span className="text-[var(--color-text-secondary)] font-light ml-1">hacker</span>
              <span className="text-[var(--color-text-muted)]">.dev</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button key={link.label} onClick={() => scrollTo(link.href)}
                className="text-[11px] tracking-[0.1em] uppercase bg-transparent border-none cursor-pointer transition-colors duration-300 hover:text-[#00ff41]"
                style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)" }}>
                /{link.label.toLowerCase()}
              </button>
            ))}
            <button onClick={() => scrollTo("#contact")}
              className="text-[11px] tracking-[0.05em] uppercase px-5 py-2 rounded border border-[rgba(0,255,65,0.3)] bg-[rgba(0,255,65,0.05)] hover:bg-[rgba(0,255,65,0.1)] hover:border-[#00ff41] transition-all duration-300 cursor-pointer"
              style={{ color: "#00ff41", fontFamily: "var(--font-mono)" }}>
              ./connect
            </button>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative z-[1001] w-10 h-10 flex flex-col items-center justify-center gap-[5px] bg-transparent border-none cursor-pointer"
            aria-label="Toggle menu">
            <motion.span animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="w-5 h-[1px] block" style={{ background: "#00ff41" }} transition={{ duration: 0.3 }} />
            <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-5 h-[1px] block" style={{ background: "#00ff41" }} transition={{ duration: 0.3 }} />
            <motion.span animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="w-5 h-[1px] block" style={{ background: "#00ff41" }} transition={{ duration: 0.3 }} />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-8"
            style={{ background: "rgba(5,5,5,0.95)", backdropFilter: "blur(20px)" }}>
            {/* Grid bg */}
            <div className="absolute inset-0 opacity-[0.04]" style={{
              backgroundImage: "linear-gradient(rgba(0,255,65,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }} />
            {navLinks.map((link, i) => (
              <motion.button key={link.label}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => scrollTo(link.href)}
                className="text-[28px] font-light tracking-[0.05em] bg-transparent border-none cursor-pointer"
                style={{ fontFamily: "var(--font-mono)", color: "#00ff41" }}>
                /{link.label.toLowerCase()}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
