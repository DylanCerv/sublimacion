import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
    showRetry?: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
    message,
    onRetry,
    showRetry = true
}) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-lg border border-red-200">
            <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-lg font-semibold text-red-800 mb-2">
                Error al cargar los datos
            </h3>
            <p className="text-red-600 text-center mb-4 max-w-md">
                {message}
            </p>
            {showRetry && onRetry && (
                <button
                    onClick={onRetry}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                    <RefreshCw className="w-4 h-4" />
                    Reintentar
                </button>
            )}
        </div>
    );
};

export default ErrorMessage;