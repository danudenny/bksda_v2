<template>
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
                aria-hidden="true"
            ></div>
        </Transition>

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
            >
                <div
                    class="flex min-h-full items-center justify-center p-4 sm:p-6"
                >
                    <div
                        class="relative w-full max-w-6xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl ring-1 ring-white/10 overflow-hidden"
                    >
                        <button
                            @click="emit('close')"
                            class="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm text-white/70 ring-1 ring-white/20 transition-all duration-300 hover:bg-black/80 hover:text-white hover:ring-white/40 hover:scale-110"
                            aria-label="Close"
                        >
                            <X class="h-5 w-5" />
                        </button>

                        <div
                            class="grid grid-cols-1 lg:grid-cols-2 gap-0 max-h-[90vh] overflow-y-auto"
                        >
                            <div class="relative bg-black">
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
                                    <div
                                        class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                                    ></div>

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

                            <div class="p-6 sm:p-8 lg:p-10 space-y-6">
                                <div class="space-y-3">
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

                                <div class="space-y-3">
                                    <h3
                                        class="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-emerald-400"
                                    >
                                        <Info class="h-4 w-4" />
                                        Deskripsi
                                    </h3>

                                    <div
                                        class="text-base leading-relaxed text-gray-300 [&>p]:mb-2"
                                        v-html="species.description"
                                    ></div>
                                </div>

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
    Camera,
    Info,
    MapPin,
    Ruler,
    Scale,
    Shield,
    TrendingDown,
    X,
} from 'lucide-vue-next';
import { onUnmounted, watch } from 'vue'; // CHANGE 4: Import these

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

const props = defineProps<{
    isOpen: boolean;
    species: Species | null;
}>();

const emit = defineEmits<{
    close: [];
}>();

// CHANGE 5: Logic to lock body scroll when modal is open
watch(
    () => props.isOpen,
    (isOpen) => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
);

// Clean up in case the component is destroyed while modal is open
onUnmounted(() => {
    document.body.style.overflow = '';
});
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

/* Optional: Basic styling for HTML content if you aren't using Tailwind Typography */
:deep(p) {
    margin-bottom: 0.75rem;
}
:deep(ul) {
    list-style-type: disc;
    padding-left: 1.25rem;
    margin-bottom: 0.75rem;
}
:deep(strong) {
    color: #fff;
    font-weight: 700;
}
</style>
