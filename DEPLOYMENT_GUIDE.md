# DEPLOYMENT & INSTALLATION GUIDE

## Pre-Deployment Checklist

- [x] Full MERN stack application built
- [x] All 48 project files created
- [x] Backend API with all routes
- [x] Frontend with all pages and components
- [x] Authentication with JWT
- [x] Job scraping functionality
- [x] Application tracking (CRUD)
- [x] Profile management
- [x] AI features integrated
- [x] Error handling and validation
- [x] Responsive Tailwind CSS design
- [x] Environment configuration files
- [x] Comprehensive documentation

## Quick Installation

### Option 1: Local Development (Recommended for Testing)

#### Windows/Mac/Linux:

```bash
# Backend Setup
cd server
npm install
# Edit .env with MongoDB URI
npm run dev
# Backend runs on http://localhost:5000

# Frontend Setup (in another terminal)
cd client
npm install
npm run dev
# Frontend runs on http://localhost:3000
```

#### Using Yarn:
```bash
cd server && yarn install && yarn dev
cd client && yarn install && yarn dev
```

### Option 2: Docker Deployment

Create `docker-compose.yml` in root:

```yaml
version: '3.8'
services:
  backend:
    build: ./server
    ports:
      - "5000:5000"
    environment:
      - MONGO_URI=${MONGO_URI}
      - JWT_SECRET=${JWT_SECRET}
      - OPENAI_API_KEY=${OPENAI_API_KEY}

  frontend:
    build: ./client
    ports:
      - "3000:3000"
    environment:
      - VITE_API_URL=http://localhost:5000
```

## Detailed Deployment Steps

### Step 1: Prepare for Production

#### Backend Production Setup

1. Update `server/.env` for production:
```env
PORT=5000
MONGO_URI=mongodb+srv://produser:prodpass@cluster.mongodb.net/job-scraper-prod
JWT_SECRET=use_a_very_strong_secret_key_here_min_32_chars
OPENAI_API_KEY=sk-... (if using AI features)
NODE_ENV=production
```

2. Build backend:
```bash
cd server
npm install --production
npm start
```

#### Frontend Production Setup

1. Update `client/.env` for production:
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

2. Build frontend:
```bash
cd client
npm install
npm run build
# Creates optimized dist/ folder
```

### Step 2: Deploy Backend to Render

1. **Create Render Account**
   - Go to https://render.com
   - Sign up or log in with GitHub

2. **Connect GitHub**
   - Click "New" → "Web Service"
   - Select GitHub repository
   - Connect account if needed

3. **Configure Service**
   - Name: `job-scraper-backend`
   - Environment: `Node`
   - Region: Select closest to users
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **Add Environment Variables**
   - Go to "Environment" tab
   - Add each variable:
     - `PORT`: 5000
     - `MONGO_URI`: Your MongoDB connection string
     - `JWT_SECRET`: Strong secret key
     - `OPENAI_API_KEY`: Your OpenAI key (optional)
     - `NODE_ENV`: production

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment
   - Note the URL: `https://job-scraper-backend.onrender.com`

### Step 3: Deploy Frontend to Vercel

1. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Import Project**
   - Click "New Project"
   - Import GitHub repository
   - Select `client` as root directory

3. **Configure**
   - Framework Preset: React
   - Build Command: `npm run build`
   - Install Command: `npm install`
   - Output Directory: `dist`

4. **Add Environment Variables**
   - Go to "Settings" → "Environment Variables"
   - Add:
     - `VITE_API_URL`: https://your-backend-url.onrender.com

5. **Deploy**
   - Click "Deploy"
   - Frontend live at: `https://job-scraper-platform.vercel.app`

### Step 4: Verify Deployment

1. **Backend Health Check**
   - Visit: `https://your-backend.onrender.com/api/health`
   - Should return: `{"success":true,"message":"Server is running"}`

2. **Test Authentication**
   - Register new user
   - Login with credentials
   - Check localStorage for token

3. **Test Job Scraping**
   - Go to Dashboard
   - Enter keyword and location
   - Click "Scrape Jobs"
   - Should return jobs

4. **Test Application Tracking**
   - Click "Apply" on a job
   - Go to "History"
   - Should see applied job

5. **Test Profile**
   - Click "Profile"
   - Update information
   - Changes should persist

## Database Setup

### MongoDB Atlas Cloud Database

1. **Create Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up (free tier available)

2. **Create Cluster**
   - Click "Create Cluster"
   - Choose free tier
   - Select region
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Create username and password
   - Save credentials

4. **Get Connection String**
   - Go to "Clusters"
   - Click "Connect"
   - Choose "Connect Your Application"
   - Copy connection string
   - Replace `<USERNAME>` and `<PASSWORD>`

5. **Whitelist IP**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" for testing
   - Or add specific IPs for production

6. **Connection String Format**
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/job-scraper
   ```

## Performance Optimization

### Frontend Optimization
```bash
cd client
npm run build
# Check bundle size
npm run preview
```

### Backend Optimization
- Enable response compression
- Add caching headers
- Implement rate limiting
- Use MongoDB connection pooling

### Add Compression to Backend
```bash
npm install compression
```

In `server.js`:
```javascript
import compression from 'compression';
app.use(compression());
```

## Monitoring & Maintenance

### Render Monitoring
- Dashboard shows metrics
- View logs in real-time
- Monitor CPU/Memory usage
- Set up alerts for errors

### Vercel Monitoring
- Analytics show page views
- Performance metrics
- Deployment history
- Edge function logs

## Troubleshooting Deployments

### Backend Issues
| Issue | Solution |
|-------|----------|
| MongoDB connection timeout | Check IP whitelist, verify credentials |
| 500 errors | Check server logs in Render dashboard |
| CORS errors | Verify frontend URL in backend CORS config |
| API 404 | Check routes configuration |

### Frontend Issues
| Issue | Solution |
|-------|----------|
| Blank page | Check console for CORS/API errors |
| API calls fail | Verify VITE_API_URL is set correctly |
| Build fails | Check Node version (need 14+) |
| Routing issues | Verify React Router configuration |

## Scaling Considerations

### Database Scaling
- Upgrade from free M0 cluster to M2+
- Add read replicas for scalability
- Enable automatic backups
- Implement database indexing

### Backend Scaling
- Horizontal scaling with multiple instances
- Load balancing (Render managed)
- Caching layer (Redis)
- CDN for static assets

### Frontend Optimization
- Image optimization
- Code splitting
- Lazy loading
- Edge caching

## Security Checklist

- [x] JWT secrets are strong
- [x] Passwords are hashed with bcrypt
- [x] HTTPS enforced
- [x] CORS properly configured
- [x] Environment variables not in code
- [x] Input validation on all routes
- [x] MongoDB connection is secure
- [x] Error messages don't leak sensitive data

## Maintenance Tasks

### Daily
- Monitor error logs
- Check API response times
- Verify job scraping works

### Weekly
- Review user feedback
- Check database size
- Monitor API usage

### Monthly
- Update dependencies
- Rotate JWT secret (optional)
- Archive old job records
- Review security logs

## Rollback Procedure

If deployment fails:

1. **Render (Backend)**
   - View deployment history
   - Click previous successful build
   - Click "Redeploy"

2. **Vercel (Frontend)**
   - Go to "Deployments"
   - Click on previous version
   - Click "Promote to Production"

## Cost Estimation (Monthly)

- **Render Backend**: $7-12 (paid tier)
- **Vercel Frontend**: $0-20 (free to pro)
- **MongoDB Atlas**: $0-15 (free to shared M2 tier)
- **OpenAI API**: $0-15 (pay as you go)
- **Total**: $7-62/month

## Next Steps After Deployment

1. ✅ Get feedback from users
2. ✅ Monitor performance metrics
3. ✅ Add more job platforms
4. ✅ Enhance AI features
5. ✅ Implement notifications
6. ✅ Add resume matching
7. ✅ Scale infrastructure

---

**Deployment Guide Complete!**
Your Job Scraper Platform is ready to go live. 🚀
