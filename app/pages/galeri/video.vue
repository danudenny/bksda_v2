<template>
    <NuxtLayout name="archive">
        <template #breadcrumb>
            <span class="text-white">Video</span>
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
                            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                        />
                    </svg>
                    Galeri Video
                </span>
            </div>
        </template>

        <template #header>
            <h1 class="text-3xl font-bold sm:text-4xl lg:text-5xl">
                Galeri Video BKSDA Sumsel
            </h1>
        </template>

        <template #description>
            <p class="mx-auto mt-4 max-w-2xl text-lg text-emerald-100">
                Dokumentasi video kegiatan konservasi, keanekaragaman hayati,
                dan upaya pelestarian alam di Sumatera Selatan
            </p>
        </template>

        <template #filters>
            <div
                class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
                <!-- View Toggle -->
                <div
                    class="flex items-center gap-2 rounded-lg bg-gray-100 p-1 ml-auto"
                >
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

        <!-- Video Grid -->
        <div
            v-if="viewMode === 'grid'"
            class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
            <div
                v-for="asset in assets"
                :key="asset.public_id"
                class="group relative overflow-hidden rounded-2xl bg-gray-100 shadow-lg ring-1 ring-gray-900/5 transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer"
                @click="openLightbox(asset)"
            >
                <div class="aspect-square overflow-hidden relative">
                    <!-- Thumbnail (using Cloudinary video thumbnail) -->
                    <img
                        :src="getVideoThumbnail(asset.url)"
                        :alt="asset.filename"
                        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                    />
                    <!-- Play Icon Overlay -->
                    <div
                        class="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors"
                    >
                        <div
                            class="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform"
                        >
                            <svg
                                class="w-6 h-6 text-white ml-1"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div
                    class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                    <div
                        class="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                    >
                        <h3
                            class="text-white font-semibold text-sm mb-1 truncate"
                        >
                            {{ asset.filename }}
                        </h3>
                        <div
                            class="flex items-center gap-2 text-xs text-gray-300"
                        >
                            <span>{{ formatDate(asset.created_at) }}</span>
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
                v-for="asset in assets"
                :key="asset.public_id"
                class="group relative mb-6 break-inside-avoid overflow-hidden rounded-2xl bg-gray-100 shadow-lg ring-1 ring-gray-900/5 transition-all duration-300 hover:shadow-2xl cursor-pointer"
                @click="openLightbox(asset)"
            >
                <div class="relative">
                    <img
                        :src="getVideoThumbnail(asset.url)"
                        :alt="asset.filename"
                        class="w-full transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                    <!-- Play Icon Overlay -->
                    <div
                        class="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors"
                    >
                        <div
                            class="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform"
                        >
                            <svg
                                class="w-6 h-6 text-white ml-1"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div
                    class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                    <div
                        class="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                    >
                        <h3
                            class="text-white font-semibold text-sm mb-1 truncate"
                        >
                            {{ asset.filename }}
                        </h3>
                        <div
                            class="flex items-center gap-2 text-xs text-gray-300"
                        >
                            <span>{{ formatDate(asset.created_at) }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <template #pagination>
            <div class="flex flex-col items-center gap-4 mt-8">
                <div class="text-sm text-gray-700">
                    Menampilkan
                    <span class="font-semibold">{{ assets.length }}</span> dari
                    <span class="font-semibold">{{ totalCount }}</span> video
                </div>

                <button
                    v-if="nextCursor"
                    @click="loadMore"
                    :disabled="loading"
                    class="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    <Loader v-if="loading" class="h-4 w-4 animate-spin" />
                    {{ loading ? 'Memuat...' : 'Muat Lebih Banyak' }}
                </button>
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
                        class="fixed top-4 right-4 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 group z-50"
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
                        class="fixed left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 z-50"
                        aria-label="Previous video"
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
                        v-if="currentPhotoIndex < assets.length - 1"
                        class="fixed right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 z-50"
                        aria-label="Next video"
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
                                <video
                                    controls
                                    autoplay
                                    :src="currentPhoto.url"
                                    class="max-h-[80vh] w-auto object-contain rounded-2xl shadow-2xl"
                                ></video>
                                <div class="mt-6 text-center">
                                    <h3
                                        class="text-white text-xl font-semibold"
                                    >
                                        {{ currentPhoto.filename }}
                                    </h3>
                                    <div
                                        class="mt-2 flex items-center justify-center gap-3 text-sm text-gray-400"
                                    >
                                        <span>{{
                                            formatDate(currentPhoto.created_at)
                                        }}</span>
                                    </div>
                                    <p class="text-gray-400 text-sm mt-2">
                                        {{ currentPhotoIndex + 1 }} /
                                        {{ assets.length }}
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
import { useApi } from '@/composables/useApi';
import { Loader } from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';
import { toast } from 'vue-sonner';

useSeoMeta({
    title: 'Galeri Video - BKSDA Sumatera Selatan',
    description:
        'Dokumentasi video kegiatan konservasi, keanekaragaman hayati, dan upaya pelestarian alam di Sumatera Selatan',
    ogTitle: 'Galeri Video - BKSDA Sumatera Selatan',
    ogDescription:
        'Dokumentasi video kegiatan konservasi, keanekaragaman hayati, dan upaya pelestarian alam di Sumatera Selatan',
});

type Asset = {
    public_id: string;
    url: string;
    width: number;
    height: number;
    format: string;
    created_at: string;
    folder: string;
    filename: string;
};

const { request } = useApi();

const viewMode = ref<'grid' | 'masonry'>('grid');
const lightboxOpen = ref(false);
const currentPhotoIndex = ref(0);

const assets = ref<Asset[]>([]);
const loading = ref(false);
const nextCursor = ref<string | null>(null);
const totalCount = ref(0);

// Fetch assets from Cloudinary
async function fetchAssets(reset = false) {
    if (loading.value) return;
    loading.value = true;

    try {
        const params: any = {
            limit: 24,
            folder: 'bksda_v2/uploads', // Default folder
            recursive: true,
            type: 'video',
        };

        if (!reset && nextCursor.value) {
            params.nextCursor = nextCursor.value;
        }

        const res = await request<{
            assets: any[];
            nextCursor: string | null;
            totalCount: number;
        }>('/cloudinary/assets', { params });

        if (res.success && res.data) {
            const newAssets = res.data.assets || [];
            if (reset) {
                assets.value = newAssets;
            } else {
                assets.value = [...assets.value, ...newAssets];
            }
            nextCursor.value = res.data.nextCursor || null;
            totalCount.value = res.data.totalCount || 0;
        } else {
            toast.error('Gagal memuat video');
        }
    } catch (e) {
        console.error(e);
        toast.error('Terjadi kesalahan saat memuat video');
    } finally {
        loading.value = false;
    }
}

const loadMore = () => {
    fetchAssets(false);
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
};

const getVideoThumbnail = (url: string) => {
    // Replace extension with .jpg for thumbnail
    return url.replace(/\.[^/.]+$/, '.jpg');
};

const currentPhoto = computed(() => assets.value[currentPhotoIndex.value]);

const openLightbox = (photo: Asset) => {
    const index = assets.value.findIndex(
        (p) => p.public_id === photo.public_id
    );
    currentPhotoIndex.value = index !== -1 ? index : 0;
    lightboxOpen.value = true;
    document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
    lightboxOpen.value = false;
    document.body.style.overflow = '';
};

const nextPhoto = () => {
    if (currentPhotoIndex.value < assets.value.length - 1) {
        currentPhotoIndex.value++;
    }
};

const previousPhoto = () => {
    if (currentPhotoIndex.value > 0) {
        currentPhotoIndex.value--;
    }
};

onMounted(() => {
    fetchAssets(true);
});

if (process.client) {
    window.addEventListener('keydown', (e) => {
        if (!lightboxOpen.value) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextPhoto();
        if (e.key === 'ArrowLeft') previousPhoto();
    });
}
</script>
