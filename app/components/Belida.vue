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
          v-for="link in displayedLinks"
          :key="link.id"
          :to="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group relative flex transform flex-col justify-between rounded-xl bg-white p-5 shadow-lg ring-1 ring-gray-900/5 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:ring-2 hover:ring-emerald-500"
        >
          <span
            class="absolute top-4 right-4 h-2.5 w-2.5 rounded-full"
            :class="{
              'bg-green-500': link.status === 'online',
              'bg-red-500': link.status === 'offline',
              'bg-yellow-400 animate-pulse': link.status === 'pending',
            }"
            :title="
              link.status === 'online'
                ? 'Online'
                : link.status === 'offline'
                  ? 'Offline'
                  : 'Mengecek...'
            "
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
            class="mt-4 pt-4 border-t border-gray-100 transition-opacity duration-300 group-hover:border-emerald-950"
          >
            <span class="text-sm font-semibold text-emerald-600"
              >Kunjungi Tautan</span
            >
            <ArrowRightCircleIcon
              class="ml-1 inline-block h-5 w-5 text-emerald-600"
            />
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

      <div v-if="filteredLinks.length > 4" class="mt-12 text-center">
        <button
          @click="isExpanded = !isExpanded"
          type="button"
          class="inline-flex cursor-pointer items-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-colors"
        >
          <template v-if="!isExpanded">
            <span>Tampilkan Semua ({{ filteredLinks.length }})</span>
            <ChevronDown class="ml-2 h-4 w-4" />
          </template>
          <template v-else>
            <span>Tampilkan Lebih Sedikit</span>
            <ChevronUp class="ml-2 h-4 w-4" />
          </template>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import {
  AppWindow,
  Search,
  ChevronDown,
  ChevronUp,
  ArrowRightCircleIcon,
} from "lucide-vue-next";

type AccessLink = {
  id: number;
  title: string;
  subtitle: string;
  url: string;
  status: "online" | "offline" | "pending";
};

const searchQuery = ref("");
const isExpanded = ref(false);

const allLinks = ref<AccessLink[]>([
  {
    id: 1,
    title: "SIDAK KSDAE",
    subtitle: "Kementerian LHK",
    url: "https://sidak.ksdae.id/",
    status: "pending",
  },
  {
    id: 2,
    title: "SIMPEG",
    subtitle: "Kementerian LHK",
    url: "https://simpeg.menlhk.go.id/",
    status: "pending",
  },
  {
    id: 3,
    title: "SAKTI Kemenkeu",
    subtitle: "Kementerian Keuangan",
    url: "https://sakti.kemenkeu.go.id/LL-Zg7BviiuXviBn9TvfiA",
    status: "pending",
  },
  {
    id: 4,
    title: "E-Reporting",
    subtitle: "Kementerian LHK",
    url: "https://e-reporting.menlhk.go.id/",
    status: "pending",
  },
  {
    id: 5,
    title: "SRIKANDI ARSIP",
    subtitle: "Arsip Nasional RI",
    url: "https://srikandi.arsip.go.id/login",
    status: "pending",
  },
  {
    id: 6,
    title: "Kementerian LHK",
    subtitle: "Website Resmi MenLHK",
    url: "https://www.menlhk.go.id/",
    status: "pending",
  },
  {
    id: 7,
    title: "Ditjen KSDAE",
    subtitle: "Direktorat Jenderal KSDAE",
    url: "https://ksdae.or.id",
    status: "pending",
  },
  {
    id: 8,
    title: "Direktorat PIKA",
    subtitle: "Konservasi Hayati",
    url: "http://pika.ksdae.menlhk.go.id/",
    status: "pending",
  },
  {
    id: 9,
    title: "Direktorat PJLHK",
    subtitle: "Jasa Lingkungan",
    url: "https://ekowisata.org/",
    status: "pending",
  },
  {
    id: 10,
    title: "SiPongi",
    subtitle: "Deteksi Kebakaran Hutan",
    url: "http://sipongi.menlhk.go.id/",
    status: "pending",
  },
  {
    id: 11,
    title: "GRACCESS",
    subtitle: "Perizinan Akses SDG",
    url: "https://graccess.co.id/",
    status: "pending",
  },
]);

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

const displayedLinks = computed(() => {
  if (isExpanded.value) {
    return filteredLinks.value;
  }
  return filteredLinks.value.slice(0, 4);
});

watch(searchQuery, () => {
  isExpanded.value = false;
});

onMounted(() => {
  allLinks.value.forEach(async (link) => {
    try {
      const response = await $fetch("/api/check-status", {
        method: "POST",
        body: { url: link.url },
      });

      link.status = response.status;
    } catch (error) {
      console.error(`Gagal mengecek ${link.url}:`, error);
      link.status = "offline";
    }
  });
});
</script>
