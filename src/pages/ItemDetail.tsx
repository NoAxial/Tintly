import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useWardrobe } from "../context/WardrobeContext";

export default function ItemDetail(): JSX.Element {
	const { id } = useParams();
	const navigate = useNavigate();
	const { items, updateItem, deleteItem } = useWardrobe();
	const item = useMemo(() => items.find((x) => x.id === id), [items, id]);
	const [label, setLabel] = useState(item?.label ?? "");
	const [pattern, setPattern] = useState(item?.pattern ?? "Solid");

	if (!item) {
		return (
		<div className="max-w-3xl mx-auto px-6 py-10">
			<Card><span className="text-white/70">Item not found.</span></Card>
		</div>
		);
	}

	const onSave = async () => {
		await updateItem(item.id, { label, pattern });
		navigate(-1);
	};

	const onDelete = async () => {
		await deleteItem(item.id);
		navigate("/wardrobe");
	};

	return (
		<div className="max-w-3xl mx-auto px-6 py-10">
			<h2 className="text-2xl font-semibold mb-6">Item Detail</h2>
			<Card>
				<div className="grid md:grid-cols-2 gap-6">
					<div className="rounded-xl bg-white/5 border border-white/10 aspect-[4/5] overflow-hidden">
						<img src={item.imageData} className="h-full w-full object-cover" />
					</div>
					<div className="space-y-3">
						<p className="text-white/80">ID: {id}</p>
						<p className="text-white/60">Category: {item.category}</p>
						<p className="text-white/60">Tone: {item.tone ?? "-"}</p>
						<Input value={label} onChange={(e) => setLabel(e.target.value)} />
						<select
  value={pattern}
  onChange={(e) => setPattern(e.target.value as typeof pattern)}
  className="select-glass rounded-lg px-3 py-2 text-sm w-full focus-ring"
>
  <option value="Solid">Solid</option>
  <option value="Striped">Striped</option>
  <option value="Graphic">Graphic</option>
  <option value="Floral">Floral</option>
</select>
						<div className="pt-2 flex gap-3">
							<Button onClick={onSave}>Update Item</Button>
							<Button variant="ghost" onClick={onDelete}>Delete</Button>
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
}


