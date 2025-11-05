import React, { useMemo, useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Swatch from "../components/ui/Swatch";
import { useWardrobe } from "../context/WardrobeContext";
import { useOutfitScorer } from "../hooks/useOutfitScorer";
import OutfitMatchCard from "../components/molecules/OutfitMatchCard";
import { db } from "../data/db";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";

export default function Generate(): JSX.Element {
	const { items } = useWardrobe();
	const { scorePair } = useOutfitScorer();
    const [results, setResults] = useState<{ left: string; right: string; score: number; harmonyType: string; palette?: string[] }[]>([]);

	const canGenerate = useMemo(() => items.length >= 2, [items.length]);

	const run = () => {
        const pairs: { left: string; right: string; score: number; harmonyType: string; palette?: string[] }[] = [];
		for (let i = 0; i < items.length; i++) {
			for (let j = i + 1; j < items.length; j++) {
				const a = items[i];
				const b = items[j];
				if (!a.dominantColor || !b.dominantColor) continue;
                const res = scorePair(a.dominantColor, b.dominantColor);
                pairs.push({ left: a.imageData, right: b.imageData, score: res.score, harmonyType: res.harmonyType, palette: a.palette });
			}
		}
		pairs.sort((x, y) => y.score - x.score);
		setResults(pairs.slice(0, 9));
	};

	return (
		<div className="max-w-5xl mx-auto px-6 py-10">
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-2xl font-semibold">Generate Outfit</h2>
				<Button onClick={run} disabled={!canGenerate}>{canGenerate ? "Find Harmony" : "Add 2+ items"}</Button>
			</div>
            {results.length === 0 ? (
				<Card><span className="text-white/70 text-sm">No suggestions yet. Click Find Harmony.</span></Card>
            ) : (
                <motion.div
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    initial="hidden"
                    animate="show"
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
                >
                    {results.map((r, i) => (
                        <motion.div key={i} className="space-y-2" variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
                            <OutfitMatchCard
                                leftImage={r.left}
                                rightImage={r.right}
                                score={r.score}
                                palette={r.palette}
                                saveFavorite={async () => {
                                    const left = items.find((it) => it.imageData === r.left);
                                    const right = items.find((it) => it.imageData === r.right);
                                    if (!left || !right) return;
                                    await db.favorites.add({ id: uuidv4(), leftItemId: left.id, rightItemId: right.id, score: r.score, createdAt: Date.now() });
                                }}
                            />
                            <div className="text-xs text-white/60">Why this works: {r.harmonyType}</div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
		</div>
	);
}


