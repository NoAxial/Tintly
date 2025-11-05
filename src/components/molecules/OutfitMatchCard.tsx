import React from "react";
import Card from "../ui/Card";
import Swatch from "../ui/Swatch";

type Props = {
	leftImage: string;
	rightImage: string;
	score: number;
	palette?: string[];
	saveFavorite?: () => void;
};

export default function OutfitMatchCard({ leftImage, rightImage, score, palette, saveFavorite }: Props): JSX.Element {
	const highScore = score >= 85;
	return (
		<Card header={<span className="font-medium">Outfit suggestion</span>} footer={<span>Score: {score}/100</span>}>
			<div className={`grid grid-cols-2 gap-3 ${highScore ? "relative" : ""}`}>
				{highScore ? (
					<div className="absolute inset-0 rounded-xl halo-animated" />
				) : null}
				<div className="rounded-lg bg-white/5 aspect-[4/5] overflow-hidden border border-white/10">
					<img src={leftImage} className="h-full w-full object-cover" />
				</div>
				<div className="rounded-lg bg-white/5 aspect-[4/5] overflow-hidden border border-white/10">
					<img src={rightImage} className="h-full w-full object-cover" />
				</div>
			</div>
			{palette && palette.length ? (
				<div className="mt-3 flex items-center gap-2">
					{palette.slice(0, 3).map((c) => (
						<Swatch key={c} color={c} />
					))}
				</div>
			) : null}
			{saveFavorite ? (
				<div className="mt-3">
					<button className="text-xs text-white/80 hover:text-white underline" onClick={saveFavorite}>Save favorite</button>
				</div>
			) : null}
		</Card>
	);
}


