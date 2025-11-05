import React, { useCallback, useRef, useState } from "react";
import Card from "../ui/Card";

type Props = {
	onSelect: (items: { file: File; previewUrl: string }[]) => void;
};

export default function ItemUploadArea({ onSelect }: Props): JSX.Element {
	const inputRef = useRef<HTMLInputElement>(null);
	const [dragOver, setDragOver] = useState(false);
    const [previews, setPreviews] = useState<string[]>([]);

	const pick = useCallback(() => inputRef.current?.click(), []);

    const handleFiles = useCallback(
        (fileList: FileList | null) => {
            if (!fileList || fileList.length === 0) return;
            const files = Array.from(fileList);
            const readers = files.map(
                (file) =>
                    new Promise<{ file: File; previewUrl: string }>((resolve) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve({ file, previewUrl: reader.result as string });
                        reader.readAsDataURL(file);
                    })
            );
            Promise.all(readers).then((items) => {
                setPreviews(items.map((i) => i.previewUrl));
                onSelect(items);
            });
        },
        [onSelect]
    );

	return (
		<Card>
            <input
				type="file"
				accept="image/*"
                ref={inputRef}
                multiple
				className="hidden"
				onChange={(e) => handleFiles(e.target.files)}
			/>
			<div
				className={`aspect-video rounded-xl border border-dashed flex items-center justify-center cursor-pointer transition-colors ${
					dragOver ? "border-white/40 bg-white/5" : "border-white/15 bg-white/5"
				}`}
				onClick={pick}
				onDragOver={(e) => {
					e.preventDefault();
					setDragOver(true);
				}}
				onDragLeave={() => setDragOver(false)}
				onDrop={(e) => {
					e.preventDefault();
					setDragOver(false);
					handleFiles(e.dataTransfer.files);
				}}
            >
                {previews.length ? (
                    <div className="grid grid-cols-3 gap-2 w-full h-full p-2">
                        {previews.slice(0, 6).map((p, i) => (
                            <img key={i} src={p} alt="preview" className="h-20 w-full object-cover rounded" />
                        ))}
                    </div>
                ) : (
                    <span className="text-white/60 text-sm">Drag & drop or click to upload (multiple supported)</span>
                )}
			</div>
		</Card>
	);
}


