"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { reveal } from "@/lib/motion-tokens";

export function ScrollReveal({ children, index = 0, className }: { children: ReactNode; index?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    if (reduce || !ref.current) return;
    if (ref.current.getBoundingClientRect().top > window.innerHeight) setArmed(true);
  }, [reduce]);
  const show = !armed || inView;
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: reveal.distance }}
      transition={show ? { duration: reveal.duration, ease: reveal.ease, delay: index * reveal.stagger } : { duration: 0 }}
    >
      {children}
    </motion.div>
  );
}
