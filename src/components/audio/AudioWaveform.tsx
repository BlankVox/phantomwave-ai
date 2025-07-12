import React, { useRef, useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface AudioWaveformProps {
    audioUrl?: string;
    duration?: number;
    currentTime?: number;
    onSeek?: (time: number) => void;
    className?: string;
    height?: number;
    showProgress?: boolean;
    showTimeLabels?: boolean;
    waveformData?: number[]; // Array of amplitude values (0-1)
}

export const AudioWaveform: React.FC<AudioWaveformProps> = ({
    audioUrl,
    duration = 0,
    currentTime = 0,
    onSeek,
    className,
    height = 100,
    showProgress = true,
    showTimeLabels = true,
    waveformData,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [hoverTime, setHoverTime] = useState<number | null>(null);

    // Generate mock waveform data if not provided
    const generateMockWaveform = (): number[] => {
        const points = 200;
        return Array.from({ length: points }, () => Math.random() * 0.8 + 0.2);
    };

    const data = waveformData || generateMockWaveform();

    const drawWaveform = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const { width, height: canvasHeight } = canvas;
        const barWidth = width / data.length;
        const gap = barWidth * 0.1;

        // Clear canvas
        ctx.clearRect(0, 0, width, canvasHeight);

        // Draw background
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.fillRect(0, 0, width, canvasHeight);

        // Draw waveform bars
        data.forEach((amplitude, index) => {
            const barHeight = amplitude * canvasHeight * 0.8;
            const x = index * barWidth;
            const y = (canvasHeight - barHeight) / 2;

            // Determine color based on progress
            const progress = currentTime / duration;
            const barProgress = index / data.length;

            let color;
            if (showProgress && barProgress <= progress) {
                // Played portion - gradient
                const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
                gradient.addColorStop(0, '#06b6d4'); // cyan-500
                gradient.addColorStop(1, '#3b82f6'); // blue-500
                color = gradient;
            } else {
                // Unplayed portion
                color = 'rgba(255, 255, 255, 0.3)';
            }

            ctx.fillStyle = color;
            ctx.fillRect(x + gap / 2, y, barWidth - gap, barHeight);
        });

        // Draw progress line
        if (showProgress && duration > 0) {
            const progressX = (currentTime / duration) * width;
            ctx.strokeStyle = '#06b6d4';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(progressX, 0);
            ctx.lineTo(progressX, canvasHeight);
            ctx.stroke();

            // Draw progress circle
            ctx.fillStyle = '#06b6d4';
            ctx.beginPath();
            ctx.arc(progressX, canvasHeight / 2, 6, 0, 2 * Math.PI);
            ctx.fill();
        }

        // Draw hover indicator
        if (hoverTime !== null && duration > 0) {
            const hoverX = (hoverTime / duration) * width;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.lineWidth = 1;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(hoverX, 0);
            ctx.lineTo(hoverX, canvasHeight);
            ctx.stroke();
            ctx.setLineDash([]);
        }
    }, [canvasRef, data, currentTime, duration, hoverTime, showProgress]);

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas || !duration) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const progress = x / canvas.width;
        const time = progress * duration;

        setHoverTime(time);
    };

    const handleMouseLeave = () => {
        setHoverTime(null);
    };

    const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!onSeek || !duration) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const progress = x / canvas.width;
        const time = progress * duration;

        onSeek(time);
    };

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        drawWaveform();
    }, [drawWaveform]);

    return (
        <div className={cn('relative', className)}>
            <canvas
                ref={canvasRef}
                width={800}
                height={height}
                className="w-full cursor-pointer rounded-lg"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
                role="slider"
                aria-label="Audio progress"
                aria-valuemin={0}
                aria-valuemax={duration}
                aria-valuenow={currentTime}
            />

            {/* Time labels */}
            {showTimeLabels && duration > 0 && (
                <div className="mt-2 flex justify-between text-xs text-gray-400">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            )}

            {/* Hover time tooltip */}
            {hoverTime !== null && (
                <div
                    className="absolute pointer-events-none rounded bg-bg-card px-2 py-1 text-xs text-white shadow-lg"
                    style={{
                        left: `${(hoverTime / duration) * 100}%`,
                        transform: 'translateX(-50%)',
                        top: '-30px',
                    }}
                >
                    {formatTime(hoverTime)}
                </div>
            )}
        </div>
    );
}; 