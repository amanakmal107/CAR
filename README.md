# AutoMedics Garage AMG — Doha, Qatar Website

Modern, responsive website for AutoMedics Garage AMG (Doha, Qatar).

## Project Structure

```text
CAR GERAGE/
├── css/
│   └── style.css            # Stylesheets, themes, animations & responsive design
├── js/
│   └── main.js              # Interactive UI, WhatsApp integration, breakdown animations
├── images/
│   ├── hero-bg.jpg          # Hero section background banner
│   ├── logo.png             # Official AutoMedics Garage AMG logo
│   └── logo_original.png    # Original logo asset backup
├── .gitignore               # Ignored files for Git and deployments
├── index.html               # Main landing page entry point
├── package.json             # NPM configuration with static build & dev scripts
├── server.js                # Optional local development server
├── vercel.json              # Vercel deployment & routing configuration (fixes 404)
└── README.md                # Project documentation & deployment guide
```

---

## Why Vercel Showed a 404 Error (and How It's Fixed)

1. **Missing `vercel.json` routing configuration**:
   - Vercel didn't know how to route static files and handle root/subpath requests.
   - Added [vercel.json](file:///c:/Users/USER/OneDrive/Desktop/CAR%20GERAGE/vercel.json) with filesystem handling and index routing.
2. **`package.json` had `"main": "server.js"`**:
   - Vercel thought this was a Node.js serverless app, but `server.js` was a local development server (`server.listen()`).
   - Cleaned [package.json](file:///c:/Users/USER/OneDrive/Desktop/CAR%20GERAGE/package.json) by removing `"main": "server.js"` and adding a `"build"` script.
3. **Structured Folders**:
   - Separated styling (`css/`), scripts (`js/`), and media (`images/`) so assets are cleanly served without path conflicts.

---

## How to Deploy to Vercel

### Option 1: Via GitHub / Vercel Dashboard (Easiest)
1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - AutoMedics Garage website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New..."** &rarr; **"Project"**.
4. Import your GitHub repository.
5. In the configuration screen:
   - **Framework Preset**: Leave as **Other**
   - **Root Directory**: `./` (default)
6. Click **"Deploy"**. Your site will be live instantly with a working URL!

### Option 2: Deploying via Vercel CLI directly from Terminal
Run in this directory:
```bash
npx vercel
```
Follow the quick prompts (login, confirm project defaults), and Vercel will upload and deploy immediately.

---

## Local Development
To test locally:
```bash
npm run dev
# or
node server.js
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
