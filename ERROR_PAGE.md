# 🚫 Custom 404 Not Found Page

A beautiful, user-friendly error page with automatic redirect functionality has been created for your Nuxt website.

---

## 🎨 Visual Design

### **Layout:**
```
┌─────────────────────────────────────────┐
│                                          │
│              404                         │
│          (Animated)                      │
│                                          │
│            ⚠️                            │
│      (Bouncing Icon)                     │
│                                          │
│     Halaman Tidak Ditemukan             │
│                                          │
│  Maaf, halaman yang Anda cari tidak     │
│  dapat ditemukan...                      │
│                                          │
│  ● Mengalihkan ke halaman utama         │
│     dalam 3 detik...                     │
│  [=========>        ] Progress Bar       │
│                                          │
│  [🏠 Kembali ke Beranda]  [← Kembali]   │
│                                          │
└─────────────────────────────────────────┘
```

---

## ✨ Features

### **1. Automatic Redirect (3 seconds)**
- ✅ Countdown timer from 3 to 0
- ✅ Visual progress bar
- ✅ Live indicator with ping animation
- ✅ Auto-redirects to homepage when countdown reaches 0
- ✅ Can be cancelled by clicking any button

### **2. Multiple Error Code Support**
Handles different HTTP error codes:
- **404** - Page Not Found (Halaman Tidak Ditemukan)
- **500** - Server Error (Kesalahan Server)
- **403** - Access Denied (Akses Ditolak)
- **Default** - Generic error message

### **3. Visual Elements**
- **Giant Error Code** - Large animated gradient text (404, 500, etc.)
- **Animated Background** - Multiple pulsing gradient circles
- **Grid Pattern** - Subtle grid overlay for depth
- **Bouncing Icon** - AlertTriangle or AlertCircle based on error
- **Gradient Buttons** - Emerald-to-teal gradient with hover effects
- **Progress Bar** - Visual countdown indicator

### **4. User Actions**
- **Go to Homepage** - Primary button with gradient
- **Go Back** - Return to previous page
- **Contact Link** - Option to contact support

---

## 🎯 Design Features

### **Colors:**
- Background: Dark gradient (slate-900 → emerald-900)
- Error code: Animated gradient (emerald-400 → teal-400)
- Text: White headings, gray-300 descriptions
- Buttons: Emerald-600 to teal-600 gradient
- Accents: Emerald-400 for live indicators

### **Animations:**
1. **Gradient Text** - Error code animates horizontally
2. **Pulse Effect** - Background circles pulse continuously
3. **Bounce Icon** - Alert icon bounces up and down
4. **Ping Indicator** - Live status indicator pings
5. **Progress Bar** - Smooth width transition
6. **Button Hover** - Scale and shadow effects

### **Typography:**
- Error Code: `clamp(4rem, 15vw, 10rem)` → 64px to 160px
- Title: `clamp(1.5rem, 4vw, 2.5rem)` → 24px to 40px
- Description: `clamp(0.875rem, 1.5vw, 1.125rem)` → 14px to 18px
- Buttons: `clamp(0.875rem, 1.5vw, 1rem)` → 14px to 16px

---

## 🔧 Technical Implementation

### **File Location:**
```
/app/error.vue
```

This is a special Nuxt 3 file that automatically handles all errors.

### **Props:**
```typescript
props: {
  error: Object // Nuxt error object
}
```

### **Error Object Contains:**
- `statusCode`: HTTP error code (404, 500, etc.)
- `message`: Error message
- `url`: Requested URL
- `stack`: Error stack trace (dev mode)

---

## 📊 Countdown Logic

```typescript
const countdown = ref(3);
const progress = ref(100);

// Updates every second
setInterval(() => {
  countdown.value--;
  progress.value = (countdown.value / 3) * 100;
  
  if (countdown.value <= 0) {
    navigateTo('/'); // Redirect to home
  }
}, 1000);
```

---

## 🎨 Responsive Design

### **Mobile (< 640px):**
- Single column buttons
- Smaller error code text
- Reduced padding and spacing
- Full-width countdown display

### **Desktop (≥ 640px):**
- Side-by-side buttons
- Larger error code text
- More spacing
- Inline countdown display

---

## 🚀 Usage

### **Automatic:**
Nuxt 3 automatically uses `error.vue` for:
- 404 errors (page not found)
- 500 errors (server errors)
- Any unhandled errors
- Navigation to non-existent routes

### **Manual Trigger:**
You can manually trigger the error page:

```typescript
// In your component
throw createError({
  statusCode: 404,
  statusMessage: 'Page Not Found'
});

// Or
showError({
  statusCode: 403,
  statusMessage: 'Access Denied'
});
```

---

## 💡 Customization Options

### **Change Redirect Time:**
```typescript
// Change from 3 to 5 seconds
const countdown = ref(5); // Line 23
progress.value = (countdown.value / 5) * 100; // Line 95
```

### **Change Redirect Target:**
```typescript
// Redirect to different page
if (countdown.value <= 0) {
  navigateTo('/dashboard'); // Instead of '/'
}
```

### **Disable Auto-Redirect:**
Remove or comment out the countdown logic:
```typescript
// onMounted(() => {
//   startCountdown();
// });
```

### **Add Custom Error Codes:**
```typescript
const errorTitle = computed(() => {
  switch (errorCode.value) {
    case 404:
      return 'Halaman Tidak Ditemukan';
    case 401:
      return 'Unauthorized'; // Add custom
    // ...
  }
});
```

---

## 🎯 Error Code Examples

### **404 - Not Found:**
- Icon: AlertTriangle (⚠️)
- Title: "Halaman Tidak Ditemukan"
- Message: "Maaf, halaman yang Anda cari tidak dapat ditemukan..."

### **500 - Server Error:**
- Icon: AlertCircle (🔴)
- Title: "Terjadi Kesalahan Server"
- Message: "Maaf, terjadi kesalahan pada server kami..."

### **403 - Forbidden:**
- Icon: AlertCircle (🔴)
- Title: "Akses Ditolak"
- Message: "Maaf, Anda tidak memiliki izin untuk mengakses..."

---

## 📱 Mobile Optimization

- ✅ Touch-friendly buttons (min 44x44px)
- ✅ Readable text sizes (min 14px)
- ✅ Proper spacing for thumbs
- ✅ No horizontal scroll
- ✅ Fast loading (no heavy images)

---

## ♿ Accessibility

- ✅ Semantic HTML structure
- ✅ ARIA labels on buttons
- ✅ High contrast text
- ✅ Keyboard navigation support
- ✅ Screen reader friendly
- ✅ Focus indicators on interactive elements

---

## 🎨 Animation Details

### **Gradient Animation:**
```css
@keyframes gradient-x {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```
Creates a moving gradient effect on the error code.

### **Pulse Animation:**
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```
Background circles fade in and out smoothly.

### **Bounce Animation:**
```css
@keyframes bounce {
  0%, 100% { transform: translateY(-25%); }
  50% { transform: translateY(0); }
}
```
Icon bounces up and down continuously.

---

## 🔒 Security

- ✅ No sensitive error details exposed
- ✅ Generic error messages for users
- ✅ Stack traces hidden in production
- ✅ No server information leaked
- ✅ Safe redirect logic

---

## 📊 Performance

- ✅ No external dependencies
- ✅ Minimal JavaScript (countdown only)
- ✅ CSS animations (hardware accelerated)
- ✅ No images (SVG/CSS only)
- ✅ Fast initial render
- ✅ Lightweight bundle size

---

## 🎉 Benefits

### **For Users:**
- ✅ Clear error information
- ✅ Automatic recovery (redirect)
- ✅ Multiple escape routes (home, back)
- ✅ Beautiful, professional design
- ✅ No frustrating dead ends

### **For SEO:**
- ✅ Proper HTTP status codes
- ✅ Custom 404 page (better than default)
- ✅ Internal linking maintained
- ✅ Brand consistency

### **For Developers:**
- ✅ Easy to customize
- ✅ Works with any Nuxt 3 project
- ✅ Handles all error types
- ✅ Extensible error handling
- ✅ Clean, maintainable code

---

## 📝 Testing

### **Test 404 Error:**
Navigate to any non-existent page:
```
https://yoursite.com/this-page-does-not-exist
```

### **Test Different Errors:**
Add test routes to try different error codes:
```typescript
// In a page component
if (someCondition) {
  throw createError({
    statusCode: 500,
    statusMessage: 'Test Server Error'
  });
}
```

---

## 🚀 Production Checklist

- ✅ Test 404 pages
- ✅ Test with different error codes
- ✅ Verify auto-redirect works
- ✅ Check mobile responsiveness
- ✅ Test "Go Back" button
- ✅ Verify countdown accuracy
- ✅ Check all animations work
- ✅ Test accessibility with screen reader
- ✅ Verify no console errors

---

Your custom 404 error page is now live! 🎊

**Features:**
- ✅ Beautiful animated design
- ✅ 3-second auto-redirect to homepage
- ✅ Visual countdown with progress bar
- ✅ Multiple error code support
- ✅ Fully responsive
- ✅ Accessible and user-friendly

Users will now have a much better experience when they encounter errors on your website!

