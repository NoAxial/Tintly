import React from "react";

interface SettingsCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function SettingsCard({ title, children, className = "" }: SettingsCardProps) {
  return (
    <div className={`
      glass-liquid rounded-2xl p-6 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
      hover:scale-[1.005] hover:shadow-[0_15px_35px_rgba(0,0,0,0.4)]
      border border-white/18
      ${className}
    `}>
      <h3 className="text-lg font-semibold text-white mb-4">
        {title}
      </h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}