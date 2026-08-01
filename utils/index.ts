export const TIMEOUT_DURATION = 30;
const END_SET_DURATION = 180;
const POINTS_PER_SET = 25;
const POINTS_FOR_FIFTH_SET = 15;
import { Match, TeamOptions } from "@/store/types";
type isSetCompleteReturn = {
  setWinner: TeamOptions;
  shouldSwapSides: boolean;
  isSetCompleted: boolean;
  isGameComplete?: boolean;
};

export const isSetComplete = (
  match: Match,
  currentSet: number,
): isSetCompleteReturn => {
  const { sets } = match;

  const homeScore = sets[currentSet].home.score;
  const awayScore = sets[currentSet].away.score;
  if (currentSet === 5) {
    //check for 8 points and the swap
    if (homeScore === 8 || awayScore === 8) {
      const eightPoints = match.sets[currentSet].actions.filter(
        (action) =>
          action.overallScore.away === 8 || action.overallScore.home === 8,
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
          setWinner: "home", // or "away" or null
          shouldSwapSides: true, // or false
          isSetCompleted: true, // or false
          isGameComplete: true,
        };
      } else {
        return {
          setWinner: "away", // or "away" or null
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
        setWinner: "home", // or "away" or null
        shouldSwapSides: true, // or false
        isSetCompleted: true, // or false
        isGameComplete: match.home.setsWon === 2 ? true : false,
      };
    } else {
      return {
        setWinner: "away", // or "away" or null
        shouldSwapSides: true, // or false
        isSetCompleted: true, // or false
        isGameComplete: match.away.setsWon === 2 ? true : false,
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
