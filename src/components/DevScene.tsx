"use client";

import { useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Holographic Laptop ── */
function HolographicLaptop() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.08;
  });

  return (
    <group ref={groupRef} position={[1.5, -0.2, 0]}>
      {/* Base / keyboard */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.8, 0.08, 1.9]} />
        <meshStandardMaterial color="#050a05" emissive="#001a00" emissiveIntensity={0.3} metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Keyboard rows (decorative) */}
      {[[-0.6, 0.05, -0.2], [0, 0.05, -0.2], [0.6, 0.05, -0.2],
        [-0.6, 0.05, 0.1], [0, 0.05, 0.1], [0.6, 0.05, 0.1]].map(([x, y, z], i) => (
        <mesh key={i} position={[x as number, y as number, z as number]}>
          <boxGeometry args={[0.35, 0.02, 0.12]} />
          <meshStandardMaterial color="#00ff41" emissive="#00ff41" emissiveIntensity={0.4} transparent opacity={0.7} />
        </mesh>
      ))}
      {/* Screen hinge */}
      <mesh position={[0, 0.04, -0.95]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 2.8, 12]} />
        <meshStandardMaterial color="#001a00" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Screen lid */}
      <group position={[0, 0.7, -0.95]} rotation={[-0.18, 0, 0]}>
        <mesh>
          <boxGeometry args={[2.8, 1.8, 0.07]} />
          <meshStandardMaterial color="#030803" emissive="#000800" metalness={0.9} roughness={0.05} />
        </mesh>
        {/* Screen glow */}
        <mesh position={[0, 0, 0.04]}>
          <boxGeometry args={[2.5, 1.55, 0.01]} />
          <meshStandardMaterial color="#001a00" emissive="#00ff41" emissiveIntensity={0.6} />
        </mesh>
        {/* Screen content lines */}
        {[-0.5, -0.25, 0, 0.25, 0.5].map((y, i) => (
          <mesh key={i} position={[-0.3 + (i % 3) * 0.4, y, 0.05]}>
            <boxGeometry args={[0.6 + (i % 2) * 0.3, 0.015, 0.001]} />
            <meshBasicMaterial color="#00ff41" transparent opacity={0.5} />
          </mesh>
        ))}
        {/* Screen text */}
        <Text fontSize={0.12} color="#00ff41" position={[0, 0.2, 0.06]} anchorX="center">
          {`> Hello World`}
        </Text>
        <Text fontSize={0.09} color="rgba(0,255,65,0.5)" position={[0, 0, 0.06]} anchorX="center">
          {`const dev = "Bhavika"`}
        </Text>
        <Text fontSize={0.09} color="rgba(0,255,65,0.4)" position={[0, -0.18, 0.06]} anchorX="center">
          {`// Full Stack Developer`}
        </Text>
      </group>

      {/* Screen frame glow */}
      <pointLight position={[0, 1.0, -0.8]} intensity={1.5} color="#00ff41" distance={3} />
    </group>
  );
}

/* ── Developer Silhouette ── */
function DeveloperFigure() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.position.y = -1.2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.04;
    // Subtle breathing
    groupRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.008;
  });

  return (
    <group ref={groupRef} position={[-1.8, -1.2, 0]}>
      {/* Head */}
      <mesh position={[0, 2.1, 0]}>
        <sphereGeometry args={[0.3, 20, 20]} />
        <meshStandardMaterial color="#001a00" emissive="#00ff41" emissiveIntensity={0.25} wireframe={false} />
      </mesh>
      {/* Head wireframe overlay */}
      <mesh position={[0, 2.1, 0]}>
        <sphereGeometry args={[0.31, 10, 10]} />
        <meshBasicMaterial color="#00ff41" wireframe transparent opacity={0.15} />
      </mesh>
      {/* Neck */}
      <mesh position={[0, 1.75, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.3, 10]} />
        <meshStandardMaterial color="#001a00" emissive="#00ff41" emissiveIntensity={0.2} />
      </mesh>
      {/* Torso */}
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[0.7, 1.0, 0.35]} />
        <meshStandardMaterial color="#001500" emissive="#00ff41" emissiveIntensity={0.15} metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Torso wireframe */}
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[0.72, 1.02, 0.37]} />
        <meshBasicMaterial color="#00ff41" wireframe transparent opacity={0.08} />
      </mesh>
      {/* Left arm */}
      <mesh position={[-0.5, 1.0, 0]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.09, 0.07, 0.8, 8]} />
        <meshStandardMaterial color="#001a00" emissive="#00ff41" emissiveIntensity={0.2} />
      </mesh>
      {/* Right arm */}
      <mesh position={[0.5, 1.0, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.09, 0.07, 0.8, 8]} />
        <meshStandardMaterial color="#001a00" emissive="#00ff41" emissiveIntensity={0.2} />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.2, 0.25, 0]}>
        <cylinderGeometry args={[0.1, 0.09, 0.8, 8]} />
        <meshStandardMaterial color="#001500" emissive="#00ff41" emissiveIntensity={0.15} />
      </mesh>
      <mesh position={[0.2, 0.25, 0]}>
        <cylinderGeometry args={[0.1, 0.09, 0.8, 8]} />
        <meshStandardMaterial color="#001500" emissive="#00ff41" emissiveIntensity={0.15} />
      </mesh>
      {/* Hair */}
      {[-0.15, 0, 0.15].map((x, i) => (
        <mesh key={i} position={[x, 2.45, 0]}>
          <boxGeometry args={[0.12, 0.15, 0.1]} />
          <meshBasicMaterial color="#00ff41" transparent opacity={0.4} />
        </mesh>
      ))}
      {/* Glow aura */}
      <pointLight position={[0, 1.2, 0.5]} intensity={0.8} color="#00ff41" distance={2} />
    </group>
  );
}

/* ── Floating Code Lines ── */
function FloatingCode() {
  const CODE = [
    "const portfolio = new Dev()", "React.useState()", "async function build()", "npm run deploy",
    "git push origin main", "<Component />", "useEffect(() => {}, [])",
  ];
  return (
    <>
      {CODE.map((line, i) => (
        <Float key={i} speed={0.8 + i * 0.2} floatIntensity={0.3} rotationIntensity={0.1}
          position={[
            (Math.random() - 0.5) * 8,
            -1 + i * 0.5,
            -3 + Math.random() * 2,
          ]}>
          <Text fontSize={0.13} color="#00ff41" anchorX="center" fillOpacity={0.25 + (i % 3) * 0.1}>
            {line}
          </Text>
        </Float>
      ))}
    </>
  );
}

/* ── Particle Grid ── */
function ParticleGrid() {
  const ref = useRef<THREE.Points>(null);
  const positions = (() => {
    const arr: number[] = [];
    for (let x = -5; x <= 5; x += 0.8) {
      for (let y = -3; y <= 3; y += 0.8) {
        arr.push(x, y, -4);
      }
    }
    return new Float32Array(arr);
  })();

  useFrame((state) => {
    if (!ref.current) return;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < arr.length; i += 3) {
      arr[i + 2] = -4 + Math.sin(state.clock.elapsedTime + arr[i] * 0.5 + arr[i + 1] * 0.3) * 0.2;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#00ff41" size={0.025} transparent opacity={0.2} sizeAttenuation />
    </points>
  );
}

/* ── Scroll Camera ── */
function ScrollCamera() {
  const { camera } = useThree();
  const progress = useRef(0);

  useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY;
      const section = document.getElementById("dev-scene");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      progress.current = Math.max(0, Math.min(1, -rect.top / Math.max(total, 1)));
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useFrame(() => {
    const p = progress.current;
    camera.position.x += (-0.5 + p * 1.0 - camera.position.x) * 0.04;
    camera.position.y += (0.3 - p * 0.6 - camera.position.y) * 0.04;
    camera.position.z += (7 - p * 1.5 - camera.position.z) * 0.04;
    camera.lookAt(0, 0.2, 0);
  });

  return null;
}

/* ── Main Component ── */
export default function DevScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    if (!section || !text) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(text,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: section, start: "top 70%", toggleActions: "play none none none" },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="dev-scene"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ height: "100vh", minHeight: "600px" }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: "linear-gradient(rgba(0,255,65,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.4) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
      }} />

      {/* Three.js canvas */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0.3, 7], fov: 65 }} gl={{ antialias: true, alpha: true }}>
          <ambientLight intensity={0.1} />
          <pointLight position={[0, 5, 3]} intensity={0.6} color="#00ff41" />
          <pointLight position={[-4, 0, 2]} intensity={0.4} color="#00ff41" />
          <Suspense fallback={null}>
            <FloatingCode />
            <ParticleGrid />
            <HolographicLaptop />
            <DeveloperFigure />
            <ScrollCamera />
          </Suspense>
        </Canvas>
      </div>

      {/* Overlay gradients */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(5,5,5,0.7) 80%, rgba(5,5,5,0.95) 100%)",
      }} />
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: "linear-gradient(to top, #050505, transparent)" }} />
      <div className="absolute top-0 left-0 right-0 h-24" style={{ background: "linear-gradient(to bottom, #050505, transparent)" }} />

      {/* Text overlay */}
      <div ref={textRef} className="absolute inset-0 flex items-center z-10 pointer-events-none">
        <div className="pl-8 md:pl-16 max-w-sm opacity-0">
          <p className="text-[9px] tracking-[0.3em] uppercase mb-3" style={{ color: "rgba(0,255,65,0.4)", fontFamily: "var(--font-mono)" }}>
            DEVELOPER WORKSTATION
          </p>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em]" style={{ color: "#e8ffe8" }}>
            WHERE CODE<br /><span className="text-gradient">BECOMES REALITY</span>
          </h2>
          <p className="mt-4 text-[12px] leading-relaxed" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)" }}>
            $ Full-stack developer.<br />
            $ Turning ideas into production apps.<br />
            $ Always building.
          </p>
          <div className="mt-5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00ff41] animate-pulse" />
            <span className="text-[9px] tracking-[0.15em] uppercase" style={{ color: "rgba(0,255,65,0.5)", fontFamily: "var(--font-mono)" }}>
              System Active
            </span>
          </div>
        </div>
      </div>

      {/* Scan line */}
      <div className="scan-line" />
    </section>
  );
}
