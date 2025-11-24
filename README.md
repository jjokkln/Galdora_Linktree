# Galdora Linktree

A modern, responsive Linktree-style website for Galdora Personalmanagement, built with Next.js, Tailwind CSS, and ShadCN UI.

## 🚀 Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 How to Edit Links

To customize the social media links, open the file:
`src/components/social-links.tsx`

Look for the `socialLinks` array at the top of the file. You can update the `url` property for each platform:

```typescript
const socialLinks = [
  {
    name: "Instagram",
    // ...
    url: "https://instagram.com/YOUR_PROFILE", // <--- Edit this
    // ...
  },
  // ...
];
```

## ☁️ Deployment

### GitHub
1.  Create a new repository on GitHub.
2.  Push your local code to the new repository:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
    git branch -M main
    git push -u origin main
    ```

### Vercel
1.  Go to [Vercel](https://vercel.com) and sign up/log in.
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your GitHub repository.
4.  Click **"Deploy"**. Vercel will automatically detect the Next.js configuration.
