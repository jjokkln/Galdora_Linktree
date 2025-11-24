import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'news.json');

export interface NewsItem {
    id: number;
    title: string;
    image: string;
    size: string;
}

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
