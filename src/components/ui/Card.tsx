type CardProps = React.HTMLAttributes<HTMLDivElement> & {
	header?: React.ReactNode;
	footer?: React.ReactNode;
};

export default function Card({ header, footer, className = "", children, ...rest }: CardProps): JSX.Element {
	return (
		<div className={`card p-5 ${className}`} {...rest}>
			{header ? <div className="mb-3 text-sm text-secondary">{header}</div> : null}
			<div>{children}</div>
			{footer ? <div className="mt-4 text-xs text-muted">{footer}</div> : null}
		</div>
	);
}


