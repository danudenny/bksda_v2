<template>
    <section
        ref="gallerySection"
        class="relative bg-gradient-to-b from-white via-slate-50/50 to-white py-12 sm:py-16 lg:py-24 overflow-hidden"
    >
        <div class="absolute inset-0 -z-10">
            <div
                class="absolute right-0 top-0 h-96 w-96 rounded-full bg-emerald-100/40 blur-3xl filter"
            ></div>
            <div
                class="absolute left-0 bottom-0 h-96 w-96 rounded-full bg-teal-100/40 blur-3xl filter"
            ></div>
        </div>

        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="mx-auto max-w-2xl text-center">
                <div
                    class="inline-flex items-center gap-2 rounded-full bg-emerald-600/10 px-3 py-1.5 sm:px-4 sm:py-2 ring-1 ring-inset ring-emerald-600/20 mb-4 sm:mb-6"
                >
                    <svg
                        class="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600"
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
                    <span
                        class="font-semibold text-emerald-700"
                        style="font-size: clamp(0.75rem, 1.25vw, 0.875rem)"
                    >
                        Galeri Foto & Video
                    </span>
                </div>

                <h2
                    class="font-bold tracking-tight text-slate-900"
                    style="font-size: clamp(1.875rem, 4vw, 3rem)"
                >
                    Sorotan Visual dari Lapangan
                </h2>
                <p
                    class="mt-4 sm:mt-6 text-slate-600"
                    style="font-size: clamp(0.875rem, 1.5vw, 1.125rem)"
                >
                    Lihat lebih dekat keindahan alam, kekayaan fauna, dan
                    dedikasi tim kami dalam menjaga kelestarian Sumatera
                    Selatan.
                </p>
            </div>
        </div>

        <div v-if="isVisible" class="mt-12 sm:mt-16 space-y-4 gallery-rows">
            <!-- Row 1 -->
            <div class="overflow-hidden gallery-row">
                <div class="gallery-track gallery-track-right">
                    <div
                        v-for="(image, index) in row1Images"
                        :key="`r1-${index}`"
                        class="gallery-item"
                        @click="openLightbox(image, index)"
                    >
                        <NuxtImg
                            :src="image.src"
                            :alt="image.alt"
                            :width="384"
                            :height="256"
                            class="gallery-image"
                            draggable="false"
                            loading="lazy"
                            sizes="sm:208px md:256px lg:384px"
                        />
                        <div class="gallery-overlay">
                            <div class="gallery-caption">
                                <p
                                    class="text-white font-semibold text-sm line-clamp-2"
                                >
                                    {{ image.alt }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- Duplicate for seamless loop -->
                    <div
                        v-for="(image, index) in row1Images"
                        :key="`r1-dup-${index}`"
                        class="gallery-item"
                        @click="openLightbox(image, index)"
                        aria-hidden="true"
                    >
                        <NuxtImg
                            :src="image.src"
                            :alt="image.alt"
                            :width="384"
                            :height="256"
                            class="gallery-image"
                            draggable="false"
                            loading="lazy"
                            sizes="sm:208px md:256px lg:384px"
                        />
                        <div class="gallery-overlay">
                            <div class="gallery-caption">
                                <p
                                    class="text-white font-semibold text-sm line-clamp-2"
                                >
                                    {{ image.alt }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Row 2 -->
            <div class="overflow-hidden gallery-row">
                <div class="gallery-track gallery-track-left">
                    <div
                        v-for="(image, index) in row2Images"
                        :key="`r2-${index}`"
                        class="gallery-item"
                        @click="openLightbox(image, row1Images.length + index)"
                    >
                        <NuxtImg
                            :src="image.src"
                            :alt="image.alt"
                            :width="384"
                            :height="256"
                            class="gallery-image"
                            draggable="false"
                            loading="lazy"
                            sizes="sm:208px md:256px lg:384px"
                        />
                        <div class="gallery-overlay">
                            <div class="gallery-caption">
                                <p
                                    class="text-white font-semibold text-sm line-clamp-2"
                                >
                                    {{ image.alt }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- Duplicate for seamless loop -->
                    <div
                        v-for="(image, index) in row2Images"
                        :key="`r2-dup-${index}`"
                        class="gallery-item"
                        @click="openLightbox(image, row1Images.length + index)"
                        aria-hidden="true"
                    >
                        <NuxtImg
                            :src="image.src"
                            :alt="image.alt"
                            :width="384"
                            :height="256"
                            class="gallery-image"
                            draggable="false"
                            loading="lazy"
                            sizes="sm:208px md:256px lg:384px"
                        />
                        <div class="gallery-overlay">
                            <div class="gallery-caption">
                                <p
                                    class="text-white font-semibold text-sm line-clamp-2"
                                >
                                    {{ image.alt }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Row 3 -->
            <div class="overflow-hidden gallery-row">
                <div class="gallery-track gallery-track-right">
                    <div
                        v-for="(image, index) in row3Images"
                        :key="`r3-${index}`"
                        class="gallery-item"
                        @click="
                            openLightbox(
                                image,
                                row1Images.length + row2Images.length + index
                            )
                        "
                    >
                        <NuxtImg
                            :src="image.src"
                            :alt="image.alt"
                            :width="384"
                            :height="256"
                            class="gallery-image"
                            draggable="false"
                            loading="lazy"
                            sizes="sm:208px md:256px lg:384px"
                        />
                        <div class="gallery-overlay">
                            <div class="gallery-caption">
                                <p
                                    class="text-white font-semibold text-sm line-clamp-2"
                                >
                                    {{ image.alt }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- Duplicate for seamless loop -->
                    <div
                        v-for="(image, index) in row3Images"
                        :key="`r3-dup-${index}`"
                        class="gallery-item"
                        @click="
                            openLightbox(
                                image,
                                row1Images.length + row2Images.length + index
                            )
                        "
                        aria-hidden="true"
                    >
                        <NuxtImg
                            :src="image.src"
                            :alt="image.alt"
                            :width="384"
                            :height="256"
                            class="gallery-image"
                            draggable="false"
                            loading="lazy"
                            sizes="sm:208px md:256px lg:384px"
                        />
                        <div class="gallery-overlay">
                            <div class="gallery-caption">
                                <p
                                    class="text-white font-semibold text-sm line-clamp-2"
                                >
                                    {{ image.alt }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-12 sm:mt-16 text-center">
            <NuxtLink
                to="/galeri/foto"
                class="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/50 hover:scale-105"
                style="font-size: clamp(0.875rem, 1.5vw, 1rem)"
            >
                <span>Lihat Galeri Lengkap</span>
                <ArrowRight
                    class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                />
            </NuxtLink>
        </div>
    </section>

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
                class="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm"
                @click="closeLightbox"
            >
                <div class="min-h-full flex items-center justify-center p-4">
                    <button
                        class="fixed top-4 right-4 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 group z-[10000]"
                        aria-label="Close lightbox"
                        @click.stop="closeLightbox"
                    >
                        <X
                            class="h-6 w-6 text-white group-hover:rotate-90 transition-transform duration-300"
                        />
                    </button>

                    <button
                        v-if="currentImageIndex > 0"
                        class="fixed left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 z-[10000]"
                        aria-label="Previous image"
                        @click.stop="previousImage"
                    >
                        <ChevronLeft class="h-6 w-6 text-white" />
                    </button>

                    <button
                        v-if="currentImageIndex < allImages.length - 1"
                        class="fixed right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 z-[10000]"
                        aria-label="Next image"
                        @click.stop="nextImage"
                    >
                        <ChevronRight class="h-6 w-6 text-white" />
                    </button>

                    <div class="relative max-w-7xl w-full my-8" @click.stop>
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
                                v-if="currentImage"
                                :key="currentImageIndex"
                                class="flex flex-col items-center"
                            >
                                <img
                                    :src="currentImage.src"
                                    :alt="currentImage.alt"
                                    class="max-h-[80vh] w-auto object-contain rounded-2xl shadow-2xl"
                                />
                                <div class="mt-6 text-center">
                                    <p class="text-white text-lg font-semibold">
                                        {{ currentImage.alt }}
                                    </p>
                                    <p class="text-gray-400 text-sm mt-2">
                                        {{ currentImageIndex + 1 }} /
                                        {{ allImages.length }}
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
import { ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-vue-next';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

const lightboxOpen = ref(false);
const currentImageIndex = ref(0);
const isVisible = ref(false);
const gallerySection = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;
let keyboardHandler: ((e: KeyboardEvent) => void) | null = null;

const row1Images = ref<{ src: string; alt: string }[]>([]);
const row2Images = ref<{ src: string; alt: string }[]>([]);
const row3Images = ref<{ src: string; alt: string }[]>([]);

const allImages = computed(() => [
    ...row1Images.value,
    ...row2Images.value,
    ...row3Images.value,
]);

const currentImage = computed(() => allImages.value[currentImageIndex.value]);

const openLightbox = (
    image: { src: string; alt: string },
    rowIndex: number
) => {
    const globalIndex = allImages.value.findIndex(
        (img) => img.src === image.src && img.alt === image.alt
    );
    currentImageIndex.value = globalIndex !== -1 ? globalIndex : 0;
    lightboxOpen.value = true;
    if (process.client) {
        document.body.style.overflow = 'hidden';
    }
};

const closeLightbox = () => {
    lightboxOpen.value = false;
    if (process.client) {
        document.body.style.overflow = '';
    }
};

const nextImage = () => {
    if (currentImageIndex.value < allImages.value.length - 1) {
        currentImageIndex.value++;
    }
};

const previousImage = () => {
    if (currentImageIndex.value > 0) {
        currentImageIndex.value--;
    }
};

const { getGalleryImages } = useApi();

async function loadGallery() {
    try {
        const [r1, r2, r3] = await Promise.all([
            getGalleryImages('ROW_1'),
            getGalleryImages('ROW_2'),
            getGalleryImages('ROW_3'),
        ]);
        if (r1.success && Array.isArray(r1.data)) {
            row1Images.value = r1.data.map((it: any) => ({
                src: it.imageUrl,
                alt: it.altText || '',
            }));
        }
        if (r2.success && Array.isArray(r2.data)) {
            row2Images.value = r2.data.map((it: any) => ({
                src: it.imageUrl,
                alt: it.altText || '',
            }));
        }
        if (r3.success && Array.isArray(r3.data)) {
            row3Images.value = r3.data.map((it: any) => ({
                src: it.imageUrl,
                alt: it.altText || '',
            }));
        }
    } catch (e) {
        // ignore
    }
}

onMounted(() => {
    loadGallery();

    // Setup keyboard event handler
    if (process.client) {
        keyboardHandler = (e: KeyboardEvent) => {
            if (!lightboxOpen.value) return;

            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') previousImage();
        };
        window.addEventListener('keydown', keyboardHandler);
    }

    // Intersection Observer to pause animations when not visible
    if (process.client && gallerySection.value) {
        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    isVisible.value = entry.isIntersecting;
                });
            },
            { threshold: 0.1 }
        );

        observer.observe(gallerySection.value);
    }
});

onBeforeUnmount(() => {
    if (observer) {
        observer.disconnect();
        observer = null;
    }
    if (process.client && keyboardHandler) {
        window.removeEventListener('keydown', keyboardHandler);
        keyboardHandler = null;
    }
});
</script>

<style scoped>
/* CSS Containment for performance */
.gallery-rows {
    contain: layout style paint;
    mask-image: linear-gradient(
        to right,
        transparent 0,
        black 10%,
        black 90%,
        transparent 100%
    );
}

.gallery-row {
    contain: layout style;
    overflow: hidden;
}

.gallery-track {
    display: flex;
    flex-shrink: 0;
}

.gallery-item {
    position: relative;
    height: 9rem; /* Reduced for mobile */
    width: auto;
    aspect-ratio: 16 / 9;
    margin: 0 0.5rem;
    flex-shrink: 0;
    cursor: pointer;
    contain: layout style paint;
}

@media (min-width: 640px) {
    .gallery-item {
        height: 13rem; /* 52 = h-52 */
    }
}

@media (min-width: 1024px) {
    .gallery-item {
        height: 16rem; /* 64 = h-64 */
    }
}

.gallery-image {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 1rem;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
    transition: box-shadow 0.2s;
}

.gallery-item:hover .gallery-image {
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
}

.gallery-overlay {
    position: absolute;
    inset: 0;
    border-radius: 1rem;
    background: linear-gradient(
        to top,
        rgb(0 0 0 / 0.6),
        transparent,
        transparent
    );
    opacity: 0;
    transition: opacity 0.2s;
    pointer-events: none;
}

.gallery-item:hover .gallery-overlay {
    opacity: 1;
}

.gallery-caption {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
}

/* Optimized animations with GPU acceleration */
@keyframes marquee-left {
    from {
        transform: translate3d(0, 0, 0);
    }
    to {
        transform: translate3d(-50%, 0, 0);
    }
}

@keyframes marquee-right {
    from {
        transform: translate3d(-50%, 0, 0);
    }
    to {
        transform: translate3d(0, 0, 0);
    }
}

.gallery-track-left {
    animation: marquee-left 60s linear infinite;
    transform: translate3d(0, 0, 0);
}

.gallery-track-right {
    animation: marquee-right 60s linear infinite;
    transform: translate3d(0, 0, 0);
}

.gallery-row:hover .gallery-track {
    animation-play-state: paused;
}

/* Reduce paint area on hover */
.gallery-item:hover {
    isolation: isolate;
}
</style>
