"use client";

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { NewsItem } from '@/lib/data';
import Image from 'next/image';

export default function AdminPage() {
    const [items, setItems] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [currentTheme, setCurrentTheme] = useState<string>('standard');

    // Form state
    const [title, setTitle] = useState('');
    const [size, setSize] = useState('col-span-1 row-span-1');
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        fetchItems();
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/settings');
            const data = await res.json();
            setCurrentTheme(data.theme);
        } catch (error) {
            console.error('Error fetching settings:', error);
        }
    };

    const handleThemeChange = async (theme: string) => {
        try {
            const res = await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ theme }),
            });
            if (res.ok) {
                const data = await res.json();
                setCurrentTheme(data.theme);
                alert(`Theme updated to ${theme}!`);
            }
        } catch (error) {
            console.error('Error updating theme:', error);
            alert('Failed to update theme');
        }
    };

    const fetchItems = async () => {
        try {
            const res = await fetch('/api/news');
            const data = await res.json();
            setItems(data);
        } catch (error) {
            console.error('Error fetching items:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this item?')) return;

        try {
            await fetch(`/api/news?id=${id}`, { method: 'DELETE' });
            fetchItems();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !title) {
            alert('Please provide both a title and an image.');
            return;
        }

        setUploading(true);

        try {
            // 1. Upload Image
            const formData = new FormData();
            formData.append('file', file);

            const uploadRes = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!uploadRes.ok) throw new Error('Upload failed');

            const { url } = await uploadRes.json();

            // 2. Create News Item
            const newsRes = await fetch('/api/news', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    image: url,
                    size,
                }),
            });

            if (!newsRes.ok) throw new Error('Failed to create item');

            // Reset form and refresh list
            setTitle('');
            setFile(null);
            setSize('col-span-1 row-span-1');
            // Reset file input manually
            const fileInput = document.getElementById('file-upload') as HTMLInputElement;
            if (fileInput) fileInput.value = '';

            fetchItems();
            alert('Project added successfully!');
        } catch (error) {
            console.error('Error adding project:', error);
            alert('Failed to add project. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Project Management</h1>
                    <Button variant="outline" onClick={() => window.location.href = '/'}>
                        Back to Site
                    </Button>
                </div>

                {/* Theme Selection */}
                <Card className="p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">Website Theme</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button 
                            variant={currentTheme === 'standard' ? 'default' : 'outline'}
                            onClick={() => handleThemeChange('standard')}
                            className="h-24 flex flex-col gap-2"
                        >
                            <span className="text-2xl">👔</span>
                            Standard
                        </Button>
                        <Button 
                            variant={currentTheme === 'christmas' ? 'default' : 'outline'}
                            onClick={() => handleThemeChange('christmas')}
                            className="h-24 flex flex-col gap-2 bg-red-50 hover:bg-red-100 border-red-200 text-red-900 data-[state=active]:bg-red-600 data-[state=active]:text-white"
                            style={currentTheme === 'christmas' ? { backgroundColor: '#dc2626', color: 'white' } : {}}
                        >
                            <span className="text-2xl">🎄</span>
                            Christmas
                        </Button>
                        <Button 
                            variant={currentTheme === 'valentine' ? 'default' : 'outline'}
                            onClick={() => handleThemeChange('valentine')}
                            className="h-24 flex flex-col gap-2 bg-pink-50 hover:bg-pink-100 border-pink-200 text-pink-900"
                            style={currentTheme === 'valentine' ? { backgroundColor: '#db2777', color: 'white' } : {}}
                        >
                            <span className="text-2xl">💘</span>
                            Valentine's
                        </Button>
                    </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Add New Project Form */}
                    <Card className="p-6">
                        <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Project Title"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Size</label>
                                <select
                                    value={size}
                                    onChange={(e) => setSize(e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="col-span-1 row-span-1">Small (1x1)</option>
                                    <option value="col-span-2 row-span-1">Wide (2x1)</option>
                                    <option value="col-span-1 row-span-2">Tall (1x2)</option>
                                    <option value="col-span-2 row-span-2">Large (2x2)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Image</label>
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                                    className="w-full"
                                    required
                                />
                            </div>

                            <Button type="submit" className="w-full" disabled={uploading}>
                                {uploading ? 'Uploading...' : 'Add Project'}
                            </Button>
                        </form>
                    </Card>

                    {/* Current Projects List */}
                    <Card className="p-6">
                        <h2 className="text-xl font-semibold mb-4">Current Projects</h2>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="space-y-4 max-h-[600px] overflow-y-auto">
                                {items.map((item) => (
                                    <div key={item.id} className="flex items-center gap-4 p-2 border rounded-lg bg-white">
                                        <div className="relative w-16 h-16 flex-shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover rounded-md"
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="font-medium">{item.title}</h3>
                                            <p className="text-xs text-gray-500">{item.size}</p>
                                        </div>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                ))}
                                {items.length === 0 && (
                                    <p className="text-gray-500 text-center py-4">No projects yet.</p>
                                )}
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
}
