import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { db } from "../data/db";
import type { ClothingItem } from "../data/schema";

type WardrobeContextValue = {
	items: ClothingItem[];
	refresh: () => Promise<void>;
	addItem: (item: ClothingItem) => Promise<void>;
	updateItem: (id: string, updates: Partial<ClothingItem>) => Promise<void>;
	deleteItem: (id: string) => Promise<void>;
};

const WardrobeContext = createContext<WardrobeContextValue | undefined>(undefined);

export function WardrobeProvider({ children }: { children: React.ReactNode }): JSX.Element {
	const [items, setItems] = useState<ClothingItem[]>([]);

	const refresh = async () => {
		const all = await db.items.orderBy("uploadTimestamp").reverse().toArray();
		setItems(all);
	};

	useEffect(() => {
		void refresh();
	}, []);

	const value = useMemo<WardrobeContextValue>(
		() => ({
			items,
			refresh,
			addItem: async (item) => {
				await db.items.add(item);
				await refresh();
			},
			updateItem: async (id, updates) => {
				await db.items.update(id, updates);
				await refresh();
			},
			deleteItem: async (id) => {
				await db.items.delete(id);
				await refresh();
			},
		}),
		[items]
	);

	return <WardrobeContext.Provider value={value}>{children}</WardrobeContext.Provider>;
}

export function useWardrobe(): WardrobeContextValue {
	const ctx = useContext(WardrobeContext);
	if (!ctx) throw new Error("useWardrobe must be used within WardrobeProvider");
	return ctx;
}


