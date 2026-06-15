import { Barlow_Condensed } from "next/font/google";
import {
  ArrowUturnLeftIcon,
  ArrowsRightLeftIcon,
  Cog6ToothIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

// ── Typography ───────────────────────────────────────────────────────────────

const scoreFont = Barlow_Condensed({
  weight: ["300"],
  subsets: ["latin"],
  display: "swap",
});

// ── Mock data ────────────────────────────────────────────────────────────────

const HOME_TEAM = "Team Volley";
const AWAY_TEAM = "Spikers FC";
const HOME_SCORE = 15;
const AWAY_SCORE = 14;
const HOME_SETS_WON = 1;
const AWAY_SETS_WON = 0;
const CURRENT_SET = 2;
const HOME_TIMEOUTS_USED = 1;
const AWAY_TIMEOUTS_USED = 0;
const SERVING_TEAM: "homeTeam" | "awayTeam" = "homeTeam";

const MOCK_HISTORY = [
  { id: 1,  team: "homeTeam", h: 1,  a: 0,  type: "score" },
  { id: 2,  team: "homeTeam", h: 2,  a: 0,  type: "score" },
  { id: 3,  team: "awayTeam", h: 2,  a: 1,  type: "score" },
  { id: 4,  team: "homeTeam", h: 3,  a: 1,  type: "score" },
  { id: 5,  team: "awayTeam", h: 3,  a: 2,  type: "score" },
  { id: 6,  team: "awayTeam", h: 3,  a: 3,  type: "score" },
  { id: 7,  team: "homeTeam", h: 4,  a: 3,  type: "score" },
  { id: 8,  team: "awayTeam", h: 4,  a: 4,  type: "score" },
  { id: 9,  team: "homeTeam", h: 4,  a: 4,  type: "timeout" },
  { id: 10, team: "homeTeam", h: 5,  a: 4,  type: "score" },
  { id: 11, team: "awayTeam", h: 5,  a: 5,  type: "score" },
  { id: 12, team: "homeTeam", h: 6,  a: 5,  type: "score" },
  { id: 13, team: "homeTeam", h: 7,  a: 5,  type: "score" },
  { id: 14, team: "awayTeam", h: 7,  a: 6,  type: "score" },
  { id: 15, team: "homeTeam", h: 8,  a: 6,  type: "score" },
  { id: 16, team: "awayTeam", h: 8,  a: 7,  type: "score" },
  { id: 17, team: "homeTeam", h: 9,  a: 7,  type: "score" },
  { id: 18, team: "awayTeam", h: 9,  a: 8,  type: "score" },
  { id: 19, team: "awayTeam", h: 9,  a: 9,  type: "score" },
  { id: 20, team: "awayTeam", h: 9,  a: 9,  type: "timeout" },
  { id: 21, team: "homeTeam", h: 10, a: 9,  type: "score" },
  { id: 22, team: "homeTeam", h: 11, a: 9,  type: "score" },
  { id: 23, team: "awayTeam", h: 11, a: 10, type: "score" },
  { id: 24, team: "homeTeam", h: 12, a: 10, type: "score" },
  { id: 25, team: "awayTeam", h: 12, a: 11, type: "score" },
  { id: 26, team: "homeTeam", h: 13, a: 11, type: "score" },
  { id: 27, team: "awayTeam", h: 13, a: 12, type: "score" },
  { id: 28, team: "awayTeam", h: 13, a: 13, type: "score" },
  { id: 29, team: "homeTeam", h: 14, a: 13, type: "score" },
  { id: 30, team: "awayTeam", h: 14, a: 14, type: "score" },
  { id: 31, team: "homeTeam", h: 15, a: 14, type: "score" },
];

// ── Sub-components ───────────────────────────────────────────────────────────

/**
 * Each row shows only the SCORING team's new score, positioned left (home) or
 * right (away). No pairs, no dash. You read the momentum by watching which side
 * numbers accumulate on. Timeout rows show as a faint centred dash.
 */
function HistoryRow({
  item,
  index,
  total,
}: {
  item: (typeof MOCK_HISTORY)[number];
  index: number;
  total: number;
}) {
  const age = total - 1 - index; // 0 = most recent
  const isLatest = age === 0;
  const isHome = item.team === "homeTeam";

  // Aggressive fade — only the last 3-4 rows read clearly
  const opacity =
    age === 0 ? "opacity-100" :
    age === 1 ? "opacity-50" :
    age === 2 ? "opacity-25" :
    age <= 5  ? "opacity-[0.12]" :
                "opacity-[0.04]";

  if (item.type === "timeout") {
    return (
      <div className={`flex shrink-0 items-center justify-center py-1.5 ${opacity}`}>
        <div className="h-px w-4 bg-neutral-300 dark:bg-neutral-700" />
      </div>
    );
  }

  const displayScore = isHome ? item.h : item.a;

  return (
    <div className={`flex shrink-0 items-center px-1 py-px ${opacity} ${isHome ? "justify-start" : "justify-end"}`}>
      <span
        className={`${scoreFont.className} tabular-nums leading-none text-neutral-900 dark:text-neutral-100 ${
          isLatest ? "text-2xl" : "text-sm"
        }`}
      >
        {displayScore}
      </span>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const homeServing = SERVING_TEAM === "homeTeam";
  const awayServing = SERVING_TEAM === "awayTeam";

  const tealBar = "bg-[#3E5B64] dark:bg-[#7ABAC8]";
  const pipActive = "border-[#3E5B64] bg-[#3E5B64]/15 dark:border-[#7ABAC8] dark:bg-[#7ABAC8]/15";
  const pipInactive = "border-neutral-300 dark:border-neutral-600";

  // Shared footer button style
  const footerBtn = "flex flex-1 flex-col items-center justify-center gap-1 py-2 min-h-[3.25rem] text-neutral-400 transition-colors hover:text-neutral-700 active:text-neutral-900 dark:text-neutral-600 dark:hover:text-neutral-300 dark:active:text-neutral-100";
  const footerDivider = "border-l border-neutral-200 dark:border-white/[0.06]";

  return (
    <div className="grid h-dvh grid-cols-[1fr_auto_1fr] grid-rows-[1fr_auto] overflow-hidden bg-neutral-100 dark:bg-[#15202b]">

      {/* ── Home score panel ──────────────────────────────────────────────── */}
      <button
        className="group relative flex cursor-pointer flex-col items-center justify-center bg-white transition-colors duration-100 active:bg-neutral-50 dark:bg-[#1b2c3a] dark:active:bg-[#243747]"
        aria-label={`Score point for ${HOME_TEAM}`}
      >
        {/* Serving bar */}
        <div
          className={`absolute inset-x-0 top-0 h-[3px] transition-opacity duration-300 ${tealBar} ${
            homeServing ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Team name — top-left */}
        <span className="absolute top-4 left-4 max-w-[90%] truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400 dark:text-neutral-600 sm:top-5 sm:text-xs">
          {HOME_TEAM}
        </span>

        {/* Score */}
        <span
          className={`${scoreFont.className} select-none leading-none text-neutral-900 dark:text-neutral-100 text-[clamp(5rem,20vw,15rem)]`}
        >
          {HOME_SCORE}
        </span>

        {/* Timeout pips — bottom-left */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 sm:bottom-5">
          {[0, 1].map((i) => (
            <span
              key={i}
              className={`size-3 rounded-sm border transition-colors sm:size-3.5 ${
                i < HOME_TIMEOUTS_USED ? pipActive : pipInactive
              }`}
            />
          ))}
        </div>
      </button>

      {/* ── Center column ─────────────────────────────────────────────────── */}
      <div className="flex w-14 flex-col overflow-hidden border-x border-neutral-200 bg-neutral-100 dark:border-white/[0.06] dark:bg-[#15202b] sm:w-20 md:w-36 lg:w-44">

        {/* Set context */}
        <div className="shrink-0 pt-3 text-center">
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-neutral-400 dark:text-neutral-600">
            Set {CURRENT_SET}
          </p>
          <p className={`${scoreFont.className} text-lg leading-tight text-neutral-600 dark:text-neutral-400`}>
            {HOME_SETS_WON}
            <span className="mx-px text-xs text-neutral-300 dark:text-neutral-700">–</span>
            {AWAY_SETS_WON}
          </p>
        </div>

        {/* History — newest at bottom */}
        <div className="flex min-h-0 flex-1 flex-col justify-end overflow-y-auto py-3">
          {MOCK_HISTORY.map((item, index) => (
            <HistoryRow
              key={item.id}
              item={item}
              index={index}
              total={MOCK_HISTORY.length}
            />
          ))}
        </div>
      </div>

      {/* ── Away score panel ──────────────────────────────────────────────── */}
      <button
        className="group relative flex cursor-pointer flex-col items-center justify-center bg-white transition-colors duration-100 active:bg-neutral-50 dark:bg-[#1b2c3a] dark:active:bg-[#243747]"
        aria-label={`Score point for ${AWAY_TEAM}`}
      >
        {/* Serving bar */}
        <div
          className={`absolute inset-x-0 top-0 h-[3px] transition-opacity duration-300 ${tealBar} ${
            awayServing ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Team name — top-right */}
        <span className="absolute top-4 right-4 max-w-[90%] truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400 dark:text-neutral-600 sm:top-5 sm:text-xs">
          {AWAY_TEAM}
        </span>

        {/* Score */}
        <span
          className={`${scoreFont.className} select-none leading-none text-neutral-900 dark:text-neutral-100 text-[clamp(5rem,20vw,15rem)]`}
        >
          {AWAY_SCORE}
        </span>

        {/* Timeout pips — bottom-right */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1.5 sm:bottom-5">
          {[0, 1].map((i) => (
            <span
              key={i}
              className={`size-3 rounded-sm border transition-colors sm:size-3.5 ${
                i < AWAY_TIMEOUTS_USED ? pipActive : pipInactive
              }`}
            />
          ))}
        </div>
      </button>

      {/* ── Full-width controls footer ─────────────────────────────────────── */}
      {/*
        Spans all 3 columns. Each action is always visible with icon + label —
        no discovery tax, no hidden menus. Visually subordinate: muted color,
        slim height, sits clearly below the scoring area.
      */}
      <div className="col-span-3 flex items-stretch border-t border-neutral-200 bg-neutral-100 dark:border-white/[0.06] dark:bg-[#15202b]">

        {/* Undo — most frequent, given slightly more visual weight */}
        <button
          className={`${footerBtn} text-neutral-500 hover:text-neutral-800 dark:text-neutral-500 dark:hover:text-neutral-200`}
          aria-label="Undo last action"
        >
          <ArrowUturnLeftIcon className="size-[1.05rem] shrink-0" />
          <span className="text-[10px] font-medium tracking-wide">Undo</span>
        </button>

        <button className={`${footerBtn} ${footerDivider}`} aria-label="Swap sides">
          <ArrowsRightLeftIcon className="size-4 shrink-0" />
          <span className="text-[10px] font-medium tracking-wide">Swap</span>
        </button>

        <button className={`${footerBtn} ${footerDivider}`} aria-label="Settings">
          <Cog6ToothIcon className="size-4 shrink-0" />
          <span className="text-[10px] font-medium tracking-wide">Settings</span>
        </button>

        {/* Reset — separated slightly to signal danger; same visual weight for now */}
        <button className={`${footerBtn} ${footerDivider}`} aria-label="Reset match">
          <XCircleIcon className="size-4 shrink-0" />
          <span className="text-[10px] font-medium tracking-wide">Reset</span>
        </button>

      </div>

    </div>
  );
}
