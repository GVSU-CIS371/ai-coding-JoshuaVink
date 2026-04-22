# Stock Watchlist MVP

A Vue 3 + TypeScript + Vite stock watchlist app using Financial Modeling Prep (FMP) live APIs.

## Tech Stack

- Vue 3 + TypeScript + Vite
- Vue Router
- Pinia
- Vuetify
- GitHub Pages deployment with `gh-pages`

## Features

- Live stock search using FMP `search-name`
- Live quote snapshots using FMP `quote`
- Optional profile fetch support via FMP `profile` service function
- Add/remove watchlist symbols
- Watchlist persistence in `localStorage`
- API key stored in `localStorage` (never committed)
- Debounced search input
- Loading indicators and snackbar feedback
- Quick ticker buttons: AAPL, MSFT, TSLA

## Setup

1. Install dependencies:
	```bash
	npm install
	```
2. Start dev server:
	```bash
	npm run dev
	```
3. Open the app and go to **Settings**.
4. Paste your FMP API key and save/test it.

### Optional Shared Default Key (No Commit)

If you want the deployed app to work without each user entering a key, you can set a shared default key at build time:

1. Create `.env.local` (ignored by git) from `.env.example`.
2. Set:
	```bash
	VITE_FMP_DEFAULT_API_KEY=your_key_here
	```
3. Build/deploy normally.

Users can still override this in Settings with their own key.

Important: a frontend default key is visible to anyone using the app. Use limits/rotation as needed.

## Build

```bash
npm run build
```

## Deploy to GitHub Pages

This repository is configured for GitHub Pages project-site deploy under:

- `/ai-coding-JoshuaVink/`
- Uses hash-based routing (`/#/`) so direct URL navigation works on GitHub Pages.

Run:

```bash
npm run deploy
```

Then in GitHub repo settings, set Pages source to `gh-pages` branch.

## Development Note

### AI tools used

- GitHub Copilot Chat (GPT-5.3-Codex) in VS Code
- Microsoft Copilot Chat

### Stock data service/API used

- Financial Modeling Prep (FMP)
- Base URL: `https://financialmodelingprep.com/stable/`
- Endpoints used:
	- `search-name?query={name}&apikey={key}`
	- `quote?symbol={symbol}&apikey={key}`
	- `profile?symbol={symbol}&apikey={key}` (optional service support)

### Working features

- Search stocks by company name with debounced input (400ms)
- Fetch live quote data during app usage (no hard-coded prices)
- Display symbol, company name, current price, change, percent change, and last updated
- Add/remove stocks in watchlist
- Persist watchlist to browser `localStorage`
- Settings page to save/test API key in `localStorage`
- Optional shared default key fallback via `VITE_FMP_DEFAULT_API_KEY` with user override
- Snackbar notifications for success/error states
- Loading indicators for search and quote refresh
- Quick ticker buttons (AAPL, MSFT, TSLA)
- Build and deploy flow for GitHub Pages using `gh-pages`

### Incomplete or limited features

- No backend proxy is used; all API calls are made client-side
- No advanced watchlist metadata (notes, alert thresholds, sorting preferences)
- No automated test suite added yet

### Deployment limitations / API issues encountered

- API key exposure risk: any key embedded in a static frontend build can be inspected by users
- FMP plan/rate limits may throttle requests, especially with repeated quote refreshes
- App behavior depends on FMP availability and CORS policy; if FMP changes CORS rules, browser calls may fail
- To reduce friction for evaluation, an optional shared default key is supported, but users can still enter their own key in Settings
- During development, `vue-tsc` surfaced third-party Vuetify type declaration errors in this environment; production deployment uses `vite build`, which succeeds and produces a working deployable bundle
