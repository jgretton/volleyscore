"use client";
import { useGameStore } from "@/store";
import { Side } from "@/store/types";
import RotationCourt from "./RotationCourt";
import ScoreButton from "./ScoreButton";
import SubstituteControl from "./SubstituteControl";
import TeamHeader from "./TeamHeader";
import TeamTimeoutControl from "./TeamTimeoutControl";

const TeamPanel = ({
  team,
  showDetails,
}: {
  team: Side;
  showDetails: boolean;
}) => {
  const { match, currentSet, increaseTeamScore } = useGameStore();

  const teamScore: number = match.sets[currentSet]?.[team].score;
  const gameComplete: boolean = match.gameComplete;

  // An advanced match shows its six under the score. Basic has no lineup, so
  // there is nothing to draw and the panel behaves exactly as it always has.
  const showCourt =
    match.mode === "advanced" &&
    match.sets[currentSet]?.lineup[team].some((slot) => slot.playerId !== null);

  return (
    // Folded: one card holds identity, score and timeouts, so they cost no
    // separate bands. That is where the vertical space comes from on a phone.
    // On desktop those two move out to their own rows and the card unfolds,
    // leaving the panel holding only the number. A court is a second thing to
    // hold, so with one on screen the card stays folded at every width.
    <div
      className={`flex min-h-0 flex-1 flex-col gap-2 rounded-xl bg-[#3E5B64] p-2.5 text-gray-50 ring-2 ring-slate-800/30 ring-inset ${
        showCourt
          ? "xl:gap-4 xl:p-5"
          : "xl:gap-0 xl:bg-transparent xl:p-0 xl:text-inherit xl:ring-0"
      }`}
    >
      {showDetails && <TeamHeader team={team} />}
      <ScoreButton
        score={teamScore}
        disabled={gameComplete}
        framed={!showCourt}
        increaseTeamScore={() => increaseTeamScore(team, currentSet)}
      />
      {showCourt && <RotationCourt team={team} />}
      {showCourt && <SubstituteControl team={team} />}
      {showDetails && <TeamTimeoutControl team={team} />}
    </div>
  );
};

export default TeamPanel;
