import Button from "../ui/Button";
import { Link } from "react-router-dom";

export default function Header(): JSX.Element {
	return (
		<header className="header flex items-center justify-between px-6 py-4">
			<div className="flex items-center gap-3">
				<div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center">
					<span className="text-white font-bold text-sm">T</span>
				</div>
				<span className="font-semibold text-lg text-primary">Tintly</span>
			</div>
			<nav className="hidden md:flex items-center gap-6">
				<Link className="text-secondary hover:text-primary text-sm font-medium transition-colors" to="/wardrobe">Wardrobe</Link>
				<Link className="text-secondary hover:text-primary text-sm font-medium transition-colors" to="/generate">Generate</Link>
				<Link className="text-secondary hover:text-primary text-sm font-medium transition-colors" to="/upload">Upload</Link>
				<Link className="text-secondary hover:text-primary text-sm font-medium transition-colors" to="/favorites">Favorites</Link>
				<Link className="text-secondary hover:text-primary text-sm font-medium transition-colors" to="/settings">Settings</Link>
				<Link className="text-secondary hover:text-primary text-sm font-medium transition-colors" to="/about">About</Link>
				<Link to="/generate"><Button className="ml-4">Find Harmony</Button></Link>
			</nav>
			{/* Mobile menu button */}
			<div className="md:hidden">
				<Button variant="secondary" size="sm">☰</Button>
			</div>
		</header>
	);
}


