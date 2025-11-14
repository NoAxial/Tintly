import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent";
  className?: string;
}

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const baseStyles = "inline-flex items-center rounded-full text-xs font-semibold px-3 py-1 mr-2 mb-2";

  const variantStyles = {
    default: "bg-[rgba(183,169,255,0.2)] border border-[rgba(183,169,255,0.3)] text-[#B7A9FF]",
    accent: "bg-gradient-to-r from-[var(--accent-1)] via-[var(--accent-2)] to-[var(--accent-3)] text-black"
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}