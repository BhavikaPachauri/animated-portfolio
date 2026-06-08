  "use client";

  import { useEffect, useRef, Suspense } from "react";
  import { motion } from "framer-motion";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { Canvas, useFrame, useThree } from "@react-three/fiber";
  import { Points, PointMaterial } from "@react-three/drei";
  import * as THREE from "three";
  import { useMousePosition } from "@/hooks/useMousePosition";

  gsap.registerPlugin(ScrollTrigger);

  function StarField() {
    const ref = useRef<THREE.Points>(null);
    const positions = (() => {
      const arr = new Float32Array(3000 * 3);
      for (let i = 0; i < 3000; i++) {
        arr[i * 3]     = (Math.random() - 0.5) * 20;
        arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
        arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
      }
      return arr;
    })();
    useFrame((_, delta) => {
      if (!ref.current) return;
      ref.current.rotation.x -= delta * 0.015;
      ref.current.rotation.y -= delta * 0.02;
    });
    return (
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#00ff41" size={0.022} sizeAttenuation depthWrite={false} opacity={0.5} />
      </Points>
    );
  }

  function GridFloor() {
    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
        <planeGeometry args={[40, 40, 40, 40]} />
        <meshBasicMaterial color="#00ff41" wireframe transparent opacity={0.06} />
      </mesh>
    );
  }

  function CameraRig() {
    const { camera } = useThree();
    const mouse = useRef({ x: 0, y: 0 });
    useEffect(() => {
      const h = (e: MouseEvent) => {
        mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
        mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("mousemove", h);
      return () => window.removeEventListener("mousemove", h);
    }, []);
    useFrame((_, delta) => {
      camera.position.x += (mouse.current.x * 0.4 - camera.position.x) * 0.04;
      camera.position.y += (mouse.current.y * 0.25 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);
    });
    return null;
  }

  export default function Hero() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const { normalizedX, normalizedY } = useMousePosition();

    useEffect(() => {
      const section = sectionRef.current;
      const heading = headingRef.current;
      if (!section || !heading) return;
      const ctx = gsap.context(() => {
        gsap.to(heading, {
          y: -160, opacity: 0, scale: 0.9,
          scrollTrigger: { trigger: section, start: "top top", end: "60% top", scrub: 1.2 },
        });
      }, section);
      return () => ctx.revert();
    }, []);

    return (
      <section ref={sectionRef} id="hero" className="relative h-[100vh] min-h-[700px] flex items-center justify-center overflow-hidden">

        {/* Three.js canvas */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ antialias: true, alpha: true }}>
            <Suspense fallback={null}>
              <StarField />
              <GridFloor />
              <CameraRig />
            </Suspense>
          </Canvas>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 z-[1]" style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 20%, rgba(5,5,5,0.65) 65%, rgba(5,5,5,0.96) 100%)",
        }} />
        <div className="absolute bottom-0 left-0 right-0 h-32 z-[1]" style={{ background: "linear-gradient(to top, #050505, transparent)" }} />
        <div className="scan-line z-[2]" />

        {/* HUD corners */}
        <div className="absolute top-24 left-6 z-10 hidden lg:block">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.2 }}>
            <p className="text-[9px] tracking-[0.12em] leading-[2.2]" style={{ color: "rgba(0,255,65,0.3)", fontFamily: "var(--font-mono)" }}>
              SYS.STATUS: ONLINE<br />
              BUILD: v2.0.26<br />
              UPTIME: 99.9%<br />
              NODE: 20.x LTS
            </p>
          </motion.div>
        </div>
        <div className="absolute top-24 right-6 z-10 hidden lg:block">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.4 }}>
            <p className="text-[9px] tracking-[0.12em] leading-[2.2] text-right" style={{ color: "rgba(0,255,65,0.3)", fontFamily: "var(--font-mono)" }}>
              REACT: 19.x<br />
              NEXT.JS: 16.x<br />
              ENV: PRODUCTION<br />
              LOCATION: INDIA
            </p>
          </motion.div>
        </div>

        {/* Main content */}
        <div ref={headingRef} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 2.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-3 px-4 py-2 mb-10"
            style={{ border: "1px solid rgba(0,255,65,0.15)", background: "rgba(0,255,65,0.04)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff41] animate-pulse" />
            <span className="text-[9px] tracking-[0.2em] uppercase" style={{ color: "rgba(0,255,65,0.7)", fontFamily: "var(--font-mono)" }}>
              Available for opportunities
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3.0, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="hero-heading mb-1" style={{ color: "#e8ffe8" }}>I BUILD</h1>
            <h1 className="hero-heading mb-1 shimmer-text">DIGITAL</h1>
            <h1 className="hero-heading" style={{ color: "#e8ffe8" }}>EXPERIENCES</h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-md mx-auto text-[13px] leading-relaxed"
            style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)" }}
          >
            <span  style={{ color: "#00ff41" }}>$</span> Full Stack Developer crafting scalable web apps with React, Next.js &amp; Node.js.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex items-center justify-center gap-4 flex-wrap"
          >
            <button onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
              className="magnetic-btn" style={{ color: "#00ff41", borderColor: "rgba(0,255,65,0.3)" }}>
              <span>./view_work.sh</span>
            </button>
            <button onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="magnetic-btn" style={{ background: "#00ff41", borderColor: "#00ff41", color: "#050505", fontWeight: 700 }}>
              <span>./connect.sh</span>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.0, duration: 1 }}
            className="mt-12 flex items-center justify-center gap-5 flex-wrap"
          >
            {["React", "Next.js", "Node.js", "TypeScript", "MySQL", "Express"].map((tech) => (
              <span key={tech} className="text-[9px] tracking-[0.15em] uppercase" style={{ color: "rgba(0,255,65,0.2)", fontFamily: "var(--font-mono)" }}>
                {tech}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <span className="text-[9px] tracking-[0.2em] uppercase" style={{ color: "rgba(0,255,65,0.25)", fontFamily: "var(--font-mono)" }}>SCROLL</span>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-8 bg-gradient-to-b from-[#00ff41] to-transparent opacity-25" />
        </motion.div>
      </section>
    );
  }
