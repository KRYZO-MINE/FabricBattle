# FabricBattle - Elite Free Fire Tournament Platform

FabricBattle is a professional, mobile-responsive web platform designed for hosting and managing Free Fire esports tournaments. It features a modern UI, real-time leaderboard tracking, and secure tournament access.

## 🔥 Features

- **Mobile First Design**: Fully responsive UI optimized for all devices.
- **Tournament Management**: Easy registration and real-time match updates.
- **Secure Access**: Room ID and Password are only visible to registered players via UID verification.
- **Live Leaderboard**: Track top players with weekly and monthly rankings.
- **Google Sheets Integration**: Registration data is directly synced with Google Sheets.
- **SEO Optimized**: Includes meta tags for better search engine visibility and social sharing.

## 📂 Project Structure

```text
FF admin panel/
├── assets/
│   ├── css/         # Stylesheets
│   ├── js/          # Frontend logic
│   ├── images/      # Project images
│   ├── videos/      # Promotional videos
│   └── audio/       # Sound effects
├── pages/           # Main functional pages (Tournaments, Leaderboard, etc.)
├── contact/         # Contact page
├── policies/        # Legal, Privacy, and Terms
└── index.html       # Landing page
```

## 🚀 Deployment

This project is configured for easy deployment on **Vercel**.

1. Push your code to a GitHub repository.
2. Connect the repository to Vercel.
3. The `vercel.json` file handles all routing and clean URLs automatically.

## 🛠️ Configuration

To connect the registration form to your Google Sheet:
1. Open `assets/js/script.js`.
2. Replace `SCRIPT_URL` with your Google Apps Script Web App URL.

## 📜 License

Copyright © 2026 FabricBattle. All rights reserved.
