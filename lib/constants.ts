// The setup wizard collects squads and lineups but the match page cannot
// use them yet, so an official match is currently a quick match with team
// names. Flip this when the match page can act on them.
export const ADVANCED_MATCH_ENABLED = true;

export const MIN_PLAYERS = 6;
export const MAX_PLAYERS = 12;
export const MAX_LIBEROS = 2;

export const TOTAL_STEPS = 2;
export const COURT_POSITIONS = [4, 3, 2, 5, 6, 1];
export const COURT_LEFT_POSITIONS = [5, 4, 6, 3, 1, 2];
export const COURT_RIGHT_POSITIONS = [2, 1, 3, 6, 4, 5];

// FIVB. Other rulesets differ, so this is shown rather than enforced.
export const SUBS_PER_SET = 6;
