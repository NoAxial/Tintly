import { useEffect } from "react";
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
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [id, onClose, autoClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return "✓";
      case "error":
        return "✕";
      case "info":
        return "ℹ";
      default:
        return "ℹ";
    }
  };

  return (
    <div className={`toast toast-${type}`}>
      <div className="flex items-start gap-3">
        <div className="w-6 h-6 rounded-full bg-current flex items-center justify-center text-sm font-semibold flex-shrink-0">
          {getIcon()}
        </div>
        <p className="text-sm text-primary flex-1 leading-relaxed">
          {message}
        </p>
        <button
          onClick={() => onClose(id)}
          className="w-4 h-4 rounded hover:bg-gray-100 flex items-center justify-center transition-colors text-muted hover:text-secondary flex-shrink-0"
          aria-label="Close notification"
        >
          <X size={12} />
        </button>
      </div>
    </div>
  );
}