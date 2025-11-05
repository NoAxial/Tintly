import Dexie, { Table } from "dexie";
import type { ClothingItem } from "./schema";

export type FavoriteOutfit = {
    id: string;
    leftItemId: string;
    rightItemId: string;
    score: number;
    createdAt: number;
};

class TintlyDB extends Dexie {
    items!: Table<ClothingItem, string>;
    favorites!: Table<FavoriteOutfit, string>;

	constructor() {
		super("tintly-db");
        this.version(1).stores({
            items: "id, uploadTimestamp, category, tone",
        });
        this.version(2).stores({
            favorites: "id, createdAt, score",
        });
	}
}

export const db = new TintlyDB();


