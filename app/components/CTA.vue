<template>
  <section class="bg-white py-8 sm:py-12">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div
        class="relative isolate overflow-hidden rounded-2xl bg-slate-900 shadow-2xl"
      >
        <img
          src="/cta.avif"
          alt="Jalur pendakian di kawasan konservasi"
          class="absolute inset-0 -z-10 h-full w-full object-cover"
        />

        <div
          class="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-600/90 to-emerald-900/80"
          aria-hidden="true"
        ></div>

        <div
          class="relative z-10 mx-auto max-w-2xl text-center py-16 px-6 sm:py-20 lg:py-24"
        >
          <span
            class="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white"
            >Layanan Perizinan</span
          >

          <h2
            class="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Ajukan SIMAKSI Anda
          </h2>

          <p class="mt-6 text-lg leading-8 text-emerald-100">
            Merencanakan pendakian, penelitian, atau perkemahan? Dapatkan Surat
            Izin Masuk Kawasan Konservasi (SIMAKSI) Anda secara resmi melalui
            portal kami.
          </p>

          <div class="mt-10">
            <NuxtLink
              to="/layanan/simaksi"
              class="inline-flex transform items-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-emerald-700 shadow-sm transition-all duration-300 hover:scale-105 hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <FileText class="h-5 w-5" aria-hidden="true" />
              <span>Lihat Prosedur & Ajukan Izin</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Impor ikon untuk tombol
import { FileText } from "lucide-vue-next";
</script>
