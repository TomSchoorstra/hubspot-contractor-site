"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate, useReducedMotion } from "framer-motion";

export default function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  duration = 1.5,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px" });
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!inView || reducedMotion) return;

    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplayed(Math.round(v)),
    });

    return () => controls.stop();
  }, [inView, value, duration, reducedMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}{reducedMotion ? value : displayed}{suffix}
    </span>
  );
}
