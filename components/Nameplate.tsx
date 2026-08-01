import { getInitials } from "@/lib/utils";
import { Player } from "@/store/types";
import { PlusIcon, XIcon } from "lucide-react";
import { Button } from "./ui/button";

type NameplateProps = {
	zone: number;
	player?: Player;
	onSelect: () => void;
	onRemove: () => void;
	errors: number[];
};

export default function Nameplate({
	zone,
	player,
	onSelect,
	onRemove,
	errors,
}: NameplateProps) {
	const hasError = errors.includes(zone);

	return (
		<div
			className={`relative size-full border p-2 ${
				player ? "border-white/40" : "border-dashed border-white/50"
			}`}
		>
			{/* the whole cell is the click target for assigning / swapping */}
			<button
				type="button"
				onClick={onSelect}
				className={`group relative size-full flex items-center justify-center rounded-md border-4 transition-colors ${
					hasError
						? "border-red-600"
						: player
							? "border-transparent bg-white/15 hover:bg-white/25"
							: "border-transparent bg-transparent hover:bg-white/10"
				}`}
			>
				{/* zone tag — anchored to the card corner */}
				<span className="absolute top-1 left-1.5 text-base font-medium text-white/50 tabular-nums">
					{zone}
				</span>

				{player ? (
					/* middle — filled when a player is assigned */
					<span className="flex flex-col items-center leading-none">
						<span className="text-3xl font-semibold text-white tabular-nums">
							{player.number}
						</span>
						<span className="mt-1 text-xs uppercase tracking-wide text-white/70">
							{getInitials(player.name)}
						</span>
					</span>
				) : (
					/* empty — plus hint appears on hover to signal "click to add" */
					<PlusIcon className="size-6 text-white/60 opacity-0 transition-opacity group-hover:opacity-100" />
				)}
			</button>

			{/* remove — overlays the card so it lines up with the zone tag; a
			    sibling of the button, so clicking it can't open the modal */}
			{player && (
				<div className="pointer-events-none absolute inset-2">
					<Button
						type="button"
						variant="ghost"
						size="icon"
						aria-label={`Remove ${player.name}`}
						onClick={onRemove}
						className="pointer-events-auto absolute top-1 right-1 size-6 rounded-full text-white/70 hover:bg-white/20 hover:text-white"
					>
						<XIcon className="size-3.5" />
					</Button>
				</div>
			)}
		</div>
	);
}
