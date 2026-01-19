export default defineNuxtConfig({
    compatibilityDate: '2025-07-15', // Pastikan tanggal ini valid, atau gunakan '2024-04-03'
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
                name: 'Rubik',
                provider: 'google',
                weights: [300, 400, 500, 600, 700],
            },
            {
                name: 'Bricolage Grotesque',
                provider: 'google',
                weights: [300, 400, 500, 600, 700],
            },
        ],
    },
    image: {
        quality: 80,
        format: ['webp', 'avif', 'png', 'jpg', 'jpeg'],
        providers: {
            cloudinary: {
                baseURL: 'https://res.cloudinary.com/dopp3opre/image/upload/',
            },
        },
        screens: {
            xs: 320,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
            xxl: 1536,
            '2xl': 1536,
        },
    },
    shadcn: {
        prefix: '',
        componentDir: './app/components/ui',
    },
    colorMode: {
        classSuffix: '',
        preference: 'system',
        storageKey: 'nuxt-color-mode',
    },
    runtimeConfig: {
        openrouterApiKey: process.env.NUXT_PUBLIC_OPENROUTER_API_KEY,
        cloudinaryCloudName: 'dopp3opre',
        cloudinaryApiKey: '959871894563482',
        cloudinaryApiSecret: 'AMg2WxfNu_UY9YNlSUwHL6ELM3k',
    },
    routeRules: {
        '/api/**': { cors: true },
        '/admin/**': { ssr: false },
    },
    nitro: {
        preset: 'node-server',
    },
});
