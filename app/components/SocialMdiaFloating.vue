<template>
  <div class="fixed left-0 top-1/2 -translate-y-1/2 z-30">
    <div
      class="group/container flex flex-col overflow-hidden rounded-r-2xl bg-white shadow-xl ring-1 ring-slate-900/5 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl"
    >
      <a
        v-for="(social, index) in socialLinks"
        :key="social.name"
        :href="social.href"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="social.name"
        class="group relative p-4 transition-all duration-300"
        :class="[
          index > 0 ? 'border-t border-slate-100' : '',
          social.colorClass,
        ]"
      >
        <div
          class="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          :class="social.bgGradient"
        ></div>

        <component
          :is="social.icon"
          class="relative h-5 w-5 transition-all duration-300 group-hover:scale-110"
          :class="social.iconClass"
          aria-hidden="true"
        />

        <div
          class="absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium text-white opacity-0 shadow-lg transition-all duration-200 pointer-events-none group-hover:opacity-100 group-hover:translate-x-1"
          :class="social.tooltipBg"
        >
          {{ social.name }}
          <div
            class="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent"
            :class="social.tooltipArrow"
          ></div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Facebook, Twitter, Instagram, Youtube } from "lucide-vue-next";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/bksda.s.selatan",
    icon: Facebook,
    colorClass: "text-slate-600",
    iconClass: "group-hover:text-blue-600",
    bgGradient: "bg-gradient-to-r from-blue-50 to-blue-100/50",
    tooltipBg: "bg-blue-600",
    tooltipArrow: "border-r-blue-600",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/bksdasumsel",
    icon: Twitter,
    colorClass: "text-slate-600",
    iconClass: "group-hover:text-sky-500",
    bgGradient: "bg-gradient-to-r from-sky-50 to-sky-100/50",
    tooltipBg: "bg-sky-500",
    tooltipArrow: "border-r-sky-500",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/bksda_sumsel",
    icon: Instagram,
    colorClass: "text-slate-600",
    iconClass: "group-hover:text-pink-600",
    bgGradient: "bg-gradient-to-r from-pink-50 to-purple-50",
    tooltipBg: "bg-gradient-to-r from-pink-600 to-purple-600",
    tooltipArrow: "border-r-pink-600",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/channel/UC3mTRUNscHxFBZndT64-_Kg",
    icon: Youtube,
    colorClass: "text-slate-600",
    iconClass: "group-hover:text-red-600",
    bgGradient: "bg-gradient-to-r from-red-50 to-red-100/50",
    tooltipBg: "bg-red-600",
    tooltipArrow: "border-r-red-600",
  },
];
</script>
