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
      card p-8 text-center
      flex flex-col items-center justify-center space-y-6 max-w-md mx-auto
      ${className}
    `}>
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-4xl text-muted">
        {typeof icon === 'string' ? icon : icon}
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-primary">
          {title}
        </h3>
        <p className="text-sm text-secondary leading-relaxed">
          {description}
        </p>
      </div>

      {action && (
        <button
          onClick={action.onClick}
          className="btn btn-primary"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}