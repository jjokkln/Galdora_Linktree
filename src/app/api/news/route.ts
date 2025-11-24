import { NextResponse } from 'next/server';
import { getNewsItems, saveNewsItems, NewsItem } from '@/lib/data';

export async function GET() {
    const items = await getNewsItems();
    return NextResponse.json(items);
}

export async function POST(request: Request) {
    const body = await request.json();
    const items = await getNewsItems();

    const newItem: NewsItem = {
        id: Date.now(),
        title: body.title,
        image: body.image,
        size: body.size || "col-span-1 row-span-1",
    };

    items.push(newItem);
    await saveNewsItems(items);

    return NextResponse.json(newItem);
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const items = await getNewsItems();
    const filteredItems = items.filter((item) => item.id !== Number(id));

    await saveNewsItems(filteredItems);

    return NextResponse.json({ success: true });
}
