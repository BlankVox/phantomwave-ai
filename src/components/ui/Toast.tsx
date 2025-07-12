import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { Button } from './Button';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
    id: string;
    type: ToastType;
    title: string;
    message?: string;
    duration?: number;
    onClose: (id: string) => void;
    action?: {
        label: string;
        onClick: () => void;
    };
}

const toastVariants = {
    success: 'border-green-500/30 bg-green-500/10 text-green-400',
    error: 'border-red-500/30 bg-red-500/10 text-red-400',
    warning: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400',
    info: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400',
};

const icons = {
    success: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
            />
        </svg>
    ),
    error: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
            />
        </svg>
    ),
    warning: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
            />
        </svg>
    ),
    info: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
            />
        </svg>
    ),
};

export const Toast: React.FC<ToastProps> = ({
    id,
    type,
    title,
    message,
    duration = 5000,
    onClose,
    action,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        // Animate in
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (duration === Infinity) return;

        const startTime = Date.now();
        const endTime = startTime + duration;

        const updateProgress = () => {
            const now = Date.now();
            const remaining = Math.max(0, endTime - now);
            const newProgress = (remaining / duration) * 100;

            setProgress(newProgress);

            if (remaining > 0) {
                requestAnimationFrame(updateProgress);
            } else {
                handleClose();
            }
        };

        const animationId = requestAnimationFrame(updateProgress);

        return () => cancelAnimationFrame(animationId);
    }, [duration]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => onClose(id), 300);
    };

    return (
        <div
            className={cn(
                'relative overflow-hidden rounded-lg border backdrop-blur-xl transition-all duration-300',
                toastVariants[type],
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            )}
            role="alert"
            aria-live="assertive"
        >
            {/* Progress bar */}
            {duration !== Infinity && (
                <div className="absolute bottom-0 left-0 h-1 bg-current/20">
                    <div
                        className="h-full bg-current transition-all duration-100"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}

            <div className="flex items-start p-4">
                <div className="flex-shrink-0">{icons[type]}</div>
                <div className="ml-3 flex-1">
                    <p className="text-sm font-medium">{title}</p>
                    {message && <p className="mt-1 text-sm opacity-90">{message}</p>}
                    {action && (
                        <div className="mt-3 flex space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={action.onClick}
                                className="text-xs"
                            >
                                {action.label}
                            </Button>
                        </div>
                    )}
                </div>
                <div className="ml-4 flex flex-shrink-0">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClose}
                        className="h-6 w-6 p-0"
                        aria-label="Close notification"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </Button>
                </div>
            </div>
        </div>
    );
};

// Toast Container
export interface ToastContainerProps {
    toasts: ToastProps[];
    onClose: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
    return createPortal(
        <div className="fixed top-4 right-4 z-50 flex flex-col space-y-2">
            {toasts.map((toast) => (
                <Toast key={toast.id} {...toast} onClose={onClose} />
            ))}
        </div>,
        document.body
    );
};

// Toast Hook
export const useToast = () => {
    const [toasts, setToasts] = useState<ToastProps[]>([]);

    const addToast = (toast: Omit<ToastProps, 'id' | 'onClose'>) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newToast = { ...toast, id, onClose: removeToast };
        setToasts((prev) => [...prev, newToast]);
    };

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    const toast = {
        success: (title: string, message?: string, options?: Partial<ToastProps>) =>
            addToast({ type: 'success', title, message, ...options }),
        error: (title: string, message?: string, options?: Partial<ToastProps>) =>
            addToast({ type: 'error', title, message, ...options }),
        warning: (title: string, message?: string, options?: Partial<ToastProps>) =>
            addToast({ type: 'warning', title, message, ...options }),
        info: (title: string, message?: string, options?: Partial<ToastProps>) =>
            addToast({ type: 'info', title, message, ...options }),
    };

    return { toast, toasts, removeToast };
}; 