import { COURT_POSITIONS } from "@/lib/constants";
import { GameAction, Player, SetData, Side, TeamOptions } from "@/store/types";

// Nothing here is stored. Rotation is a view of the action log, which means
// undo rolls it back on its own and there is no second copy to drift.

// Only scores are rallies. Timeouts share the log, and counting one as a
// rally would shift every server after it.
const ralliesOf = (actions: GameAction[]) =>
  actions.filter((action) => action.type === "score");

// Rally one is the set's first server. After that the winner of a rally
// serves the next, and the log already records every winner.
export const serverOfEachRally = (
  actions: GameAction[],
  firstServer: TeamOptions,
): TeamOptions[] => {
  const servers: TeamOptions[] = [];
  let server = firstServer;

  for (const rally of ralliesOf(actions)) {
    servers.push(server);
    server = rally.team;
  }

  return servers;
};

// A team rotates when it wins a rally it did not serve, which is a side-out.
// Holding your own serve never moves anybody.
export const rotationsOf = (
  actions: GameAction[],
  firstServer: TeamOptions,
  team: Side,
): number => {
  // Without a first server nobody knows who served rally one, so there is no
  // honest answer. A basic match is the case that gets here: no toss, no
  // lineup, nothing to rotate.
  if (!firstServer) return 0;

  const rallies = ralliesOf(actions);
  const servers = serverOfEachRally(actions, firstServer);
  let rotations = 0;

  for (let index = 0; index < rallies.length; index++) {
    if (rallies[index].team === team && servers[index] !== team) rotations++;
  }

  return rotations;
};

// Players move clockwise: 2 into 1, 1 into 6, 6 into 5, and so on. So the
// starting slot standing in a zone is that zone shifted by the rotation count.
export const SLOTS = [1, 2, 3, 4, 5, 6];

export const slotInZone = (zone: number, rotations: number): number =>
  ((zone - 1 + rotations) % 6) + 1;

// Rotation moves slots around the court. A substitution changes who fills a
// slot. Keeping the two apart is what lets both stay this simple.
export const subsInSlot = (
  actions: GameAction[],
  team: Side,
  slot: number,
): GameAction[] =>
  actions.filter(
    (action) =>
      action.type === "sub" && action.team === team && action.slot === slot,
  );

export const subsUsedBy = (actions: GameAction[], team: Side): number =>
  actions.filter((action) => action.type === "sub" && action.team === team)
    .length;

// Who is standing in a slot now: the starter, then every change made to that
// slot replayed in order.
export const occupantOfSlot = (
  setData: SetData,
  team: Side,
  slot: number,
): string | null => {
  let playerId =
    setData.lineup[team].find((position) => position.position === slot)
      ?.playerId ?? null;

  for (const action of subsInSlot(setData.actions, team, slot)) {
    playerId = action.playerIn ?? null;
  }

  return playerId;
};

// The rules are enforced by what this offers rather than by an error. A slot
// takes at most two changes: the starter out, then only that starter back.
// Anyone who has already been on or off this set cannot appear elsewhere.
export const eligibleFor = (
  setData: SetData,
  team: Side,
  slot: number,
  squad: Player[],
): Player[] => {
  const changes = subsInSlot(setData.actions, team, slot);
  if (changes.length >= 2) return [];

  const starter =
    setData.lineup[team].find((position) => position.position === slot)
      ?.playerId ?? null;

  if (changes.length === 1) {
    return squad.filter((player) => player.id === starter);
  }

  const onCourt: (string | null)[] = [];
  for (const position of SLOTS) {
    onCourt.push(occupantOfSlot(setData, team, position));
  }

  const alreadyInvolved: string[] = [];
  for (const action of setData.actions) {
    if (action.type !== "sub" || action.team !== team) continue;
    if (action.playerIn) alreadyInvolved.push(action.playerIn);
    if (action.playerOut) alreadyInvolved.push(action.playerOut);
  }

  return squad.filter(
    (player) =>
      !onCourt.includes(player.id) && !alreadyInvolved.includes(player.id),
  );
};

export type ZoneOccupant = {
  zone: number;
  playerId: string | null;
  serving: boolean;
};

// What the scoreboard asks for: who stands in each zone right now, in the
// order the court is drawn, and which of them is about to serve.
export const courtFor = (setData: SetData, team: Side): ZoneOccupant[] => {
  const rotations = rotationsOf(setData.actions, setData.firstServer, team);
  const rallies = ralliesOf(setData.actions);
  const lastWinner = rallies[rallies.length - 1]?.team;
  // Same reasoning as above: with no first server there is no serve to mark.
  const serving =
    !!setData.firstServer && (lastWinner ?? setData.firstServer) === team;

  return COURT_POSITIONS.map((zone) => ({
    zone,
    playerId: occupantOfSlot(setData, team, slotInZone(zone, rotations)),
    // Only zone 1 serves, and only for the team holding the serve.
    serving: serving && zone === 1,
  }));
};
