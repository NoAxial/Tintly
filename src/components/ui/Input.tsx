import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className = "", ...props }: InputProps): JSX.Element {
	return (
		<input
			className={`w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-sm text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-white/20 ${className}`}
			{...props}
		/>
	);
}


