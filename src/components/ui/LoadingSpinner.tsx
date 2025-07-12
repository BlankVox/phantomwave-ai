interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg'
    text?: string
    className?: string
}

export default function LoadingSpinner({ size = 'md', text, className = '' }: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8'
    }

    return (
        <div className={`flex flex-col items-center justify-center ${className}`}>
            <div className={`${sizeClasses[size]} relative`}>
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border-2 border-phantom-violet/20"></div>

                {/* Animated ring */}
                <div className={`${sizeClasses[size]} rounded-full border-2 border-transparent border-t-phantom-teal animate-spin`}></div>

                {/* Inner glow */}
                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-phantom-violet/10 to-phantom-teal/10 animate-pulse"></div>
            </div>

            {text && (
                <p className="mt-3 text-text-muted font-manrope text-sm animate-pulse">
                    {text}
                </p>
            )}
        </div>
    )
} 