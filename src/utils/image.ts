export async function compressDataUrl(dataUrl: string, maxSize = 1024, quality = 0.85): Promise<string> {
	const img = await new Promise<HTMLImageElement>((resolve, reject) => {
		const i = new Image();
		i.onload = () => resolve(i);
		i.onerror = reject;
		i.src = dataUrl;
	});
	const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
	const canvas = document.createElement("canvas");
	canvas.width = Math.max(1, Math.round(img.width * scale));
	canvas.height = Math.max(1, Math.round(img.height * scale));
	const ctx = canvas.getContext("2d");
	if (!ctx) return dataUrl;
	ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
	return canvas.toDataURL("image/jpeg", quality);
}


