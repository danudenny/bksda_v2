<template>
    <NuxtLayout name="archive">
        <template #breadcrumb>
            <NuxtLink
                to="/galeri"
                class="text-emerald-200 transition-colors hover:text-white"
            >
                Galeri
            </NuxtLink>
            <span class="text-emerald-400">/</span>
            <span class="text-white">Foto</span>
        </template>

        <template #badge>
            <div class="mb-4">
                <span
                    class="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 text-sm font-semibold text-white"
                >
                    <svg
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                        />
                    </svg>
                    Galeri Foto
                </span>
            </div>
        </template>

        <template #header>
            <h1 class="text-3xl font-bold sm:text-4xl lg:text-5xl">
                Galeri Foto BKSDA Sumsel
            </h1>
        </template>

        <template #description>
            <p class="mx-auto mt-4 max-w-2xl text-lg text-emerald-100">
                Dokumentasi visual kegiatan konservasi, keanekaragaman hayati,
                dan upaya pelestarian alam di Sumatera Selatan
            </p>
        </template>

        <template #filters>
            <div
                class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
                <!-- Category Filter -->
                <div class="flex flex-wrap gap-2">
                    <button
                        v-for="category in categories"
                        :key="category.id"
                        @click="selectedCategory = category.id"
                        class="rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300"
                        :class="
                            selectedCategory === category.id
                                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-105'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        "
                    >
                        {{ category.label }}
                        <span
                            class="ml-1.5 text-xs"
                            :class="
                                selectedCategory === category.id
                                    ? 'text-emerald-100'
                                    : 'text-gray-500'
                            "
                        >
                            ({{ category.count }})
                        </span>
                    </button>
                </div>

                <!-- View Toggle -->
                <div class="flex items-center gap-2 rounded-lg bg-gray-100 p-1">
                    <button
                        @click="viewMode = 'grid'"
                        class="rounded-md px-3 py-2 text-sm font-medium transition-all duration-200"
                        :class="
                            viewMode === 'grid'
                                ? 'bg-white text-emerald-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                        "
                    >
                        <svg
                            class="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                            />
                        </svg>
                    </button>
                    <button
                        @click="viewMode = 'masonry'"
                        class="rounded-md px-3 py-2 text-sm font-medium transition-all duration-200"
                        :class="
                            viewMode === 'masonry'
                                ? 'bg-white text-emerald-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                        "
                    >
                        <svg
                            class="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v12a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM13.5 8.25a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25v7.5A2.25 2.25 0 0118 18h-2.25a2.25 2.25 0 01-2.25-2.25v-7.5z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </template>

        <!-- Photo Grid -->
        <div
            v-if="viewMode === 'grid'"
            class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
            <div
                v-for="photo in filteredPhotos"
                :key="photo.id"
                class="group relative overflow-hidden rounded-2xl bg-gray-100 shadow-lg ring-1 ring-gray-900/5 transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer"
                @click="openLightbox(photo)"
            >
                <div class="aspect-square overflow-hidden">
                    <img
                        :src="photo.url"
                        :alt="photo.title"
                        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </div>
                <div
                    class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                    <div
                        class="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                    >
                        <h3 class="text-white font-semibold text-sm mb-1">
                            {{ photo.title }}
                        </h3>
                        <div
                            class="flex items-center gap-2 text-xs text-gray-300"
                        >
                            <span>{{ photo.date }}</span>
                            <span>•</span>
                            <span class="text-emerald-300">{{
                                photo.category
                            }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Masonry Grid -->
        <div
            v-else
            class="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4"
        >
            <div
                v-for="photo in filteredPhotos"
                :key="photo.id"
                class="group relative mb-6 break-inside-avoid overflow-hidden rounded-2xl bg-gray-100 shadow-lg ring-1 ring-gray-900/5 transition-all duration-300 hover:shadow-2xl cursor-pointer"
                @click="openLightbox(photo)"
            >
                <img
                    :src="photo.url"
                    :alt="photo.title"
                    class="w-full transition-transform duration-500 group-hover:scale-105"
                />
                <div
                    class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                    <div
                        class="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                    >
                        <h3 class="text-white font-semibold text-sm mb-1">
                            {{ photo.title }}
                        </h3>
                        <div
                            class="flex items-center gap-2 text-xs text-gray-300"
                        >
                            <span>{{ photo.date }}</span>
                            <span>•</span>
                            <span class="text-emerald-300">{{
                                photo.category
                            }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <template #pagination>
            <div class="flex items-center justify-between">
                <div class="text-sm text-gray-700">
                    Menampilkan <span class="font-semibold">1-24</span> dari
                    <span class="font-semibold">{{ totalPhotos }}</span> foto
                </div>
                <div class="flex items-center gap-2">
                    <button
                        class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled
                    >
                        Sebelumnya
                    </button>
                    <button
                        class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                    >
                        1
                    </button>
                    <button
                        class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        2
                    </button>
                    <button
                        class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        3
                    </button>
                    <button
                        class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Selanjutnya
                    </button>
                </div>
            </div>
        </template>
    </NuxtLayout>

    <!-- Lightbox -->
    <Teleport to="body">
        <transition
            enter-active-class="transition-opacity duration-300 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                v-if="lightboxOpen"
                class="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm overflow-y-auto"
                @click="closeLightbox"
            >
                <div class="min-h-full flex items-center justify-center p-4">
                    <button
                        class="fixed top-4 right-4 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 group"
                        aria-label="Close lightbox"
                        @click.stop="closeLightbox"
                    >
                        <svg
                            class="h-6 w-6 text-white group-hover:rotate-90 transition-transform duration-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    <button
                        v-if="currentPhotoIndex > 0"
                        class="fixed left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200"
                        aria-label="Previous photo"
                        @click.stop="previousPhoto"
                    >
                        <svg
                            class="h-6 w-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                        </svg>
                    </button>

                    <button
                        v-if="currentPhotoIndex < filteredPhotos.length - 1"
                        class="fixed right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200"
                        aria-label="Next photo"
                        @click.stop="nextPhoto"
                    >
                        <svg
                            class="h-6 w-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M8.25 4.5l7.5 7.5-7.5 7.5"
                            />
                        </svg>
                    </button>

                    <div
                        v-if="currentPhoto"
                        class="relative max-w-7xl w-full my-8"
                        @click.stop
                    >
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
                                :key="currentPhotoIndex"
                                class="flex flex-col items-center"
                            >
                                <img
                                    :src="currentPhoto.url"
                                    :alt="currentPhoto.title"
                                    class="max-h-[80vh] w-auto object-contain rounded-2xl shadow-2xl"
                                />
                                <div class="mt-6 text-center">
                                    <h3
                                        class="text-white text-xl font-semibold"
                                    >
                                        {{ currentPhoto.title }}
                                    </h3>
                                    <div
                                        class="mt-2 flex items-center justify-center gap-3 text-sm text-gray-400"
                                    >
                                        <span>{{ currentPhoto.date }}</span>
                                        <span>•</span>
                                        <span class="text-emerald-400">{{
                                            currentPhoto.category
                                        }}</span>
                                    </div>
                                    <p class="text-gray-400 text-sm mt-2">
                                        {{ currentPhotoIndex + 1 }} /
                                        {{ filteredPhotos.length }}
                                    </p>
                                </div>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
        </transition>
    </Teleport>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

useSeoMeta({
    title: 'Galeri Foto - BKSDA Sumatera Selatan',
    description:
        'Dokumentasi visual kegiatan konservasi, keanekaragaman hayati, dan upaya pelestarian alam di Sumatera Selatan',
    ogTitle: 'Galeri Foto - BKSDA Sumatera Selatan',
    ogDescription:
        'Dokumentasi visual kegiatan konservasi, keanekaragaman hayati, dan upaya pelestarian alam di Sumatera Selatan',
});

type Photo = {
    id: number;
    title: string;
    url: string;
    category: string;
    date: string;
};

const categories = [
    { id: 'all', label: 'Semua Foto', count: 48 },
    { id: 'satwa', label: 'Satwa Liar', count: 18 },
    { id: 'kawasan', label: 'Kawasan Konservasi', count: 15 },
    { id: 'kegiatan', label: 'Kegiatan', count: 10 },
    { id: 'flora', label: 'Flora', count: 5 },
];

const selectedCategory = ref('all');
const viewMode = ref<'grid' | 'masonry'>('grid');
const lightboxOpen = ref(false);
const currentPhotoIndex = ref(0);

// Generate placeholder photos
const photos = ref<Photo[]>([
    ...Array.from({ length: 18 }, (_, i) => ({
        id: i + 1,
        title: `Harimau Sumatera ${i + 1}`,
        url: `https://placehold.co/800x${600 + (i % 3) * 100}?text=Harimau+Sumatera+${i + 1}`,
        category: 'Satwa Liar',
        date: '12 Nov 2025',
    })),
    ...Array.from({ length: 15 }, (_, i) => ({
        id: i + 19,
        title: `Kawasan Konservasi ${i + 1}`,
        url: `https://placehold.co/800x${600 + (i % 3) * 100}?text=Kawasan+${i + 1}`,
        category: 'Kawasan Konservasi',
        date: '11 Nov 2025',
    })),
    ...Array.from({ length: 10 }, (_, i) => ({
        id: i + 34,
        title: `Kegiatan Konservasi ${i + 1}`,
        url: `https://placehold.co/800x${600 + (i % 3) * 100}?text=Kegiatan+${i + 1}`,
        category: 'Kegiatan',
        date: '10 Nov 2025',
    })),
    ...Array.from({ length: 5 }, (_, i) => ({
        id: i + 44,
        title: `Flora Langka ${i + 1}`,
        url: `https://placehold.co/800x${600 + (i % 3) * 100}?text=Flora+${i + 1}`,
        category: 'Flora',
        date: '9 Nov 2025',
    })),
]);

const filteredPhotos = computed(() => {
    if (selectedCategory.value === 'all') {
        return photos.value;
    }
    return photos.value.filter((photo) => {
        const categoryMap: Record<string, string> = {
            satwa: 'Satwa Liar',
            kawasan: 'Kawasan Konservasi',
            kegiatan: 'Kegiatan',
            flora: 'Flora',
        };
        return photo.category === categoryMap[selectedCategory.value];
    });
});

const totalPhotos = computed(() => photos.value.length);

const currentPhoto = computed(
    () => filteredPhotos.value[currentPhotoIndex.value]
);

const openLightbox = (photo: Photo) => {
    const index = filteredPhotos.value.findIndex((p) => p.id === photo.id);
    currentPhotoIndex.value = index !== -1 ? index : 0;
    lightboxOpen.value = true;
    document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
    lightboxOpen.value = false;
    document.body.style.overflow = '';
};

const nextPhoto = () => {
    if (currentPhotoIndex.value < filteredPhotos.value.length - 1) {
        currentPhotoIndex.value++;
    }
};

const previousPhoto = () => {
    if (currentPhotoIndex.value > 0) {
        currentPhotoIndex.value--;
    }
};

if (process.client) {
    window.addEventListener('keydown', (e) => {
        if (!lightboxOpen.value) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextPhoto();
        if (e.key === 'ArrowLeft') previousPhoto();
    });
}
</script>
