import React from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import ClothingItemCard from "../components/molecules/ClothingItemCard";
import EmptyState from "../components/ui/EmptyState";
import { useWardrobe } from "../context/WardrobeContext";
import { useToast } from "../hooks/useToast";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Wardrobe(): JSX.Element {
	const { items, deleteItem } = useWardrobe();
	const { showSuccess, showError } = useToast();

	const handleDeleteItem = async (id: string) => {
		try {
			await deleteItem(id);
			showSuccess("Item deleted successfully");
		} catch (error) {
			console.error("Failed to delete item:", error);
			showError("Failed to delete item");
		}
	};

	return (
		<div className="max-w-5xl mx-auto px-6 py-10">
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-2xl font-semibold">Your Wardrobe</h2>
				<Link to="/upload"><Button>+ Add Item</Button></Link>
			</div>
            {items.length === 0 ? (
				<EmptyState
					icon="👗"
					title="No items yet"
					description="Start building your minimalist wardrobe by adding your first clothing item."
					action={{
						label: "Add First Item",
						onClick: () => window.location.href = "/upload"
					}}
				/>
			) : (
                <motion.div
                    className="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
                    initial="hidden"
                    animate="show"
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
                >
                    {items.map((it) => (
                        <motion.div key={it.id} variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
                            <ClothingItemCard item={it} onDelete={handleDeleteItem} />
                        </motion.div>
                    ))}
                </motion.div>
			)}
		</div>
	);
}


