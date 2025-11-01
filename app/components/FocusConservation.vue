<template>
  <section class="bg-slate-900 py-16 sm:py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center lg:max-w-4xl">
        <h2 class="text-base font-semibold leading-7 text-emerald-400">
          Fokus Konservasi
        </h2>
        <p
          class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Harta Karun Hayati Kami
        </p>
        <p class="mt-6 text-lg leading-8 text-gray-300">
          Sumatera Selatan adalah rumah bagi beberapa spesies paling terancam di
          dunia. Perlindungan mereka adalah inti dari misi kami, memastikan
          keberadaan mereka untuk generasi yang akan datang.
        </p>
      </div>

      <div
        class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3"
      >
        <NuxtLink
          v-for="spesies in fokusKonservasi"
          :key="spesies.name"
          :to="`/konservasi/${slugify(spesies.name)}`"
          class="group relative h-96 overflow-hidden rounded-2xl ring-1 ring-white/10 transition-all duration-500 hover:scale-105 hover:ring-emerald-400"
        >
          <NuxtImg
            :src="spesies.imageUrl"
            :alt="spesies.name"
            class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="33vw"
            loading="lazy"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
            aria-hidden="true"
          ></div>

          <div
            class="relative z-10 flex h-full flex-col justify-end p-6 sm:p-8"
          >
            <div
              class="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/90 to-transparent pointer-events-none"
              aria-hidden="true"
            ></div>

            <h3 class="text-2xl font-bold text-white">
              {{ spesies.name }}
            </h3>
            <p class="mt-1 text-sm font-medium text-emerald-300 italic">
              {{ spesies.latinName }}
            </p>
            <div class="mt-4 text-sm font-semibold text-white">
              Pelajari lebih lanjut
              <ArrowRightCircleIcon
                class="inline-block h-5 w-5 ml-1 text-emerald-400 transition-transform duration-300 group-hover:translate-x-1"
              />
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ArrowRightCircleIcon } from "lucide-vue-next";

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};

const fokusKonservasi = ref([
  {
    name: "Harimau Sumatera",
    latinName: "Panthera tigris sumatrae",
    imageUrl: "/fokus_konservasi/harimau.avif",
  },
  {
    name: "Gajah Sumatera",
    latinName: "Elephas maximus sumatranus",
    imageUrl: "/fokus_konservasi/gajah.avif",
  },
  {
    name: "Burung Rangkong",
    latinName: "Buceros rhinoceros",
    imageUrl: "/fokus_konservasi/rangkong.avif",
  },
]);
</script>
