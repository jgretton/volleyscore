export const TIMEOUT_DURATION = 30;
const END_SET_DURATION = 180;
const POINTS_PER_SET = 25;
const POINTS_FOR_FIFTH_SET = 15;
import { Match } from "@/store/types";
type isSetCompleteReturn = {
  setWinner: "awayTeam" | "homeTeam" | null;
  shouldSwapSides: boolean;
  isSetCompleted: boolean;
  isGameComplete?: boolean;
};

export const isSetComplete = (
  match: Match,
  currentSet: number,
): isSetCompleteReturn => {
  const { sets } = match;

  const { homeTeam: homeScore, awayTeam: awayScore } = sets[currentSet].score;
  if (currentSet === 5) {
    //check for 8 points and the swap
    if (homeScore === 8 || awayScore === 8) {
      const eightPoints = match.sets[currentSet].actions.filter(
        (action) =>
          action.overallScore.awayTeam === 8 ||
          action.overallScore.homeTeam === 8,
      );
      if (eightPoints.length === 1) {
        return {
          setWinner: null, // or "awayTeam" or null
          shouldSwapSides: true, // or false
          isSetCompleted: false, // or false
        };
      }
    }
    if (
      (homeScore >= POINTS_FOR_FIFTH_SET ||
        awayScore >= POINTS_FOR_FIFTH_SET) &&
      Math.abs(homeScore - awayScore) >= 2
    ) {
      if (homeScore > awayScore) {
        return {
          setWinner: "homeTeam", // or "awayTeam" or null
          shouldSwapSides: true, // or false
          isSetCompleted: true, // or false
          isGameComplete: true,
        };
      } else {
        return {
          setWinner: "awayTeam", // or "awayTeam" or null
          shouldSwapSides: true, // or false
          isSetCompleted: true, // or false
          isGameComplete: true,
        };
      }
    }
  }

  if (
    (homeScore >= POINTS_PER_SET || awayScore >= POINTS_PER_SET) &&
    Math.abs(homeScore - awayScore) >= 2
  ) {
    if (homeScore > awayScore) {
      return {
        setWinner: "homeTeam", // or "awayTeam" or null
        shouldSwapSides: true, // or false
        isSetCompleted: true, // or false
        isGameComplete: match.homeTeamSetsWon === 2 ? true : false,
      };
    } else {
      return {
        setWinner: "awayTeam", // or "awayTeam" or null
        shouldSwapSides: true, // or false
        isSetCompleted: true, // or false
        isGameComplete: match.awayTeamSetsWon === 2 ? true : false,
      };
    }
  }
  return {
    setWinner: null, // or "awayTeam" or null
    shouldSwapSides: false, // or false
    isSetCompleted: false, // or false
  };
  /* 
    check if set is complete

    yes - return someething
    no - return nothing.

    */
};
