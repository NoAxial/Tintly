import React from "react";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  variant?: "text" | "circular" | "rectangular";
}

export function Skeleton({
  width = "100%",
  height = "60px",
  className = "",
  variant = "rectangular"
}: SkeletonProps) {
  const variantStyles = {
    text: "rounded",
    circular: "rounded-full",
    rectangular: "rounded-xl"
  };

  return (
    <div
      className={`
        bg-gradient-to-r from-white/8 via-white/16 to-white/8
        bg-[length:200%_100%] animate-shimmer
        ${variantStyles[variant]}
        ${className}
      `}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height
      }}
    />
  );
}