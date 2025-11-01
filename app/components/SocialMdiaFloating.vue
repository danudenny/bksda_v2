<template>
  <div class="fixed left-0 top-1/2 -translate-y-1/2 z-30">
    <div
      class="flex flex-col overflow-hidden rounded-r-lg bg-white shadow-lg border-y border-r border-gray-200"
    >
      <a
        v-for="(social, index) in socialLinks"
        :key="social.name"
        :href="social.href"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="social.name"
        class="p-3 text-gray-700 transition-colors duration-300 hover:bg-slate-100 hover:text-emerald-600"
        :class="{
          'border-t border-gray-200': index > 0, // Garis pemisah
        }"
      >
        <component :is="social.icon" class="h-5 w-5" aria-hidden="true" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
// Impor ikon-ikon dari lucide
import { Facebook, Twitter, Instagram, Youtube } from "lucide-vue-next";

// Definisikan data link dalam array agar mudah dikelola
const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/bksda.s.selatan",
    icon: Facebook,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/bksdasumsel",
    icon: Twitter,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/bksda_sumsel",
    icon: Instagram,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/channel/UC3mTRUNscHxFBZndT64-_Kg",
    icon: Youtube,
  },
];
</script>
