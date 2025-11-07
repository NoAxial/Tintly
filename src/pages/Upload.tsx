import React from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import ItemUploadArea from "../components/molecules/ItemUploadArea";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { useToast } from "../hooks/useToast";
import { useState } from "react";
import { useColorAnalysis } from "../hooks/useColorAnalysis";
import { useWardrobe } from "../context/WardrobeContext";
import type { ClothingCategory, ClothingPattern, ClothingItem } from "../app/types";
import { v4 as uuidv4 } from "uuid";

export default function Upload(): JSX.Element {
    const { extract } = useColorAnalysis();
    const { addItem } = useWardrobe();
    const [batch, setBatch] = useState<{ file: File; previewUrl: string; label: string }[]>([]);
	const [label, setLabel] = useState("");
	const [category, setCategory] = useState<ClothingCategory | "">("");
	const [pattern, setPattern] = useState<ClothingPattern | "">("");
	const [saving, setSaving] = useState(false);

    const onSelect = (items: { file: File; previewUrl: string }[]) => {
        setBatch(
            items.map((i) => ({
                ...i,
                label: i.file.name.replace(/\.[^.]+$/, ""),
            }))
        );
    };

    const onSave = async () => {
        if (!batch.length || !category || !pattern) return;
        setSaving(true);
        try {
            for (const it of batch) {
                const { dominantHex, paletteHex, tone, dataUrl } = await extract(it.previewUrl);
                const item: ClothingItem = {
                    id: uuidv4(),
                    label: it.label || label,
                    imageData: dataUrl,
                    category: category as ClothingCategory,
                    pattern: pattern as ClothingPattern,
                    dominantColor: dominantHex,
                    palette: paletteHex,
                    tone,
                    uploadTimestamp: Date.now(),
                };
                await addItem(item);
            }
            setBatch([]);
            setLabel("");
            setCategory("");
            setPattern("");
        } finally {
            setSaving(false);
        }
    };

	return (
		<div className="max-w-xl mx-auto px-6 py-10">
			<h2 className="text-2xl font-semibold mb-6">Add Clothing Item</h2>
            <ItemUploadArea onSelect={onSelect} />
    <div className="mt-4 grid gap-3">
                <Input placeholder="Default label (optional)" value={label} onChange={(e) => setLabel(e.target.value)} />
        <select className="select-glass w-full rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-white/20" value={category} onChange={(e) => setCategory(e.target.value as ClothingCategory)}>
            <option value="" disabled>Select category</option>
            <option>Shirt</option>
            <option>Pants</option>
            <option>Dress</option>
            <option>Shoes</option>
            <option>Jacket</option>
            <option>Accessory</option>
        </select>
        <select className="select-glass w-full rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-white/20" value={pattern} onChange={(e) => setPattern(e.target.value as ClothingPattern)}>
            <option value="" disabled>Select pattern</option>
            <option>Solid</option>
            <option>Striped</option>
            <option>Graphic</option>
            <option>Floral</option>
        </select>
    </div>
            {batch.length ? (
                <div className="mt-3 grid gap-2">
                    {batch.map((b, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <img src={b.previewUrl} className="h-12 w-12 rounded object-cover border border-white/10" />
                            <Input value={b.label} onChange={(e) => setBatch((prev) => prev.map((p, idx) => (idx === i ? { ...p, label: e.target.value } : p)))} />
                        </div>
                    ))}
                </div>
            ) : null}
            <div className="mt-5 flex justify-end">
                <Button disabled={saving || !batch.length || !category || !pattern} onClick={onSave}>{saving ? "Saving..." : `Save ${batch.length || ""} Item(s)`}</Button>
            </div>
		</div>
	);
}


