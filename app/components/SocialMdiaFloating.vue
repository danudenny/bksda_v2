<template>
    <div class="fixed left-0 top-1/2 -translate-y-1/2 z-30 hidden lg:block">
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

                <svg
                    role="img"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="relative h-5 w-5 transition-all duration-300 group-hover:scale-110"
                    :class="social.iconClass"
                    aria-hidden="true"
                >
                    <path :d="social.icon.path" />
                </svg>

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
import {
    siFacebook,
    siInstagram,
    siX,
    siYoutube,
    siThreads,
} from 'simple-icons/icons';

const socialLinks = [
    {
        name: 'Facebook',
        href: 'https://www.facebook.com/bksda.s.selatan',
        icon: siFacebook,
        colorClass: 'text-slate-600',
        iconClass: 'group-hover:text-blue-600',
        bgGradient: 'bg-gradient-to-r from-blue-50 to-blue-100/50',
        tooltipBg: 'bg-blue-600',
        tooltipArrow: 'border-r-blue-600',
    },
    {
        name: 'X (Twitter)',
        href: 'https://x.com/bksda_sumsel',
        icon: siX,
        colorClass: 'text-slate-600',
        iconClass: 'group-hover:text-black',
        bgGradient: 'bg-gradient-to-r from-slate-50 to-slate-100/50',
        tooltipBg: 'bg-black',
        tooltipArrow: 'border-r-black',
    },
    {
        name: 'Threads',
        href: 'https://www.threads.com/@bksda_sumsel',
        icon: siThreads,
        colorClass: 'text-slate-600',
        iconClass: 'group-hover:text-black',
        bgGradient: 'bg-gradient-to-r from-slate-50 to-slate-100/50',
        tooltipBg: 'bg-black',
        tooltipArrow: 'border-r-black',
    },
    {
        name: 'Instagram',
        href: 'https://www.instagram.com/bksda_sumsel',
        icon: siInstagram,
        colorClass: 'text-slate-600',
        iconClass: 'group-hover:text-pink-600',
        bgGradient: 'bg-gradient-to-r from-pink-50 to-purple-50',
        tooltipBg: 'bg-gradient-to-r from-pink-600 to-purple-600',
        tooltipArrow: 'border-r-pink-600',
    },
    {
        name: 'YouTube',
        href: 'https://www.youtube.com/channel/UC3mTRUNscHxFBZndT64-_Kg',
        icon: siYoutube,
        colorClass: 'text-slate-600',
        iconClass: 'group-hover:text-red-600',
        bgGradient: 'bg-gradient-to-r from-red-50 to-red-100/50',
        tooltipBg: 'bg-red-600',
        tooltipArrow: 'border-r-red-600',
    },
];
</script>
