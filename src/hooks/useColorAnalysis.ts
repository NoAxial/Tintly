import { useCallback } from "react";
import type { Tone } from "../app/types";

export function useColorAnalysis() {
	const extract = useCallback(async (fileOrDataUrl: File | string): Promise<{ dominantHex: string; paletteHex: string[]; tone: Tone; dataUrl: string }> => {
		const dataUrl =
			typeof fileOrDataUrl === "string"
				? fileOrDataUrl
				: await new Promise<string>((resolve) => {
					const reader = new FileReader();
					reader.onload = () => resolve(reader.result as string);
					reader.readAsDataURL(fileOrDataUrl);
				});
		const worker = new Worker(new URL("../workers/colorWorker.ts", import.meta.url), { type: "module" });
		return await new Promise((resolve, reject) => {
			worker.onmessage = (e) => {
				const { error, ...rest } = e.data || {};
				worker.terminate();
				if (error) reject(error);
				else resolve(rest as any);
			};
			worker.onerror = (e) => {
				worker.terminate();
				reject(e);
			};
			worker.postMessage({ dataUrl });
		});
	}, []);

	return { extract };
}


