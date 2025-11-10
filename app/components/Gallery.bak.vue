<template>
  <section class="bg-slate-50 py-8 sm:py-16 overflow-hidden">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center lg:max-w-4xl">
        <h2 class="text-base font-semibold leading-7 text-emerald-600">
          Galeri
        </h2>
        <p
          class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
        >
          Sorotan Visual dari Lapangan
        </p>
        <p class="mt-6 text-lg leading-8 text-gray-600">
          Lihat lebih dekat keindahan alam, kekayaan fauna, dan dedikasi tim
          kami dalam menjaga kelestarian Sumatera Selatan.
        </p>
      </div>
    </div>

    <div
      class="mt-16 space-y-4 [mask-image:_linear-gradient(to_right,transparent_0,_black_10%,_black_90%,transparent_100%)]"
    >
      <div class="overflow-hidden group">
        <div class="flex flex-shrink-0 animate-marquee-right group-hover:pause">
          <NuxtImg
            v-for="(image, index) in row1Images"
            :key="`r1-${index}`"
            :src="image.src"
            :alt="image.alt"
            class="h-52 w-auto aspect-video object-cover rounded-xl shadow-lg mx-2"
            draggable="false"
            loading="lazy"
          />
          <NuxtImg
            v-for="(image, index) in row1Images"
            :key="`r1-dup-${index}`"
            :src="image.src"
            :alt="image.alt"
            class="h-52 w-auto aspect-video object-cover rounded-xl shadow-lg mx-2"
            draggable="false"
            aria-hidden="true"
            loading="lazy"
          />
        </div>
      </div>

      <div class="overflow-hidden group">
        <div class="flex flex-shrink-0 animate-marquee-left group-hover:pause">
          <NuxtImg
            v-for="(image, index) in row2Images"
            :key="`r2-${index}`"
            :src="image.src"
            :alt="image.alt"
            class="h-52 w-auto aspect-video object-cover rounded-xl shadow-lg mx-2"
            draggable="false"
            loading="lazy"
          />
          <NuxtImg
            v-for="(image, index) in row2Images"
            :key="`r2-dup-${index}`"
            :src="image.src"
            :alt="image.alt"
            class="h-52 w-auto aspect-video object-cover rounded-xl shadow-lg mx-2"
            draggable="false"
            aria-hidden="true"
            loading="lazy"
          />
        </div>
      </div>

      <div class="overflow-hidden group">
        <div class="flex flex-shrink-0 animate-marquee-right group-hover:pause">
          <NuxtImg
            v-for="(image, index) in row3Images"
            :key="`r3-${index}`"
            :src="image.src"
            :alt="image.alt"
            class="h-52 w-auto aspect-video object-cover rounded-xl shadow-lg mx-2"
            draggable="false"
            loading="lazy"
          />
          <NuxtImg
            v-for="(image, index) in row3Images"
            :key="`r3-dup-${index}`"
            :src="image.src"
            :alt="image.alt"
            class="h-52 w-auto aspect-video object-cover rounded-xl shadow-lg mx-2"
            draggable="false"
            aria-hidden="true"
            loading="lazy"
          />
        </div>
      </div>
    </div>

    <div class="mt-16 text-center">
      <NuxtLink
        to="/galeri"
        class="inline-flex items-center gap-1.5 rounded-md bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors duration-300 hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
      >
        Lihat Galeri Lengkap
        <ArrowRightCircleIcon class="h-4 w-4" aria-hidden="true" />
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ArrowRightCircleIcon } from "lucide-vue-next";

// --- PERUBAHAN UTAMA DI SINI ---

// Fungsi helper untuk membuat URL placeholder
const createPlaceholderUrl = (text: string) => {
  // Mengganti spasi dengan '+' agar sesuai format placehold.co
  const formattedText = text.replace(/\s+/g, "+");
  return `https://placehold.co/600x400?text=${formattedText}`;
};

// 1. Definisikan daftar 'alt' teks Anda
const row1Alts = [
  "Harimau Sumatera",
  "Gajah Sumatera",
  "Orangutan",
  "Burung Rangkong",
  "Tapir",
  "Bunga Rafflesia",
];

const row2Alts = [
  "Hutan Hujan Tropis",
  "Air Terjun",
  "Danau",
  "Pemandangan Gunung",
  "Sungai di Hutan",
  "Kabut di Hutan",
];

const row3Alts = [
  "Tim BKSDA Patroli",
  "Edukasi Masyarakat",
  "Peneliti di Lapangan",
  "Pelepasliaran Satwa",
  "Diskusi Warga",
  "Pos Jaga BKSDA",
];

// 2. Buat computed properties yang secara otomatis
//    membuat objek { src, alt } untuk template Anda
const row1Images = computed(() =>
  row1Alts.map((alt) => ({
    src: createPlaceholderUrl(alt),
    alt: alt,
  })),
);

const row2Images = computed(() =>
  row2Alts.map((alt) => ({
    src: createPlaceholderUrl(alt),
    alt: alt,
  })),
);

const row3Images = computed(() =>
  row3Alts.map((alt) => ({
    src: createPlaceholderUrl(alt),
    alt: alt,
  })),
);
</script>

<style>
/* CSS Animasi (Tidak Berubah) */
@keyframes marquee-left {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@keyframes marquee-right {
  from {
    transform: translateX(-50%);
  }
  to {
    transform: translateX(0);
  }
}

.animate-marquee-left {
  animation: marquee-left 60s linear infinite;
}

.animate-marquee-right {
  animation: marquee-right 60s linear infinite;
}

.group:hover .pause {
  animation-play-state: paused;
}
</style>
