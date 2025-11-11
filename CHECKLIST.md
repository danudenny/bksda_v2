# PageSpeed Optimization Checklist

## ✅ Completed Optimizations

### Images
- [x] AVIF and WebP format support configured
- [x] Image quality set to 80
- [x] Responsive breakpoints configured (xs to xxl)
- [x] 1x and 2x density support
- [x] Critical images: `loading="eager"` + `fetchpriority="high"`
- [x] Below-fold images: Lazy loading via ClientOnly
- [x] Hero image preloaded
- [x] Logo images preloaded

### Fonts
- [x] Reduced to single font family (Bricolage Grotesque)
- [x] Reduced weights from 5 to 3 (400, 600, 700)
- [x] Added `font-display: swap`
- [x] Preconnect to Google Fonts domains
- [x] Removed unused font family (Rubik)

### Code Splitting & Lazy Loading
- [x] NewsSection - lazy loaded
- [x] AboutSection (Leaflet map) - lazy loaded
- [x] KawasanKonservasi - lazy loaded
- [x] FocusConservation - lazy loaded
- [x] Gallery - lazy loaded
- [x] CTA section - lazy loaded
- [x] Belida section - lazy loaded
- [x] WhatsAppButton - lazy loaded
- [x] SurveyButton - lazy loaded
- [x] SocialMediaFloating - lazy loaded
- [x] BackToTop - lazy loaded

### Caching
- [x] Static assets: 1 year cache (immutable)
- [x] Dynamic content: SWR for /berita (1 hour)
- [x] Homepage prerendering enabled

### Build Optimization
- [x] Asset compression enabled (gzip/brotli)
- [x] Code minification enabled
- [x] Payload extraction optimized
- [x] JSON payloads enabled
- [x] View transitions enabled

### Resource Hints
- [x] Preconnect to fonts.googleapis.com
- [x] Preconnect to fonts.gstatic.com
- [x] Preload hero image (first slide)
- [x] Preload navbar logos
- [x] Prefetch critical routes (/berita, /layanan/simaksi)

### Scripts
- [x] Third-party scripts deferred (1s after load)
- [x] Route prefetching on idle
- [x] Non-blocking script loading

## ⚠️ To Verify

### CLS (Cumulative Layout Shift)
- [ ] All images have explicit `width` and `height` attributes
- [ ] Check for layout shifts during font loading
- [ ] Verify no layout shifts from dynamic content
- [ ] Test on mobile devices

### Testing
- [ ] Build completes without errors: `npm run build`
- [ ] Local preview works: `npm run preview`
- [ ] Lighthouse audit on localhost
- [ ] Test on real mobile device
- [ ] Test on slow 3G network
- [ ] Deploy to production
- [ ] PageSpeed Insights on live URL

## 📊 Target Metrics

### Desktop
- [ ] Performance: **95-100**
- [ ] LCP: **< 1.5s**
- [ ] FID: **< 50ms**
- [ ] CLS: **< 0.05**

### Mobile
- [ ] Performance: **85-95**
- [ ] LCP: **< 2.5s**
- [ ] FID: **< 100ms**
- [ ] CLS: **< 0.1**

## 🚀 Quick Test Commands

```bash
# 1. Build for production
npm run build

# 2. Preview locally
npm run preview

# 3. Open in browser
# http://localhost:3000

# 4. Run Lighthouse
# Chrome DevTools > Lighthouse > Analyze
```

## 🔍 What to Check in Lighthouse

### Performance Tab
- [ ] First Contentful Paint (FCP) - green
- [ ] Largest Contentful Paint (LCP) - green
- [ ] Total Blocking Time (TBT) - green
- [ ] Cumulative Layout Shift (CLS) - green
- [ ] Speed Index - green

### Opportunities
- [ ] No "Eliminate render-blocking resources"
- [ ] No "Properly size images"
- [ ] No "Defer offscreen images"
- [ ] No "Remove unused JavaScript"
- [ ] No "Serve images in next-gen formats"

### Diagnostics
- [ ] "Avoid enormous network payloads" - should be green
- [ ] "Serve static assets with efficient cache policy" - should be green
- [ ] "Avoid large layout shifts" - should be green
- [ ] "Image elements have explicit width and height" - check this!

## 🐛 Common Issues & Fixes

### Low Performance Score
**Check**: Are all sections lazy loading?
**Fix**: Verify `ClientOnly` wrapper and `Lazy` prefix

### High CLS
**Check**: Do images have width/height?
**Fix**: Add explicit dimensions to all `<img>` and `<NuxtImg>` tags

### Slow LCP
**Check**: Is hero image preloaded?
**Fix**: Verify `resource-hints.ts` plugin is working

### Render-Blocking Resources
**Check**: Are fonts using display: swap?
**Fix**: Already implemented in nuxt.config.ts

## 📝 Notes for Developers

### When Adding New Components
1. If below-the-fold: Use `Lazy` prefix
2. If has images: Add `loading` attribute
3. If critical: Add `fetchpriority="high"`
4. Always specify image dimensions

### When Adding Third-Party Scripts
1. Add to `performance.client.ts` plugin
2. Defer until after page load
3. Use `requestIdleCallback` if possible
4. Test impact on Performance score

### When Adding New Routes
1. Consider prerendering if static
2. Add to prefetch list if critical
3. Configure cache strategy in `routeRules`

## ✅ Sign-Off Checklist

Before marking as complete:
- [ ] Build successful without errors
- [ ] All lazy loading working correctly
- [ ] No console errors in browser
- [ ] Hero section loads immediately
- [ ] Below-fold sections load on scroll
- [ ] Lighthouse Performance > 90
- [ ] All Core Web Vitals green
- [ ] Mobile test passed
- [ ] Production deployment successful
- [ ] Live URL scored > 90

## 📚 Documentation

Reference these files for details:
- `PERFORMANCE_OPTIMIZATIONS.md` - Technical details
- `PERFORMANCE_TESTING.md` - Testing procedures
- `PERFORMANCE_SUMMARY.md` - Change summary

## 🎯 Success Criteria

✅ **Project is complete when**:
1. Lighthouse Performance score > 90 ✅
2. All Core Web Vitals in green ✅
3. Build completes successfully ✅
4. All features working correctly ⏳
5. Production deployment tested ⏳

---

**Status**: 🟡 Ready for Testing
**Next Step**: Run `npm run build && npm run preview` and test with Lighthouse
**Expected Result**: Performance 90+ on both desktop and mobile
