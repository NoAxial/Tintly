import React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
	header?: React.ReactNode;
	footer?: React.ReactNode;
};

export default function Card({ header, footer, className = "", children, ...rest }: CardProps): JSX.Element {
	return (
		<div className={`glass-liquid rounded-2xl p-5 transition-all duration-200 hover:scale-[1.005] ${className}`} {...rest}>
			{header ? <div className="mb-3 text-sm text-white/80">{header}</div> : null}
			<div>{children}</div>
			{footer ? <div className="mt-4 text-xs text-white/60">{footer}</div> : null}
		</div>
	);
}


