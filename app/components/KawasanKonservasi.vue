<template>
  <section class="bg-white py-8 sm:py-16">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center lg:max-w-4xl">
        <h2 class="text-base font-semibold leading-7 text-emerald-600">
          Kawasan Konservasi
        </h2>
        <p
          class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
        >
          Jelajahi Wilayah Perlindungan Kami
        </p>
        <p class="mt-6 text-lg leading-8 text-gray-600">
          Setiap kawasan memiliki fokus perlindungan yang unik. Pilih kategori
          di bawah untuk melihat daftar kawasan yang kami kelola.
        </p>
      </div>

      <div
        class="mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-4"
      >
        <button
          v-for="kategori in dataKawasan"
          :key="kategori.id"
          @click="activeTab = kategori.id"
          :class="[
            'flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm sm:text-base font-semibold transition-all duration-300 transform',
            activeTab === kategori.id
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-105'
              : 'bg-white text-gray-700 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-100 hover:scale-105',
          ]"
        >
          <component :is="kategori.icon" class="h-5 w-5" aria-hidden="true" />
          <span>{{ kategori.label }}</span>
        </button>
      </div>

      <div class="relative mt-12 sm:mt-16">
        <transition
          mode="out-in"
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            :key="activeShowcase.id"
            class="grid grid-cols-1 items-center overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-900/5 lg:grid-cols-2"
          >
            <div class="relative h-64 w-full lg:h-full">
              <NuxtImg
                :src="activeShowcase.imageUrl"
                :alt="activeShowcase.label"
                class="absolute h-full w-full object-cover"
                sizes="50vw"
              />
            </div>

            <div class="flex h-full flex-col p-6 sm:p-8 lg:p-10">
              <h3 class="text-2xl font-bold text-gray-900 sm:text-3xl">
                {{ activeShowcase.label }}
              </h3>
              <p class="mt-2 text-base leading-7 text-gray-600">
                {{ activeShowcase.description }}
              </p>

              <div
                class="mt-6 pt-6 border-t border-gray-200"
                aria-label="Kawasan"
              >
                <div class="flex flex-wrap gap-2">
                  <NuxtLink
                    v-for="kawasan in activeShowcase.children"
                    :key="kawasan.label"
                    :to="`/kawasan/${slugify(activeShowcase.id)}/${slugify(
                      kawasan.label,
                    )}`"
                    class="block transform rounded-full bg-slate-100 px-4 py-1.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:bg-emerald-100 hover:text-emerald-700 hover:scale-105"
                  >
                    {{ kawasan.label }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
// MapPin tidak lagi diperlukan
import { Shield, Camera, Mountain } from "lucide-vue-next";

// --- Tipe Data (Tidak Berubah) ---
type KawasanChild = {
  label: string;
};
type KategoriKawasan = {
  id: string;
  label: string;
  icon: any;
  description: string;
  imageUrl: string;
  children: KawasanChild[];
};

// --- Fungsi Utilitas untuk membuat URL ---
const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-") // Ganti spasi dengan -
    .replace(/[^\w-]+/g, ""); // Hapus karakter non-word
};

// --- Data Kawasan (Tidak Berubah) ---
const dataKawasan: KategoriKawasan[] = [
  {
    id: "suaka-margasatwa",
    label: "Suaka Margasatwa",
    icon: Shield,
    description:
      "Kawasan suaka alam yang melindungi satwa liar khas, sebagai tempat perlindungan, perkembangbiakan, dan habitat penting.",
    imageUrl:
      "https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    children: [
      { label: "Dangku" },
      { label: "Bentayan" },
      { label: "Isau Isau" },
      { label: "Gumai Pasemah" },
      { label: "Gunung Raya" },
    ],
  },
  {
    id: "taman-wisata-alam",
    label: "Taman Wisata Alam",
    icon: Camera,
    description:
      "Kawasan pelestarian alam yang dimanfaatkan untuk rekreasi, pariwisata alam, dan edukasi lingkungan secara berkelanjutan.",
    imageUrl:
      "https://images.unsplash.com/photo-1501675423372-9bfa95849e62?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    children: [
      { label: "Punti Kayu" },
      { label: "Isau-Isau" },
      { label: "Jering Menduyung" },
      { label: "Gunung Permisan" },
    ],
  },
  {
    id: "taman-nasional",
    label: "Taman Nasional",
    icon: Mountain,
    description:
      "Ekosistem asli yang dikelola untuk tujuan penelitian, ilmu pengetahuan, pendidikan, dan pelestarian keanekaragaman hayati.",
    imageUrl:
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    children: [{ label: "Gunung Maras" }],
  },
];

// --- State (Tidak Berubah) ---
const activeTab = ref<string>("suaka-margasatwa");

const activeShowcase = computed(() => {
  return dataKawasan.find((k) => k.id === activeTab.value)!;
});
</script>
