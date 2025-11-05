import React from "react";
import Card from "../ui/Card";
import Swatch from "../ui/Swatch";
import type { ClothingItem } from "../../data/schema";
import { Link } from "react-router-dom";

type Props = {
	item: ClothingItem;
	onDelete?: (id: string) => void;
};

export default function ClothingItemCard({ item, onDelete }: Props): JSX.Element {
	return (
		<Card
			header={<span className="font-medium">{item.label}</span>}
			footer={
				<div className="flex items-center justify-between">
					<span className="text-white/70 text-xs">{item.category} · {item.pattern}</span>
					<div className="flex items-center gap-2">
						{item.tone ? <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 border border-white/10">{item.tone}</span> : null}
						{item.dominantColor ? <Swatch color={item.dominantColor} /> : null}
						{onDelete ? (
							<button className="text-white/50 hover:text-white/80 text-xs" onClick={() => onDelete(item.id)}>Delete</button>
						) : null}
					</div>
				</div>
			}
		>
			<Link to={`/item/${item.id}`} className="block">
				<div className="rounded-xl bg-white/5 border border-white/10 aspect-[4/5] overflow-hidden transition-transform duration-200 hover:scale-[1.01]">
					<img src={item.imageData} alt={item.label} className="h-full w-full object-cover" />
				</div>
			</Link>
		</Card>
	);
}
