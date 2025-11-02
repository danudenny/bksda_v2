export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["@/assets/css/tailwind.css"],
  modules: [
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/color-mode",
  ],
  colorMode: {
    classSuffix: "",
  },
  fonts: {
    families: [
      {
        name: "Rubik",
        provider: "google",
        weights: [300, 400, 500, 600, 700],
      },
      {
        name: "Bricolage Grotesque",
        provider: "google",
        weights: [300, 400, 500, 600, 700],
      },
    ],
  },
  image: {
    quality: 80,
    format: ["webp", "avif"],
  },
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
  // Server configuration for API routes
  // CORS configuration for API
  routeRules: {
    "/api/**": { cors: true },
    "/admin/**": { ssr: false },
  },
});
