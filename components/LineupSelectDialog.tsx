import { Player } from "@/store/types";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";

type LineupSelectDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	zone: number | null | undefined;
	players: Player[];
	teamName: string;
	assignPlayer: (player: Player) => void;
};

export default function LineupSelectDialog({
	open,
	onOpenChange,
	zone,
	players,
	teamName,
	assignPlayer,
}: LineupSelectDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="flex flex-col max-h-120 w-full sm:max-w-xl">
				<DialogHeader>
					<DialogTitle>
						{teamName}: position {zone}
					</DialogTitle>
					<DialogDescription>
						Choose the player to start in this position.
					</DialogDescription>
				</DialogHeader>
				{players.length === 0 ? (
					<p className="py-6 text-center text-sm text-muted-foreground">
						Every player is already in the lineup.
					</p>
				) : (
					<>
						<ul className="grid py-6 flex-1 gap-2 w-full min-h-0 overflow-y-auto">
							{players.map((player) => (
								<li key={player.id}>
									<Button
										type="button"
										variant="outline"
										onClick={() => assignPlayer(player)}
										className="h-auto w-full justify-start gap-3 px-2 py-2"
									>
										<span className="flex size-9 shrink-0 items-center justify-center rounded-md border bg-muted text-sm font-semibold tabular-nums">
											{player.number}
										</span>
										<span className="text-sm font-medium">{player.name}</span>
									</Button>
								</li>
							))}
						</ul>
						<p className="text-center text-muted-foreground">
							{players.length} players available{" "}
							{players.length > 5 && "· scroll to see all"}
						</p>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
}
