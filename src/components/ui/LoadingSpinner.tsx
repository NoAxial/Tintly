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
      flex flex-col items-center justify-center gap-3
      ${className}
    `}>
      <div className={`spinner ${sizeStyles[size]}`} />
      {text && (
        <p className={`
          ${textSizeStyles[size]} text-secondary font-medium
        `}>
          {text}
        </p>
      )}
    </div>
  );
}