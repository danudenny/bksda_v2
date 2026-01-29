<template>
    <div
        class="relative overflow-hidden h-[calc(100dvh-1rem)] sm:h-[calc(100dvh-2rem)] transition-all duration-300"
        :class="{ 'mx-2 sm:mx-4 mb-2 sm:mb-4 rounded-xl': !isScrolled }"
    >
        <div
            class="absolute inset-0 w-full h-full overflow-hidden mt-4 rounded-xl"
        >
            <TransitionGroup name="slide-fade">
                <div
                    v-for="(kawasan, index) in kawasanKonservasi"
                    v-show="currentSlide === index"
                    :key="kawasan.id"
                    class="absolute inset-0"
                >
                        <NuxtImg
                            :src="kawasan.image"
                            :alt="kawasan.name"
                            :provider="kawasan.image?.includes('cloudinary') ? 'cloudinary' : undefined"
                            format="webp"
                        quality="80"
                        sizes="sm:100vw md:100vw lg:100vw"
                        class="w-full h-full object-cover"
                        loading="eager"
                        :style="{
                            transform: `translateY(${parallaxOffset}px)`,
                            willChange: 'transform',
                        }"
                    />
                </div>
            </TransitionGroup>

            <div
                class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"
            ></div>
        </div>

        <div
            class="relative z-10 flex items-end justify-center h-full w-full mx-auto px-4 pb-32 sm:pb-36 lg:pb-40"
        >
            <div class="w-full max-w-5xl">
                <transition
                    mode="out-in"
                    enter-active-class="transition-all duration-500 ease-out"
                    enter-from-class="opacity-0 translate-y-4"
                    enter-to-class="opacity-100 translate-y-0"
                    leave-active-class="transition-all duration-300 ease-in"
                    leave-from-class="opacity-100 translate-y-0"
                    leave-to-class="opacity-0 -translate-y-4"
                >
                    <div :key="currentSlide" class="text-center">
                        <h1
                            class="mb-4 sm:mb-6 font-bold leading-tight"
                            style="
                                font-size: clamp(2.25rem, 6vw, 5rem);
                                line-height: 1.1;
                            "
                        >
                            <div
                                class="text-white font-semibold mb-2 sm:mb-3"
                                style="
                                    font-size: clamp(1.75rem, 3.5vw, 3rem);
                                    text-shadow:
                                        0 4px 20px rgba(0, 0, 0, 0.9),
                                        0 2px 10px rgba(0, 0, 0, 0.7);
                                "
                            >
                                {{ currentKawasan.type }}
                            </div>
                            <span
                                class="inline-block bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent"
                                style="
                                    filter: drop-shadow(
                                            0 0 30px rgba(16, 185, 129, 0.6)
                                        )
                                        drop-shadow(
                                            0 4px 20px rgba(0, 0, 0, 0.9)
                                        )
                                        drop-shadow(
                                            0 2px 10px rgba(0, 0, 0, 0.7)
                                        );
                                    background-size: 200% auto;
                                    animation: gradient-shift 3s ease infinite;
                                "
                            >
                                {{ currentKawasan.name }}
                            </span>
                        </h1>

                        <div
                            class="flex items-center justify-center gap-2 mb-5 sm:mb-7"
                        >
                            <div
                                class="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-amber-500/15 backdrop-blur-md border border-amber-400/40 shadow-lg shadow-amber-500/20"
                            >
                                <MapPin
                                    class="h-4 w-4 sm:h-5 sm:w-5 text-amber-400"
                                />
                                <span
                                    class="text-amber-50 font-medium drop-shadow-lg"
                                    style="
                                        font-size: clamp(0.875rem, 1.5vw, 1rem);
                                    "
                                >
                                    {{ currentKawasan.location }}
                                </span>
                            </div>
                        </div>

                        <p
                            class="mx-auto max-w-3xl leading-relaxed px-4"
                            style="
                                font-size: clamp(0.875rem, 1.5vw, 1.125rem);
                                text-shadow:
                                    0 2px 15px rgba(0, 0, 0, 0.9),
                                    0 1px 5px rgba(0, 0, 0, 0.7);
                                color: rgba(255, 255, 255, 0.95);
                            "
                        >
                            {{ currentKawasan.description }}
                        </p>
                    </div>
                </transition>

                <div class="mt-8 sm:mt-10 flex justify-center items-center">
                    <NuxtLink
                        :to="
                            currentKawasan.slug
                                ? `/kawasan/${generateSlug(currentKawasan.type)}/${currentKawasan.slug}`
                                : '/kawasan'
                        "
                        class="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold shadow-xl shadow-emerald-900/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-900/60 hover:scale-105 hover:from-emerald-500 hover:to-teal-500"
                        style="font-size: clamp(0.9375rem, 1.5vw, 1.125rem)"
                    >
                        <MountainIcon
                            class="h-5 w-5 sm:h-6 sm:w-6 mr-2.5 shrink-0 transition-transform duration-300 group-hover:scale-110"
                        />
                        <span class="whitespace-nowrap"
                            >Jelajahi Kawasan Konservasi</span
                        >
                        <CircleChevronRightIcon
                            class="h-5 w-5 sm:h-6 sm:w-6 ml-2 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </NuxtLink>
                </div>
            </div>

            <!-- Control buttons -->
            <div
                class="hidden lg:flex absolute bottom-32 sm:bottom-36 lg:bottom-40 right-4 lg:right-12 items-center gap-2"
            >
                <button
                    @click="previousSlide"
                    class="p-3 rounded-lg bg-white/10 backdrop-blur-sm text-white transition-all duration-300 hover:bg-white/20 border border-white/20"
                    aria-label="Previous slide"
                >
                    <ChevronLeft class="h-5 w-5" />
                </button>
                <button
                    @click="toggleAutoplay"
                    class="p-3 rounded-lg bg-white/10 backdrop-blur-sm text-white transition-all duration-300 hover:bg-white/20 border border-white/20"
                    :aria-label="isPlaying ? 'Pause' : 'Play'"
                >
                    <Pause v-if="isPlaying" class="h-5 w-5" />
                    <Play v-else class="h-5 w-5" />
                </button>
                <button
                    @click="nextSlide"
                    class="p-3 rounded-lg bg-white/10 backdrop-blur-sm text-white transition-all duration-300 hover:bg-white/20 border border-white/20"
                    aria-label="Next slide"
                >
                    <ChevronRight class="h-5 w-5" />
                </button>
            </div>
        </div>
        <!-- Dot Indicators -->
        <div class="absolute z-20 bottom-24 left-1/2 -translate-x-1/2">
            <div class="flex items-center justify-center gap-2">
                <button
                    v-for="(kawasan, index) in kawasanKonservasi"
                    :key="kawasan.id"
                    @click="goToSlide(index)"
                    class="transition-all duration-300"
                    :class="{
                        'h-2 w-12 rounded-full bg-emerald-400':
                            index === currentSlide,
                        'h-2 w-2 rounded-full bg-white/30 hover:bg-white/50':
                            index !== currentSlide,
                    }"
                    :aria-label="`Lompat ke slide ${index + 1}`"
                ></button>
            </div>
        </div>

        <!-- Scroll Indicator -->
        <div
            class="absolute z-20 bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
            aria-hidden="true"
        >
            <div class="animate-bounce">
                <ArrowDown class="h-7 w-7 text-emerald-400" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    ArrowDown,
    ChevronLeft,
    ChevronRight,
    CircleChevronRightIcon,
    MapPin,
    MountainIcon,
    Pause,
    Play,
} from 'lucide-vue-next';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { generateSlug } from '../../server/utils/slug';

const parallaxOffset = ref(0);
const isScrolled = ref(false);
const currentSlide = ref(0);
const isPlaying = ref(true);
let autoplayInterval: NodeJS.Timeout | null = null;

const { data: slidesData } = await useFetch('/api/hero', {
    query: {
        activeOnly: true,
        limit: 20,
    },
});

const kawasanKonservasi = computed(() => {
    if (slidesData.value && slidesData.value.success && slidesData.value.data) {
        return slidesData.value.data.map((slide: any) => ({
            id: slide.id,
            name: slide.name,
            type: slide.type,
            location: slide.location,
            image: slide.imageUrl, // Map imageUrl to image
            description: slide.description,
            slug: generateSlug(slide.name),
        }));
    }
    return [];
});

const currentKawasan = computed(
    () => kawasanKonservasi.value[currentSlide.value] || {}
);

const handleScroll = () => {
    if (typeof window !== 'undefined') {
        parallaxOffset.value = window.scrollY * 0.3;
        isScrolled.value = window.scrollY > 50;
    }
};

const nextSlide = () => {
    if (kawasanKonservasi.value.length === 0) return;
    currentSlide.value =
        (currentSlide.value + 1) % kawasanKonservasi.value.length;
};

const previousSlide = () => {
    if (kawasanKonservasi.value.length === 0) return;
    currentSlide.value =
        currentSlide.value === 0
            ? kawasanKonservasi.value.length - 1
            : currentSlide.value - 1;
};

const goToSlide = (index: number) => {
    currentSlide.value = index;
    resetAutoplay();
};

const toggleAutoplay = () => {
    isPlaying.value = !isPlaying.value;
    if (isPlaying.value) {
        startAutoplay();
    } else {
        stopAutoplay();
    }
};

const startAutoplay = () => {
    stopAutoplay();
    if (kawasanKonservasi.value.length > 1) {
        autoplayInterval = setInterval(() => {
            nextSlide();
        }, 4000);
    }
};

const stopAutoplay = () => {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
    }
};

const resetAutoplay = () => {
    if (isPlaying.value) {
        startAutoplay();
    }
};

watch(kawasanKonservasi, (newVal) => {
    if (newVal.length > 1 && isPlaying.value) {
        startAutoplay();
    }
});

onMounted(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    if (isPlaying.value) {
        startAutoplay();
    }
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
    stopAutoplay();
});
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.8s ease-in-out;
}

.slide-fade-enter-from {
    opacity: 0;
    transform: scale(1.1);
}

.slide-fade-leave-to {
    opacity: 0;
    transform: scale(0.95);
}

@keyframes gradient-shift {
    0%,
    100% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
}
</style>
