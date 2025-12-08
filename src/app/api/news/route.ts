import { NextResponse } from 'next/server';
import { getNewsItems, addNewsItem, deleteNewsItem, NewsItem } from '@/lib/data';

export async function GET() {
    const items = await getNewsItems();
    return NextResponse.json(items);
}

export async function POST(request: Request) {
    const body = await request.json();
    // validation could be improved, but relying on frontend for now

    const newItem = await addNewsItem({
        title: body.title,
        image: body.image,
        size: body.size || "col-span-1 row-span-1",
    });

    if (!newItem) {
        return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
    }

    return NextResponse.json(newItem);
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const success = await deleteNewsItem(Number(id));

    if (!success) {
        return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
