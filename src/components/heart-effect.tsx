"use client";

import { useEffect, useState } from 'react';

export function HeartEffect() {
    const [hearts, setHearts] = useState<{ id: number; left: string; delay: string; duration: string }[]>([]);

    useEffect(() => {
        // Initialize hearts on client side to avoid hydration mismatch
        const newHearts = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}vw`,
            delay: `${Math.random() * 10}s`,
            duration: `${10 + Math.random() * 10}s`, // Slower animation (10-20s)
        }));
        setHearts(newHearts);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {hearts.map((heart) => (
                <div
                    key={heart.id}
                    className="heart-float text-pink-400/60"
                    style={{
                        left: heart.left,
                        animationDelay: heart.delay,
                        animationDuration: heart.duration,
                    }}
                >
                    ❤️
                </div>
            ))}
        </div>
    );
}

