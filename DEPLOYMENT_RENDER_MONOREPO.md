# Deploy to Render (Single Service - Full Stack)

This guide shows how to deploy the entire MERN application (frontend + backend) as a single service on Render.

## ✅ What Gets Deployed

- **Backend**: Express.js server running on port 5000
- **Frontend**: React app compiled and served by Express
- **Database**: Connected to MongoDB Atlas
- **Single Service**: Both frontend and backend in one deployment

---

## 📋 Prerequisites

1. GitHub account with repository pushed
2. Render account (https://render.com)
3. MongoDB Atlas cluster
4. All environment variables ready

---

## 🚀 Step-by-Step Deployment

### Step 1: Push Code to GitHub

```bash
git init
git add .
git commit -m "Job Scraper Platform - Full Stack"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/job-scraper-platform.git
git push -u origin main
```

### Step 2: Create Render Web Service

1. Go to https://render.com/dashboard
2. Click **"New +"** → **"Web Service"**
3. Select **"Deploy an existing Git repository"**
4. Search for `job-scraper-platform` repository
5. Click **"Connect"**

### Step 3: Configure Service Settings

**Basic Settings:**
- **Name**: `job-scraper-platform`
- **Environment**: `Node`
- **Region**: Select your region
- **Branch**: `main`
- **Runtime**: `node-18` (or latest)

**Build Settings:**
- **Build Command**: 
  ```
  npm install && cd client && npm install
  ```
- **Start Command**: 
  ```
  npm run build && cd server && npm start
  ```

**Plan**: Choose appropriate plan (paid tier recommended for production)

### Step 4: Add Environment Variables

In the Render dashboard, go to **Environment** section and add:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/job-scraper
JWT_SECRET=your_very_strong_secret_key_here_32_chars_min
OPENAI_API_KEY=sk-your-key (optional, for AI features)
NODE_ENV=production
PORT=5000
```

**Important**: Replace values with your actual credentials

### Step 5: Deploy

1. Click **"Create Web Service"**
2. Wait for build to complete (5-15 minutes)
3. Check logs during build
4. Once deployed, you'll get a URL like: `https://job-scraper-platform.onrender.com`

---

## 🌍 After Deployment

### Test the Application

1. **Open**: `https://job-scraper-platform.onrender.com`
2. **Register** a new account
3. **Test features**:
   - Dashboard (scrape jobs)
   - Application History
   - Profile management
   - AI features

### View API

- **Health Check**: `https://job-scraper-platform.onrender.com/api/health`
- **Your Site**: `https://job-scraper-platform.onrender.com`

### View Logs

- In Render dashboard, click on service
- Go to **"Logs"** tab to see real-time logs

---

## 🔧 Project Structure for Deployment

```
job-scraper-platform/
├── package.json           ← Root config
├── Procfile              ← Render deployment config
├── render.yaml           ← Alternative Render config
├── client/               ← React application
│   ├── src/
│   ├── dist/            ← Built frontend (generated)
│   ├── package.json
│   └── vite.config.js
├── server/              ← Express backend
│   ├── server.js        ← Serves both API & frontend
│   ├── package.json
│   └── .env
└── README.md
```

---

## 📊 How It Works

### Deployment Flow

```
GitHub Push
    ↓
Render receives git hook
    ↓
Runs build command:
  - Installs root deps
  - Installs client deps
  - Installs server deps
    ↓
Runs start command:
  - Builds React app (client/dist)
  - Starts Express server
  - Express serves static files + API
    ↓
Single URL serves both frontend & API
```

### Architecture

```
https://job-scraper-platform.onrender.com
    ├── / → Serves React frontend (index.html)
    ├── /api/auth → Backend API
    ├── /api/jobs → Backend API
    └── /static/* → CSS, JS, images from build
```

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] `.env` variables configured in Render
- [ ] MongoDB URI is correct
- [ ] JWT_SECRET is strong (min 32 chars)
- [ ] Build command set correctly
- [ ] Start command set correctly
- [ ] Service deployed successfully
- [ ] Can access https://your-url.onrender.com
- [ ] Can register new user
- [ ] Can scrape jobs
- [ ] Can save applications

---

## 🐛 Troubleshooting

### Build Fails

**Error**: `Cannot find module 'express'`
- **Solution**: Ensure `npm install` is run in build command

**Error**: `ERR! code ENOENT`
- **Solution**: Check file paths, ensure Procfile is in root

### App Won't Start

**Error**: `EADDRINUSE: port 5000 already in use`
- **Solution**: Render manages port automatically, check if PORT env var is set correctly

**Error**: `MongoDB connection failed`
- **Solution**: Verify MONGO_URI, check IP whitelist in MongoDB Atlas

### Frontend Not Loading

**Error**: Blank page, 404 errors
- **Solution**: Check if `npm run build` succeeded, verify client/dist exists

**Error**: API calls return 404
- **Solution**: Ensure routes are prefixed with `/api/`

### Slow Deployment

- First deployment can take 10-15 minutes
- Subsequent deployments are faster (5-10 mins)
- Check build logs for bottlenecks

---

## 🔄 Redeploy Changes

After pushing new changes to GitHub:

1. Go to Render dashboard
2. Select the service
3. Click **"Manual Deploy"** → **"Deploy latest commit"**
4. Or enable **"Auto-Deploy"** for automatic deployment on push

---

## 📈 Production Optimization

### Enable Caching

In Render service settings:
- Check "Auto-deploy" for instant updates
- Set appropriate memory allocation

### Monitor Performance

- View logs in Render dashboard
- Monitor database connections
- Check API response times

### Scale Up

If needed:
- Upgrade to higher Render plan
- Increase MongoDB tier
- Add Redis for caching

---

## 🎯 What Happens When User Visits

1. **User opens** `https://job-scraper-platform.onrender.com`
2. **Express server** receives request
3. **Express checks** if it's `/api/*` route → API handler
4. **Express checks** if it's other route → serves `client/dist/index.html`
5. **React Router** handles client-side routing
6. **React makes API calls** to `/api/*` endpoints
7. **All served from single domain**, no CORS issues

---

## 🔑 Environment Variables Needed

```
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/job-scraper
JWT_SECRET=your-secret-at-least-32-characters-long
OPENAI_API_KEY=sk-... (optional)
NODE_ENV=production
PORT=5000 (Render sets automatically)
```

---

## 📞 Common Questions

**Q: Do I need to deploy frontend and backend separately?**
A: No! This setup deploys everything together as one service.

**Q: Will there be CORS issues?**
A: No! Frontend and API are served from the same domain.

**Q: Can I update one part without redeploying both?**
A: No, changes to either require full redeploy. For separate deployments, use different services.

**Q: How much does it cost?**
A: Render's free tier has limitations. Paid tier starts at ~$7/month for backend + ~$20/month for database.

**Q: How do I access logs?**
A: In Render dashboard, click service → Logs tab.

---

## 🚀 You're Live!

Your Job Scraper Platform is now running on Render with:
- ✅ Both frontend and backend
- ✅ Served from single domain
- ✅ No CORS issues
- ✅ MongoDB connected
- ✅ All features working

Share your URL: `https://job-scraper-platform.onrender.com`

---

**Happy Deploying!** 🎉
