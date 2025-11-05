import React from "react";
import Card from "../components/ui/Card";

export default function About(): JSX.Element {
	return (
		<div className="max-w-3xl mx-auto px-6 py-10">
			<h2 className="text-2xl font-semibold mb-6">About Tintly</h2>
			<Card>
				<p className="text-white/80">
					Tintly is a minimalist, client-side app that suggests outfits using deterministic color
					harmony rules. No accounts, no backend — just fast, aesthetic vibes.
				</p>
			</Card>
		</div>
	);
}


