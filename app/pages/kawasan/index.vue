<template>
    <NuxtLayout name="archive">
        <template #breadcrumb>
            <NuxtLink to="/" class="text-emerald-200 hover:text-white transition-colors">Beranda</NuxtLink>
            <span class="text-emerald-500 mx-2">/</span>
            <span class="text-white">Kawasan Konservasi</span>
        </template>
        <template #header>
            <h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
                Kawasan Konservasi
            </h1>
        </template>
        <div class="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
            <div class="rounded-full bg-white p-4 shadow-sm ring-1 ring-gray-900/5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            </div>
            <h3 class="mt-4 text-lg font-semibold text-gray-900">Halaman Dalam Pengembangan</h3>
            <p class="text-gray-500 text-center max-w-sm mt-2">
                Halaman ini sedang kami persiapkan. Silakan kembali lagi nanti.
            </p>
        </div>
    </NuxtLayout>
</template>

<script setup>
useSeoMeta({
  title: 'Kawasan Konservasi',
});
</script>
