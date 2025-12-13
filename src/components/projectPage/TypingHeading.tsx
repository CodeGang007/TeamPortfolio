"use client";

import { useEffect, useState } from "react";

export default function TypingHeading({
  text,
}: {
  text: string;
}) {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, 120);

    return () => clearInterval(interval);
  }, [text]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((v) => !v);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <h1 className="mb-3 text-4xl font-bold text-slate-900">
      {displayed}
      <span className="ml-1 inline-block w-[10px]">
        {showCursor && <span className="text-teal-700">|</span>}
      </span>
    </h1>
  );
}
