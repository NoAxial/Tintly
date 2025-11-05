// Color extraction worker: receives { dataUrl } and returns { dominantHex, paletteHex, tone, dataUrl }
import quantize from "quantize";
import convert from "color-convert";

function rgbToHex([r, g, b]: number[]): string {
	return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`.toUpperCase();
}

function classifyTone([r, g, b]: number[]): "Warm" | "Cool" | "Neutral" {
	const [h, s] = convert.rgb.hsl(r, g, b);
	if (s < 10) return "Neutral";
	if ((h >= 0 && h <= 60) || (h >= 300 && h <= 360)) return "Warm";
	if (h >= 180 && h <= 300) return "Cool";
	return "Neutral";
}

self.onmessage = async (e: MessageEvent) => {
	const { dataUrl } = e.data as { dataUrl: string };
	try {
		const img = await new Promise<HTMLImageElement>((resolve, reject) => {
			const i = new Image();
			i.onload = () => resolve(i);
			i.onerror = reject;
			i.src = dataUrl;
		});
		const canvas = new OffscreenCanvas(Math.max(1, img.width), Math.max(1, img.height));
		const ctx = canvas.getContext("2d");
		if (!ctx) throw new Error("No 2d context");
		const max = 256;
		const scale = Math.min(1, max / Math.max(img.width, img.height));
		const w = Math.max(1, Math.round(img.width * scale));
		const h = Math.max(1, Math.round(img.height * scale));
		(canvas as any).width = w;
		(canvas as any).height = h;
		ctx.drawImage(img, 0, 0, w, h);
		const { data } = ctx.getImageData(0, 0, w, h);
		const pixels: number[][] = [];
		for (let i = 0; i < data.length; i += 4) {
			const a = data[i + 3];
			if (a === 0) continue;
			pixels.push([data[i], data[i + 1], data[i + 2]]);
		}
		const colorMap = quantize(pixels, 5);
		const palette = colorMap ? colorMap.palette() : [[255, 255, 255]];
		const top = palette[0];
		(self as any).postMessage({
			dominantHex: rgbToHex(top),
			paletteHex: palette.map((p) => rgbToHex(p)),
			tone: classifyTone(top),
			dataUrl,
		});
	} catch (err) {
		(self as any).postMessage({ error: String(err) });
	}
};


