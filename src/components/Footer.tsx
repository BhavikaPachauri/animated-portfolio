"use client";

import { useRevealAnimation } from "@/hooks/useRevealAnimation";

export default function Footer() {
  const footerRef = useRevealAnimation({ y: 40 });

  return (
    <footer className="relative border-t border-[rgba(0,255,65,0.08)]">
      <div ref={footerRef} className="section-padding py-14 max-w-[1400px] mx-auto">
        <div className="reveal-item flex flex-col md:flex-row items-center justify-between gap-6">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            <span className="text-[18px] font-semibold tracking-[-0.02em]" style={{ fontFamily: "var(--font-mono)" }}>
              <span style={{ color: "#00ff41" }}>&gt;_</span>
              <span className="text-[var(--color-text-muted)] font-light ml-1">hacker.dev</span>
            </span>
          </a>
          <p className="text-[11px] tracking-[0.05em]" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
            © {new Date().getFullYear()} // All systems operational. Built with caffeine & code.
          </p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-4 py-2 rounded border border-[rgba(0,255,65,0.15)] text-[10px] tracking-[0.1em] uppercase hover:border-[#00ff41] hover:text-[#00ff41] transition-all duration-300 cursor-pointer bg-transparent"
            style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
            scroll_to_top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
