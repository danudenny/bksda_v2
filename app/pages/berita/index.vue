<template>
    <NuxtLayout name="archive">
        <template #breadcrumb>
            <NuxtLink to="/" class="text-emerald-200 hover:text-white transition-colors">Beranda</NuxtLink>
            <span class="text-emerald-500 mx-2">/</span>
            <span class="text-white">Berita & Kegiatan</span>
        </template>

        <template #badge>
            <div class="mb-6 animate-fade-in">
                <span
                    class="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 text-sm font-medium text-emerald-50 shadow-sm"
                >
                    <span class="relative flex h-2 w-2">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Informasi Terkini
                </span>
            </div>
        </template>

        <template #header>
            <h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
                Berita & Kegiatan <br/>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-teal-400">BKSDA Sumsel</span>
            </h1>
        </template>

        <template #description>
            <p class="mx-auto max-w-2xl text-lg leading-8 text-emerald-100/80">
                Ikuti perkembangan terbaru konservasi, kegiatan lapangan, dan upaya pelestarian alam di Sumatera Selatan.
            </p>
        </template>

        <template #filters>
            <div class="flex flex-col gap-4 mb-8">
                <div class="flex items-center justify-between">
                    <h3 class="text-sm font-semibold uppercase tracking-wider text-gray-500">
                        Filter Kategori
                    </h3>
                    <button 
                        v-if="selectedCategories.length > 0"
                        @click="resetFilters"
                        class="text-xs text-emerald-600 hover:text-emerald-700 font-medium hover:underline"
                    >
                        Reset Filter
                    </button>
                </div>
                
                <div class="flex flex-wrap items-center gap-2">
                    <template v-if="statusCategories === 'pending'">
                        <div v-for="i in 4" :key="i" class="h-9 w-24 rounded-full bg-gray-200 animate-pulse"></div>
                    </template>

                    <template v-else>
                        <button
                            v-for="category in categories"
                            :key="category.id"
                            @click="toggleCategory(category.id)"
                            class="relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-out border"
                            :class="[
                                selectedCategories.includes(category.id)
                                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-600/20 transform scale-105'
                                    : 'bg-white border-gray-200 text-gray-600 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50'
                            ]"
                        >
                            {{ category.name }}
                            <span v-if="selectedCategories.includes(category.id)" class="ml-1.5 opacity-75">&times;</span>
                        </button>
                    </template>
                </div>
            </div>
        </template>

        <div>
            <div v-if="isLoading && posts.length === 0" class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <div v-for="n in 6" :key="n" class="rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 h-[400px]">
                    <div class="h-48 bg-gray-200 animate-pulse"></div>
                    <div class="p-6 space-y-4">
                        <div class="h-4 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                        <div class="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                        <div class="space-y-2">
                            <div class="h-3 w-full bg-gray-200 rounded animate-pulse"></div>
                            <div class="h-3 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else-if="formattedPosts.length === 0 && !isLoading" class="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
                <div class="rounded-full bg-white p-4 shadow-sm ring-1 ring-gray-900/5">
                    <svg class="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                </div>
                <h3 class="mt-4 text-lg font-semibold text-gray-900">Tidak Ada Berita</h3>
                <p class="text-gray-500 text-center max-w-sm mt-2">
                    Belum ada berita untuk kategori yang Anda pilih saat ini. Coba reset filter atau pilih kategori lain.
                </p>
                <button @click="resetFilters" class="mt-6 text-sm font-semibold text-emerald-600 hover:text-emerald-500">
                    Hapus semua filter
                </button>
            </div>

            <div v-else class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <TransitionGroup name="list">
                    <article
                        v-for="post in formattedPosts"
                        :key="post.id"
                        class="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                        <NuxtLink :to="post.href" class="flex flex-col h-full">
                            <div class="relative aspect-[16/9] overflow-hidden sm:aspect-[2/1] lg:aspect-[3/2]">
                                <img
                                    :src="post.imageUrl || 'https://placehold.co/600x400?text=No+Image'"
                                    :alt="post.title"
                                    class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div class="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                                
                                <div class="absolute top-4 left-4">
                                    <span class="inline-flex items-center rounded-full bg-white/90 backdrop-blur px-2.5 py-0.5 text-xs font-bold text-emerald-700 shadow-sm">
                                        {{ post.category.title }}
                                    </span>
                                </div>
                            </div>

                            <div class="flex flex-1 flex-col p-6">
                                <div class="flex items-center gap-x-3 text-xs text-gray-500 mb-3">
                                    <time :datetime="post.datetime" class="flex items-center gap-1">
                                        <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {{ post.date }}
                                    </time>
                                </div>

                                <h3 class="text-xl font-bold leading-snug text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2 mb-3">
                                    {{ post.title }}
                                </h3>

                                <p class="mt-auto text-sm leading-relaxed text-gray-600 line-clamp-3">
                                    {{ post.description }}
                                </p>

                                <div class="mt-6 flex items-center gap-3 pt-4 border-t border-gray-100">
                                    <div class="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                                        <UserIcon class="h-4 w-4" />
                                    </div>
                                    <div class="text-xs">
                                        <p class="font-semibold text-gray-900">{{ post.author.name }}</p>
                                        <p class="text-gray-500">{{ post.author.role }}</p>
                                    </div>
                                </div>
                            </div>
                        </NuxtLink>
                    </article>
                </TransitionGroup>
            </div>
        </div>

        <div v-if="hasNextPage" class="mt-16 flex justify-center">
            <button
                @click="loadMore"
                :disabled="isLoading"
                class="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-emerald-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 transition-all duration-300 hover:bg-emerald-700 hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
            >
                <span v-if="isLoading" class="absolute inset-0 flex items-center justify-center bg-emerald-700">
                    <svg class="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </span>
                <span :class="{ 'invisible': isLoading }" class="flex items-center gap-2">
                    Lihat Lebih Banyak
                    <MoveDownIcon class="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
                </span>
            </button>
        </div>
        <div v-else-if="formattedPosts.length > 0" class="mt-12 text-center">
            <p class="text-sm text-gray-400 italic">Anda sudah melihat semua berita</p>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { UserIcon, MoveDownIcon } from 'lucide-vue-next';
import { computed, ref, watch } from 'vue';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';
import type { Post } from '../../types/types';

// SEO
useSeoMeta({
    title: 'Berita & Kegiatan - BKSDA Sumatera Selatan',
    description: 'Temukan berita terbaru dan kegiatan dari Balai Konservasi Sumber Daya Alam Sumatera Selatan',
});

// 1. Fetch Categories
const { data: categories, status: statusCategories } = await useAsyncData(
    'categories',
    () => $fetch('/api/categories'),
    { transform: (res: any) => res.data }
);

// 2. State Management
const selectedCategories = ref<string[]>([]);
const posts = ref<Post[]>([]);
const currentPage = ref(1);
const totalPages = ref(1);
const isLoading = ref(false);

// 3. Core Data Fetching Logic
const fetchPosts = async (page: number, isAppend: boolean = false) => {
    isLoading.value = true;

    try {
        const params = new URLSearchParams();
        params.append('limit', '9');
        params.append('published', 'true');
        params.append('page', page.toString());
        
        if (selectedCategories.value.length > 0) {
            params.append('category_ids', selectedCategories.value.join(','));
        }

        // Gunakan $fetch agar tidak bentrok dengan cache useAsyncData saat load more
        const response: any = await $fetch(`/api/posts?${params.toString()}`);

        if (isAppend) {
            // Jika Load More: Tambahkan ke array yang ada
            posts.value.push(...response.data);
        } else {
            // Jika Filter/Init: Reset array
            posts.value = response.data;
        }

        totalPages.value = response.pagination.totalPages;
        currentPage.value = page;
    } catch (error) {
        console.error('Gagal memuat berita:', error);
    } finally {
        isLoading.value = false;
    }
};

// 4. Initial Load (Server Side Friendly)
// Kita gunakan callAsync di dalam onMounted atau langsung di setup, 
// tapi untuk Load More yang stabil, fetch di setup awal lebih baik.
await fetchPosts(1, false); 

// 5. Event Handlers
const toggleCategory = (categoryId: string) => {
    const index = selectedCategories.value.indexOf(categoryId);
    if (index > -1) {
        selectedCategories.value.splice(index, 1);
    } else {
        selectedCategories.value.push(categoryId);
    }
    // Note: Watcher will handle the refetching
};

const resetFilters = () => {
    selectedCategories.value = [];
};

const loadMore = async () => {
    if (currentPage.value < totalPages.value) {
        await fetchPosts(currentPage.value + 1, true); // true = append mode
    }
};

// 6. Watchers
// Reset halaman ke 1 setiap kali filter berubah
watch(selectedCategories, () => {
    currentPage.value = 1;
    fetchPosts(1, false);
}, { deep: true });

// 7. Computed Properties for Display
const formattedPosts = computed(() => {
    return posts.value.map((post) => ({
        ...post,
        href: `/berita/${post.slug}`,
        imageUrl: post.coverImage, // Fallback image dihandle di template
        date: post.createdAt ? format(parseISO(post.createdAt), 'dd MMMM yyyy', { locale: id }) : '-',
        datetime: post.createdAt,
        category: {
            ...post.category,
            title: post.category?.name || 'Umum',
        },
        author: {
            ...post.author,
            role: post.author?.role || 'Admin',
            name: post.author?.name || 'Admin BKSDA'
        },
    }));
});

const hasNextPage = computed(() => currentPage.value < totalPages.value);
</script>

<style scoped>
/* Transisi List untuk efek muncul yang halus */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/* Animasi kustom lainnya */
@keyframes fade-in {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
    animation: fade-in 0.8s ease-out forwards;
}
</style>