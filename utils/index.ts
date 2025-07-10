const TIMEOUT_DURATION = 30;
const END_SET_DURATION = 180;
// const END_SET_DURATION = 10;
let teamsHaveSwapped = false;
const POINTS_PER_SET = 25;
import { Match } from "@/store/types";
import { initialGame, initialSetData } from "../lib/data";

export const isSetComplete = (match: Match, currentSet: number) => {
  const { sets } = match;
  const { homeTeam: homeScore, awayTeam: awayScore } = sets[currentSet].score;
  if (
    (homeScore >= POINTS_PER_SET || awayScore >= POINTS_PER_SET) &&
    Math.abs(homeScore - awayScore) >= 2
  ) {
    if (homeScore > awayScore) {
      //   setServingTeam(nextServingTeam);

      return "homeTeam";
    } else {
      //   setServingTeam(nextServingTeam);
      return "awayTeam";
    }
  }
  return null;
  /* 
    check if set is complete

    yes - return someething
    no - return nothing.

    */
};

export const isSetCompletes = ({
  match,
  currentSet,
}: {
  match: Match;
  currentSet: string;
}) => {
  const { awayTeamSetsWon, homeTeamSetsWon } = match;
  const { homeTeam: homeScore, awayTeam: awayScore } =
    match.sets[currentSet].score;
  /*
    check if set is complete
    yes - return someething
    no - return nothing.
    
    */
};
