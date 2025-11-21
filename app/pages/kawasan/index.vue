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

    <!-- Kawasan content -->
    <KawasanKonservasi />

    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <KawasanMap />
    </div>
  </NuxtLayout>
  </template>

<script setup>
import KawasanKonservasi from "@/components/KawasanKonservasi.vue";
import KawasanMap from "@/components/KawasanMap.vue";

useSeoMeta({
  title: "Kawasan Konservasi",
});
</script>
