import React from "react";
import { Modal } from "./Modal";
import { AlertTriangle } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "default";
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default"
}: ConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const getConfirmButtonStyles = () => {
    switch (variant) {
      case "danger":
        return "bg-red-500 hover:bg-red-600 text-white";
      case "warning":
        return "bg-orange-500 hover:bg-orange-600 text-white";
      default:
        return "btn-primary-sheen text-black";
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
    >
      <div className="flex items-center justify-center mb-6">
        <div className={`
          w-16 h-16 rounded-full flex items-center justify-center
          ${variant === "danger" ? "bg-red-500/20" :
            variant === "warning" ? "bg-orange-500/20" : "bg-white/10"}
        `}>
          <AlertTriangle
            size={32}
            className={`
              ${variant === "danger" ? "text-red-400" :
                variant === "warning" ? "text-orange-400" : "text-white/60"}
            `}
          />
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <button
          onClick={onClose}
          className="
            px-4 py-2 rounded-full text-sm font-medium
            bg-white/10 hover:bg-white/20 text-white
            border border-white/20
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-white/20
          "
        >
          {cancelText}
        </button>
        <button
          onClick={handleConfirm}
          className={`
            px-4 py-2 rounded-full text-sm font-medium
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-white/20
            active:scale-[0.98]
            ${getConfirmButtonStyles()}
          `}
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  );
}