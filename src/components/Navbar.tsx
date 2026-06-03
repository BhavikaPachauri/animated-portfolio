"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "About",      href: "#about" },
  { label: "Skills",     href: "#skills" },
  { label: "Projects",   href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[1000] transition-all duration-500"
        style={{
          background: isScrolled ? "rgba(5,5,5,0.88)" : "transparent",
          backdropFilter: isScrolled ? "blur(20px)" : "none",
          borderBottom: isScrolled ? "1px solid rgba(0,255,65,0.06)" : "none",
        }}
      >
        <nav className="flex items-center justify-between px-6 md:px-12 py-4 max-w-[1800px] mx-auto">
          {/* Logo */}
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            <span className="text-[15px] font-semibold" style={{ fontFamily: "var(--font-mono)" }}>
              <span style={{ color: "#00ff41" }}>&gt;_</span>
              <span style={{ color: "rgba(0,255,65,0.5)" }} className="font-light ml-1">bhavika</span>
              <span style={{ color: "rgba(0,255,65,0.25)" }}>.dev</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button key={link.label} onClick={() => scrollTo(link.href)} className="nav-link">
                /{link.label.toLowerCase()}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href="https://github.com/BhavikaPachauri" target="_blank" rel="noopener noreferrer"
              className="text-[10px] tracking-[0.1em] uppercase px-4 py-2 transition-all duration-300 hover:border-[#00ff41] hover:text-[#00ff41]"
              style={{ border: "1px solid rgba(0,255,65,0.15)", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
              GitHub
            </a>
            <button onClick={() => scrollTo("#contact")}
              className="text-[10px] tracking-[0.08em] uppercase px-4 py-2 font-semibold transition-all duration-300 cursor-pointer hover:bg-[#00cc33]"
              style={{ background: "#00ff41", color: "#050505", border: "none", fontFamily: "var(--font-mono)" }}>
              Hire Me
            </button>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative z-[1001] w-10 h-10 flex flex-col items-center justify-center gap-[5px] bg-transparent border-none cursor-pointer"
            aria-label="Toggle menu">
            <motion.span animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="w-5 h-[1px] block" style={{ background: "#00ff41" }} transition={{ duration: 0.3 }} />
            <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} className="w-5 h-[1px] block" style={{ background: "#00ff41" }} transition={{ duration: 0.3 }} />
            <motion.span animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="w-5 h-[1px] block" style={{ background: "#00ff41" }} transition={{ duration: 0.3 }} />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-8"
            style={{ background: "rgba(5,5,5,0.97)", backdropFilter: "blur(20px)" }}>
            <div className="absolute inset-0 opacity-[0.04]" style={{
              backgroundImage: "linear-gradient(rgba(0,255,65,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.5) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }} />
            {NAV_LINKS.map((link, i) => (
              <motion.button key={link.label}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                onClick={() => scrollTo(link.href)}
                className="text-[28px] font-light tracking-[0.05em] bg-transparent border-none cursor-pointer relative z-10 text-gradient"
                style={{ fontFamily: "var(--font-display)" }}>
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
