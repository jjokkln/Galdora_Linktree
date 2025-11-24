"use client";

import { Card } from "@/components/ui/card";

// Real project images
const newsItems = [
    {
        id: 1,
        title: "Projekt Einblick",
        image: "/IMG_3363.jpeg",
        size: "col-span-2 row-span-2",
    },
    {
        id: 2,
        title: "Team Work",
        image: "/IMG_3364.jpeg",
        size: "col-span-1 row-span-1",
    },
    {
        id: 3,
        title: "On Site",
        image: "/IMG_3365.jpeg",
        size: "col-span-1 row-span-1",
    },
    {
        id: 4,
        title: "Meeting",
        image: "/IMG_3366.jpeg",
        size: "col-span-1 row-span-1",
    },
    {
        id: 5,
        title: "Office Life",
        image: "/IMG_3367.jpeg",
        size: "col-span-1 row-span-1",
    },
];

export function NewsCollage() {
    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Aktuelles</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[150px]">
                {newsItems.map((item) => (
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
