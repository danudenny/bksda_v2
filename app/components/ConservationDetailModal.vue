<template>
    <!-- Modal Backdrop -->
    <Teleport to="body">
        <Transition
            enter-active-class="transition-opacity duration-300 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                v-if="isOpen"
                class="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md"
                @click="emit('close')"
                aria-hidden="true"
            ></div>
        </Transition>

        <!-- Modal Content -->
        <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
        >
            <div
                v-if="isOpen && species"
                class="fixed inset-0 z-[101] overflow-y-auto"
                @click="emit('close')"
            >
                <div
                    class="flex min-h-full items-center justify-center p-4 sm:p-6"
                >
                    <div
                        class="relative w-full max-w-6xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl ring-1 ring-white/10 overflow-hidden"
                        @click.stop
                    >
                        <!-- Close Button -->
                        <button
                            @click="emit('close')"
                            class="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm text-white/70 ring-1 ring-white/20 transition-all duration-300 hover:bg-black/80 hover:text-white hover:ring-white/40 hover:scale-110"
                            aria-label="Close"
                        >
                            <X class="h-5 w-5" />
                        </button>

                        <!-- Content Grid -->
                        <div
                            class="grid grid-cols-1 lg:grid-cols-2 gap-0 max-h-[90vh] overflow-y-auto"
                        >
                            <!-- Left Side - Image Gallery -->
                            <div class="relative bg-black">
                                <!-- Main Image -->
                                <div
                                    class="aspect-[4/5] lg:aspect-auto lg:h-full relative"
                                >
                                    <NuxtImg
                                        :src="species.imageUrl"
                                        :alt="species.name"
                                        class="h-full w-full object-cover"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        loading="eager"
                                        format="avif,webp"
                                        quality="90"
                                    />
                                    <!-- Gradient overlay -->
                                    <div
                                        class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                                    ></div>

                                    <!-- Image Counter Badge -->
                                    <div
                                        class="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-black/60 backdrop-blur-sm px-3 py-1.5 ring-1 ring-white/20"
                                    >
                                        <Camera class="h-4 w-4 text-white" />
                                        <span
                                            class="text-sm font-medium text-white"
                                            >1 /
                                            {{
                                                species.gallery?.length || 1
                                            }}</span
                                        >
                                    </div>
                                </div>

                                <!-- Thumbnail Gallery (if available) -->
                                <div
                                    v-if="
                                        species.gallery &&
                                        species.gallery.length > 1
                                    "
                                    class="flex gap-2 p-4 bg-black/40 overflow-x-auto"
                                >
                                    <button
                                        v-for="(
                                            image, index
                                        ) in species.gallery"
                                        :key="index"
                                        class="flex-shrink-0 h-16 w-16 rounded-lg overflow-hidden ring-2 transition-all duration-200"
                                        :class="
                                            index === 0
                                                ? 'ring-emerald-400'
                                                : 'ring-white/20 hover:ring-white/40'
                                        "
                                    >
                                        <img
                                            :src="image"
                                            :alt="`${species.name} ${index + 1}`"
                                            class="h-full w-full object-cover"
                                        />
                                    </button>
                                </div>
                            </div>

                            <!-- Right Side - Information -->
                            <div class="p-6 sm:p-8 lg:p-10 space-y-6">
                                <!-- Header -->
                                <div class="space-y-3">
                                    <!-- Status Badge -->
                                    <div
                                        class="inline-flex items-center gap-2 rounded-full bg-red-500/10 px-3 py-1 ring-1 ring-red-500/30"
                                    >
                                        <AlertTriangle
                                            class="h-3.5 w-3.5 text-red-400"
                                        />
                                        <span
                                            class="text-xs font-semibold text-red-400 uppercase tracking-wider"
                                        >
                                            {{
                                                species.status ||
                                                'Terancam Punah'
                                            }}
                                        </span>
                                    </div>

                                    <h2
                                        class="text-3xl sm:text-4xl font-bold text-white"
                                    >
                                        {{ species.name }}
                                    </h2>
                                    <p
                                        class="text-lg font-medium text-emerald-300 italic"
                                    >
                                        {{ species.latinName }}
                                    </p>
                                </div>

                                <!-- Description -->
                                <div class="space-y-3">
                                    <h3
                                        class="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-emerald-400"
                                    >
                                        <Info class="h-4 w-4" />
                                        Deskripsi
                                    </h3>
                                    <p
                                        class="text-base leading-relaxed text-gray-300"
                                    >
                                        {{
                                            species.description ||
                                            'Spesies ini merupakan salah satu satwa prioritas konservasi di Sumatera Selatan. Populasi mereka terus menurun akibat kehilangan habitat dan perburuan liar. BKSDA Sumatera Selatan berkomitmen untuk melindungi dan melestarikan spesies ini melalui berbagai program konservasi.'
                                        }}
                                    </p>
                                </div>

                                <!-- Infographic Stats -->
                                <div
                                    class="grid grid-cols-2 gap-4 p-4 bg-white/5 rounded-xl ring-1 ring-white/10"
                                >
                                    <div class="space-y-1">
                                        <div
                                            class="flex items-center gap-2 text-xs text-gray-400"
                                        >
                                            <MapPin class="h-3.5 w-3.5" />
                                            <span>Habitat</span>
                                        </div>
                                        <p
                                            class="text-sm font-semibold text-white"
                                        >
                                            {{
                                                species.habitat ||
                                                'Hutan Tropis Sumatera'
                                            }}
                                        </p>
                                    </div>
                                    <div class="space-y-1">
                                        <div
                                            class="flex items-center gap-2 text-xs text-gray-400"
                                        >
                                            <TrendingDown class="h-3.5 w-3.5" />
                                            <span>Populasi</span>
                                        </div>
                                        <p
                                            class="text-sm font-semibold text-white"
                                        >
                                            {{
                                                species.population || 'Menurun'
                                            }}
                                        </p>
                                    </div>
                                    <div class="space-y-1">
                                        <div
                                            class="flex items-center gap-2 text-xs text-gray-400"
                                        >
                                            <Scale class="h-3.5 w-3.5" />
                                            <span>Berat</span>
                                        </div>
                                        <p
                                            class="text-sm font-semibold text-white"
                                        >
                                            {{ species.weight || 'Bervariasi' }}
                                        </p>
                                    </div>
                                    <div class="space-y-1">
                                        <div
                                            class="flex items-center gap-2 text-xs text-gray-400"
                                        >
                                            <Ruler class="h-3.5 w-3.5" />
                                            <span>Panjang</span>
                                        </div>
                                        <p
                                            class="text-sm font-semibold text-white"
                                        >
                                            {{ species.length || 'Bervariasi' }}
                                        </p>
                                    </div>
                                </div>

                                <!-- Threats -->
                                <div class="space-y-3">
                                    <h3
                                        class="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-red-400"
                                    >
                                        <AlertCircle class="h-4 w-4" />
                                        Ancaman Utama
                                    </h3>
                                    <ul class="space-y-2">
                                        <li
                                            v-for="threat in species.threats || [
                                                'Kehilangan habitat',
                                                'Perburuan liar',
                                                'Konflik manusia-satwa',
                                            ]"
                                            :key="threat"
                                            class="flex items-start gap-2 text-sm text-gray-300"
                                        >
                                            <span
                                                class="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400"
                                            ></span>
                                            <span>{{ threat }}</span>
                                        </li>
                                    </ul>
                                </div>

                                <!-- Conservation Efforts -->
                                <div class="space-y-3">
                                    <h3
                                        class="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-emerald-400"
                                    >
                                        <Shield class="h-4 w-4" />
                                        Upaya Konservasi
                                    </h3>
                                    <ul class="space-y-2">
                                        <li
                                            v-for="effort in species.efforts || [
                                                'Patroli kawasan konservasi',
                                                'Program pemantauan populasi',
                                                'Edukasi masyarakat',
                                                'Penegakan hukum',
                                            ]"
                                            :key="effort"
                                            class="flex items-start gap-2 text-sm text-gray-300"
                                        >
                                            <span
                                                class="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400"
                                            ></span>
                                            <span>{{ effort }}</span>
                                        </li>
                                    </ul>
                                </div>

                                <!-- Action Button -->
                                <div class="pt-4">
                                    <button
                                        class="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 ring-1 ring-emerald-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/40 hover:scale-[1.02]"
                                    >
                                        <BookOpen class="h-4 w-4" />
                                        <span>Baca Selengkapnya</span>
                                        <ArrowRight class="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import {
    AlertCircle,
    AlertTriangle,
    ArrowRight,
    BookOpen,
    Camera,
    Info,
    MapPin,
    Ruler,
    Scale,
    Shield,
    TrendingDown,
    X,
} from 'lucide-vue-next';

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

defineProps<{
    isOpen: boolean;
    species: Species | null;
}>();

const emit = defineEmits<{
    close: [];
}>();
</script>

<style scoped>
/* Custom scrollbar for modal content */
.overflow-y-auto {
    scrollbar-width: thin;
    scrollbar-color: rgba(16, 185, 129, 0.3) transparent;
}

.overflow-y-auto::-webkit-scrollbar {
    width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
    background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    background-color: rgba(16, 185, 129, 0.3);
    border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background-color: rgba(16, 185, 129, 0.5);
}
</style>
