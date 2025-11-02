<template>
  <div>
    <section class="bg-slate-50 py-16 sm:py-24 lg:py-32">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <NuxtLink
          to="/berita"
          class="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
        >
          <ChevronLeftIcon class="h-4 w-4" aria-hidden="true" />
          Kembali ke Berita
        </NuxtLink>

        <article v-if="post" class="mt-8">
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

          <div class="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1
              class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              {{ post.title }}
            </h1>
            
            <div class="flex items-center gap-4">
              <!-- Share Button -->
              <div class="relative" ref="shareMenuRef">
                <button
                  @click="toggleShareMenu"
                  class="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors duration-300 hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                >
                  <ShareIcon class="h-4 w-4" aria-hidden="true" />
                  Bagikan
                </button>
                
                <!-- Share Menu -->
                <div 
                  v-if="showShareMenu" 
                  class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <button
                    @click="shareToFacebook"
                    class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Facebook
                  </button>
                  <button
                    @click="shareToTwitter"
                    class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Twitter
                  </button>
                  <button
                    @click="shareToWhatsApp"
                    class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    WhatsApp
                  </button>
                  <button
                    @click="copyLink"
                    class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Salin Tautan
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Author Information -->
          <div class="mt-4 flex items-center gap-3">
            <div class="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
              <div class="h-full w-full bg-gray-300 flex items-center justify-center">
                <UserIcon class="h-6 w-6 text-gray-500" />
              </div>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900">{{ post.author.name }}</p>
              <p class="text-xs text-gray-500">{{ post.author.role }}</p>
            </div>
          </div>

          <NuxtImg
            :src="post.imageUrl"
            alt=""
            class="mt-8 aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover"
          />

          <div class="mt-8 max-w-4xl mx-auto text-lg text-gray-600">
            <p>{{ post.description }}</p>
            <p class="mt-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat.
            </p>
            <p class="mt-6">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p class="mt-6">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
              illo inventore veritatis et quasi architecto beatae vitae dicta sunt
              explicabo.
            </p>
            <h2 class="mt-8 text-2xl font-bold text-gray-900">Kesimpulan</h2>
            <p class="mt-4">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
              fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
              sequi nesciunt.
            </p>
          </div>
        </article>

        <div
          v-if="relatedPosts.length > 0"
          class="mt-16 border-t border-gray-200 pt-12"
        >
          <h2 class="text-2xl font-bold tracking-tight text-gray-900">
            Berita Terkait
          </h2>
          <div
            class="mt-6 grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-2 lg:grid-cols-3"
          >
            <article
              v-for="relatedPost in relatedPosts"
              :key="relatedPost.id"
              class="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
            >
              <NuxtLink :to="relatedPost.href" class="block">
                <NuxtImg
                  :src="relatedPost.imageUrl"
                  alt=""
                  class="aspect-[16/9] w-full object-cover"
                />
                <div class="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div class="flex items-center gap-x-4 text-xs">
                      <time :datetime="relatedPost.datetime" class="text-gray-500">
                        {{ relatedPost.date }}
                      </time>
                      <span
                        class="relative z-10 rounded-full bg-emerald-100 px-3 py-1.5 font-medium text-emerald-700"
                      >
                        {{ relatedPost.category.title }}
                      </span>
                    </div>
                    <h3 class="mt-4 text-lg font-bold leading-7 text-gray-900">
                      <span class="absolute inset-0" />
                      {{ relatedPost.title }}
                    </h3>
                  </div>
                </div>
              </NuxtLink>
            </article>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { ChevronLeftIcon, ShareIcon, UserIcon } from "lucide-vue-next";

const route = useRoute();
const postId = route.params.id;

// Share functionality
const showShareMenu = ref(false);
const shareMenuRef = ref<HTMLElement | null>(null);

definePageMeta({
  title: "Detail Berita",
  layout: "default",
});

// Close share menu when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  if (shareMenuRef.value && !shareMenuRef.value.contains(event.target as Node)) {
    showShareMenu.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

const toggleShareMenu = () => {
  showShareMenu.value = !showShareMenu.value;
};

const shareToFacebook = () => {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(post.value?.title || "Berita BKSDA");
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${title}`, "_blank");
  showShareMenu.value = false;
};

const shareToTwitter = () => {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(post.value?.title || "Berita BKSDA");
  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, "_blank");
  showShareMenu.value = false;
};

const shareToWhatsApp = () => {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(post.value?.title || "Berita BKSDA");
  window.open(`https://wa.me/?text=${title}%20${url}`, "_blank");
  showShareMenu.value = false;
};

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    // In a real application, you might want to show a toast notification here
    console.log("Tautan telah disalin ke clipboard");
  } catch (err) {
    console.error("Gagal menyalin tautan: ", err);
  }
  showShareMenu.value = false;
};

// In a real application, this data would come from an API or CMS
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
    author: { name: "Dr. Budi Santoso, S.Hut., M.Sc.", role: "Koordinator Edukasi" },
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
    author: { name: "Ir. Rina Permata, M.For.Sc.", role: "Koordinator Rehabilitasi" },
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
    author: { name: "Dr. Andi Prasetyo, S.Si., M.Biol.", role: "Kepala Laboratorium" },
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

const post = computed(() => {
  return posts.find((p) => p.id === Number(postId));
});

const relatedPosts = computed(() => {
  return posts
    .filter((p) => p.id !== Number(postId))
    .slice(0, 3);
});

// Set page title dynamically
useHead({
  title: post.value ? post.value.title : "Berita Tidak Ditemukan",
});
</script>
