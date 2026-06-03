"use client";

import { useRef, useEffect, Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NODE_COUNT = 70;

function NeuralWeb() {
  const linesRef = useRef<THREE.LineSegments>(null);
  const dotsRef = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const nodes = useRef(
    Array.from({ length: NODE_COUNT }, () => ({
      pos: [(Math.random() - 0.5) * 12, (Math.random() - 0.5) * 7, (Math.random() - 0.5) * 4] as [number, number, number],
      vel: [(Math.random() - 0.5) * 0.004, (Math.random() - 0.5) * 0.004, 0] as [number, number, number],
    }))
  );

  useEffect(() => {
    const h = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 14;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 8;
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  useFrame(() => {
    const ns = nodes.current;
    ns.forEach(n => {
      n.pos[0] += n.vel[0];
      n.pos[1] += n.vel[1];
      if (n.pos[0] > 6 || n.pos[0] < -6) n.vel[0] *= -1;
      if (n.pos[1] > 3.5 || n.pos[1] < -3.5) n.vel[1] *= -1;
      const dx = n.pos[0] - mouse.current.x * 0.3;
      const dy = n.pos[1] - mouse.current.y * 0.3;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 1.5) { n.pos[0] += (dx / d) * 0.015; n.pos[1] += (dy / d) * 0.015; }
    });

    if (dotsRef.current) {
      const arr = dotsRef.current.geometry.attributes.position.array as Float32Array;
      ns.forEach((n, i) => { arr[i * 3] = n.pos[0]; arr[i * 3 + 1] = n.pos[1]; arr[i * 3 + 2] = n.pos[2]; });
      dotsRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (linesRef.current) {
      const lp: number[] = [];
      const threshold = 2.4;
      for (let i = 0; i < ns.length; i++) {
        for (let j = i + 1; j < ns.length; j++) {
          const dx = ns[i].pos[0] - ns[j].pos[0];
          const dy = ns[i].pos[1] - ns[j].pos[1];
          const dz = ns[i].pos[2] - ns[j].pos[2];
          if (Math.sqrt(dx * dx + dy * dy + dz * dz) < threshold) {
            lp.push(...ns[i].pos, ...ns[j].pos);
          }
        }
      }
      linesRef.current.geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(lp), 3));
      linesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const dotPositions = new Float32Array(NODE_COUNT * 3);
  nodes.current.forEach((n, i) => { dotPositions[i * 3] = n.pos[0]; dotPositions[i * 3 + 1] = n.pos[1]; dotPositions[i * 3 + 2] = n.pos[2]; });

  return (
    <group>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial color="#00ff41" transparent opacity={0.18} />
      </lineSegments>
      <points ref={dotsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dotPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#00ff41" size={0.055} transparent opacity={0.7} sizeAttenuation />
      </points>
    </group>
  );
}

const STATS = [
  { value: "1+",  label: "Years Experience",   icon: "◈" },
  { value: "5+",  label: "Projects Delivered", icon: "◆" },
  { value: "3+",  label: "Companies Worked",   icon: "▲" },
  { value: "99%", label: "Code Quality",       icon: "★" },
];

function StatCard({ stat, index }: { stat: typeof STATS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState("0");
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const trigger = ScrollTrigger.create({
      trigger: el, start: "top 85%",
      onEnter: () => {
        if (animated.current) return;
        animated.current = true;
        const num = parseFloat(stat.value);
        const suffix = stat.value.replace(/[\d.]/g, "");
        if (!isNaN(num)) {
          const dur = 1400, start = Date.now();
          const run = () => {
            const p = Math.min((Date.now() - start) / dur, 1);
            setCount(`${Math.round((1 - Math.pow(1 - p, 3)) * num)}${suffix}`);
            if (p < 1) requestAnimationFrame(run);
          };
          requestAnimationFrame(run);
        }
      },
    });
    return () => trigger.kill();
  }, [stat.value]);

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.04 }}
      className="cyber-border p-6 text-center"
      style={{ background: "rgba(0,255,65,0.02)", border: "1px solid rgba(0,255,65,0.1)" }}
    >
      <div className="text-xl mb-2" style={{ color: "#00ff41" }}>{stat.icon}</div>
      <div className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold tabular-nums leading-none mb-1"
        style={{ color: "#00ff41", fontFamily: "var(--font-mono)", textShadow: "0 0 20px rgba(0,255,65,0.3)" }}>
        {count || stat.value}
      </div>
      <p className="text-[10px] tracking-[0.1em] uppercase" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function NeuralStats() {
  return (
    <section id="stats" className="relative overflow-hidden" style={{ padding: "100px 0" }}>
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "linear-gradient(rgba(0,255,65,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.3) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
      }} />

      {/* Neural canvas */}
      <div className="absolute inset-0" style={{ opacity: 0.6 }}>
        <Canvas camera={{ position: [0, 0, 8], fov: 70 }} gl={{ antialias: false, alpha: true }}>
          <Suspense fallback={null}><NeuralWeb /></Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="section-accent" style={{ justifyContent: "center" }}>
            <span className="w-5 h-[1px] inline-block mr-3" style={{ background: "linear-gradient(90deg, transparent, #00ff41)" }} />
            NEURAL METRICS
            <span className="w-5 h-[1px] inline-block ml-3" style={{ background: "linear-gradient(90deg, #00ff41, transparent)" }} />
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.03em] text-gradient">BY THE NUMBERS</h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {STATS.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { icon: "⬡", title: "GSSoC Contributor",   desc: "Open source contributor at GirlScript Summer of Code 2024 — collaborating globally on real-world projects." },
            { icon: "◈", title: "HackerRank Certified", desc: "SQL Advanced & JavaScript Basics certified — strong command of core engineering fundamentals." },
            { icon: "◆", title: "Production Experience", desc: "Shipped full-stack features across 3+ companies with real users, real deadlines, real impact." },
          ].map((a, i) => (
            <motion.div key={a.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.7 }} viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="p-5 relative"
              style={{ background: "rgba(5,5,5,0.75)", border: "1px solid rgba(0,255,65,0.08)", backdropFilter: "blur(12px)" }}
            >
              <div className="text-xl mb-3" style={{ color: "#00ff41" }}>{a.icon}</div>
              <h3 className="text-[13px] font-semibold mb-2">{a.title}</h3>
              <p className="text-[11px] leading-relaxed" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)" }}>{a.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
