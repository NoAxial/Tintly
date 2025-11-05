import React from "react";

type SwatchProps = {
	color: string;
	size?: number;
};

export default function Swatch({ color, size = 18 }: SwatchProps): JSX.Element {
	return (
		<div
			className="rounded-full border border-white/20 shadow swatch-glow"
			style={{ width: size, height: size, background: color }}
		/>
	);
}


