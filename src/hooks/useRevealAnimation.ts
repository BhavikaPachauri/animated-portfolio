"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealOptions {
  y?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
}

export function useRevealAnimation(options: RevealOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.querySelectorAll(".reveal-item");
    const targets = children.length > 0 ? children : [el];

    gsap.set(targets, {
      y: options.y ?? 60,
      opacity: 0,
    });

    gsap.to(targets, {
      y: 0,
      opacity: 1,
      duration: options.duration ?? 1,
      delay: options.delay ?? 0,
      stagger: options.stagger ?? 0.15,
      ease: "expo.out",
      scrollTrigger: {
        trigger: el,
        start: options.start ?? "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === el) {
          trigger.kill();
        }
      });
    };
  }, [options.y, options.duration, options.delay, options.stagger, options.start]);

  return ref;
}
