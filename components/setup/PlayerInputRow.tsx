import { useGameStore } from "@/store";
import { Player } from "@/store/types";
import { TrashIcon } from "lucide-react";
import { useShallow } from "zustand/shallow";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type PlayerInputRowProps = {
  team: "home" | "away";
  player: Player;
  index: number;
  hasNameError: boolean;
  hasNumberError: boolean;
  hasNameWarning: boolean;
  hasNumberWarning: boolean;
  canRemove: boolean;
  section?: "players" | "liberos";
};

export default function PlayerInputRow({
  team,
  player,
  index,
  hasNameError,
  hasNumberError,
  hasNameWarning,
  hasNumberWarning,
  canRemove,
  section = "players",
}: PlayerInputRowProps) {
  const { removeAdditionalPlayer, updatePlayer, removeLibero, updateLibero } =
    useGameStore(
      useShallow((state) => ({
        removeAdditionalPlayer: state.removeAdditionalPlayer,
        updatePlayer: state.updatePlayer,
        removeLibero: state.removeLibero,
        updateLibero: state.updateLibero,
      })),
    );

  const isLibero = section === "liberos";
  const label = isLibero ? "Libero" : "Player";
  // liberos have no minimum, so they can always be removed; players only while
  // the team is above the minimum — the roster gets sorted, so this can't key
  // off row position
  const showRemove = isLibero || canRemove;

  const handleChange = (changes: Partial<Player>) => {
    if (isLibero) updateLibero(team, player.id, changes);
    else updatePlayer(team, player.id, changes);
  };

  const handleRemove = () => {
    if (isLibero) removeLibero(team, player.id);
    else removeAdditionalPlayer(team, player.id);
  };

  return (
    <div className="col-span-3 grid grid-cols-subgrid items-center">
      <div className="grid place-items-center">
        <Label
          className="sr-only"
          htmlFor={`${team}-${section}-number-${index + 1}`}
        >
          {label} {index + 1} number
        </Label>
        <Input
          aria-invalid={hasNumberError}
          type="text"
          name={`${team}-${section}-number-${index + 1}`}
          id={`${team}-${section}-number-${index + 1}`}
          className={`placeholder:text-muted-foreground/70 w-12 text-center tabular-nums placeholder:text-sm ${
            hasNumberError
              ? "border-2 border-red-400"
              : hasNumberWarning
                ? "border-2 border-amber-400"
                : ""
          }`}
          placeholder="#"
          onChange={(e) => {
            const digits = e.target.value.replace(/\D/g, "");
            handleChange({ number: digits === "" ? null : Number(digits) });
          }}
          value={player.number ?? ""}
          pattern="[0-9]*"
          inputMode="numeric"
          maxLength={2}
          min={1}
          max={99}
        />
      </div>
      <div className={showRemove ? "col-span-1" : "col-span-2"}>
        <Label
          className="sr-only"
          htmlFor={`${team}-${section}-name-${index + 1}`}
        >
          {label} {index + 1} name
        </Label>
        <Input
          aria-invalid={hasNameError}
          type="text"
          className={`placeholder:text-muted-foreground/70 placeholder:text-sm ${
            hasNameError
              ? "border-2 border-red-400"
              : hasNameWarning
                ? "border-2 border-amber-400"
                : ""
          }`}
          placeholder={`${label} name`}
          name={`${team}-${section}-name-${index + 1}`}
          id={`${team}-${section}-name-${index + 1}`}
          onChange={(e) => handleChange({ name: e.target.value })}
          value={player.name}
        />
      </div>
      {showRemove && (
        <Button
          variant="destructive"
          size="icon"
          aria-label={`Remove ${label.toLowerCase()} ${index + 1}`}
          type="button"
          onClick={handleRemove}
        >
          <TrashIcon aria-hidden="true" />
        </Button>
      )}
    </div>
  );
}
