<template>
  <div
    class="relative overflow-hidden bg-slate-950 m-2 sm:m-4 rounded-xl h-[calc(100dvh-1rem)] sm:h-[calc(100dvh-2rem)]"
  >
    <div
      class="absolute inset-0 w-full h-full overflow-hidden"
      :style="{
        transform: `translateY(${parallaxOffset}px)`,
        willChange: 'transform',
      }"
    >
      <img
        src="/hero-background.avif"
        alt="Hutan Sumatera Selatan"
        class="w-full h-full object-cover"
        loading="eager"
        sizes="100vw"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
      ></div>
    </div>

    <div
      class="relative z-10 grid grid-cols-12 items-end gap-8 h-full w-full max-w-7xl mx-auto px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pb-28"
    >
      <div class="col-span-12 lg:col-span-7">
        <div
          class="mb-4 inline-flex items-center gap-2.5 rounded-full bg-emerald-400/10 px-4 py-1.5 backdrop-blur-sm border border-emerald-400/30"
        >
          <Sprout class="h-4 w-4 flex-shrink-0 text-emerald-400" />

          <span class="text-sm font-medium text-emerald-300 sm:text-base">
            Balai Konservasi Sumber Daya Alam Sumatera Selatan
          </span>
        </div>
        <h1
          class="mb-6 text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl"
        >
          Melestarikan Alam,
          <br />
          Menjaga Masa Depan.
        </h1>
        <p class="mb-10 text-lg leading-relaxed text-gray-300 max-w-xl">
          Kami berdedikasi untuk melindungi keanekaragaman hayati dan ekosistem
          unik di Sumatera Selatan melalui konservasi, penelitian, dan kemitraan
          masyarakat.
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <NuxtLink
            to="/profil"
            class="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-emerald-600 text-white font-semibold shadow-lg shadow-emerald-900/50 transition-all duration-300 hover:bg-emerald-500 hover:scale-105"
          >
            <CircleChevronRightIcon class="h-5 w-5 mr-2" />
            Jelajahi Profil Kami
          </NuxtLink>
          <NuxtLink
            to="/kawasan"
            class="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-white/50 text-white font-semibold transition-all duration-300 hover:bg-white/10 hover:border-white"
          >
            <MountainIcon class="h-5 w-5 mr-2" />
            Lihat Kawasan Konservasi
          </NuxtLink>
        </div>
      </div>

      <div class="hidden lg:block col-span-5">
        <div class="border-l-4 border-emerald-500 pl-6">
          <blockquote class="text-xl italic text-white/90">
            "Kita tidak mewarisi bumi dari nenek moyang kita, kita meminjamnya
            dari anak cucu kita."
          </blockquote>
          <p class="mt-4 text-sm text-gray-400">— Pepatah Asli Amerika</p>
        </div>
      </div>
    </div>

    <div
      class="absolute z-20 bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      aria-hidden="true"
    >
      <div class="animate-bounce">
        <ArrowDown class="h-7 w-7 text-emerald-400" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import {
  Sprout,
  CircleChevronRightIcon,
  MountainIcon,
  ArrowDown,
} from "lucide-vue-next";

const parallaxOffset = ref(0);

const handleScroll = () => {
  if (typeof window !== "undefined") {
    parallaxOffset.value = window.scrollY * 0.3;
  }
};

onMounted(() => {
  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
