"use client";

import React, { useState, useEffect } from 'react';

export default function CollectionsCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 18,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    // Target 5 days from initial mount
    const target = new Date();
    target.setDate(target.getDate() + 4);
    target.setHours(target.getHours() + 18);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = target.getTime() - now;

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-surface-container-high/80 border border-outline-variant/40 rounded-full text-xs">
      <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse shrink-0" />
      <span className="text-[10px] sm:text-[11px] font-semibold text-outline uppercase tracking-wider">
        Seasonal Curation Allocation:
      </span>
      <span className="font-mono text-xs font-bold text-primary" suppressHydrationWarning>
        {timeLeft.days}d {String(timeLeft.hours).padStart(2, '0')}h {String(timeLeft.minutes).padStart(2, '0')}m {String(timeLeft.seconds).padStart(2, '0')}s
      </span>
    </div>
  );
}
