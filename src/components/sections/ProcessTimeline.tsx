"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export interface ProcessStep {
  title: string;
  description: string;
}

export default function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="relative">
      {/* Connector line */}
      <div className="absolute left-6 top-8 bottom-8 w-px bg-border hidden sm:block" aria-hidden="true" />

      <div className="space-y-6">
        {steps.map((step, i) => (
          <TimelineItem key={i} step={step} index={i} />
        ))}
      </div>
    </div>
  );
}

function TimelineItem({ step, index }: { step: ProcessStep; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="relative flex gap-6"
    >
      {/* Step number bubble */}
      <div className="relative z-10 flex-shrink-0">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-white font-display font-bold text-base shadow-sm">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pb-6 pt-1">
        <h3 className="text-lg font-semibold text-text">{step.title}</h3>
        <p className="mt-2 text-base leading-relaxed text-text-secondary">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}
