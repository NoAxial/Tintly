import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  showCloseButton = true
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Store the previously focused element
      previousFocusRef.current = document.activeElement as HTMLElement;

      // Focus the modal
      if (modalRef.current) {
        modalRef.current.focus();
      }

      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll
      document.body.style.overflow = '';

      // Restore focus to previous element
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-[999] flex items-center justify-center p-4
        bg-black/60 backdrop-blur-sm
        animate-fade-in
      "
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="
          glass-enhanced rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto
          transform transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
          animate-scale-in
          shadow-2xl border border-white/20
        "
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={description ? "modal-description" : undefined}
      >
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2
                id="modal-title"
                className="text-xl font-semibold text-white"
              >
                {title}
              </h2>
              {description && (
                <p
                  id="modal-description"
                  className="text-sm text-white/70 mt-1"
                >
                  {description}
                </p>
              )}
            </div>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="
                  ml-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20
                  flex items-center justify-center transition-colors duration-200
                  text-white/60 hover:text-white
                "
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="mt-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}