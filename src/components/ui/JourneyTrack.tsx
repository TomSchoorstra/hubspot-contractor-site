"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

// The vertical line of a journey. It fills in the line colour as the reader travels down the page.
export default function JourneyTrack() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  return (
    <div ref={ref} aria-hidden="true" className="journey__track">
      <motion.div className="journey__fill" style={reducedMotion ? undefined : { scaleY }} />
    </div>
  );
}
