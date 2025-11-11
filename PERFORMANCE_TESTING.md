# Quick Performance Testing Guide

## Local Testing

### 1. Build & Preview
```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

### 2. Test with Lighthouse

**Chrome DevTools:**
1. Open http://localhost:3000 in Chrome Incognito
2. Open DevTools (F12)
3. Go to "Lighthouse" tab
4. Select:
   - ✅ Performance
   - ✅ Accessibility
   - ✅ Best Practices
   - ✅ SEO
5. Select "Desktop" or "Mobile"
6. Click "Analyze page load"

**Target Scores:**
- Performance: **90+** ✅
- Accessibility: **95+**
- Best Practices: **95+**
- SEO: **95+**

## Online Testing Tools

### 1. PageSpeed Insights
```
https://pagespeed.web.dev/
```
- Tests from Google's servers
- Shows Core Web Vitals
- Provides Field Data (real users) + Lab Data

### 2. GTmetrix
```
https://gtmetrix.com/
```
- Multiple test locations
- Waterfall analysis
- Video recording

### 3. WebPageTest
```
https://www.webpagetest.org/
```
- Advanced performance testing
- Filmstrip view
- Multiple locations & devices

## Core Web Vitals Targets

### LCP (Largest Contentful Paint)
- **Target: < 2.5s** ✅
- Optimized: Hero image with fetchpriority="high"
- Preloaded: First carousel image

### FID (First Input Delay)
- **Target: < 100ms** ✅
- Optimized: Lazy loading reduces initial JS
- Deferred: Non-critical scripts

### CLS (Cumulative Layout Shift)
- **Target: < 0.1** ⚠️
- Check: All images have width/height attributes
- Fix if needed: Add explicit dimensions to images

## Performance Monitoring Commands

### Analyze Bundle Size
```bash
# Install analyzer
npm install -D vite-bundle-analyzer

# Add to nuxt.config.ts
vite: {
  plugins: [
    process.env.ANALYZE ? require('vite-bundle-analyzer')() : null
  ]
}

# Run analysis
ANALYZE=true npm run build
```

### Check Compression
```bash
# Check gzip sizes
npm run build
# Look for "gzip:" in output

# Check Brotli (if enabled on server)
du -sh .output/public/_nuxt/*.br
```

### Test Different Networks
In Chrome DevTools:
1. Network tab
2. Throttling dropdown
3. Select:
   - Fast 3G (typical mobile)
   - Slow 3G (worst case)
   - Custom (set your own)

## Common Issues & Fixes

### Issue: Low Performance Score
**Causes:**
- Large images
- Render-blocking resources
- Unused JavaScript

**Fixes:**
✅ All images optimized (AVIF/WebP)
✅ Lazy loading implemented
✅ Code splitting enabled
✅ Critical CSS inlined

### Issue: High CLS
**Causes:**
- Images without dimensions
- Dynamic content loading
- Web fonts loading

**Fixes:**
✅ font-display: swap added
⚠️ Check: Add width/height to all images
⚠️ Check: Reserve space for dynamic content

### Issue: Slow Server Response
**Causes:**
- Database queries
- API calls
- Cold starts

**Fixes:**
✅ Static prerendering for homepage
✅ SWR caching for /berita
✅ Aggressive asset caching
❓ Consider: Redis caching for API

## Production Deployment Checklist

Before deploying, ensure:
- [x] Build completes without errors
- [x] All images optimized
- [x] Lazy loading implemented
- [ ] Test on actual mobile device
- [ ] Test on slow 3G network
- [ ] Run Lighthouse audit
- [ ] Check Core Web Vitals
- [ ] Verify caching headers
- [ ] Test from different geographic locations

## Expected Results

After all optimizations:

**Desktop:**
- Performance: 95-100 ✅
- LCP: < 1.5s ✅
- FID: < 50ms ✅
- CLS: < 0.05 ✅

**Mobile:**
- Performance: 85-95 ✅
- LCP: < 2.5s ✅
- FID: < 100ms ✅
- CLS: < 0.1 ⚠️ (verify)

## Next Steps

1. **Run Tests**: Build and test locally
2. **Fix CLS**: Add explicit image dimensions if score is low
3. **Deploy**: Push to production
4. **Monitor**: Use Real User Monitoring (RUM)
5. **Iterate**: Continuously improve based on data

## Useful Resources

- [Web.dev Performance](https://web.dev/performance/)
- [Core Web Vitals](https://web.dev/vitals/)
- [Nuxt Performance](https://nuxt.com/docs/guide/concepts/performance)
- [Image Optimization](https://web.dev/fast/#optimize-your-images)
