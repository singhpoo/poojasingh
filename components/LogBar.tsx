"use client";

import { useEffect, useState } from "react";
import { logLines } from "@/lib/data";

export default function LogBar() {
  const [index, setIndex] = useState(0);
  const [eps, setEps] = useState(11942);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const lineId = setInterval(
      () => setIndex((i) => (i + 1) % logLines.length),
      2800
    );
    const epsId = setInterval(() => {
      setEps((v) => {
        const next = v + Math.round((Math.random() - 0.45) * 900);
        return Math.min(15999, Math.max(8500, next));
      });
    }, 1200);
    return () => {
      clearInterval(lineId);
      clearInterval(epsId);
    };
  }, []);

  if (dismissed) return null;

  return (
    <div className="logbar" role="status" aria-label="live log tail">
      <span className="eps">{eps.toLocaleString()} ev/s</span>
      <span className="line" key={index}>
        {logLines[index]}
      </span>
      <button
        className="close"
        onClick={() => setDismissed(true)}
        aria-label="dismiss log bar"
        type="button"
      >
        ✕
      </button>
    </div>
  );
}
