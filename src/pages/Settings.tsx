import React from "react";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";

export default function Settings(): JSX.Element {
	return (
		<div className="max-w-3xl mx-auto px-6 py-10">
			<h2 className="text-2xl font-semibold mb-6">Settings</h2>
			<Card>
				<div className="grid gap-4">
					<div>
						<label className="text-sm text-white/70">Default Context</label>
						<Input placeholder="Casual / Work / Evening / Relaxed" className="mt-1" />
					</div>
					<div>
						<label className="text-sm text-white/70">Theme</label>
						<Input placeholder="Dark (default)" className="mt-1" />
					</div>
				</div>
			</Card>
		</div>
	);
}


