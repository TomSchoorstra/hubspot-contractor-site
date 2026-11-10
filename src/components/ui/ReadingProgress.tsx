"use client";

import { motion, useReducedMotion, useScroll } from "framer-motion";

// A thin line under the header that fills as the article is read.
export default function ReadingProgress() {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  if (reducedMotion) return null;
  return <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-1.5 origin-left bg-accent" style={{ scaleX: scrollYProgress }} />;
}
