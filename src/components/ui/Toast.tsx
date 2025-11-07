import React, { useEffect } from "react";
import { X } from "lucide-react";

export interface Toast {
  id: string;
  type: "success" | "error" | "info";
  message: string;
  autoClose?: boolean;
}

export interface ToastProps extends Toast {
  onClose: (id: string) => void;
}

export function Toast({ id, type, message, onClose, autoClose = true }: ToastProps) {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose(id);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [id, onClose, autoClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return "✓";
      case "error":
        return "!";
      case "info":
        return "i";
      default:
        return "i";
    }
  };

  const getColors = () => {
    switch (type) {
      case "success":
        return {
          borderLeft: "border-l-[#86D1C8]",
          iconBg: "bg-[#86D1C8]",
          iconColor: "text-black"
        };
      case "error":
        return {
          borderLeft: "border-l-[#FFB5A7]",
          iconBg: "bg-[#FFB5A7]",
          iconColor: "text-black"
        };
      case "info":
        return {
          borderLeft: "border-l-[#B7A9FF]",
          iconBg: "bg-[#B7A9FF]",
          iconColor: "text-black"
        };
      default:
        return {
          borderLeft: "border-l-[#B7A9FF]",
          iconBg: "bg-[#B7A9FF]",
          iconColor: "text-black"
        };
    }
  };

  const colors = getColors();

  return (
    <div
      className={`
        glass-enhanced rounded-xl p-4 min-w-[280px] max-w-md shadow-xl
        border-l-4 ${colors.borderLeft}
        transform transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
        animate-slide-in-right
      `}
    >
      <div className="flex items-start gap-3">
        <div className={`
          w-6 h-6 rounded-full ${colors.iconBg} ${colors.iconColor}
          flex items-center justify-center text-sm font-semibold flex-shrink-0
        `}>
          {getIcon()}
        </div>
        <p className="text-sm text-white flex-1 leading-relaxed">
          {message}
        </p>
        <button
          onClick={() => onClose(id)}
          className="
            w-4 h-4 rounded-full bg-white/10 hover:bg-white/20
            flex items-center justify-center transition-colors duration-200
            text-white/60 hover:text-white flex-shrink-0
          "
          aria-label="Close notification"
        >
          <X size={12} />
        </button>
      </div>
    </div>
  );
}