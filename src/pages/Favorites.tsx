import React, { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import EmptyState from "../components/ui/EmptyState";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { db, type FavoriteOutfit } from "../data/db";

export default function Favorites(): JSX.Element {
	const [items, setItems] = useState<(FavoriteOutfit & { leftImg: string; rightImg: string })[]>([]);
	useEffect(() => {
		(async () => {
			const favs = await db.favorites.orderBy("createdAt").reverse().toArray();
			const joined = await Promise.all(
				favs.map(async (f) => {
					const left = await db.items.get(f.leftItemId);
					const right = await db.items.get(f.rightItemId);
					return { ...f, leftImg: left?.imageData ?? "", rightImg: right?.imageData ?? "" };
				})
			);
			setItems(joined);
		})();
	}, []);

	return (
		<div className="max-w-5xl mx-auto px-6 py-10">
			<h2 className="text-2xl font-semibold mb-6">Favorites</h2>
			{items.length === 0 ? (
				<Card><span className="text-white/70 text-sm">No favorites yet.</span></Card>
			) : (
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{items.map((f) => (
						<Card key={f.id} footer={<span>Score: {f.score}/100</span>}>
							<div className="grid grid-cols-2 gap-3">
								<img src={f.leftImg} className="rounded-lg border border-white/10 aspect-[4/5] object-cover" />
								<img src={f.rightImg} className="rounded-lg border border-white/10 aspect-[4/5] object-cover" />
							</div>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}


