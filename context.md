# Galdora Linktree Project Context

## Project Overview
This is a Next.js application serving as a "Linktree" style page for Galdora Personalmanagement.

## Features
- **Dynamic Theming**: Admin can switch between 'Standard', 'Christmas' (Red + Snow), and 'Valentine' (Pink + Hearts) themes.
- **Admin Panel**: Manage News/Projects and Website Theme (`/admin`).
- **News Feed**: Display news items on the homepage.
- **Social Links**: Quick access to social profiles.

## Tech Stack
- Next.js 15+ (App Router)
- Tailwind CSS
- TypeScript
- Shadcn UI
- `react-snowfall` for snow effect.
- Custom CSS animations for heart effect.

## Data Storage
- `data/news.json`: Stores news items.
- `data/settings.json`: Stores global settings like the current theme.

## Current Status
- Implemented Theme Switching logic.
- Added Heart Animation.
- Updated Homepage to react to theme changes.
