<template>
  <section class="bg-white py-6 sm:py-12">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center lg:max-w-4xl">
        <h2 class="text-base font-semibold leading-7 text-emerald-600">
          Akses Tautan
        </h2>
        <p
          class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
        >
          Beranda Layanan Informasi dan Data
          <span
            class="bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent"
            >(BELIDA)</span
          >
        </p>
      </div>

      <div class="mx-auto mt-12 max-w-xl">
        <div class="relative">
          <div
            class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4"
          >
            <Search class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            v-model="searchQuery"
            type="search"
            name="search"
            id="search"
            class="block w-full rounded-full border-0 py-3.5 pl-12 pr-4 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
            placeholder="Cari tautan (misal: SAKTI, KSDAE...)"
          />
        </div>
      </div>

      <div
        class="mx-auto mt-16 grid max-w-none grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        <NuxtLink
          v-for="link in filteredLinks"
          :key="link.id"
          :to="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group relative flex transform flex-col justify-between rounded-xl bg-white p-5 shadow-lg ring-1 ring-gray-900/5 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:ring-2 hover:ring-emerald-500"
        >
          <span
            class="absolute top-4 right-4 h-2.5 w-2.5 rounded-full"
            :class="link.status === 'online' ? 'bg-green-500' : 'bg-red-500'"
            :title="link.status === 'online' ? 'Online' : 'Offline'"
          ></span>

          <div class="flex-grow">
            <div
              class="inline-block rounded-lg bg-emerald-100 p-3 ring-1 ring-emerald-200"
            >
              <AppWindow class="h-6 w-6 text-emerald-700" aria-hidden="true" />
            </div>
            <h3 class="mt-4 text-lg font-semibold text-gray-900">
              {{ link.title }}
            </h3>
            <p class="mt-1 text-sm text-gray-500">
              {{ link.subtitle }}
            </p>
          </div>

          <div
            class="mt-4 pt-4 border-t border-gray-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            <span class="text-sm font-semibold text-emerald-600"
              >Kunjungi Tautan &rarr;</span
            >
          </div>
        </NuxtLink>

        <div
          v-if="filteredLinks.length === 0"
          class="col-span-full py-12 text-center"
        >
          <p class="text-lg font-semibold text-gray-900">
            Tautan Tidak Ditemukan
          </p>
          <p class="mt-2 text-gray-600">
            Tidak ada tautan yang cocok dengan pencarian "{{ searchQuery }}".
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { AppWindow, Search } from "lucide-vue-next";

type AccessLink = {
  id: number;
  title: string;
  subtitle: string;
  url: string;
  status: "online" | "offline";
};

// --- State untuk Pencarian ---
const searchQuery = ref("");

// --- Data Tautan (Total 11) ---
const allLinks = ref<AccessLink[]>([
  // 5 Link Pertama Anda
  {
    id: 1,
    title: "SIDAK KSDAE",
    subtitle: "Kementerian LHK",
    url: "https://sidak.ksdae.id/",
    status: "online",
  },
  {
    id: 2,
    title: "SIMPEG",
    subtitle: "Kementerian LHK",
    url: "http://simpeg.menlhk.go.id/",
    status: "online",
  },
  {
    id: 3,
    title: "SAKTI Kemenkeu",
    subtitle: "Kementerian Keuangan",
    url: "https://sakti.kemenkeu.go.id/LL-Zg7BviiuXviBn9TvfiA",
    status: "online",
  },
  {
    id: 4,
    title: "E-Reporting",
    subtitle: "Kementerian LHK",
    url: "https://sakti.kemenkeu.go.id/LL-Zg7BviiuXviBn9TvfiA",
    status: "online",
  },
  {
    id: 5,
    title: "SRIKANDI ARSIP",
    subtitle: "Arsip Nasional RI",
    url: "https://srikandi.arsip.go.id/login",
    status: "offline", // Contoh status offline
  },
  // 6 Link Baru Anda
  {
    id: 6,
    title: "Kementerian LHK",
    subtitle: "Website Resmi MenLHK",
    url: "https://www.menlhk.go.id/",
    status: "online",
  },
  {
    id: 7,
    title: "Ditjen KSDAE",
    subtitle: "Direktorat Jenderal KSDAE",
    url: "http://ksdae.menlhk.go.id/",
    status: "online",
  },
  {
    id: 8,
    title: "Direktorat PIKA",
    subtitle: "Konservasi Hayati",
    url: "http://pika.ksdae.menlhk.go.id/",
    status: "online",
  },
  {
    id: 9,
    title: "Direktorat PJLHK",
    subtitle: "Jasa Lingkungan",
    url: "https://ekowisata.org/",
    status: "online",
  },
  {
    id: 10,
    title: "SiPongi",
    subtitle: "Deteksi Kebakaran Hutan",
    url: "http://sipongi.menlhk.go.id/",
    status: "online",
  },
  {
    id: 11,
    title: "GRACCESS",
    subtitle: "Perizinan Akses SDG",
    url: "https://graccess.co.id/",
    status: "online",
  },
]);

// --- Logika Filter Dinamis ---
const filteredLinks = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  if (!query) {
    return allLinks.value;
  }

  return allLinks.value.filter((link) => {
    const titleMatch = link.title.toLowerCase().includes(query);
    const subtitleMatch = link.subtitle.toLowerCase().includes(query);
    return titleMatch || subtitleMatch;
  });
});

// CATATAN: Status "online"/"offline" masih hardcoded untuk tujuan desain.
// Implementasi nyata memerlukan panggilan API sisi server untuk cek "live status".
</script>
