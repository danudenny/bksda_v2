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
                    <img
                        :src="kawasan.image"
                        :alt="kawasan.name"
                        class="w-full h-full object-cover"
                        loading="eager"
                        fetchpriority="high"
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
            class="relative z-10 flex flex-col justify-end h-full w-full max-w-[1600px] mx-auto px-4 pt-12 pb-16 sm:px-6 sm:pt-16 sm:pb-20 lg:px-12 lg:pb-28"
        >
            <div class="flex items-end justify-between gap-4 lg:gap-8">
                <div class="max-w-xl lg:max-w-2xl xl:max-w-3xl">
                    <h1
                        class="mb-4 sm:mb-6 font-bold leading-tight text-white drop-shadow-2xl"
                        style="
                            font-size: clamp(1.875rem, 5vw, 4.5rem);
                            line-height: 1.1;
                        "
                    >
                        Melestarikan Alam,
                        <br />
                        Menjaga Masa Depan.
                    </h1>

                    <p
                        class="mb-6 sm:mb-10 leading-relaxed text-gray-200 drop-shadow-lg"
                        style="
                            font-size: clamp(0.875rem, 1.5vw, 1.125rem);
                            max-width: min(100%, 32rem);
                        "
                    >
                        Kami berdedikasi untuk melindungi keanekaragaman hayati
                        dan ekosistem unik di Sumatera Selatan melalui
                        konservasi, penelitian, dan kemitraan masyarakat.
                    </p>

                    <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <NuxtLink
                            to="/profil"
                            class="inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-emerald-600 text-white font-semibold shadow-lg shadow-emerald-900/50 transition-all duration-300 hover:bg-emerald-500 hover:scale-105"
                            style="font-size: clamp(0.875rem, 1.5vw, 1rem)"
                        >
                            <CircleChevronRightIcon
                                class="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0"
                            />
                            <span class="whitespace-nowrap"
                                >Jelajahi Profil Kami</span
                            >
                        </NuxtLink>
                        <NuxtLink
                            to="/kawasan"
                            class="inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg border-2 border-white/50 text-white font-semibold backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white"
                            style="font-size: clamp(0.875rem, 1.5vw, 1rem)"
                        >
                            <MountainIcon
                                class="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0"
                            />
                            <span class="whitespace-nowrap"
                                >Lihat Kawasan Konservasi</span
                            >
                        </NuxtLink>
                    </div>
                </div>

                <div class="hidden lg:flex flex-col items-end gap-3 lg:gap-4">
                    <div class="flex items-center gap-2">
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
    MountainIcon,
    Pause,
    Play,
} from 'lucide-vue-next';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const parallaxOffset = ref(0);
const isScrolled = ref(false);
const currentSlide = ref(0);
const isPlaying = ref(true);
let autoplayInterval: NodeJS.Timeout | null = null;

const kawasanKonservasi = [
    {
        id: 1,
        name: 'Taman Nasional Bukit Barisan Selatan',
        type: 'Taman Nasional',
        location: 'Kabupaten Lahat & Empat Lawang',
        image: '/kws_konservasi/gnmaras.avif',
    },
    {
        id: 2,
        name: 'Taman Wisata Alam Punti Kayu',
        type: 'TWA',
        location: 'Kota Palembang',
        image: '/kws_konservasi/punti.avif',
    },
    {
        id: 3,
        name: 'Taman Wisata Alam Danau Ranau',
        type: 'TWA',
        location: 'Kabupaten OKU Selatan',
        image: '/about-1.avif',
    },
    {
        id: 4,
        name: 'Suaka Margasatwa Dangku',
        type: 'Suaka Margasatwa',
        location: 'Kabupaten Musi Banyuasin',
        image: '/kws_konservasi/dangku.avif',
    },
    {
        id: 5,
        name: 'Cagar Alam Isau-Isau Karang Agung',
        type: 'Cagar Alam',
        location: 'Kabupaten Musi Rawas',
        image: '/about-2.avif',
    },
    {
        id: 6,
        name: 'Taman Wisata Alam Teluk Gelam',
        type: 'TWA',
        location: 'Kabupaten OKI',
        image: '/hero-background.avif',
    },
    {
        id: 7,
        name: 'Suaka Margasatwa Bentayan',
        type: 'Suaka Margasatwa',
        location: 'Kabupaten Musi Banyuasin',
        image: '/fokus_konservasi/gajah.avif',
    },
    {
        id: 8,
        name: 'Taman Wisata Alam Bukit Cogong',
        type: 'TWA',
        location: 'Kabupaten Musi Rawas',
        image: '/fokus_konservasi/harimau.avif',
    },
    {
        id: 9,
        name: 'Suaka Margasatwa Padang Sugihan',
        type: 'Suaka Margasatwa',
        location: 'Kabupaten Banyuasin',
        image: '/fokus_konservasi/rangkong.avif',
    },
    {
        id: 10,
        name: 'Cagar Alam Gunung Raya',
        type: 'Cagar Alam',
        location: 'Kabupaten Lahat',
        image: '/news-1.jpg',
    },
];

const handleScroll = () => {
    if (typeof window !== 'undefined') {
        parallaxOffset.value = window.scrollY * 0.3;
        isScrolled.value = window.scrollY > 50;
    }
};

const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % kawasanKonservasi.length;
};

const previousSlide = () => {
    currentSlide.value =
        currentSlide.value === 0
            ? kawasanKonservasi.length - 1
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
    autoplayInterval = setInterval(() => {
        nextSlide();
    }, 4000);
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
</style>
