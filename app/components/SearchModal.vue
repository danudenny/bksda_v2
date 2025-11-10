<template>
  <div v-if="isOpen" id="search-modal" role="dialog" aria-modal="true">
    <transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 cursor-pointer"
        @click="emit('close')"
        aria-hidden="true"
      ></div>
    </transition>

    <transition
      enter-active-class="transition-all duration-400 ease-out"
      enter-from-class="opacity-0 scale-95 -translate-y-8"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 -translate-y-8"
    >
      <div
        v-if="isOpen"
        class="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4"
        @click.stop
      >
        <div
          class="relative overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10"
        >
          <div class="relative">
            <div
              class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-6"
            >
              <Search class="h-5 w-5 text-slate-400" aria-hidden="true" />
            </div>
            <input
              ref="searchInput"
              v-model="searchQuery"
              type="text"
              class="block w-full border-0 py-5 pl-14 pr-14 text-slate-900 placeholder:text-slate-400 focus:ring-0 text-lg"
              placeholder="Cari berita, kawasan, layanan..."
              @keydown.esc="emit('close')"
              @keydown.enter="handleSearch"
            />
            <button
              v-if="searchQuery"
              @click="clearSearch"
              class="absolute inset-y-0 right-14 flex items-center pr-3 text-slate-400 hover:text-slate-600 transition-colors duration-200"
              aria-label="Clear search"
            >
              <X class="h-5 w-5" />
            </button>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-6"
            >
              <kbd
                class="inline-flex items-center rounded border border-slate-200 px-2 py-1 text-xs font-sans text-slate-500"
              >
                ESC
              </kbd>
            </div>
          </div>

          <div
            v-if="searchQuery"
            class="border-t border-slate-200 bg-slate-50 p-4 max-h-96 overflow-y-auto"
          >
            <div
              v-if="isSearching"
              class="flex items-center justify-center py-8"
            >
              <Loader2 class="h-6 w-6 animate-spin text-emerald-600" />
              <span class="ml-2 text-sm text-slate-600">Mencari...</span>
            </div>

            <div v-else-if="searchResults.length > 0" class="space-y-2">
              <p
                class="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2 mb-3"
              >
                {{ searchResults.length }} Hasil Ditemukan
              </p>
              <NuxtLink
                v-for="result in searchResults"
                :key="result.id"
                :to="result.href"
                class="group flex items-start gap-3 rounded-lg p-3 hover:bg-white transition-all duration-200"
                @click="emit('close')"
              >
                <div
                  class="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex-shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-200"
                >
                  <component :is="result.icon" class="h-5 w-5" />
                </div>
                <div class="flex-1 min-w-0">
                  <p
                    class="text-sm font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors duration-200"
                  >
                    {{ result.title }}
                  </p>
                  <p class="text-xs text-slate-500 mt-0.5">
                    {{ result.category }}
                  </p>
                </div>
                <ArrowUpRight
                  class="h-4 w-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                />
              </NuxtLink>
            </div>

            <div v-else class="text-center py-8">
              <div
                class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-200 mb-3"
              >
                <SearchX class="h-6 w-6 text-slate-500" />
              </div>
              <p class="text-sm font-semibold text-slate-900">
                Tidak ada hasil
              </p>
              <p class="text-xs text-slate-500 mt-1">Coba kata kunci lain</p>
            </div>
          </div>

          <div v-else class="border-t border-slate-200 p-4">
            <p
              class="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2 mb-3"
            >
              Pencarian Populer
            </p>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="quickLink in quickSearchLinks"
                :key="quickLink.label"
                @click="setQuickSearch(quickLink.query)"
                class="group flex items-center gap-2 rounded-lg p-3 text-left hover:bg-emerald-50 transition-all duration-200"
              >
                <component
                  :is="quickLink.icon"
                  class="h-4 w-4 text-slate-400 group-hover:text-emerald-600 transition-colors duration-200"
                />
                <span
                  class="text-sm text-slate-700 group-hover:text-emerald-700 transition-colors duration-200"
                >
                  {{ quickLink.label }}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import {
  Search,
  X,
  ArrowUpRight,
  SearchX,
  Loader2,
  FileText,
  Mountain,
  Image as ImageIcon,
  Users,
  TreePine,
  Newspaper,
} from "lucide-vue-next";

type SearchResult = {
  id: number;
  title: string;
  category: string;
  href: string;
  icon: any;
};

type QuickSearchLink = {
  label: string;
  query: string;
  icon: any;
};

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();

const searchInput = ref<HTMLInputElement | null>(null);
const searchQuery = ref("");
const isSearching = ref(false);
const searchResults = ref<SearchResult[]>([]);

const quickSearchLinks: QuickSearchLink[] = [
  { label: "Berita Terbaru", query: "berita", icon: Newspaper },
  { label: "Kawasan Konservasi", query: "kawasan", icon: Mountain },
  { label: "Galeri Foto", query: "galeri", icon: ImageIcon },
  { label: "Profil BKSDA", query: "profil", icon: Users },
  { label: "Fokus Konservasi", query: "konservasi", icon: TreePine },
  { label: "Regulasi", query: "regulasi", icon: FileText },
];

const allContent: SearchResult[] = [
  {
    id: 1,
    title: "Berita Terbaru BKSDA",
    category: "Berita",
    href: "/berita",
    icon: Newspaper,
  },
  {
    id: 2,
    title: "Taman Wisata Alam Punti Kayu",
    category: "Kawasan Konservasi",
    href: "/kawasan/punti-kayu",
    icon: Mountain,
  },
  {
    id: 3,
    title: "Galeri Foto Kegiatan",
    category: "Galeri",
    href: "/galeri",
    icon: ImageIcon,
  },
  {
    id: 4,
    title: "Profil BKSDA Sumatera Selatan",
    category: "Profil",
    href: "/profil",
    icon: Users,
  },
  {
    id: 5,
    title: "Fokus Konservasi Harimau Sumatera",
    category: "Konservasi",
    href: "/konservasi/harimau",
    icon: TreePine,
  },
  {
    id: 6,
    title: "Peraturan dan Regulasi",
    category: "Regulasi",
    href: "/regulasi",
    icon: FileText,
  },
];

const clearSearch = () => {
  searchQuery.value = "";
  searchResults.value = [];
};

const setQuickSearch = (query: string) => {
  searchQuery.value = query;
  nextTick(() => {
    searchInput.value?.focus();
  });
};

const handleSearch = () => {
  if (!searchQuery.value.trim()) return;

  const query = searchQuery.value.trim();
  navigateTo(`/search?q=${encodeURIComponent(query)}`);
  emit("close");
};

watch(searchQuery, async (newQuery) => {
  if (!newQuery.trim()) {
    searchResults.value = [];
    return;
  }

  isSearching.value = true;

  await new Promise((resolve) => setTimeout(resolve, 300));

  const query = newQuery.toLowerCase();
  searchResults.value = allContent.filter(
    (item) =>
      item.title.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query),
  );

  isSearching.value = false;
});

watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      nextTick(() => {
        searchInput.value?.focus();
      });
    } else {
      searchQuery.value = "";
      searchResults.value = [];
    }
  },
);
</script>
