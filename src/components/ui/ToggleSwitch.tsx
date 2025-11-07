import React, { forwardRef } from "react";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  className?: string;
  disabled?: boolean;
}

export const ToggleSwitch = forwardRef<HTMLButtonElement, ToggleSwitchProps>(
  ({ checked, onChange, label, description, className = "", disabled = false }, ref) => {
    const handleToggle = () => {
      if (!disabled) {
        onChange(!checked);
      }
    };

    return (
      <div className={`flex items-center justify-between ${className}`}>
        <div className="flex flex-col">
          {label && (
            <label className="text-sm font-medium text-white">
              {label}
            </label>
          )}
          {description && (
            <p className="text-xs text-white/70 mt-1">
              {description}
            </p>
          )}
        </div>
        <button
          ref={ref}
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={handleToggle}
          className={`
            relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent
            ${checked
              ? 'bg-gradient-to-r from-[var(--accent-1)] via-[var(--accent-2)] to-[var(--accent-3)] border border-white/20'
              : 'bg-white/10 border border-white/15'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]'}
          `}
        >
          <span
            className={`
              inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]
              ${checked ? 'translate-x-6' : 'translate-x-1'}
            `}
          />
        </button>
      </div>
    );
  }
);

ToggleSwitch.displayName = "ToggleSwitch";