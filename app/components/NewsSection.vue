<template>
  <section class="bg-slate-50 py-16 sm:py-24 lg:py-32">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div
        class="flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-8 sm:flex-row sm:items-end"
      >
        <div>
          <h2 class="text-base font-semibold leading-7 text-emerald-600">
            Berita & Kegiatan
          </h2>
          <p
            class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Berita Terbaru dari BKSDA Sumsel
          </p>
        </div>
        <NuxtLink
          to="/berita"
          class="inline-flex items-center gap-1.5 rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors duration-300 hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          Lihat Semua Berita
          <ArrowRightCircleIcon class="h-4 w-4" aria-hidden="true" />
        </NuxtLink>
      </div>

      <article
        v-if="featuredPost"
        class="mt-12 grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12"
      >
        <NuxtLink :to="featuredPost.href" class="group block">
          <NuxtImg
            :src="featuredPost.imageUrl"
            alt=""
            class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover shadow-xl transition-all duration-500 group-hover:scale-105"
          />
        </NuxtLink>

        <div class="flex flex-col justify-center">
          <div class="flex items-center gap-x-4 text-xs">
            <time :datetime="featuredPost.datetime" class="text-gray-500">
              {{ featuredPost.date }}
            </time>
            <span
              class="relative z-10 rounded-full bg-emerald-100 px-3 py-1.5 font-medium text-emerald-700"
            >
              {{ featuredPost.category.title }}
            </span>
          </div>
          <h3
            class="mt-4 text-2xl font-bold leading-8 text-gray-900 sm:text-3xl"
          >
            <NuxtLink :to="featuredPost.href" class="hover:text-gray-700">
              {{ featuredPost.title }}
            </NuxtLink>
          </h3>
          <p class="mt-4 text-base leading-7 text-gray-600">
            {{ featuredPost.description }}
          </p>
          <div class="mt-6">
            <NuxtLink
              :to="featuredPost.href"
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
      </article>

      <div
        class="mt-16 grid grid-cols-1 gap-8 border-t border-gray-200 pt-12 sm:mt-20 sm:pt-16 md:grid-cols-2 lg:grid-cols-3"
      >
        <article
          v-for="post in sidePosts"
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
                <time
                  :datetime="post.datetime"
                  class="text-xs uppercase tracking-wide text-gray-500"
                >
                  {{ post.date }}
                </time>
                <h3 class="mt-2 text-lg font-bold leading-7 text-gray-900">
                  <span class="absolute inset-0" />
                  {{ post.title }}
                </h3>
              </div>
            </div>
          </NuxtLink>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { ArrowRightCircleIcon } from "lucide-vue-next"; // Import the icon

const posts = [
  {
    id: 1,
    title: "BKSDA Sumsel Gelar Operasi Penyelamatan Satwa Dilindungi",
    href: "#",
    description:
      "Tim BKSDA berhasil menyelamatkan seekor harimau sumatera yang terjebak di area perkebunan warga, kini dalam proses rehabilitasi.",
    imageUrl: "/news-1.jpg",
    date: "10 April 2024",
    datetime: "2024-04-10",
    category: { title: "Penyelamatan Satwa" },
  },
  {
    id: 2,
    title: "Edukasi Konservasi: BKSDA Kunjungi Sekolah di Muara Enim",
    href: "#",
    description:
      "Program edukasi interaktif untuk menumbuhkan kesadaran konservasi sejak dini.",
    imageUrl: "/news-2.jpg",
    date: "05 April 2024",
    datetime: "2024-04-05",
    category: { title: "Edukasi" },
  },
  {
    id: 3,
    title: "Penanaman Ribuan Bibit Pohon di Kawasan Hutan Lindung",
    href: "#",
    description:
      "Kolaborasi BKSDA dengan masyarakat dalam upaya reforestasi memulihkan fungsi hutan.",
    imageUrl: "/news-3.webp",
    date: "28 Maret 2024",
    datetime: "2024-03-28",
    category: { title: "Rehabilitasi Hutan" },
  },
  {
    id: 4,
    title: "Studi Habitat Baru untuk Badak Sumatera di Taman Nasional",
    href: "#",
    description:
      "Penelitian mendalam untuk menemukan zona aman dan ideal bagi pelepasliaran badak.",
    imageUrl: "/news-4.jpg",
    date: "20 Maret 2024",
    datetime: "2024-03-20",
    category: { title: "Penelitian" },
  },
];

// Use computed properties to separate the featured post from the others
const featuredPost = computed(() => posts[0]);
const sidePosts = computed(() => posts.slice(1, 4));
</script>
