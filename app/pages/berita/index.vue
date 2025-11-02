<template>
  <div>
    <section class="bg-slate-50 py-16 sm:py-24 lg:py-32">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h1
            class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Berita & Kegiatan BKSDA Sumsel
          </h1>
          <p class="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Temukan berita terbaru dan kegiatan dari Balai Konservasi Sumber
            Daya Alam Sumatera Selatan
          </p>
        </div>

        <div class="mb-12">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 text-center mb-4"
          >
            Filter Berdasarkan Kategori
          </h3>
          <div
            class="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
          >
            <button
              v-for="category in uniqueCategories"
              :key="category"
              @click="toggleCategory(category)"
              :class="[
                'flex items-center gap-2.5 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 transform',
                selectedCategories.includes(category)
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-105'
                  : 'bg-white text-gray-700 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-100 hover:scale-105',
              ]"
            >
              {{ category }}
            </button>
          </div>
        </div>
        <div v-if="filteredPosts.length === 0" class="text-center py-12">
          <svg
            class="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              vector-effect="non-scaling-stroke"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2H4a2 2 0 01-2-2z"
            />
          </svg>
          <h3 class="mt-2 text-sm font-semibold text-gray-900">
            Tidak Ada Berita
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            Tidak ada berita yang ditemukan untuk kategori yang dipilih.
          </p>
        </div>

        <div
          v-else
          class="grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-2 lg:grid-cols-3"
        >
          <article
            v-for="post in filteredPosts"
            :key="post.id"
            class="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
          >
            <NuxtLink :to="post.href" class="block">
              <NuxtImg
                :src="post.imageUrl"
                alt=""
                class="aspect-[16/9] w-full object-cover"
              />
              <div class="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div class="flex items-center gap-x-4 text-xs">
                    <time :datetime="post.datetime" class="text-gray-500">
                      {{ post.date }}
                    </time>
                    <span
                      class="relative z-10 rounded-full bg-emerald-100 px-3 py-1.5 font-medium text-emerald-700"
                    >
                      {{ post.category.title }}
                    </span>
                  </div>
                  <h3 class="mt-4 text-lg font-bold leading-7 text-gray-900">
                    <span class="absolute inset-0" />
                    {{ post.title }}
                  </h3>
                  <p
                    class="mt-4 text-base leading-7 text-gray-600 line-clamp-3"
                  >
                    {{ post.description }}
                  </p>
                  <div class="mt-4 flex items-center gap-3">
                    <div
                      class="h-8 w-8 overflow-hidden rounded-full bg-gray-200"
                    >
                      <div
                        class="h-full w-full bg-gray-300 flex items-center justify-center"
                      >
                        <UserIcon class="h-4 w-4 text-gray-500" />
                      </div>
                    </div>
                    <div>
                      <p class="text-xs font-medium text-gray-900">
                        {{ post.author.name }}
                      </p>
                      <p class="text-xs text-gray-500">
                        {{ post.author.role }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="mt-6">
                  <NuxtLink
                    :to="post.href"
                    class="text-sm font-semibold leading-6 text-emerald-600 hover:text-emerald-700"
                  >
                    Baca selengkapnya
                    <ArrowRightCircleIcon
                      class="ml-1 inline-block h-4 w-4"
                      aria-hidden="true"
                    />
                  </NuxtLink>
                </div>
              </div>
            </NuxtLink>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { ArrowRightCircleIcon, UserIcon } from "lucide-vue-next";

definePageMeta({
  title: "Berita & Kegiatan",
  layout: "default",
});

const posts = [
  {
    id: 1,
    title: "BKSDA Sumsel Gelar Operasi Penyelamatan Satwa Dilindungi",
    href: "/berita/1",
    description:
      "Tim BKSDA berhasil menyelamatkan seekor harimau sumatera yang terjebak di area perkebunan warga, kini dalam proses rehabilitasi.",
    imageUrl: "/news-1.jpg",
    date: "10 April 2024",
    datetime: "2024-04-10",
    category: { title: "Penyelamatan Satwa" },
    author: { name: "Dra. Siti Nurhaliza, M.Si", role: "Kepala BKSDA Sumsel" },
  },
  {
    id: 2,
    title: "Edukasi Konservasi: BKSDA Kunjungi Sekolah di Muara Enim",
    href: "/berita/2",
    description:
      "Program edukasi interaktif untuk menumbuhkan kesadaran konservasi sejak dini.",
    imageUrl: "/news-2.jpg",
    date: "05 April 2024",
    datetime: "2024-04-05",
    category: { title: "Edukasi" },
    author: {
      name: "Dr. Budi Santoso, S.Hut., M.Sc.",
      role: "Koordinator Edukasi",
    },
  },
  {
    id: 3,
    title: "Penanaman Ribuan Bibit Pohon di Kawasan Hutan Lindung",
    href: "/berita/3",
    description:
      "Kolaborasi BKSDA dengan masyarakat dalam upaya reforestasi memulihkan fungsi hutan.",
    imageUrl: "/news-3.webp",
    date: "28 Maret 2024",
    datetime: "2024-03-28",
    category: { title: "Rehabilitasi Hutan" },
    author: {
      name: "Ir. Rina Permata, M.For.Sc.",
      role: "Koordinator Rehabilitasi",
    },
  },
  {
    id: 4,
    title: "Studi Habitat Baru untuk Badak Sumatera di Taman Nasional",
    href: "/berita/4",
    description:
      "Penelitian mendalam untuk menemukan zona aman dan ideal bagi pelepasliaran badak.",
    imageUrl: "/news-4.jpg",
    date: "20 Maret 2024",
    datetime: "2024-03-20",
    category: { title: "Penelitian" },
    author: {
      name: "Dr. Andi Prasetyo, S.Si., M.Biol.",
      role: "Kepala Laboratorium",
    },
  },
  {
    id: 5,
    title: "Pelatihan Teknis Pengelolaan Kawasan Konservasi untuk Staf Baru",
    href: "/berita/5",
    description:
      "BKSDA Sumsel mengadakan pelatihan intensif untuk meningkatkan kapasitas staf baru dalam pengelolaan kawasan konservasi.",
    imageUrl: "/news-5.jpg",
    date: "15 Maret 2024",
    datetime: "2024-03-15",
    category: { title: "Pelatihan" },
    author: { name: "Drs. H. Mulyadi, M.Si.", role: "Koordinator SDM" },
  },
  {
    id: 6,
    title: "Kampanye Anti Perdagangan Satwa Liar di Pasar Tradisional",
    href: "/berita/6",
    description:
      "Tim edukasi BKSDA melakukan sosialisasi anti perdagangan satwa liar di pasar-pasar tradisional di Palembang.",
    imageUrl: "/news-6.jpg",
    date: "08 Maret 2024",
    datetime: "2024-03-08",
    category: { title: "Edukasi" },
    author: { name: "Fitriani, S.Psi., M.Si.", role: "Staf Edukasi" },
  },
];

const uniqueCategories = [...new Set(posts.map((post) => post.category.title))];

const selectedCategories = ref<string[]>([]);

function toggleCategory(category: string) {
  const index = selectedCategories.value.indexOf(category);
  if (index > -1) {
    selectedCategories.value.splice(index, 1);
  } else {
    selectedCategories.value.push(category);
  }
}

const filteredPosts = computed(() => {
  if (selectedCategories.value.length === 0) {
    return posts;
  }
  return posts.filter((post) =>
    selectedCategories.value.includes(post.category.title),
  );
});
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
