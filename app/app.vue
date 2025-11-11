<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
// Preload critical resources for better LCP
useHead({
    link: [
        {
            rel: 'preload',
            href: '/logo1.avif',
            as: 'image',
            type: 'image/avif',
        },
        {
            rel: 'preload',
            href: '/logo2.png',
            as: 'image',
            type: 'image/png',
        },
    ],
});
</script>
