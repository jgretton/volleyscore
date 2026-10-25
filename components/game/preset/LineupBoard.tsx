"use client";
import LineupSelectDialog from "@/components/game/lineup/LineupSelectDialog";
import TeamCourt from "@/components/game/lineup/TeamCourt";
import { getUnselectedPlayers } from "@/lib/lineup";
import { useGameStore } from "@/store";
import { Player, Side } from "@/store/types";
import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { useShallow } from "zustand/shallow";

const TeamTab = ({
  team,
  active,
  onSelect,
}: {
  team: Side;
  active: boolean;
  onSelect: () => void;
}) => {
  const { name, placed } = useGameStore(
    useShallow((state) => ({
      name: state.match[team].name,
      placed: state.match.sets[state.currentSet].lineup[team].filter(
        (slot) => slot.playerId !== null,
      ).length,
    })),
  );

  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onSelect}
      className={`flex flex-1 cursor-pointer items-center justify-center gap-1.5 overflow-hidden rounded-lg px-2 py-2.5 text-[13px] font-medium transition ${
        active
          ? "bg-[#3E5B64] text-white"
          : "bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-white/60"
      }`}
    >
      <span className="truncate">{name}</span>
      {placed === 6 && (
        <CheckIcon className="size-3.5 shrink-0 text-green-500" />
      )}
    </button>
  );
};

export default function LineupBoard({ leftTeam, rightTeam }: { leftTeam: Side; rightTeam: Side }) {
  const { matchTeams, lineup, assignPlayer } = useGameStore(
    useShallow((state) => ({
      matchTeams: state.match,
      lineup: state.match.sets[state.currentSet].lineup,
      assignPlayer: state.assignPlayerToStartingLineup,
    })),
  );

  const [activeTab, setActiveTab] = useState<Side>(leftTeam);
  const [target, setTarget] = useState<{ team: Side; position: number } | null>(
    null,
  );

  const choose = (player: Player) => {
    if (!target) return;
    assignPlayer(target.team, target.position, player.id);
    setTarget(null);
  };

  const available = target
    ? getUnselectedPlayers(matchTeams[target.team].players, lineup[target.team])
    : [];

  return (
    <div>
      {/* Below md only one court fits, so the tabs pick which. From md up both
          are on screen and the tabs have nothing to do. */}
      <div role="tablist" className="mb-3 flex gap-1.5 md:hidden">
        <TeamTab
          team={leftTeam}
          active={activeTab === leftTeam}
          onSelect={() => setActiveTab(leftTeam)}
        />
        <TeamTab
          team={rightTeam}
          active={activeTab === rightTeam}
          onSelect={() => setActiveTab(rightTeam)}
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {[leftTeam, rightTeam].map((team) => (
          <div
            key={team}
            className={activeTab === team ? "" : "hidden md:block"}
          >
            <p className="mb-2 hidden items-center gap-2 truncate rounded-xl bg-[#3E5B64] px-3.5 py-2.5 text-[15px] font-medium text-white md:flex">
              <span className="truncate">{matchTeams[team].name}</span>
              <span className="ml-auto shrink-0 text-[13px] text-white/55 tabular-nums">
                {lineup[team].filter((slot) => slot.playerId !== null).length ===
                6 ? (
                  <CheckIcon className="size-4 text-green-400" />
                ) : (
                  `${lineup[team].filter((slot) => slot.playerId !== null).length}/6`
                )}
              </span>
            </p>
            <TeamCourt
              team={team}
              onPick={(position) => setTarget({ team, position })}
            />
          </div>
        ))}
      </div>

      <p className="mt-2.5 text-center text-xs text-slate-500 dark:text-white/35">
        Tap a position to choose a player
      </p>

      <LineupSelectDialog
        open={!!target}
        onOpenChange={(open: boolean) => !open && setTarget(null)}
        zone={target?.position}
        players={available}
        teamName={target ? matchTeams[target.team].name : ""}
        assignPlayer={choose}
      />
    </div>
  );
}
