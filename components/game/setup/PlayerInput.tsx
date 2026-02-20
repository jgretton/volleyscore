import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Player } from "@/store/types";
import { TrashIcon } from "@heroicons/react/24/outline";

interface PlayerInputProps {
  player: Player;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove?: () => void;
}

const PlayerInput = ({ player, onChange, onRemove }: PlayerInputProps) => {
  return (
    <div className="flex items-center gap-2">
      <Input
        type="number"
        className="w-12 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        name="number"
        defaultValue={player.number || ""}
        placeholder="-"
        onChange={onChange}
      />
      <Input
        type="text"
        className="flex-1"
        name="name"
        defaultValue={player.name}
        placeholder="Player name"
        onChange={onChange}
      />
      {onRemove && (
        <Button
          size="icon"
          variant="ghost"
          className="shrink-0 text-destructive hover:text-destructive"
          onClick={onRemove}
        >
          <TrashIcon className="size-4" />
        </Button>
      )}
    </div>
  );
};

export default PlayerInput;