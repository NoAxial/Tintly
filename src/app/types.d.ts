export type ClothingCategory = "Shirt" | "Pants" | "Dress" | "Shoes" | "Jacket" | "Accessory";
export type ClothingPattern = "Solid" | "Striped" | "Graphic" | "Floral";
export type Tone = "Warm" | "Cool" | "Neutral";

export type ClothingItem = {
	id: string;
	label: string;
	imageData: string; // base64 string
	category: ClothingCategory;
	pattern: ClothingPattern;
	dominantColor?: string; // hex
	palette?: string[];
	tone?: Tone;
	uploadTimestamp: number;
};


