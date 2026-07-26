import { Schibsted_Grotesk } from "next/font/google";

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const Page = () => {
  return (
    <div
      className={`${schibsted.className} flex h-dvh w-screen flex-col overflow-hidden text-[#15181C] antialiased`}
    >
      {/* Main scoring area */}
      <div className="relative flex flex-1 overflow-hidden portrait:flex-col landscape:flex-row">

        {/* ── TEAM A (top in portrait / left in landscape) ── */}
        <div className="relative flex flex-1 cursor-pointer flex-col bg-[#E9F1F1] transition-colors active:bg-[#DAE8E9] portrait:px-7 portrait:pb-5 portrait:pt-[52px] landscape:border-r landscape:border-black/[.08] landscape:px-6 landscape:pb-[50px] landscape:pt-5">

          {/* Name + serving indicator */}
          <div className="flex items-center justify-between">
            <span className="text-[17px] font-bold tracking-[-0.01em]">
              Lincoln Cannons
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(46,94,110,.22)] bg-white/80 px-2 py-0.5"
              style={{ animation: "none" }}
            >
              <span
                className="size-[6px] rounded-full bg-[#2E5E6E]"
                style={{ animation: "srv 1.8s ease-in-out infinite" }}
              />
              <span className="text-[8.5px] font-bold tracking-[.12em] text-[#2E5E6E]">
                SERVING
              </span>
            </span>
          </div>

          {/* Giant score */}
          <div className="grid flex-1 place-items-center">
            <span
              className="font-extrabold leading-[.82] tracking-[-0.06em] tabular-nums text-[#2E5E6E] portrait:text-[min(48vw,192px)] landscape:text-[min(46vh,180px)]"
            >
              21
            </span>
          </div>

          {/* Bottom strip: sets won + tap hint / action buttons */}
          <div className="flex items-center justify-between">
            {/* Sets dots (always visible) */}
            <div className="flex gap-[5px]">
              <span className="size-[8px] rounded-full bg-[#2E5E6E]" />
              <span className="size-[8px] rounded-full border-[1.5px] border-[rgba(46,94,110,.4)]" />
              <span className="size-[8px] rounded-full border-[1.5px] border-[rgba(46,94,110,.4)]" />
            </div>

            {/* Portrait: tap hint */}
            <span className="text-[10.5px] font-bold tracking-[.14em] text-[rgba(46,94,110,.6)] landscape:hidden">
              TAP TO SCORE
            </span>

            {/* Landscape: action buttons */}
            <div className="hidden items-center gap-[7px] landscape:flex">
              <button className="inline-flex items-center gap-1 rounded-[10px] border border-[rgba(46,94,110,.18)] bg-white/80 px-[11px] py-2 text-[11px] font-semibold text-[#2E5E6E]">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
                </svg>
                T/O
              </button>
              <button className="inline-flex items-center gap-1 rounded-[10px] border border-[rgba(46,94,110,.18)] bg-white/80 px-[11px] py-2 text-[11px] font-semibold text-[#2E5E6E]">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 8h13l-3-3" /><path d="M20 16H7l3 3" />
                </svg>
                Sub
              </button>
              <button className="inline-flex items-center justify-center rounded-[10px] border border-black/10 bg-white/80 px-[10px] py-2 text-[11px] font-semibold text-[#6E7178]">
                −1
              </button>
            </div>
          </div>

          {/* Portrait: undo button (absolute) */}
          <button className="absolute right-[22px] top-[54px] grid size-8 place-items-center rounded-full border border-[rgba(46,94,110,.15)] bg-white/70 text-lg leading-none text-[#2E5E6E] landscape:hidden">
            −
          </button>
        </div>

        {/* ── CENTER PILL — portrait (floats at the seam) ── */}
        <div className="pointer-events-none absolute left-0 right-0 top-1/2 z-10 landscape:hidden" style={{ height: 0 }}>
          <div className="pointer-events-auto absolute left-1/2 top-0 flex h-[52px] w-[200px] -translate-x-1/2 -translate-y-1/2 items-center justify-between gap-2 rounded-[26px] border border-black/10 bg-white px-[18px] shadow-[0_8px_24px_-8px_rgba(21,24,28,.28)]">
            {/* Serve direction */}
            <div className="inline-flex items-center gap-1 rounded-full border border-[rgba(46,94,110,.22)] bg-[#E9F1F1] px-2 py-1">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#2E5E6E">
                <path d="M14 6l-8 6 8 6z" />
              </svg>
              <span className="text-[8.5px] font-bold tracking-[.1em] text-[#2E5E6E]">
                LIN
              </span>
            </div>
            {/* Sets score */}
            <div className="flex items-center gap-2 text-[22px] font-extrabold tabular-nums">
              <span className="text-[#2E5E6E]">1</span>
              <span className="text-base font-normal text-[#CFCCC4]">–</span>
              <span className="text-[#BE6A4C]">1</span>
            </div>
            {/* Swap sides */}
            <button className="grid size-7 place-items-center rounded-lg border border-black/10 bg-[#F4F2ED]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6E7178" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 8h13l-3-3" /><path d="M20 16H7l3 3" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── CENTER PILL — landscape (floats at net line) ── */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 landscape:block">
          <div className="pointer-events-auto flex w-[108px] flex-col items-center gap-2 rounded-[20px] border border-black/[.12] bg-white px-[14px] py-[10px] shadow-[0_12px_32px_-12px_rgba(21,24,28,.35)]">
            <div className="flex items-center gap-[7px] text-[22px] font-extrabold tabular-nums">
              <span className="text-[#2E5E6E]">1</span>
              <span className="text-base font-normal text-[#CFCCC4]">–</span>
              <span className="text-[#BE6A4C]">1</span>
            </div>
            <span className="text-[8px] font-bold tracking-[.16em] text-[#B9B6AE]">
              SET 3
            </span>
            <div className="inline-flex items-center gap-1 rounded-full border border-[rgba(46,94,110,.2)] bg-[#E9F1F1] px-2 py-1">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="#2E5E6E">
                <path d="M14 6l-8 6 8 6z" />
              </svg>
              <span className="text-[8px] font-bold tracking-[.1em] text-[#2E5E6E]">
                SERVE
              </span>
            </div>
          </div>
        </div>

        {/* ── TEAM B (bottom in portrait / right in landscape) ── */}
        <div className="relative flex flex-1 cursor-pointer flex-col bg-[#F8ECE5] transition-colors active:bg-[#EFD9CC] portrait:px-7 portrait:pb-[80px] portrait:pt-[26px] landscape:px-6 landscape:pb-[50px] landscape:pt-5">

          {/* Portrait: top strip (inverted — tap hint + sets) */}
          <div className="mb-auto flex items-center justify-between landscape:hidden">
            <span className="text-[10.5px] font-bold tracking-[.14em] text-[rgba(190,106,76,.6)]">
              TAP TO SCORE
            </span>
            <div className="flex gap-[5px]">
              <span className="size-[8px] rounded-full bg-[#BE6A4C]" />
              <span className="size-[8px] rounded-full border-[1.5px] border-[rgba(190,106,76,.4)]" />
              <span className="size-[8px] rounded-full border-[1.5px] border-[rgba(190,106,76,.4)]" />
            </div>
          </div>

          {/* Landscape: name (right-aligned) */}
          <div className="hidden justify-end landscape:flex">
            <span className="text-[17px] font-bold tracking-[-0.01em]">
              Riverside FC
            </span>
          </div>

          {/* Giant score */}
          <div className="grid flex-1 place-items-center">
            <span
              className="font-extrabold leading-[.82] tracking-[-0.06em] tabular-nums text-[#BE6A4C] portrait:text-[min(48vw,192px)] landscape:text-[min(46vh,180px)]"
            >
              16
            </span>
          </div>

          {/* Bottom strip */}
          <div className="flex items-center justify-between">
            {/* Landscape: action buttons */}
            <div className="hidden items-center gap-[7px] landscape:flex">
              <button className="inline-flex items-center gap-1 rounded-[10px] border border-[rgba(190,106,76,.18)] bg-white/80 px-[11px] py-2 text-[11px] font-semibold text-[#BE6A4C]">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
                </svg>
                T/O
              </button>
              <button className="inline-flex items-center gap-1 rounded-[10px] border border-[rgba(190,106,76,.18)] bg-white/80 px-[11px] py-2 text-[11px] font-semibold text-[#BE6A4C]">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 8h13l-3-3" /><path d="M20 16H7l3 3" />
                </svg>
                Sub
              </button>
              <button className="inline-flex items-center justify-center rounded-[10px] border border-black/10 bg-white/80 px-[10px] py-2 text-[11px] font-semibold text-[#6E7178]">
                −1
              </button>
            </div>

            {/* Landscape: sets dots */}
            <div className="hidden gap-[5px] landscape:flex">
              <span className="size-[8px] rounded-full bg-[#BE6A4C]" />
              <span className="size-[8px] rounded-full border-[1.5px] border-[rgba(190,106,76,.4)]" />
              <span className="size-[8px] rounded-full border-[1.5px] border-[rgba(190,106,76,.4)]" />
            </div>

            {/* Portrait: team name (right-aligned) */}
            <span className="ml-auto text-[17px] font-bold tracking-[-0.01em] landscape:hidden">
              Riverside FC
            </span>
          </div>

          {/* Portrait: undo button (absolute) */}
          <button className="absolute right-[22px] top-[18px] grid size-8 place-items-center rounded-full border border-[rgba(190,106,76,.15)] bg-white/70 text-lg leading-none text-[#BE6A4C] landscape:hidden">
            −
          </button>
        </div>

        {/* ── PORTRAIT: BOTTOM ACTION BAR ── */}
        <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between gap-2.5 border-t border-black/[.08] bg-[rgba(250,249,247,.98)] px-5 pb-7 pt-3 landscape:hidden">
          {/* Team A */}
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-[5px] rounded-[11px] border border-[rgba(46,94,110,.2)] bg-[#F3F7F7] px-3 py-[9px] text-xs font-semibold text-[#2E5E6E]">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
              </svg>
              T/O
            </button>
            <button className="inline-flex items-center gap-[5px] rounded-[11px] border border-[rgba(46,94,110,.2)] bg-[#F3F7F7] px-3 py-[9px] text-xs font-semibold text-[#2E5E6E]">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 8h13l-3-3" /><path d="M20 16H7l3 3" />
              </svg>
              Sub
            </button>
          </div>

          {/* Center: history pull handle */}
          <button className="flex flex-col items-center gap-1">
            <div className="h-1 w-8 rounded-sm bg-[#CFCCC4]" />
            <span className="inline-flex items-center gap-[5px]">
              <span
                className="size-1.5 rounded-full bg-[#3DA35D]"
                style={{ animation: "live 1.6s ease-in-out infinite" }}
              />
              <span className="text-[9.5px] font-bold tracking-[.08em] text-[#3DA35D]">
                21–16
              </span>
            </span>
          </button>

          {/* Team B */}
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-[5px] rounded-[11px] border border-[rgba(190,106,76,.2)] bg-[#FBF1EB] px-3 py-[9px] text-xs font-semibold text-[#BE6A4C]">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 8h13l-3-3" /><path d="M20 16H7l3 3" />
              </svg>
              Sub
            </button>
            <button className="inline-flex items-center gap-[5px] rounded-[11px] border border-[rgba(190,106,76,.2)] bg-[#FBF1EB] px-3 py-[9px] text-xs font-semibold text-[#BE6A4C]">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
              </svg>
              T/O
            </button>
          </div>
        </div>

        {/* ── LANDSCAPE: HISTORY STRIP ── */}
        <div className="absolute bottom-0 left-0 right-0 z-[5] hidden h-[38px] items-center gap-3.5 border-t border-black/[.07] bg-[rgba(250,249,247,.97)] px-[18px] landscape:flex">
          <span className="inline-flex items-center gap-[5px]">
            <span
              className="size-[6px] rounded-full bg-[#3DA35D]"
              style={{ animation: "live 1.6s ease-in-out infinite" }}
            />
            <span className="text-[9.5px] font-bold tracking-[.08em] text-[#3DA35D]">
              LIVE 21–16
            </span>
          </span>
          <div className="flex flex-1 items-center gap-[7px] overflow-hidden">
            <span className="whitespace-nowrap rounded-[6px] border border-[rgba(46,94,110,.18)] bg-[#F3F7F7] px-2 py-[3px] text-[9.5px] font-bold tabular-nums text-[#2E5E6E]">
              SET 1 · 25–22
            </span>
            <span className="whitespace-nowrap rounded-[6px] border border-[rgba(190,106,76,.2)] bg-[#FBF1EB] px-2 py-[3px] text-[9.5px] font-bold tabular-nums text-[#BE6A4C]">
              SET 2 · 23–25
            </span>
            <span className="flex items-center gap-1 whitespace-nowrap rounded-[6px] border border-black/[.08] bg-[#FAF9F7] px-2 py-[3px]">
              <span className="size-[5px] rounded-full bg-[#BE6A4C]" />
              <span className="text-[9.5px] font-semibold text-[#6E7178]">16–15</span>
            </span>
            <span className="flex items-center gap-1 whitespace-nowrap rounded-[6px] border-[1.5px] border-[#2E5E6E] bg-white px-2 py-[3px]">
              <span className="size-[5px] rounded-full bg-[#2E5E6E]" />
              <span className="text-[9.5px] font-bold text-[#2E5E6E]">21–16</span>
            </span>
          </div>
          <button className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-black/10 bg-white px-[9px] py-1 text-[9.5px] font-semibold text-[#6E7178]">
            All
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Page;
