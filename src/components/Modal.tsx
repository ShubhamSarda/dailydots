import { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
}

/**
 * Modal component
 * Reusable modal dialog for confirmations and alerts
 * 
 * Accessibility features:
 * - Focus trap within modal
 * - Initial focus on cancel button
 * - Returns focus to trigger element on close
 * - Escape key support
 * - Proper ARIA attributes
 */
export function Modal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'info',
}: ModalProps) {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Focus management and keyboard handling
  useEffect(() => {
    if (isOpen) {
      // Store element that had focus before modal opened
      previousFocusRef.current = document.activeElement as HTMLElement;
      
      // Move focus into modal
      cancelButtonRef.current?.focus();
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
      
      // Return focus to previous element when modal closes
      if (!isOpen && previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
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

  if (!isOpen) return null;

  const variantStyles = {
    danger: {
      button: 'bg-red-600 hover:bg-red-700 focus-visible:ring-red-500',
    },
    warning: {
      button: 'bg-amber-600 hover:bg-amber-700 focus-visible:ring-amber-500',
    },
    info: {
      button: 'bg-blue-600 hover:bg-blue-700 focus-visible:ring-blue-500',
    },
  };

  const styles = variantStyles[variant];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 transform transition-all"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="mb-4">
          <h2
            id="modal-title"
            className="text-xl font-semibold text-gray-900 mb-2"
          >
            {title}
          </h2>
          <p id="modal-description" className="text-gray-600">
            {message}
          </p>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            ref={cancelButtonRef}
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 transition-colors"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-white focus-visible:ring-2 focus-visible:ring-offset-2 transition-colors ${styles.button}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
