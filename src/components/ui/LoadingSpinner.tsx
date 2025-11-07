import React from "react";

type LoadingSpinnerSize = "small" | "medium" | "large";

interface LoadingSpinnerProps {
  size?: LoadingSpinnerSize;
  text?: string;
  className?: string;
}

export function LoadingSpinner({ size = "medium", text, className = "" }: LoadingSpinnerProps) {
  const sizeStyles = {
    small: "w-4 h-4",
    medium: "w-5 h-5",
    large: "w-6 h-6"
  };

  const textSizeStyles = {
    small: "text-xs",
    medium: "text-sm",
    large: "text-base"
  };

  return (
    <div className={`
      glass-liquid rounded-xl p-4 flex flex-col items-center justify-center gap-3
      ${className}
    `}>
      <div
        className={`
          ${sizeStyles[size]} rounded-full border-2 border-white/20
          border-t-[var(--accent-1)] animate-spin
        `}
      />
      {text && (
        <p className={`
          ${textSizeStyles[size]} text-white/70 font-medium
        `}>
          {text}
        </p>
      )}
    </div>
  );
}