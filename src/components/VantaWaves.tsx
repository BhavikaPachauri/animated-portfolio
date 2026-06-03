"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}

export default function VantaWaves() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<any>(null);

  useEffect(() => {
    const loadScript = (src: string) => {
      return new Promise<void>((resolve, reject) => {
        const existing = document.querySelector(
          `script[src="${src}"]`
        );

        if (existing) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = src;
        script.async = true;

        script.onload = () => resolve();
        script.onerror = () => reject();

        document.body.appendChild(script);
      });
    };

    const initVanta = async () => {
      try {
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        );

        await loadScript(
          "https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.waves.min.js"
        );

        if (
          !effectRef.current &&
          vantaRef.current &&
          window.VANTA
        ) {
          effectRef.current = window.VANTA.WAVES({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200,
            minWidth: 200,
            scale: 1,
            scaleMobile: 1,

            color: 0x400,
            shininess: 80,
            waveHeight: 25,
            waveSpeed: 1,
            zoom: 0.8,
          });
        }
      } catch (error) {
        console.error("Vanta failed to load", error);
      }
    };

    initVanta();

    return () => {
      if (effectRef.current) {
        effectRef.current.destroy();
        effectRef.current = null;
      }
    };
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Vanta Background */}
      <div
        ref={vantaRef}
        className="absolute inset-0"
      />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-white">
            RIDE THE
          </h1>

          <h2 className="text-6xl md:text-8xl font-bold text-green-400">
            WAVE
          </h2>

          <p className="mt-4 text-gray-300">
            Full Stack Developer
          </p>
        </div>
      </div>
    </section>
  );
}