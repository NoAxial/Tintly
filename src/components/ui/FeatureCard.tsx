import React from "react";

interface FeatureCardProps {
  icon: string | React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon, title, description, className = "" }: FeatureCardProps) {
  return (
    <div className={`
      glass-liquid rounded-2xl p-6 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
      hover:translate-y-[-4px] hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]
      ${className}
    `}>
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent-1)] via-[var(--accent-2)] to-[var(--accent-3)] flex items-center justify-center text-2xl shadow-lg">
          {typeof icon === 'string' ? icon : icon}
        </div>
        <h3 className="text-base font-semibold text-white">
          {title}
        </h3>
        <p className="text-sm text-white/70 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}