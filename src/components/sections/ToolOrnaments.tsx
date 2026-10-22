"use client";

import Image from "next/image";
import { useEffect, useRef, type PointerEvent } from "react";

const tools = [
  { name: "HubSpot", src: "/logos/HubSpot_Logo.svg", width: 106, height: 31 },
  { name: "Zapier", src: "/logos/Zapier_idMPnFrbc7_0.svg", width: 500, height: 136 },
  { name: "Exact", src: "/logos/Exact_id4ip-rhAF_1.svg", width: 842, height: 179 },
  { name: "WooCommerce", src: "/logos/WooCommerce_logo_(2015).svg", width: 256, height: 153 },
  { name: "Chili Piper", src: "/logos/Chili Piper_idovklU7ME_0.svg", width: 42, height: 45 },
];

function nudge(event: PointerEvent<HTMLSpanElement>) {
  if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const ornament = event.currentTarget.parentElement;
  if (!ornament) return;

  const transform = new DOMMatrixReadOnly(getComputedStyle(ornament).transform);
  const angle = Math.atan2(transform.b, transform.a) * 180 / Math.PI;
  const direction = event.clientX < event.currentTarget.getBoundingClientRect().left + event.currentTarget.offsetWidth / 2 ? -1 : 1;

  ornament.getAnimations().forEach(animation => animation.cancel());
  ornament.animate([
    { transform: `rotate(${angle}deg)`, offset: 0 },
    { transform: `rotate(${direction * 6}deg)`, offset: 0.18 },
    { transform: `rotate(${direction * -4}deg)`, offset: 0.45 },
    { transform: `rotate(${direction * 2}deg)`, offset: 0.72 },
    { transform: "rotate(0deg)", offset: 1 },
  ], { duration: 1400, easing: "ease-in-out" });
}

export default function ToolOrnaments() {
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const element = list.current;
    const stop = () => element?.querySelectorAll(".about-tool-ornament").forEach(ornament => {
      ornament.getAnimations().forEach(animation => animation.cancel());
    });
    const onChange = () => { if (preference.matches) stop(); };
    preference.addEventListener("change", onChange);
    return () => { preference.removeEventListener("change", onChange); stop(); };
  }, []);

  return (
    <ul ref={list} aria-label="Tools I work with" className="about-tool-mobile">
      {tools.map(tool => (
        <li key={tool.name} className="about-tool-ornament">
          <span className="about-tool-ball" onPointerEnter={nudge}>
            <Image src={tool.src} alt={tool.name} width={tool.width} height={tool.height} className={tool.name === "Chili Piper" ? "relative z-10 h-8 w-7 object-contain" : tool.name === "WooCommerce" ? "relative z-10 h-8 w-12 object-contain" : "relative z-10 h-5 w-12 object-contain"} />
          </span>
        </li>
      ))}
    </ul>
  );
}
