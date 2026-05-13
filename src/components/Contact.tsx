"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRevealAnimation } from "@/hooks/useRevealAnimation";
import GlitchText from "@/components/GlitchText";

const socialLinks = [
  { label: "GitHub", href: "https://github.com", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> },
  { label: "LinkedIn", href: "https://linkedin.com", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { label: "Twitter", href: "https://twitter.com", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
];

export default function Contact() {
  const titleRef = useRevealAnimation();
  const formRef = useRevealAnimation({ delay: 0.2 });
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "linear-gradient(rgba(0,255,65,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.3) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      <div className="max-w-[900px] mx-auto relative z-10">
        <div ref={titleRef} className="text-center mb-14">
          <div className="reveal-item">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: "#00ff41", fontFamily: "var(--font-mono)" }}>
              $ ./initiate_contact.sh
            </p>
          </div>
          <div className="reveal-item">
            <GlitchText text="ESTABLISH_CONNECTION" as="h2" className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.03em] leading-[1.1] text-[var(--color-text-primary)]" />
          </div>
          <div className="reveal-item">
            <p className="text-[13px] mt-5 max-w-md mx-auto" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)" }}>
              // Have a mission? Let&apos;s collaborate and build something extraordinary.
            </p>
          </div>
        </div>

        <div ref={formRef}>
          <form onSubmit={handleSubmit} className="reveal-item rounded-xl overflow-hidden border border-[rgba(0,255,65,0.12)]" style={{ background: "rgba(0,10,0,0.6)", backdropFilter: "blur(20px)" }}>
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[rgba(0,255,65,0.08)]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-[10px] text-[rgba(0,255,65,0.4)]" style={{ fontFamily: "var(--font-mono)" }}>contact_form.sh</span>
            </div>

            <div className="p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="relative">
                  <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${focused === "name" || formState.name ? "text-[10px] -top-4" : "text-[13px] top-4"}`}
                    style={{ color: focused === "name" ? "#00ff41" : "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
                    {focused === "name" || formState.name ? "// name" : "$ enter_name"}
                  </label>
                  <input type="text" className="form-input text-[13px]" style={{ borderBottomColor: focused === "name" ? "#00ff41" : undefined, fontFamily: "var(--font-mono)" }}
                    value={formState.name} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })} required />
                </div>
                <div className="relative">
                  <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${focused === "email" || formState.email ? "text-[10px] -top-4" : "text-[13px] top-4"}`}
                    style={{ color: focused === "email" ? "#00ff41" : "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
                    {focused === "email" || formState.email ? "// email" : "$ enter_email"}
                  </label>
                  <input type="email" className="form-input text-[13px]" style={{ borderBottomColor: focused === "email" ? "#00ff41" : undefined, fontFamily: "var(--font-mono)" }}
                    value={formState.email} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })} required />
                </div>
              </div>

              <div className="relative mb-10">
                <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${focused === "message" || formState.message ? "text-[10px] -top-4" : "text-[13px] top-4"}`}
                  style={{ color: focused === "message" ? "#00ff41" : "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
                  {focused === "message" || formState.message ? "// message" : "$ enter_message"}
                </label>
                <textarea className="form-input resize-none min-h-[100px] text-[13px]" style={{ borderBottomColor: focused === "message" ? "#00ff41" : undefined, fontFamily: "var(--font-mono)" }}
                  value={formState.message} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })} required />
              </div>

              <div className="flex items-center justify-between flex-wrap gap-5">
                <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 rounded text-[12px] tracking-[0.05em] uppercase font-semibold transition-all duration-300 min-w-[200px]"
                  style={{ background: "#00ff41", color: "#050505", fontFamily: "var(--font-mono)", border: "none", cursor: "pointer" }}>
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.span key="sent" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center justify-center gap-2">
                        ✓ TRANSMITTED
                      </motion.span>
                    ) : (
                      <motion.span key="send" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                        ./send_message.sh
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                <div className="flex items-center gap-3">
                  {socialLinks.map((link) => (
                    <motion.a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                      className="w-10 h-10 rounded border border-[rgba(0,255,65,0.15)] flex items-center justify-center transition-all duration-300 hover:border-[#00ff41]"
                      style={{ color: "var(--color-text-muted)", background: "rgba(0,255,65,0.03)" }}
                      whileHover={{ scale: 1.15, y: -2, color: "#00ff41" }} whileTap={{ scale: 0.95 }} aria-label={link.label}>
                      {link.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
