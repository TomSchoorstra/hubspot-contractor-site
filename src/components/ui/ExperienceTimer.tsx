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
  const [elapsed, setElapsed] = useState(getElapsed);

  useEffect(() => {
    const id = setInterval(() => setElapsed(getElapsed()), 1000);
    return () => clearInterval(id);
  }, []);

  const { years, months, days, hours, minutes, seconds } = elapsed;

  return (
    <div className="text-center sm:text-left">
      <div className="font-display text-2xl font-bold text-accent sm:text-3xl lg:text-4xl">
        {years} yrs
      </div>
      <div className="mt-1 text-sm font-medium text-text-secondary tabular-nums">
        {months} mo · {days} d · {pad(hours)}:{pad(minutes)}:{pad(seconds)}
      </div>
    </div>
  );
}
