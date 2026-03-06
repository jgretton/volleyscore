import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Player, SquadError } from "@/store/types";
import { TrashIcon } from "@heroicons/react/24/outline";

interface PlayerInputProps {
  player: Player;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove?: () => void;
  error: SquadError[];
}

const PlayerInput = ({
  player,
  onChange,
  onRemove,
  error,
}: PlayerInputProps) => {
  console.log("this is the errois", error);

  const hasNumberError = error.some((error) => error.field === "number");
  const hasNameError = error.some((error) => error.field === "name");

  return (
    <div className="flex items-center gap-2">
      <Input
        type="number"
        className={cn(
          "w-12 [appearance:textfield] text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
          hasNumberError && "border-red-500",
        )}
        name="number"
        defaultValue={player.number || ""}
        placeholder="-"
        onChange={onChange}
      />
      <Input
        type="text"
        className={cn("flex-1", hasNameError && "border-red-500")}
        name="name"
        defaultValue={player.name}
        placeholder="Player name"
        onChange={onChange}
      />
      {onRemove && (
        <Button
          size="icon"
          variant="ghost"
          className="text-destructive hover:text-destructive shrink-0"
          onClick={onRemove}
        >
          <TrashIcon className="size-4" />
        </Button>
      )}
    </div>
  );
};

export default PlayerInput;
