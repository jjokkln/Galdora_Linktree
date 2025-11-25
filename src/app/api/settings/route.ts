import { NextResponse } from 'next/server';
import { getSettings, saveSettings, Settings } from '@/lib/data';

export async function GET() {
    try {
        const settings = await getSettings();
        return NextResponse.json(settings);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // Basic validation
        if (!body.theme || !['standard', 'christmas', 'valentine'].includes(body.theme)) {
             return NextResponse.json({ error: 'Invalid theme' }, { status: 400 });
        }

        const newSettings: Settings = {
            theme: body.theme
        };

        await saveSettings(newSettings);
        return NextResponse.json(newSettings);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
    }
}

