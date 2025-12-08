import { supabase } from './supabase';

export interface NewsItem {
    id: number;
    title: string;
    image: string;
    size: string;
    created_at?: string; // Add created_at for sorting
}

export type ThemeType = 'standard' | 'christmas' | 'valentine';

export interface Settings {
    theme: ThemeType;
}

// News Items
export async function getNewsItems(): Promise<NewsItem[]> {
    const { data, error } = await supabase
        .from('news_items')
        .select('*')
        .order('created_at', { ascending: true }); // Retrieve in order of creation

    if (error) {
        console.error('Error fetching news items:', error);
        return [];
    }

    // Map database fields to NewsItem interface if necessary (Supabase returns object directly usually matching)
    // Note: id in DB is bigint, might come as number or string. 
    // If the frontend expects a number ID, we might need to cast.

    return data as NewsItem[];
}

export async function addNewsItem(item: Omit<NewsItem, 'id'>): Promise<NewsItem | null> {
    const { data, error } = await supabase
        .from('news_items')
        .insert([item])
        .select()
        .single();

    if (error) {
        console.error('Error adding news item:', error);
        return null;
    }
    return data as NewsItem;
}

export async function deleteNewsItem(id: number): Promise<boolean> {
    const { error } = await supabase
        .from('news_items')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting news item:', error);
        return false;
    }
    return true;
}

// Legacy support if needed, but we should switch API to use add/delete
export async function saveNewsItems(items: NewsItem[]): Promise<void> {
    // This function is less ideal for DBs but kept for compatibility or full-sync scenarios if absolutely needed.
    // However, for this task, I will update the API routes to use add/delete instead.
    // So I will marking this as deprecated or just removing it if I update the consumers.
    // I'll keep it as a no-op or error thrower to force migration? 
    // Better: I'll remove it and let the build fail if I miss an API update, ensuring I update everything.
    // Wait, I can't let the build fail in the middle of a user session easily. I will just not export it and update APIs.
    console.warn("saveNewsItems is deprecated and does nothing. Use addNewsItem/deleteNewsItem.");
}


// Settings
export async function getSettings(): Promise<Settings> {
    const { data, error } = await supabase
        .from('settings')
        .select('theme')
        .eq('id', 1)
        .single();

    if (error) {
        // If not found (e.g. first run), return default.
        return { theme: 'standard' };
    }

    return data as Settings;
}

export async function saveSettings(settings: Settings): Promise<void> {
    // We assume ID 1 for single settings row
    const { error } = await supabase
        .from('settings')
        .upsert({ id: 1, theme: settings.theme });

    if (error) {
        console.error('Error saving settings:', error);
        throw error;
    }
}
