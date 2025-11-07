type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: "primary" | "secondary";
};

export default function Button({ variant = "primary", className = "", ...props }: ButtonProps): JSX.Element {
	const base = "btn font-medium";
	const styles =
		variant === "primary"
			? "btn-primary"
			: "btn-secondary";

	return <button className={`${base} ${styles} ${className}`} {...props} />;
}


