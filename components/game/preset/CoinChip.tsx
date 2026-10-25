"use client";
import { useState } from "react";

type Face = "heads" | "tails";

// A tool for the people at the court, not an input. The app never records
// what it landed on or who called it.
export default function CoinChip() {
  const [face, setFace] = useState<Face | null>(null);
  const [spinning, setSpinning] = useState(false);

  const toss = () => {
    if (spinning) return;
    setSpinning(true);
    setTimeout(() => {
      setFace(Math.random() < 0.5 ? "heads" : "tails");
      setSpinning(false);
    }, 900);
  };

  const label = spinning ? "Tossing" : face ? (face === "heads" ? "Heads" : "Tails") : "Toss a coin";

  return (
    <button
      type="button"
      onClick={toss}
      aria-live="polite"
      className={`inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-[13px] whitespace-nowrap transition ${
        face && !spinning
          ? "border-slate-400 font-medium text-slate-900 dark:border-white/40 dark:text-white"
          : "border-slate-300 text-slate-600 dark:border-white/20 dark:text-white/75"
      }`}
    >
      <span
        className={`size-[17px] shrink-0 rounded-full border border-black/25 bg-slate-100 ${
          spinning ? "animate-[coin-spin_0.55s_linear_infinite]" : ""
        }`}
      />
      {label}
      {face && !spinning && (
        <span aria-hidden="true" className="text-slate-400 dark:text-white/45">
          ↻
        </span>
      )}
    </button>
  );
}
