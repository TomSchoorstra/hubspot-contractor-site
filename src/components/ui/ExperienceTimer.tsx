'use client';

import { useState, useEffect } from 'react';

const START = new Date('2017-08-01T00:00:00');

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function getElapsed() {
  const now = new Date();
  let years = now.getFullYear() - START.getFullYear();
  let months = now.getMonth() - START.getMonth();
  let days = now.getDate() - START.getDate();

  if (days < 0) {
    months--;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  return {
    years,
    months,
    days,
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
  };
}

export default function ExperienceTimer() {
  const [elapsed, setElapsed] = useState<ReturnType<typeof getElapsed> | null>(null);

  useEffect(() => {
    setElapsed(getElapsed());
    const id = setInterval(() => setElapsed(getElapsed()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!elapsed) {
    return (
      <div className="text-center sm:text-left">
        <div className="font-display text-3xl font-bold text-accent lg:text-4xl">8+ jaar</div>
        <div className="mt-1 text-sm font-medium text-text-secondary">Years in HubSpot</div>
      </div>
    );
  }

  const { years, months, days, hours, minutes, seconds } = elapsed;

  return (
    <div className="text-center sm:text-left">
      <div className="font-display text-3xl font-bold text-accent lg:text-4xl">
        {years} jaar
      </div>
      <div className="mt-1 text-sm font-medium text-text-secondary tabular-nums">
        {months} mnd · {days} d · {pad(hours)}:{pad(minutes)}:{pad(seconds)}
      </div>
    </div>
  );
}
