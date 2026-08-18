"use client";
import { useEffect, useRef, useState } from "react";

import History from "@/components/game/history/History";
import MatchActions from "@/components/game/history/MatchActions";
import TeamHeader from "@/components/game/scoring/TeamHeader";
import TeamScore from "@/components/game/scoring/TeamScore";
import TeamTimeoutControl from "@/components/game/scoring/TeamTimeoutControl";
import ModalManager from "@/components/modal/ModalManager";
import { useGameStore } from "@/store";
import { GameAction } from "@/store/types";

const Page = () => {
  const { teamSwappedSides: teamSwapped, match, currentSet } = useGameStore();
  const [isClient, setIsClient] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // everytime container gains children make sure it scrolls up.
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = -containerRef.current.scrollHeight;
    }
  }, [match]);

  useEffect(() => {
    // Set flag to true after initial render to indicate client-side execution
    setIsClient(true);
  }, []);
  if (!isClient) {
    // Render a placeholder or loading state until client-side code runs
    return (
      <div role="status" className="grid h-dvh w-dvw place-items-center">
        <svg
          aria-hidden="true"
          className="h-8 w-8 animate-spin fill-white text-gray-200 dark:text-gray-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
  const homeIsRight = teamSwapped;
  const awayIsRight = !teamSwapped;
  const homeCol = homeIsRight ? "col-start-2 md:col-start-3 pr-2" : "col-start-1 pl-2";
  const awayCol = awayIsRight ? "col-start-2 md:col-start-3 pr-2" : "col-start-1 pl-2";

  return (
    <div className="flex h-full flex-col gap-4 pt-3 pb-3 text-gray-800 dark:text-white">
      <div className="grid min-h-0 flex-1 grid-cols-2 grid-rows-[auto_auto_minmax(0,1fr)_auto] gap-x-4 gap-y-2 md:grid-cols-[1fr_auto_1fr]">
        {/* utility bar — swap/undo/reset/menu. Mobile only: top-right of the
            page, above team identity, since it's reached far less often
            than the score buttons. At md+ there's enough room for it to
            live between the two timeout buttons instead (see timeout row),
            so this bar disappears entirely there. */}
        <div className="col-span-2 row-start-1 flex items-center justify-end md:hidden">
          <MatchActions />
        </div>

        {/* header row */}
        <div className={`${homeCol} row-start-2`}>
          <TeamHeader team="home" />
        </div>
        <div className="row-start-2 hidden items-center justify-center md:col-start-2 md:flex">
          <h2 className="text-center text-3xl">Set {currentSet}</h2>
        </div>
        <div className={`${awayCol} row-start-2`}>
          <TeamHeader team="away" />
        </div>

        {/* score row — absorbs all spare vertical space */}
        <div className={`${homeCol} row-start-3 min-h-0`}>
          <TeamScore team="home" />
        </div>
        <div className="row-start-3 hidden h-full min-h-0 flex-col md:col-start-2 md:flex md:w-40">
          <div
            ref={containerRef}
            className="flex min-h-0 flex-1 flex-col-reverse gap-2 overflow-y-scroll py-2 sm:py-10 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {match?.sets[currentSet]?.actions?.map(
              (item: GameAction, index: number) => (
                <div
                  key={index}
                  className="text-base text-gray-950/30 last:border-gray-950 last:text-2xl last:leading-10 last:text-gray-950 md:last:text-3xl dark:border-gray-500 dark:text-gray-500 dark:last:border-gray-100 dark:last:text-gray-100"
                >
                  <History item={item} teamSwapped={teamSwapped} />
                </div>
              ),
            )}
          </div>
        </div>
        <div className={`${awayCol} row-start-3 min-h-0`}>
          <TeamScore team="away" />
        </div>

        {/* timeout row — last, right underneath the score buttons.
            Mobile: nothing needs to stay centered relative to a sibling
            here, so it's a plain justify-between row, not a grid.
            md+: MatchActions moves back in between the two timeout
            controls (matching where it lived on tablet/desktop before),
            using a real 1fr/auto/1fr grid so a timeout button's countdown
            text growing in its own track can never push it off-center. */}
        <div className="col-span-2 row-start-4 mt-2 flex items-center justify-between md:hidden">
          <div className={homeIsRight ? "order-2 pr-2" : "order-1 pl-2"}>
            <TeamTimeoutControl team="home" />
          </div>
          <div className={awayIsRight ? "order-2 pr-2" : "order-1 pl-2"}>
            <TeamTimeoutControl team="away" />
          </div>
        </div>
        <div className="col-span-2 row-start-4 mt-2 hidden items-center gap-4 md:col-span-3 md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          <div className={`flex ${homeIsRight ? "col-start-3 justify-end pr-2" : "col-start-1 justify-start pl-2"}`}>
            <TeamTimeoutControl team="home" />
          </div>
          <div className="col-start-2 flex items-center justify-center">
            <MatchActions />
          </div>
          <div className={`flex ${awayIsRight ? "col-start-3 justify-end pr-2" : "col-start-1 justify-start pl-2"}`}>
            <TeamTimeoutControl team="away" />
          </div>
        </div>
      </div>

      <ModalManager />
    </div>
  );
};

export default Page;
