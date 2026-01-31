"use client";

import { useEffect, useState } from "react";

const fonts = [
  { label: "Calibri", className: "font-calibri" },
  { label: "Italianno", className: "font-cursive" },
  { label: "Bodoni Moda", className: "font-bodoni" },
  { label: "Jersey 10", className: "font-pixel" },
];

const NAME = "Jashwanth SA";

export function TypewriterName() {
  const [displayed, setDisplayed] = useState("");
  const [fontIndex, setFontIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleTick = () => {
      if (phase === "typing") {
        if (displayed.length < NAME.length) {
          setDisplayed(NAME.slice(0, displayed.length + 1));
        } else {
          setPhase("pausing");
        }
      } else if (phase === "deleting") {
        if (displayed.length > 0) {
          setDisplayed(NAME.slice(0, displayed.length - 1));
        } else {
          // Move to next font and start typing again
          setPhase("typing");
          setFontIndex((prev) => (prev + 1) % fonts.length);
        }
      }
    };

    if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("deleting"), 2000);
    } else {
      const speed = phase === "typing" ? 120 : 60;
      timeout = setTimeout(handleTick, speed);
    }

    return () => clearTimeout(timeout);
  }, [displayed, phase]);

  return (
    <div className="flex items-center gap-2 text-4xl sm:text-5xl font-medium min-h-[1.2em]">
      <span 
        className={`${fonts[fontIndex].className} transition-opacity duration-200`}
        aria-label={NAME}
      >
        {displayed}
      </span>
      <span className="h-10 w-[3px] animate-pulse bg-current" />
    </div>
  );
}