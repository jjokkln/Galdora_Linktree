import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'news.json');
const settingsFilePath = path.join(process.cwd(), 'data', 'settings.json');

export interface NewsItem {
    id: number;
    title: string;
    image: string;
    size: string;
}

export type ThemeType = 'standard' | 'christmas' | 'valentine';

export interface Settings {
    theme: ThemeType;
}

// News Items
export async function getNewsItems(): Promise<NewsItem[]> {
    try {
        const data = await fs.readFile(dataFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist, return empty array
        return [];
    }
}

export async function saveNewsItems(items: NewsItem[]): Promise<void> {
    await fs.writeFile(dataFilePath, JSON.stringify(items, null, 2));
}

// Settings
export async function getSettings(): Promise<Settings> {
    try {
        const data = await fs.readFile(settingsFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // Default settings if file doesn't exist
        return { theme: 'standard' };
    }
}

export async function saveSettings(settings: Settings): Promise<void> {
    await fs.writeFile(settingsFilePath, JSON.stringify(settings, null, 2));
}
