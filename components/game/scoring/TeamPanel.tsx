"use client";
import { useGameStore } from "@/store";
import { Side } from "@/store/types";
import ScoreButton from "./ScoreButton";
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

  return (
    // Folded: one card holds identity, score and timeouts, so they cost no
    // separate bands. That is where the vertical space comes from on a phone.
    // On desktop those two move out to their own rows and the card unfolds,
    // leaving the panel holding only the number.
    <div className="flex min-h-0 flex-1 flex-col gap-2 rounded-xl bg-[#3E5B64] p-2.5 text-gray-50 ring-2 ring-slate-800/30 ring-inset xl:gap-0 xl:bg-transparent xl:p-0 xl:text-inherit xl:ring-0">
      {showDetails && <TeamHeader team={team} />}
      <ScoreButton
        score={teamScore}
        disabled={gameComplete}
        increaseTeamScore={() => increaseTeamScore(team, currentSet)}
      />
      {showDetails && <TeamTimeoutControl team={team} />}
    </div>
  );
};

export default TeamPanel;
