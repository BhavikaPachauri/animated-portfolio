"use client";

import { useEffect, useRef } from "react";

const CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF@#$%^&*";

interface Drop {
  x: number;
  y: number;
  speed: number;
  char: string;
  opacity: number;
  size: number;
}

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const columns = Math.floor(width / 18);
    const drops: Drop[] = [];

    for (let i = 0; i < columns; i++) {
      drops.push({
        x: i * 18,
        y: Math.random() * -height,
        speed: 1 + Math.random() * 3,
        char: CHARS[Math.floor(Math.random() * CHARS.length)],
        opacity: 0.03 + Math.random() * 0.08,
        size: 10 + Math.random() * 6,
      });
    }

    const draw = () => {
      ctx.fillStyle = "rgba(5, 5, 5, 0.08)";
      ctx.fillRect(0, 0, width, height);

      drops.forEach((drop) => {
        if (Math.random() > 0.95) {
          drop.char = CHARS[Math.floor(Math.random() * CHARS.length)];
        }

        ctx.font = `${drop.size}px monospace`;
        ctx.fillStyle = `rgba(0, 255, 65, ${drop.opacity})`;
        ctx.fillText(drop.char, drop.x, drop.y);

        // Brighter lead character
        ctx.fillStyle = `rgba(0, 255, 65, ${drop.opacity * 3})`;
        ctx.fillText(drop.char, drop.x, drop.y);

        drop.y += drop.speed;

        if (drop.y > height) {
          drop.y = Math.random() * -100;
          drop.speed = 1 + Math.random() * 3;
        }
      });

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[2]"
      style={{ opacity: 0.4 }}
      aria-hidden="true"
    />
  );
}
