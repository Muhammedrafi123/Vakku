"use client";

import { Calendar } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

function FlipTile({ digit, prevDigit }: { digit: string; prevDigit: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (digit !== prevDigit && ref.current) {
      ref.current.classList.remove("flip-pop");
      void ref.current.offsetWidth; // force reflow
      ref.current.classList.add("flip-pop");
    }
  }, [digit, prevDigit]);

  return <div ref={ref} className="flip-tile">{digit}</div>;
}

export function DaysCounter({ swornInDate }: { swornInDate: string }) {
  const start = useMemo(
    () => new Date(`${swornInDate}T00:00:00+05:30`).getTime(),
    [swornInDate],
  );

  const [days, setDays] = useState(0);
  const [prevDays, setPrevDays] = useState(0);

  useEffect(() => {
    function update() {
      const d = Math.max(0, Math.floor((Date.now() - start) / 86_400_000));
      setDays((prev) => { setPrevDays(prev); return d; });
    }
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [start]);

  const cur = String(days).padStart(4, "0");
  const prv = String(prevDays).padStart(4, "0");

  return (
    <div className="dc-wrap">
      {/* ── Rounded box container ── */}
      <div className="dc-box" role="timer" aria-label={`UDF in power for ${days} days`}>
        {/* Calendar icon */}
        <span className="dc-icon" aria-hidden>
          <Calendar size={16} />
        </span>

        {/* Label — always English to keep card compact */}
        <span className="dc-label">UDF in power for</span>

        {/* Digit tiles */}
        <div className="dc-tiles" aria-hidden>
          {cur.split("").map((d, i) => (
            <FlipTile key={i} digit={d} prevDigit={prv[i]} />
          ))}
        </div>

        {/* "days" in orange — always English */}
        <span className="dc-unit">days</span>
      </div>

      {/* Since line below the box */}
      <div className="dc-since">
        <span className="dc-since-dot" aria-hidden />
        <span>Since May 18, 2026</span>
      </div>
    </div>
  );
}
