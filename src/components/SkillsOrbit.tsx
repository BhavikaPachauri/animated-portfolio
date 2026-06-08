"use client";

import { useRef, useState, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  { name: "React.js",    angle: 0,    radius: 2.8, speed: 0.4  },
  { name: "Next.js",     angle: 0.7,  radius: 3.2, speed: 0.35 },
  { name: "TypeScript",  angle: 1.4,  radius: 2.6, speed: 0.45 },
  { name: "Node.js",     angle: 2.1,  radius: 3.0, speed: 0.38 },
  { name: "Express.js",  angle: 2.8,  radius: 2.5, speed: 0.5  },
  { name: "MySQL",       angle: 4.9,  radius: 3.1, speed: 0.36 },
  { name: "Tailwind",    angle: 5.6,  radius: 2.9, speed: 0.43 },
  { name: "Material UI", angle: 0.35, radius: 3.4, speed: 0.33 },
  { name: "Git",         angle: 1.1,  radius: 2.4, speed: 0.48 },
  { name: "JavaScript",  angle: 1.85, radius: 3.5, speed: 0.3  },
];

function OrbitingSkill({ name, angle, radius, speed }: { name: string; angle: number; radius: number; speed: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const baseAngle = useRef(angle);

  useFrame(() => {
    if (!groupRef.current) return;
    baseAngle.current += speed * 0.003;
    groupRef.current.position.x = Math.cos(baseAngle.current) * radius;
    groupRef.current.position.z = Math.sin(baseAngle.current) * radius;
    groupRef.current.position.y = Math.sin(baseAngle.current * 0.7 + angle) * 0.5;
    groupRef.current.rotation.y = -baseAngle.current;
  });

  return (
    <group ref={groupRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <mesh>
        <sphereGeometry args={[hovered ? 0.09 : 0.055, 12, 12]} />
        <meshBasicMaterial color="#00ff41" />
      </mesh>
      <Text
        fontSize={hovered ? 0.2 : 0.14}
        color={hovered ? "#00ff41" : "rgba(0,255,65,0.45)"}
        anchorX="center"
        anchorY="middle"
        position={[0, 0.26, 0]}
      >
        {name}
      </Text>
    </group>
  );
}

function CentralSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.25;
  });

  return (
    <group>
      <mesh>
        <sphereGeometry args={[1.0, 24, 24]} />
        <meshBasicMaterial color="#00ff41"transparent opacity={0.04} />
      </mesh>
      <Sphere ref={meshRef} args={[0.7, 48, 48]}>
        <MeshDistortMaterial color="#050505" emissive="#006700ad" emissiveIntensity={0.6}
          distort={0.2} speed={2} roughness={0.2} metalness={0.8} />
      </Sphere>
      <mesh>
        <sphereGeometry args={[0.73, 16, 16]} />
        <meshBasicMaterial color="#00ff41" wireframe transparent opacity={0.1} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.2, 0.006, 8, 80]} />
        <meshBasicMaterial color="#00ff41" transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

function OrbitRings() {
  return (
    <>
      {[2.6, 3.0, 3.4].map((r, i) => (
        <mesh key={r} rotation={[Math.PI / 2 + (i * 0.1), 0, i * 0.2]}>
          <torusGeometry args={[r, 0.003, 6, 100]} />
          <meshBasicMaterial color="#00ff41" transparent opacity={0.9} />
        </mesh>
      ))}
    </>
  );
}

function MouseRig() {
  const { scene } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const h = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);
  useFrame(() => {
    scene.rotation.y += (mouse.current.x * 0.3 - scene.rotation.y) * 0.04;
    scene.rotation.x += (mouse.current.y * 0.12 - scene.rotation.x) * 0.04;
  });
  return null;
}

export default function SkillsOrbit() {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="relative overflow-hidden" style={{ padding: "100px 0 80px" }}>
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: "linear-gradient(rgba(0,255,65,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.4) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
      }} />
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(0, 255, 64, 0.48) 0%, transparent 70%)",
      }} />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        <div ref={titleRef} className="text-center mb-4">
          <p className="section-accent" style={{ justifyContent: "center" }}>
            <span className="w-5 h-[1px] inline-block mr-3" style={{ background: "linear-gradient(90deg, transparent, #00ff41)" }} />
            SKILL MATRIX
            <span className="w-5 h-[1px] inline-block ml-3" style={{ background: "linear-gradient(90deg, #00ff41, transparent)" }} />
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.03em] leading-[1.1] text-gradient">
            TECHNOLOGY STACK
          </h2>
          <p className="mt-3 text-[12px]" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)" }}>
            Hover nodes · drag to rotate
          </p>
        </div>

        {/* 3D Canvas */}
        <div style={{ height: "520px" }}>
          <Canvas camera={{ position: [0, 0.5, 7], fov: 60 }} gl={{ antialias: true, alpha: true }} style={{ cursor: "grab" }}>
            <ambientLight intensity={0.2} />
            <pointLight position={[5, 5, 5]} intensity={1} color="#00ff41" />
            <Suspense fallback={null}>
              <CentralSphere />
              <OrbitRings />
              {SKILLS.map(s => <OrbitingSkill key={s.name} {...s} />)}
              <MouseRig />
            </Suspense>
          </Canvas>
        </div>

        {/* Tag grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mt-4"
        >
          {["React.js ⚛", "Next.js ▲", "TypeScript TS", "Node.js ⬡", "Express.js ⚙", "MySQL 🛢", "Tailwind ◎", "Material UI ■", "Git/GitHub ⌥", "JavaScript ◐"].map((s, i) => (
            <motion.div key={s}
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }} viewport={{ once: true }}
              className="skill-tag justify-center text-center text-[10px]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-secondary)" }}>
              {s}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
