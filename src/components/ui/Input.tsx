type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className = "", ...props }: InputProps): JSX.Element {
	return (
		<input
			className={`input ${className}`}
			{...props}
		/>
	);
}


