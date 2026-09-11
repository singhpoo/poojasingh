"use client";

import { useEffect, useState } from "react";

type Props = { roles: string[]; intervalMs?: number };

export default function RotatingRole({ roles, intervalMs = 2400 }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % roles.length),
      intervalMs
    );
    return () => clearInterval(id);
  }, [roles.length, intervalMs]);

  return (
    <div className="hero-role" aria-live="polite">
      {roles[index]}
      <span className="caret" aria-hidden />
    </div>
  );
}
