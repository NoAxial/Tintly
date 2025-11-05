import { useCallback } from "react";
import convert from "color-convert";

function hexToRgb(hex: string): [number, number, number] {
	const v = hex.replace("#", "");
	const r = parseInt(v.slice(0, 2), 16);
	const g = parseInt(v.slice(2, 4), 16);
	const b = parseInt(v.slice(4, 6), 16);
	return [r, g, b];
}

function hueDistance(h1: number, h2: number): number {
	const d = Math.abs(h1 - h2);
	return Math.min(d, 360 - d);
}

export function useOutfitScorer() {
    const scorePair = useCallback((aHex: string, bHex: string) => {
		const [r1, g1, b1] = hexToRgb(aHex);
		const [r2, g2, b2] = hexToRgb(bHex);
		const [h1, s1, l1] = convert.rgb.hsl(r1, g1, b1);
		const [h2, s2, l2] = convert.rgb.hsl(r2, g2, b2);

		// Harmony components
		const hueDiff = hueDistance(h1, h2);
		const complementary = 100 - Math.abs(180 - hueDiff) * (100 / 180);
		const analogous = 100 - Math.min(hueDiff, 60) * (100 / 60);
		const mono = 100 - Math.abs(l1 - l2);

        const scores = { complementary, analogous, mono };
        const harmony = Math.max(complementary, analogous, mono);
        const harmonyType =
            harmony === complementary ? "Complementary" : harmony === analogous ? "Analogous" : "Monochrome";

		// Saturation and contrast balance
		const satDiff = Math.abs(s1 - s2);
		const lightDiff = Math.abs(l1 - l2);
		const saturationBalance = 100 - Math.min(satDiff, 50) * 2; // penalize >50 diff
		const contrast = Math.min(lightDiff * 2, 100);

		// Weighted score
        const score = Math.round(0.55 * harmony + 0.20 * saturationBalance + 0.25 * contrast);
        return {
            score: Math.max(0, Math.min(100, score)),
            harmonyType,
            components: { harmony, saturationBalance, contrast, ...scores },
        };
	}, []);

    return { scorePair };
}


