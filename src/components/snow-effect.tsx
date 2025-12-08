"use client";

import { useEffect, useState } from "react";
import ReactSnowfall from "react-snowfall";

export function SnowEffect() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            <ReactSnowfall
                snowflakeCount={150}
                style={{
                    position: 'fixed',
                    width: '100vw',
                    height: '100vh',
                }}
            />
        </div>
    );
}
