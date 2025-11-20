<template>
    <section
        class="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-16 sm:py-24"
    >
        <!-- Decorative background elements -->
        <div class="absolute inset-0 -z-10">
            <div
                class="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl filter"
            ></div>
            <div
                class="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl filter"
            ></div>
        </div>

        <!-- Grid pattern overlay -->
        <div class="absolute inset-0 -z-10 opacity-5">
            <svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern
                        id="grid-pattern"
                        width="32"
                        height="32"
                        patternUnits="userSpaceOnUse"
                    >
                        <path
                            d="M0 32V0h32"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="0.5"
                            class="text-white"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            </svg>
        </div>

        <div class="mx-auto max-w-screen-2xl px-6 sm:px-8 lg:px-10">
            <!-- Header Section -->
            <div class="mx-auto max-w-3xl text-center">
                <div
                    class="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 ring-1 ring-inset ring-emerald-500/30 backdrop-blur-sm"
                >
                    <svg
                        class="h-4 w-4 text-emerald-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z"
                        />
                    </svg>
                    <span class="text-sm font-semibold text-emerald-400">
                        Fokus Konservasi
                    </span>
                </div>

                <h2
                    class="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl"
                >
                    Harta Karun
                    <span
                        class="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"
                        >Hayati</span
                    >
                    Kami
                </h2>
                <p class="mt-6 text-lg leading-8 text-gray-300">
                    Sumatera Selatan adalah rumah bagi beberapa spesies paling
                    terancam di dunia. Perlindungan mereka adalah inti dari misi
                    kami, memastikan keberadaan mereka untuk generasi yang akan
                    datang.
                </p>
            </div>

            <!-- Carousel Container -->
            <div class="relative mx-auto mt-16 max-w-full sm:mt-20">
                <div class="overflow-hidden py-8" ref="emblaRef">
                    <div class="flex -ml-6">
                        <div
                            v-for="(spesies, index) in fokusKonservasi"
                            :key="spesies.name"
                            class="relative flex-grow-0 flex-shrink-0 basis-full pl-6 sm:basis-1/2 lg:basis-1/3 xl:basis-[30%]"
                        >
                            <button
                                @click="openModal(spesies)"
                                class="group relative block h-[32rem] w-full overflow-hidden rounded-3xl ring-1 ring-white/10 transition-all duration-500 hover:scale-[1.02] hover:ring-emerald-400 hover:shadow-2xl hover:shadow-emerald-500/20 cursor-pointer text-left"
                            >
                                <!-- Image with Grayscale Effect -->
                                <div class="absolute inset-0 overflow-hidden">
                                    <NuxtImg
                                        :src="spesies.imageUrl"
                                        :alt="spesies.name"
                                        class="h-full w-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-110"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        loading="lazy"
                                        format="avif,webp"
                                        quality="80"
                                    />
                                </div>

                                <!-- Gradient Overlays -->
                                <div
                                    class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
                                    aria-hidden="true"
                                ></div>

                                <!-- Number Badge -->
                                <div class="absolute top-4 right-4 z-10">
                                    <div
                                        class="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/20"
                                    >
                                        <span
                                            class="text-lg font-bold text-white"
                                            >{{
                                                String(index + 1).padStart(
                                                    2,
                                                    '0'
                                                )
                                            }}</span
                                        >
                                    </div>
                                </div>

                                <!-- Content -->
                                <div
                                    class="relative z-10 flex h-full flex-col justify-end p-6 sm:p-8"
                                >
                                    <div class="space-y-3">
                                        <h3
                                            class="text-3xl font-bold text-white drop-shadow-lg"
                                        >
                                            {{ spesies.name }}
                                        </h3>
                                        <p
                                            class="text-base font-medium text-emerald-300 italic"
                                        >
                                            {{ spesies.latinName }}
                                        </p>

                                        <!-- Action Button -->
                                        <div
                                            class="mt-6 inline-flex items-center gap-2 rounded-lg bg-white/10 backdrop-blur-sm px-4 py-2.5 ring-1 ring-white/20 transition-all duration-300 group-hover:bg-emerald-500 group-hover:ring-emerald-400"
                                        >
                                            <span
                                                class="text-sm font-semibold text-white"
                                                >Pelajari lebih lanjut</span
                                            >
                                            <ArrowRightCircle
                                                class="h-5 w-5 text-white transition-transform duration-300 group-hover:translate-x-1"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <!-- Hover Gradient Bar -->
                                <div
                                    class="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                                ></div>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Left Navigation Button -->
                <button
                    @click="scrollPrev"
                    :disabled="!canScrollPrev"
                    class="absolute left-2 top-1/2 -translate-y-1/2 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm text-white/70 ring-1 ring-white/10 transition-all duration-300 hover:bg-black/80 hover:text-white hover:ring-white/30 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110"
                    aria-label="Geser ke kiri"
                >
                    <ChevronLeft class="h-6 w-6" />
                </button>

                <!-- Right Navigation Button -->
                <button
                    @click="scrollNext"
                    :disabled="!canScrollNext"
                    class="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm text-white/70 ring-1 ring-white/10 transition-all duration-300 hover:bg-black/80 hover:text-white hover:ring-white/30 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110"
                    aria-label="Geser ke kanan"
                >
                    <ChevronRight class="h-6 w-6" />
                </button>

                <!-- Pagination Dots (Bottom Center) -->
                <div class="absolute -bottom-2 left-1/2 -translate-x-1/2">
                    <div class="flex items-center justify-center gap-2">
                        <button
                            v-for="(_, index) in scrollSnaps"
                            :key="index"
                            @click="scrollTo(index)"
                            class="transition-all duration-300"
                            :class="{
                                'h-2 w-12 rounded-full bg-emerald-400':
                                    index === selectedIndex,
                                'h-2 w-2 rounded-full bg-slate-600 hover:bg-slate-400':
                                    index !== selectedIndex,
                            }"
                            :aria-label="`Lompat ke slide ${index + 1}`"
                        ></button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Conservation Detail Modal -->
        <ConservationDetailModal
            :is-open="isModalOpen"
            :species="selectedSpecies"
            @close="closeModal"
        />
    </section>
</template>

<script setup lang="ts">
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-vue';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { ArrowRightCircle, ChevronLeft, ChevronRight } from 'lucide-vue-next';

interface Species {
    name: string;
    latinName: string;
    imageUrl: string;
    description?: string;
    status?: string;
    habitat?: string;
    population?: string;
    weight?: string;
    length?: string;
    threats?: string[];
    efforts?: string[];
    gallery?: string[];
}

const emblaOptions = {
    loop: true,
    align: 'start' as const,
    slidesToScroll: 1,
};

const autoplay = Autoplay({ delay: 4000, stopOnInteraction: false });

const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions, [autoplay]);

const selectedIndex = ref(0);
const scrollSnaps = ref<number[]>([]);
const canScrollPrev = ref(false);
const canScrollNext = ref(false);

// Modal state
const isModalOpen = ref(false);
const selectedSpecies = ref<Species | null>(null);

const openModal = (species: Species) => {
    selectedSpecies.value = species;
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
    setTimeout(() => {
        selectedSpecies.value = null;
    }, 300);
};

const scrollPrev = () => emblaApi.value?.scrollPrev();
const scrollNext = () => emblaApi.value?.scrollNext();
const scrollTo = (index: number) => emblaApi.value?.scrollTo(index);

const updateCarouselState = () => {
    if (!emblaApi.value) return;
    selectedIndex.value = emblaApi.value.selectedScrollSnap();
    scrollSnaps.value = emblaApi.value.scrollSnapList();
    canScrollPrev.value = emblaApi.value.canScrollPrev();
    canScrollNext.value = emblaApi.value.canScrollNext();
};

onMounted(() => {
    if (!emblaApi.value) return;
    updateCarouselState();
    emblaApi.value.on('select', updateCarouselState);
    emblaApi.value.on('reInit', updateCarouselState);
});

onUnmounted(() => {
    emblaApi.value?.destroy();
});

// Fetch data
const { data: response } = await useFetch('/api/fokus-konservasi');
const fokusKonservasi = computed(() => response.value?.data || []);

// Watch for data changes to re-init carousel
watch(fokusKonservasi, () => {
    if (emblaApi.value) {
        emblaApi.value.reInit();
    }
});
</script>

<style scoped>
.embla__button {
    cursor: pointer;
}
</style>
