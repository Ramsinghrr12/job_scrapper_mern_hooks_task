# Quick Setup Guide

## Getting Started in 5 Minutes

### Step 1: Setup MongoDB Atlas
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string
5. Copy to `server/.env` as MONGO_URI

### Step 2: Setup Backend

```bash
cd server
npm install
# Edit .env with your MongoDB URI and JWT_SECRET
npm run dev
```

Backend runs on: `http://localhost:5000`

### Step 3: Setup Frontend

```bash
cd client
npm install
npm run dev
```

Frontend runs on: `http://localhost:3000`

### Step 4: Test the App
1. Open http://localhost:3000
2. Click Register
3. Create account with test data
4. Go to Dashboard
5. Enter job keyword and location
6. Click "Scrape Jobs"
7. See results!

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/job-scraper
JWT_SECRET=your_secret_key_12345
OPENAI_API_KEY=sk-... (optional, for AI features)
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

## Default Test Credentials

After registration:
- Email: test@example.com
- Password: password123

## Common Commands

### Backend
```bash
cd server
npm install        # Install dependencies
npm run dev        # Start development server
npm start          # Start production server
```

### Frontend
```bash
cd client
npm install        # Install dependencies
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
```

## File Structure Summary

```
✓ server/
  ✓ models/        - MongoDB schemas (User, Job, Application)
  ✓ routes/        - API endpoints
  ✓ controllers/   - Route logic
  ✓ middleware/    - Auth & error handling
  ✓ services/      - Job scraping logic
  ✓ config/        - Database connection
  ✓ utils/         - Helper functions
  ✓ server.js      - Main server file

✓ client/
  ✓ src/
    ✓ pages/       - Login, Register, Dashboard, History, Profile
    ✓ components/  - Navbar, JobTable, JobCard, ProtectedRoute, Loader
    ✓ context/     - Auth context for global state
    ✓ api/         - Axios configuration with interceptors
    ✓ utils/       - Date formatting
  ✓ App.jsx        - Main app with routing
  ✓ index.html     - HTML entry point
  ✓ vite.config.js - Vite configuration

✓ README.md        - Full documentation
```

## API Endpoints Quick Reference

```
Authentication:
  POST   /api/auth/register
  POST   /api/auth/login
  GET    /api/auth/me

Jobs:
  POST   /api/jobs/scrape

Applications:
  POST   /api/applications
  GET    /api/applications
  PUT    /api/applications/:id
  DELETE /api/applications/:id

Profile:
  GET    /api/profile
  PUT    /api/profile
  DELETE /api/profile/image
  POST   /api/profile/image

AI:
  POST   /api/ai/job-summary
  POST   /api/ai/job-match
```

## Deployment

### Backend Deployment (Render)
1. Push code to GitHub
2. Go to https://render.com
3. Connect GitHub repo
4. Set environment variables
5. Deploy!

### Frontend Deployment (Vercel)
1. Push code to GitHub
2. Go to https://vercel.com
3. Import project
4. Set VITE_API_URL
5. Deploy!

## Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection fails | Check connection string and IP whitelist |
| API 404 errors | Ensure backend is running |
| Page not loading | Check browser console for CORS errors |
| AI features fail | Add OpenAI API key to .env |

## Next Steps

1. Follow setup steps above
2. Create test account
3. Scrape jobs
4. Apply to jobs
5. Check application history
6. Update profile
7. Deploy both apps
8. Share with friends!

Happy job hunting! 🚀
