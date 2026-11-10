"use client";

import { useSyncExternalStore } from "react";

// First day working with HubSpot: 23 August 2017 (local time).
const START = { year: 2017, month: 7, day: 23 };

function subscribe(onTick: () => void) {
  const id = setInterval(onTick, 1000);
  return () => clearInterval(id);
}

const currentSecond = () => Math.floor(Date.now() / 1000);
// The server cannot know the visitor's clock, so the count appears after hydration.
const noSecond = () => null;

function elapsed(seconds: number) {
  const now = new Date(seconds * 1000);
  let years = now.getFullYear() - START.year;
  let months = now.getMonth() - START.month;
  let days = now.getDate() - START.day;
  if (days < 0) {
    months -= 1;
    // Borrow the length of the previous month.
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  const pad = (value: number) => String(value).padStart(2, "0");
  return {
    parts: [
      { value: years, unit: years === 1 ? "year" : "years" },
      { value: months, unit: months === 1 ? "month" : "months" },
      { value: days, unit: days === 1 ? "day" : "days" },
    ],
    clock: `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`,
  };
}

export default function ExperienceTimer() {
  const second = useSyncExternalStore(subscribe, currentSecond, noSecond);
  const time = second === null ? null : elapsed(second);
  const parts = time?.parts ?? [
    { value: null, unit: "years" },
    { value: null, unit: "months" },
    { value: null, unit: "days" },
  ];

  return (
    <div className="border-t-[10px] border-accent bg-paper-2 p-6 sm:p-8">
      <p className="text-base font-bold leading-snug text-ink">Working with HubSpot since 23 August 2017</p>
      <p
        className="mt-5 grid grid-cols-3 gap-4 text-ink"
        aria-label={time ? time.parts.map((part) => `${part.value} ${part.unit}`).join(", ") : undefined}
      >
        {parts.map((part) => (
          <span key={part.unit.slice(0, 3)} className="block" aria-hidden={time ? "true" : undefined}>
            <span className="t-h1 block tabular-nums" style={{ fontSize: "clamp(3.25rem, 2.4rem + 2.2vw, 4.5rem)" }}>{part.value ?? "–"}</span>
            <span className="mt-1 block text-sm font-bold text-ink-2">{part.unit}</span>
          </span>
        ))}
      </p>
      <p className="mt-5 border-t-2 border-ink pt-3 text-sm font-bold leading-relaxed text-accent-text tabular-nums" aria-hidden="true">
        {time ? `${time.clock} and counting` : "\u00a0"}
      </p>
    </div>
  );
}
