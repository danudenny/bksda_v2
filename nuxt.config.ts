export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    css: ['@/assets/css/tailwind.css'],
    modules: [
        '@nuxt/fonts',
        '@nuxt/image',
        '@nuxtjs/color-mode',
        '@nuxtjs/tailwindcss',
        'shadcn-nuxt',
        '@pinia/nuxt',
        'pinia-plugin-persistedstate/nuxt',
        'motion-v/nuxt',
    ],
    fonts: {
        families: [
            {
                name: 'Bricolage Grotesque',
                provider: 'google',
                weights: [400, 600, 700],
                display: 'swap', // Font-display: swap for better performance
            },
        ],
        defaults: {
            weights: [400, 600, 700],
            styles: ['normal'],
            subsets: ['latin'],
        },
    },
    image: {
        quality: 80,
        format: ['webp', 'avif'],
        screens: {
            xs: 320,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
            xxl: 1536,
        },
        densities: [1, 2],
        presets: {
            avatar: {
                modifiers: {
                    format: 'webp',
                    width: 50,
                    height: 50,
                },
            },
            card: {
                modifiers: {
                    format: 'webp',
                    width: 400,
                    height: 300,
                },
            },
        },
    },
    shadcn: {
        prefix: '',
        componentDir: './components/ui',
    },
    colorMode: {
        classSuffix: '',
        preference: 'system',
        storageKey: 'nuxt-color-mode',
    },
    // Performance optimizations
    experimental: {
        payloadExtraction: false,
        renderJsonPayloads: true,
        viewTransition: true,
    },
    // Nitro optimizations
    nitro: {
        compressPublicAssets: true,
        minify: true,
        prerender: {
            crawlLinks: false, // Disable link crawling to avoid 404 errors
            routes: ['/'],
            failOnError: false, // Don't fail build on prerender errors
        },
    },
    // Server configuration for API routes
    // CORS configuration for API
    routeRules: {
        '/api/**': { cors: true },
        '/admin/**': { ssr: false },
        // Cache static assets
        '/_nuxt/**': {
            headers: { 'cache-control': 'public, max-age=31536000, immutable' },
        },
        // Prerender homepage
        '/': { prerender: true },
        // SWR for pages
        '/berita/**': { swr: 3600 },
    },
    // App configuration
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
                // Preconnect to external domains
                { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
                {
                    rel: 'preconnect',
                    href: 'https://fonts.gstatic.com',
                    crossorigin: 'anonymous',
                },
            ],
            meta: [
                { name: 'theme-color', content: '#10b981' },
                { name: 'format-detection', content: 'telephone=no' },
            ],
        },
    },
});
