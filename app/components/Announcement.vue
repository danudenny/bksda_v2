<template>
  <section class="group relative bg-emerald-800 text-white">
    <transition
      mode="out-in"
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="!isExpanded" :key="1" class="relative">
        <div
          class="overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_10%,_black_90%,transparent_100%)]"
        >
          <div class="flex items-center animate-marquee-left py-4 sm:py-6">
            <div
              v-for="n in 2"
              :key="n"
              class="flex flex-shrink-0 items-center"
            >
              <template v-for="(item, index) in announcements" :key="item.id">
                <NuxtLink
                  :to="item.href"
                  class="flex flex-shrink-0 items-start px-6 sm:px-8 lg:px-12 transition-opacity duration-300 hover:opacity-80"
                >
                  <Megaphone
                    class="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 mr-3 sm:mr-4 text-emerald-400 mt-0.5"
                    aria-hidden="true"
                  />
                  <div class="flex flex-col">
                    <div
                      class="flex items-center gap-1.5 sm:gap-2 text-emerald-200"
                      style="font-size: clamp(0.625rem, 1vw, 0.75rem)"
                    >
                      <span>{{ item.date }}</span>
                      <span aria-hidden="true">&bull;</span>
                      <span class="font-semibold uppercase tracking-wider">{{
                        item.category
                      }}</span>
                    </div>
                    <span
                      class="font-semibold whitespace-nowrap text-white pt-1"
                      style="font-size: clamp(0.875rem, 1.5vw, 1.125rem)"
                    >
                      {{ item.title }}
                    </span>
                  </div>
                </NuxtLink>
                <div
                  v-if="index < announcements.length - 1"
                  class="h-8 sm:h-12 w-px self-center bg-white/20"
                  aria-hidden="true"
                ></div>
              </template>
            </div>
          </div>
        </div>

        <div
          class="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 translate-y-full"
        >
          <button
            @click="toggleExpanded"
            class="flex cursor-pointer items-center gap-2 rounded-b-lg bg-emerald-700 px-3 py-1.5 sm:px-4 sm:py-2 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-emerald-600 hover:shadow-xl"
            style="font-size: clamp(0.75rem, 1.25vw, 0.875rem)"
          >
            <ArrowDownCircleIcon class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>Lihat Semua Pengumuman</span>
          </button>
        </div>
      </div>

      <div v-else :key="2" class="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div class="mb-6 flex items-center justify-between">
          <h2 class="text-2xl font-bold text-white">Semua Pengumuman</h2>
          <button
            @click="isExpanded = false"
            class="flex cursor-pointer items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/20"
          >
            <X class="h-4 w-4" />
            <span>Tutup</span>
          </button>
        </div>
        <div class="space-y-5">
          <NuxtLink
            v-for="item in announcements"
            :key="item.id"
            :to="item.href"
            class="block rounded-lg p-5 transition-colors duration-300 hover:bg-white/10"
          >
            <div
              class="flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div class="flex items-center gap-2 text-xs text-emerald-200">
                  <span class="font-semibold uppercase tracking-wider">{{
                    item.category
                  }}</span>
                </div>
                <span
                  class="text-lg font-semibold whitespace-normal text-white pt-1"
                >
                  {{ item.title }}
                </span>
              </div>
              <span
                class="text-sm text-emerald-200 mt-2 sm:mt-0 sm:ml-4 flex-shrink-0"
              >
                {{ item.date }}
              </span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Megaphone, ArrowDownCircleIcon, X } from "lucide-vue-next";

const isExpanded = ref(false);

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value;
};

type Announcement = {
  id: number;
  title: string;
  date: string;
  category: string;
  href: string;
};

const announcements = ref<Announcement[]>([
  {
    id: 1,
    title: "Penutupan Jalur Pendakian Gunung Dempo",
    date: "30 Okt 2025",
    category: "Peringatan",
    href: "/berita/1",
  },
  {
    id: 2,
    title: "Program Relawan Konservasi 2026 Dibuka",
    date: "28 Okt 2025",
    category: "Pendaftaran",
    href: "/berita/2",
  },
  {
    id: 3,
    title: "Waspada Kemunculan Buaya di Sekitar Sungai Musi",
    date: "25 Okt 2025",
    category: "Waspada Satwa",
    href: "/berita/3",
  },
  {
    id: 4,
    title: "Perubahan Tarif Masuk TWA Punti Kayu",
    date: "22 Okt 2025",
    category: "Informasi",
    href: "/berita/4",
  },
]);
</script>

<style>
/* CSS Marquee (Tidak berubah) */
@keyframes marquee-left {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.animate-marquee-left {
  animation: marquee-left 60s linear infinite;
}

.group:hover .animate-marquee-left {
  animation-play-state: paused;
}
</style>
