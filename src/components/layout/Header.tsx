import React from "react";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

export default function Header(): JSX.Element {
	return (
		<header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 glass-header">
			<div className="flex items-center gap-2">
				<div className="h-7 w-7 rounded-full bg-gradient-to-br from-[var(--accent-1)] to-[var(--accent-2)]" />
				<span className="font-semibold tracking-wide">Tintly</span>
			</div>
			<nav className="flex items-center gap-3">
				<Link className="text-white/80 hover:text-white text-sm" to="/wardrobe">Wardrobe</Link>
				<Link className="text-white/80 hover:text-white text-sm" to="/generate">Generate</Link>
				<Link className="text-white/80 hover:text-white text-sm" to="/upload">Upload</Link>
				<Link className="text-white/80 hover:text-white text-sm" to="/favorites">Favorites</Link>
				<Link className="text-white/80 hover:text-white text-sm" to="/settings">Settings</Link>
				<Link className="text-white/80 hover:text-white text-sm" to="/about">About</Link>
				<Link to="/generate"><Button className="ml-2">Find Harmony</Button></Link>
			</nav>
		</header>
	);
}


