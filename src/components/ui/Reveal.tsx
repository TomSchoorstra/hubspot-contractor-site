"use client";

import { useEffect, useRef } from "react";

// Arms a reveal only after JavaScript confirms the element starts off screen.
// Without JavaScript, or with reduced motion, the content simply stays visible.
export default function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (element.getBoundingClientRect().top < window.innerHeight * 0.85) return;

    element.dataset.reveal = "pending";
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      element.dataset.reveal = "done";
      observer.disconnect();
    }, { rootMargin: "0px 0px -15% 0px" });
    observer.observe(element);
    return () => {
      observer.disconnect();
      delete element.dataset.reveal;
    };
  }, []);

  return <div ref={ref} className={className}>{children}</div>;
}
