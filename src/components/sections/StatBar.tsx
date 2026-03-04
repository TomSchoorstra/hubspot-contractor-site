"use client";

import AnimatedNumber from "@/components/ui/AnimatedNumber";

export interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export default function StatBar({
  stats,
  background = "teal",
}: {
  stats: Stat[];
  background?: "teal" | "orange" | "light";
}) {
  const bgStyles = {
    teal: "bg-accent-2 text-white",
    orange: "bg-accent text-white",
    light: "bg-surface-2 text-text border-t border-b border-border",
  };

  return (
    <div className={`w-full py-12 ${bgStyles[background]}`}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {stats.map((stat, i) => (
            <div key={i} className="min-w-0 text-center md:text-left">
              <div
                className={`font-display text-4xl font-bold leading-tight break-words ${
                  background === "light" ? "text-accent" : "text-white"
                }`}
              >
                <AnimatedNumber
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <p
                className={`mt-2 text-sm font-medium ${
                  background === "light"
                    ? "text-text-secondary"
                    : "text-white/75"
                }`}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
