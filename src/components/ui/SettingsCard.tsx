interface SettingsCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function SettingsCard({ title, children, className = "" }: SettingsCardProps) {
  return (
    <div className={`card p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-primary mb-4">
        {title}
      </h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}