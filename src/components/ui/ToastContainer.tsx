import React from "react";
import { Toast, ToastProps } from "./Toast";

interface ToastContainerProps {
  toasts: Toast[];
  onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div
      className="
        fixed top-4 right-4 z-[1000]
        flex flex-col gap-3
        pointer-events-none
      "
      style={{ pointerEvents: 'none' }}
    >
      {toasts.map((toast) => (
        <div key={toast.id} style={{ pointerEvents: 'auto' }}>
          <Toast {...toast} onClose={onClose} />
        </div>
      ))}
    </div>
  );
}