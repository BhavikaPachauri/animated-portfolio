"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SOCIAL_LINKS = [
  {
    label: "GitHub", href: "https://github.com/BhavikaPachauri", color: "#00ff41",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>,
  },
  {
    label: "LinkedIn", href: "https://linkedin.com/in/bhavika-pachauri", color: "#00ff41",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 23.2 23.227 23.2 22.271V1.729C23.2.774 23.2 0 22.222 0h.003z"/></svg>,
  },
  {
    label: "Email", href: "mailto:bhavikapachauri02@gmail.com", color: "#00ff41",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setForm({ name: "", email: "", message: "" }); }, 4000);
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "linear-gradient(rgba(0,255,65,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.3) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
      }} />

      <div className="max-w-[1100px] mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true }}
          className="text-center mb-14">
          <p className="section-accent" style={{ justifyContent: "center" }}>
            <span className="w-5 h-[1px] inline-block mr-3" style={{ background: "linear-gradient(90deg, transparent, #00ff41)" }} />
            GET IN TOUCH
            <span className="w-5 h-[1px] inline-block ml-3" style={{ background: "linear-gradient(90deg, #00ff41, transparent)" }} />
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.03em] text-gradient">ESTABLISH_CONNECTION</h2>
          <p className="mt-3 text-[12px] max-w-md mx-auto" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)" }}>
            // Have a mission? Let&apos;s collaborate and build something extraordinary.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left info */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }} viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col gap-4">
            <div className="p-5" style={{ background: "rgba(0,255,65,0.02)", border: "1px solid rgba(0,255,65,0.08)" }}>
              <p className="text-[9px] tracking-[0.2em] uppercase mb-4" style={{ color: "rgba(0,255,65,0.35)", fontFamily: "var(--font-mono)" }}>DIRECT CONTACT</p>
              {[
                { label: "Email", value: "bhavikapachauri02@gmail.com", href: "mailto:bhavikapachauri02@gmail.com" },
                { label: "Phone", value: "+91 8449296898", href: "tel:+918449296898" },
                { label: "Location", value: "India 🇮🇳", href: null },
              ].map(item => (
                <div key={item.label} className="mb-3">
                  <p className="text-[9px] tracking-[0.1em] uppercase mb-0.5" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-[12px] hover:text-[#00ff41] transition-colors" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)" }}>{item.value}</a>
                  ) : (
                    <p className="text-[12px]" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)" }}>{item.value}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="p-5" style={{ background: "rgba(0,255,65,0.02)", border: "1px solid rgba(0,255,65,0.08)" }}>
              <p className="text-[9px] tracking-[0.2em] uppercase mb-4" style={{ color: "rgba(0,255,65,0.35)", fontFamily: "var(--font-mono)" }}>FIND ME ON</p>
              {SOCIAL_LINKS.map(link => (
                <motion.a key={link.label} href={link.href} target={link.href.startsWith("mailto") ? "_self" : "_blank"} rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2.5 mb-2 transition-all duration-300"
                  style={{ border: "1px solid rgba(0,255,65,0.06)", color: "var(--color-text-muted)" }}
                  whileHover={{ borderColor: "rgba(0,255,65,0.2)", color: "#00ff41", x: 4 }}>
                  <span style={{ color: "#00ff41" }}>{link.icon}</span>
                  <span className="text-[11px]" style={{ fontFamily: "var(--font-mono)" }}>{link.label}</span>
                  <span className="ml-auto text-[9px]" style={{ color: "rgba(0,255,65,0.3)" }}>→</span>
                </motion.a>
              ))}
            </div>

            <div className="p-3 flex items-center gap-3" style={{ background: "rgba(0,255,65,0.04)", border: "1px solid rgba(0,255,65,0.1)" }}>
              <span className="w-2 h-2 rounded-full bg-[#00ff41] animate-pulse" />
              <p className="text-[10px]" style={{ color: "rgba(0,255,65,0.6)", fontFamily: "var(--font-mono)" }}>Available for new opportunities</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }} viewport={{ once: true }}
            className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="rounded overflow-hidden"
              style={{ background: "rgba(0,5,0,0.65)", border: "1px solid rgba(0,255,65,0.08)", backdropFilter: "blur(20px)" }}>
              <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ borderColor: "rgba(0,255,65,0.06)" }}>
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-2 text-[9px]" style={{ color: "rgba(0,255,65,0.35)", fontFamily: "var(--font-mono)" }}>contact_form.sh</span>
              </div>
              <div className="p-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {(["name", "email"] as const).map(field => (
                    <div key={field} className="relative">
                      <label className="absolute left-0 pointer-events-none transition-all duration-300" style={{
                        top: focused === field || form[field] ? "-18px" : "14px",
                        fontSize: focused === field || form[field] ? "9px" : "12px",
                        color: focused === field ? "#00ff41" : "var(--color-text-muted)",
                        fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em",
                      }}>
                        {focused === field || form[field] ? `// ${field}` : `$ enter_${field}`}
                      </label>
                      <input type={field === "email" ? "email" : "text"} className="form-input"
                        style={{ borderBottomColor: focused === field ? "#00ff41" : undefined }}
                        value={form[field]} onFocus={() => setFocused(field)} onBlur={() => setFocused(null)}
                        onChange={e => setForm({ ...form, [field]: e.target.value })} required />
                    </div>
                  ))}
                </div>
                <div className="relative mb-10">
                  <label className="absolute left-0 pointer-events-none transition-all duration-300" style={{
                    top: focused === "message" || form.message ? "-18px" : "14px",
                    fontSize: focused === "message" || form.message ? "9px" : "12px",
                    color: focused === "message" ? "#00ff41" : "var(--color-text-muted)",
                    fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em",
                  }}>
                    {focused === "message" || form.message ? "// message" : "$ enter_message"}
                  </label>
                  <textarea className="form-input resize-none min-h-[110px]"
                    style={{ borderBottomColor: focused === "message" ? "#00ff41" : undefined }}
                    value={form.message} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                    onChange={e => setForm({ ...form, message: e.target.value })} required />
                </div>
                <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 text-[11px] tracking-[0.1em] uppercase font-bold transition-all duration-300 cursor-pointer"
                  style={{ background: "#00ff41", color: "#050505", border: "none", fontFamily: "var(--font-mono)" }}>
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.span key="sent" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="flex items-center justify-center gap-2">✓ TRANSMITTED</motion.span>
                    ) : (
                      <motion.span key="send" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                        ./send_message.sh
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
