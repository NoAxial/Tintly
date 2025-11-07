import React from "react";

interface EmptyStateProps {
  icon: string | React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({ icon, title, description, action, className = "" }: EmptyStateProps) {
  return (
    <div className={`
      glass-liquid rounded-2xl p-8 text-center
      flex flex-col items-center justify-center space-y-4
      ${className}
    `}>
      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-3xl text-white/40">
        {typeof icon === 'string' ? icon : icon}
      </div>

      <div className="space-y-2">
        <h3 className="text-base font-semibold text-white">
          {title}
        </h3>
        <p className="text-sm text-white/70 leading-relaxed max-w-sm">
          {description}
        </p>
      </div>

      {action && (
        <button
          onClick={action.onClick}
          className="
            btn-primary-sheen px-6 py-2 rounded-full text-sm font-medium
            text-black shadow-lg hover:shadow-xl
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-white/20
          "
        >
          {action.label}
        </button>
      )}
    </div>
  );
}