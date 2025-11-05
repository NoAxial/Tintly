import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: "primary" | "ghost";
};

export default function Button({ variant = "primary", className = "", ...props }: ButtonProps): JSX.Element {
	const base = "rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 active:scale-[0.98] hover:translate-y-[-1px]";
	const styles =
		variant === "primary"
			? "btn-primary-sheen bg-gradient-to-r from-[var(--accent-1)] via-[var(--accent-2)] to-[var(--accent-3)] text-black shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
			: "btn-ghost-glass text-white hover:bg-white/10";

	return <button className={`${base} ${styles} ${className}`} {...props} />;
}


