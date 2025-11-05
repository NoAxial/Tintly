import React from "react";

export default function Footer(): JSX.Element {
	return (
		<footer className="px-6 py-6 text-center text-xs text-white/50">
			<span>© {new Date().getFullYear()} Tintly</span>
		</footer>
	);
}


