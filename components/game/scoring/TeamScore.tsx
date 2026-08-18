"use client";
import { useGameStore } from "@/store";
import ScoreButton from "./ScoreButton";

const TeamScore = ({ team }: { team: "home" | "away" }) => {
  const { match, currentSet, increaseTeamScore } = useGameStore();

  const teamScore: number = match.sets[currentSet]?.[team].score;
  const gameComplete: boolean = match.gameComplete;

  return (
    <ScoreButton
      score={teamScore}
      disabled={gameComplete}
      increaseTeamScore={() => increaseTeamScore(team, currentSet)}
    />
  );
};

export default TeamScore;
