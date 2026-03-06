# ✅ Pre-Deployment Checklist

Before pushing to GitHub and deploying to Render, verify everything is configured:

---

## 🔧 Configuration Files

### Root Level
- [ ] **package.json** exists with:
  - [ ] `scripts.build` = `"cd client && npm run build"`
  - [ ] `scripts.start` = `"cd server && npm start"`
  - [ ] `scripts.render-build` = `"npm install && cd client && npm install && npm run build"`
  - [ ] `scripts.render-start` = `"cd server && npm start"`

- [ ] **Procfile** exists with:
  - [ ] `web: npm run build && cd server && npm start`

- [ ] **render.yaml** exists OR you plan to use Procfile (not both needed)

### Server Configuration
- [ ] **server/.env** has:
  ```
  MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/job-scraper
  JWT_SECRET=your_strong_secret_32_chars_min
  PORT=5000
  NODE_ENV=production (optional)
  OPENAI_API_KEY=sk-... (only if using real AI)
  ```

- [ ] **server/server.js** has:
  - [ ] `import path from 'path'`
  - [ ] `import { fileURLToPath } from 'url'`
  - [ ] `app.use(express.static(path.join(__dirname, '../client/dist')))`
  - [ ] Catch-all route: `app.get('*', (req, res) => res.sendFile(...))`

### Client Configuration
- [ ] **client/.env** has:
  ```
  VITE_API_URL=/api
  ```

- [ ] **client/src/api/axios.js** has:
  ```javascript
  const apiURL = import.meta.env.VITE_API_URL || 
    (import.meta.env.PROD ? '/api' : 'http://localhost:5000');
  ```

---

## 📁 Local Testing Steps

Run this in project root to test locally:

```bash
# 1. Install all dependencies
npm install
cd client && npm install
cd ../server && npm install
cd ..

# 2. Build frontend
npm run build

# Verify: Check that client/dist folder is created with index.html

# 3. Start backend (serves everything)
cd server
npm start

# Verify: See these messages:
# ✓ Server running on port 5000
# ✓ MongoDB Connected: [cluster info]
```

Then visit: **http://localhost:5000** in your browser

You should see:
- [ ] Frontend loads without errors
- [ ] Can navigate to different pages
- [ ] Console doesn't show 404 or CORS errors
- [ ] API calls work (`/api/health` returns `{"success":true}`)

---

## 🔑 Database & Secrets

- [ ] MongoDB Atlas account created
- [ ] Cluster created and connection string copied
- [ ] Database name is `job-scraper` in connection string
- [ ] JWT_SECRET generated (use: `crypto.randomBytes(32).toString('hex')`)
- [ ] Both saved securely (NOT in git)

---

## 📊 Git & GitHub

- [ ] `.gitignore` includes:
  - [ ] `node_modules/`
  - [ ] `.env`
  - [ ] `client/dist/`
  - [ ] `.DS_Store`

- [ ] GitHub repo created (public or private)
- [ ] Ready to push code

---

## 🚀 Render Setup

- [ ] Render account created at https://render.com
- [ ] GitHub connected to Render
- [ ] Ready to add environment variables

---

## 📋 Summary

**To Deploy in 5 Steps:**

```bash
# 1. Build locally to test
npm run build

# 2. Push to GitHub
git add .
git commit -m "Ready to deploy"
git push

# 3. Go to Render, create Web Service
# 4. Add environment variables
# 5. Deploy!
```

---

## 🆘 If Testing Locally Fails

| Problem | Solution |
|---------|----------|
| Port 5000 in use | Kill: `Get-NetTCPConnection -LocalPort 5000 \| Stop-Process -Force` |
| `Cannot find module` | Run `npm install` in that folder |
| `ENOTDIR` on Windows | Use forward slashes in paths, or use `path.join()` |
| API calls fail | Check axios.js baseURL and server.js middleware order |
| Frontend not loading | Verify `client/dist/index.html` exists after build |

---

**You're ready to deploy!** ✅

Next: See [DEPLOY_TO_RENDER.md](./DEPLOY_TO_RENDER.md) for exact Render deployment steps.
