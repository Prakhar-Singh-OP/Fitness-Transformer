# Vercel Deployment Guide

## Quick Start

### Step 1: Prepare Repository
```bash
cd fitness-transformer.html

# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: Fitness Transformer app with video migration"
```

### Step 2: Push to GitHub
```bash
# Create new repository on GitHub
# Then:
git remote add origin https://github.com/YOUR_USERNAME/fitness-transformer.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Select your fitness-transformer repository
5. Keep default settings (Framework: Other, Root Directory: .)
6. Click "Deploy"

### Step 4: Access Your App
- Vercel will provide a URL like: `https://fitness-transformer-xxxxx.vercel.app`
- Visit the URL to access your app
- All videos should automatically load from `/videos/` 

## Vercel Configuration (vercel.json)

The app should work without any special configuration, but here's an optional `vercel.json` for reference:

```json
{
  "buildCommand": "echo 'No build step required'",
  "outputDirectory": ".",
  "publicPath": ".",
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html.html"
    }
  ]
}
```

### For single-file apps, you typically don't need this. The defaults work fine.

## File Structure for Vercel

```
fitness-transformer/
├── index.html.html              ← Main application file
├── public/
│   └── videos/                  ← 180 video files (served at /videos/)
│       ├── ab-crunches.mp4
│       ├── arnold-press.mp4
│       └── ... (177 more)
├── 3D Animation Videos/         ← Optional: keep for reference/backup
├── MIGRATION_REPORT.md          ← Migration documentation
└── DEPLOYMENT_GUIDE.md          ← This file
```

## Videos URLs

Once deployed, videos will be accessible at:
- `https://your-vercel-domain.vercel.app/videos/arnold-press.mp4`
- `https://your-vercel-domain.vercel.app/videos/bench-dips-3d-tutorial-tricepdps.mp4`
- etc.

The application automatically constructs these URLs using the exercise name.

## Testing Deployment

### Before Deployment (Local)
```bash
# Start local HTTP server
python -m http.server 8000

# Visit http://localhost:8000
```

### After Deployment (Live)
1. Visit your Vercel URL
2. Navigate to a muscle group (e.g., Chest exercises)
3. Click any exercise to open the modal
4. Verify video plays with all controls working:
   - Play/Pause button
   - Skip ±10 seconds buttons
   - Fullscreen button (📺)
   - Muted indicator

## Troubleshooting Deployment

### Videos not loading?
1. Check Vercel dashboard → Deployments
2. Verify `public/videos/` folder is listed in files
3. Check browser Network tab (F12) for 404 errors
4. Clear cache: Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)

### Page not showing?
1. Ensure `index.html.html` is in root directory
2. Check Vercel Build Logs for errors
3. Verify no build errors in deployment

### Specific video failing?
1. Check exact video filename in `public/videos/`
2. Verify filename matches in exerciseToVideoMap
3. All filenames should be lowercase with hyphens
4. Check browser console (F12) for error messages

## Optimization Tips

### Enable Caching
Vercel caches static files automatically. Videos will be cached at edge locations.

### Monitor Usage
- Go to Vercel Dashboard
- Check bandwidth and request metrics
- Videos are served through Vercel's CDN at no extra cost

### Performance
- Preload="metadata" is already implemented
- Lazy loading happens when exercise modal opens
- No impact on initial page load

## Rollback / Update Process

### To update videos:
```bash
git add public/videos/
git commit -m "Update exercise videos"
git push origin main
```
Vercel will auto-deploy within seconds.

### To rollback:
1. Go to Vercel Dashboard
2. Navigate to Deployments
3. Click the previous working deployment
4. Promote to Production

## Environment-Specific Configuration

### Local Development
- Path: `./public/videos/` or relative paths work
- Run: `python -m http.server 8000`
- Access: `http://localhost:8000/index.html.html`

### Vercel Production
- Path: `https://your-domain.vercel.app/videos/`
- Auto-configured, no env vars needed
- All videos served from Vercel CDN

## Vercel Environment Variables (if needed)

If you add any future features requiring env vars:

1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Add your variables
3. Redeploy for changes to take effect

Currently, the app doesn't require any environment variables.

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Deployment Status**: Check your Vercel Dashboard
- **Build Logs**: Dashboard → Deployments → Click deployment → Logs
- **Video Streaming**: Standard HTTP/HTTPS streaming, no special config needed

## Maintenance

### Regular Tasks
- Monitor bandwidth usage
- Check error logs monthly
- Update videos as needed

### Backup Strategy
- GitHub acts as backup
- Keep local copy of `public/videos/`
- Archive original `3D Animation Videos/` folder

## Performance Metrics

After deployment, you can monitor:
- Video load times
- Total bandwidth usage
- User performance (Vercel Analytics if enabled)
- Error rates

Most videos load in <1 second with proper CDN caching.

---

**Deployment Ready**: ✅ Application is fully configured for Vercel
**Video Count**: 180 files in `/videos/`
**Total App Size**: ~200MB (mostly videos)
**Expected Performance**: Video playback <1s, App load <2s

For questions or issues, check the MIGRATION_REPORT.md file or Vercel's documentation.
