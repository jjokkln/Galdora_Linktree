"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { NewsItem } from "@/lib/data";

interface Props {
    theme?: string;
}

export function NewsCollage({ theme }: Props) {
    const [items, setItems] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await fetch('/api/news');
                const data = await res.json();
                setItems(data);
            } catch (error) {
                console.error('Error fetching news items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    if (loading) {
        return <div className="text-center py-10">Loading projects...</div>;
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <h2 className={`text-2xl font-bold text-center mb-8 ${theme === 'christmas' ? 'text-yellow-400 drop-shadow-md' : 'text-gray-800'}`}>Aktuelles</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[150px]">
                {items.map((item) => (
                    <Card
                        key={item.id}
                        className={`relative overflow-hidden group cursor-pointer ${item.size} border-0 shadow-sm hover:shadow-xl transition-all duration-500`}
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                            style={{ backgroundImage: `url(${item.image})` }}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60 to-transparent">
                            <p className="text-white font-medium text-sm md:text-base">{item.title}</p>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
