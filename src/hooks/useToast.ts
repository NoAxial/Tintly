import { useState, useCallback } from "react";
import { Toast } from "../components/ui/Toast";

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = { ...toast, id };

    setToasts((prev) => [...prev, newToast]);

    return id;
  }, []);

  const showSuccess = useCallback((message: string, autoClose = true) => {
    return addToast({ type: "success", message, autoClose });
  }, [addToast]);

  const showError = useCallback((message: string, autoClose = true) => {
    return addToast({ type: "error", message, autoClose });
  }, [addToast]);

  const showInfo = useCallback((message: string, autoClose = true) => {
    return addToast({ type: "info", message, autoClose });
  }, [addToast]);

  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  return {
    toasts,
    showSuccess,
    showError,
    showInfo,
    clearAll,
    removeToast
  };
}