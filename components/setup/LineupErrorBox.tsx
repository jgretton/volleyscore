export default function LineupErrorBox({ positions }: { positions: number[] }) {
	if (positions.length === 0) return null;

	return (
		<div
			role="alert"
			className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
		>
			<p className="font-medium">Every position needs a player.</p>
			<p className="text-red-500">
				Still to fill: {positions.join(", ")}
			</p>
		</div>
	);
}
