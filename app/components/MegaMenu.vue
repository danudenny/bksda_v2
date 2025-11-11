<template>
    <div id="mega-menu" role="dialog" aria-modal="true">
        <!-- Backdrop with fade transition -->
        <transition
            enter-active-class="transition-opacity duration-300 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                v-if="isOpen"
                class="fixed bg-black/10 backdrop-blur-sm z-40 left-2 sm:left-4 right-2 sm:right-4 bottom-2 sm:bottom-4 rounded-xl cursor-pointer transition-all duration-300"
                :class="[
                    isHomepage && !isScrolled ? 'top-[85px]' : 'top-[73px]',
                ]"
                @click="handleBackdropClick"
                aria-hidden="true"
            ></div>
        </transition>
        <!-- Menu content with scale and fade transition -->
        <transition
            enter-active-class="transition-all duration-400 ease-out"
            enter-from-class="opacity-0 scale-95 -translate-y-4"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition-all duration-300 ease-in"
            leave-from-class="opacity-100 scale-100 translate-y-0"
            leave-to-class="opacity-0 scale-95 -translate-y-4"
        >
            <div
                v-if="isOpen"
                class="fixed z-50 flex w-auto justify-center pt-1 left-2 sm:left-4 right-2 sm:right-4 origin-top transition-all duration-300"
                :class="[
                    isHomepage && !isScrolled ? 'top-[85px]' : 'top-[73px]',
                ]"
            >
                <div class="relative w-full max-w-7xl">
                    <div
                        class="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-slate-50/50 to-white p-5 shadow-2xl ring-1 ring-slate-900/5 sm:p-6 cursor-default backdrop-blur-sm"
                        @click.stop
                    >
                        <!-- Decorative elements -->
                        <div
                            class="absolute top-0 right-0 w-64 h-64 bg-emerald-100/30 rounded-full blur-3xl -z-10"
                        ></div>
                        <div
                            class="absolute bottom-0 left-0 w-64 h-64 bg-teal-100/30 rounded-full blur-3xl -z-10"
                        ></div>

                        <div class="grid gap-6 lg:grid-cols-4">
                            <NuxtLink
                                to="/"
                                class="hidden lg:block lg:col-span-1 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-5 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/30 hover:scale-105 group cursor-pointer relative overflow-hidden"
                                @click="emit('close')"
                            >
                                <!-- Decorative pattern -->
                                <div class="absolute inset-0 opacity-10">
                                    <svg
                                        class="h-full w-full"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <defs>
                                            <pattern
                                                id="home-pattern"
                                                width="20"
                                                height="20"
                                                patternUnits="userSpaceOnUse"
                                            >
                                                <circle
                                                    cx="2"
                                                    cy="2"
                                                    r="1"
                                                    fill="currentColor"
                                                    class="text-white"
                                                />
                                            </pattern>
                                        </defs>
                                        <rect
                                            width="100%"
                                            height="100%"
                                            fill="url(#home-pattern)"
                                        />
                                    </svg>
                                </div>

                                <div class="relative z-10">
                                    <div
                                        class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm mb-3 group-hover:scale-110 transition-transform duration-300"
                                    >
                                        <Home class="h-6 w-6 text-white" />
                                    </div>
                                    <h3
                                        class="text-xl font-bold text-white mb-2"
                                    >
                                        Beranda Utama
                                    </h3>
                                    <p
                                        class="text-xs text-emerald-50 leading-relaxed"
                                    >
                                        Kembali ke halaman utama Balai
                                        Konservasi Sumber Daya Alam Sumatera
                                        Selatan.
                                    </p>
                                    <div
                                        class="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-white group-hover:gap-3 transition-all duration-300"
                                    >
                                        <span>Akses Cepat</span>
                                        <ArrowRight class="h-3 w-3" />
                                    </div>
                                </div>
                            </NuxtLink>
                            <div class="lg:col-span-3">
                                <div
                                    class="grid gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3"
                                >
                                    <template
                                        v-for="item in menuItems"
                                        :key="item.label"
                                    >
                                        <!-- Regular menu items -->
                                        <template v-if="!item.isAccordion">
                                            <div
                                                v-for="child in item.children"
                                                :key="child.label"
                                                class="col-span-1"
                                            >
                                                <template v-if="child.children">
                                                    <div
                                                        class="mb-2.5 flex items-center gap-2 pb-2 border-b-2 border-emerald-100"
                                                    >
                                                        <div
                                                            class="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md"
                                                        >
                                                            <component
                                                                :is="
                                                                    iconMap[
                                                                        item.icon ||
                                                                            'default'
                                                                    ]
                                                                "
                                                                class="h-3.5 w-3.5 text-white"
                                                                aria-hidden="true"
                                                            />
                                                        </div>
                                                        <p
                                                            class="text-xs font-bold uppercase tracking-wider text-slate-800"
                                                        >
                                                            {{ child.label }}
                                                        </p>
                                                    </div>
                                                    <ul class="space-y-1.5">
                                                        <li
                                                            v-for="grandchild in child.children"
                                                            :key="
                                                                grandchild.label
                                                            "
                                                        >
                                                            <NuxtLink
                                                                :to="
                                                                    grandchild.href ||
                                                                    '#'
                                                                "
                                                                class="group flex items-center gap-2 text-xs text-slate-600 transition-all duration-200 hover:text-emerald-600 hover:translate-x-1 py-1 px-2 rounded-lg hover:bg-emerald-50/50"
                                                                @click="
                                                                    emit(
                                                                        'close'
                                                                    )
                                                                "
                                                            >
                                                                <svg
                                                                    class="h-1.5 w-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                                                    viewBox="0 0 6 6"
                                                                    fill="currentColor"
                                                                >
                                                                    <circle
                                                                        cx="3"
                                                                        cy="3"
                                                                        r="3"
                                                                    />
                                                                </svg>
                                                                <span
                                                                    class="font-medium"
                                                                    >{{
                                                                        grandchild.label
                                                                    }}</span
                                                                >
                                                            </NuxtLink>
                                                        </li>
                                                    </ul>
                                                </template>
                                                <NuxtLink
                                                    v-else
                                                    :to="child.href || '#'"
                                                    class="group flex items-center gap-2 text-xs font-semibold text-slate-700 transition-all duration-200 hover:translate-x-1 hover:text-emerald-600 py-1.5 px-2 rounded-lg hover:bg-emerald-50"
                                                    @click="emit('close')"
                                                >
                                                    <ArrowRight
                                                        class="h-3.5 w-3.5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                                    />
                                                    {{ child.label }}
                                                </NuxtLink>
                                            </div>
                                        </template>

                                        <!-- Accordion menu item (Kawasan Konservasi) - HIGHLIGHTED -->
                                        <div
                                            v-else
                                            class="col-span-1 sm:col-span-2 lg:col-span-1 relative"
                                        >
                                            <!-- Highlight container with gradient background -->
                                            <div
                                                class="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50/50 to-emerald-50 rounded-xl -m-2 p-2"
                                            >
                                                <!-- Animated border glow -->
                                                <div
                                                    class="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 opacity-20 blur-sm"
                                                ></div>
                                            </div>

                                            <!-- Badge/Label -->

                                            <!-- Accordion Header -->
                                            <div
                                                class="relative mb-2.5 flex items-center justify-between gap-2 pb-2 border-b-2 border-emerald-400 cursor-pointer group/main transition-all duration-300"
                                                @click="
                                                    toggleAccordion(item.label)
                                                "
                                            >
                                                <div
                                                    class="flex items-center gap-2"
                                                >
                                                    <div
                                                        class="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg ring-2 ring-emerald-200 group-hover/main:ring-emerald-300 transition-all duration-300 group-hover/main:scale-110"
                                                    >
                                                        <component
                                                            :is="
                                                                iconMap[
                                                                    item.icon ||
                                                                        'default'
                                                                ]
                                                            "
                                                            class="h-4 w-4 text-white"
                                                            aria-hidden="true"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p
                                                            class="text-sm font-extrabold uppercase tracking-wider text-emerald-700 group-hover/main:text-emerald-600 transition-colors"
                                                        >
                                                            {{ item.label }}
                                                        </p>
                                                        <p
                                                            class="text-[10px] text-emerald-600/80 font-medium"
                                                        >
                                                            Area Konservasi Kami
                                                        </p>
                                                    </div>
                                                </div>
                                                <svg
                                                    class="h-5 w-5 text-emerald-600 transition-transform duration-300 group-hover/main:text-emerald-500"
                                                    :class="{
                                                        'rotate-180':
                                                            openAccordions.includes(
                                                                item.label
                                                            ),
                                                    }"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    stroke-width="2.5"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            </div>

                                            <!-- Accordion Content -->
                                            <transition
                                                enter-active-class="transition-all duration-300 ease-out"
                                                enter-from-class="opacity-0 max-h-0"
                                                enter-to-class="opacity-100 max-h-[500px]"
                                                leave-active-class="transition-all duration-300 ease-in"
                                                leave-from-class="opacity-100 max-h-[500px]"
                                                leave-to-class="opacity-0 max-h-0"
                                            >
                                                <div
                                                    v-show="
                                                        openAccordions.includes(
                                                            item.label
                                                        )
                                                    "
                                                    class="relative space-y-3 overflow-hidden mt-3"
                                                >
                                                    <div
                                                        v-for="child in item.children"
                                                        :key="child.label"
                                                        class="relative border-l-4 border-emerald-300 pl-3 bg-white/50 rounded-r-lg py-1"
                                                    >
                                                        <!-- Sub-accordion header -->
                                                        <div
                                                            class="flex items-center justify-between cursor-pointer group/sub py-2 px-3 rounded-lg hover:bg-emerald-100/80 transition-all duration-200"
                                                            @click="
                                                                toggleSubAccordion(
                                                                    child.label
                                                                )
                                                            "
                                                        >
                                                            <div
                                                                class="flex items-center gap-2"
                                                            >
                                                                <!-- Icon indicator -->
                                                                <div
                                                                    class="w-2 h-2 rounded-full bg-emerald-500 group-hover/sub:bg-emerald-600 transition-colors"
                                                                ></div>
                                                                <span
                                                                    class="text-xs font-bold text-emerald-800 group-hover/sub:text-emerald-900 transition-colors"
                                                                >
                                                                    {{
                                                                        child.label
                                                                    }}
                                                                </span>
                                                            </div>
                                                            <svg
                                                                class="h-4 w-4 text-emerald-600 transition-transform duration-200 group-hover/sub:text-emerald-700"
                                                                :class="{
                                                                    'rotate-180':
                                                                        openSubAccordions.includes(
                                                                            child.label
                                                                        ),
                                                                }"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                stroke-width="2.5"
                                                            >
                                                                <path
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                    d="M19 9l-7 7-7-7"
                                                                />
                                                            </svg>
                                                        </div>

                                                        <!-- Sub-accordion content -->
                                                        <transition
                                                            enter-active-class="transition-all duration-200 ease-out"
                                                            enter-from-class="opacity-0 max-h-0"
                                                            enter-to-class="opacity-100 max-h-[300px]"
                                                            leave-active-class="transition-all duration-200 ease-in"
                                                            leave-from-class="opacity-100 max-h-[300px]"
                                                            leave-to-class="opacity-0 max-h-0"
                                                        >
                                                            <ul
                                                                v-show="
                                                                    openSubAccordions.includes(
                                                                        child.label
                                                                    )
                                                                "
                                                                class="space-y-1 mt-1 overflow-hidden"
                                                            >
                                                                <li
                                                                    v-for="grandchild in child.children"
                                                                    :key="
                                                                        grandchild.label
                                                                    "
                                                                >
                                                                    <NuxtLink
                                                                        :to="
                                                                            grandchild.href ||
                                                                            '#'
                                                                        "
                                                                        class="group flex items-center gap-2 text-xs text-slate-600 transition-all duration-200 hover:text-emerald-600 hover:translate-x-1 py-1 px-2 rounded-lg hover:bg-emerald-50/50"
                                                                        @click="
                                                                            emit(
                                                                                'close'
                                                                            )
                                                                        "
                                                                    >
                                                                        <svg
                                                                            class="h-1.5 w-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                                                            viewBox="0 0 6 6"
                                                                            fill="currentColor"
                                                                        >
                                                                            <circle
                                                                                cx="3"
                                                                                cy="3"
                                                                                r="3"
                                                                            />
                                                                        </svg>
                                                                        <span
                                                                            class="font-medium"
                                                                            >{{
                                                                                grandchild.label
                                                                            }}</span
                                                                        >
                                                                    </NuxtLink>
                                                                </li>
                                                            </ul>
                                                        </transition>
                                                    </div>
                                                </div>
                                            </transition>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script setup lang="ts">
import {
    ArrowRight,
    FileText,
    GalleryVertical,
    Handshake,
    Home,
    Menu,
    Mountain,
    NotebookPen,
    TreePine,
    Users,
} from 'lucide-vue-next';
import { ref } from 'vue';

type MenuItem = {
    label: string;
    description?: string;
    icon?: string;
    href?: string;
    isAccordion?: boolean;
    children?: MenuItem[];
};

defineProps<{
    isOpen: boolean;
    isScrolled?: boolean;
    isHomepage?: boolean;
}>();

const emit = defineEmits<{
    close: [];
}>();

// Initialize with Kawasan Konservasi expanded by default
const openAccordions = ref<string[]>(['Kawasan Konservasi']);
const openSubAccordions = ref<string[]>([]);

const toggleAccordion = (label: string) => {
    const index = openAccordions.value.indexOf(label);
    if (index > -1) {
        openAccordions.value.splice(index, 1);
        // Close all sub-accordions when parent closes
        openSubAccordions.value = [];
    } else {
        // Close all other accordions and open the clicked one
        openAccordions.value = [label];
        // Close all sub-accordions when switching parent
        openSubAccordions.value = [];
    }
};

const toggleSubAccordion = (label: string) => {
    const index = openSubAccordions.value.indexOf(label);
    if (index > -1) {
        openSubAccordions.value.splice(index, 1);
    } else {
        // Close other sub-accordions and open the clicked one
        openSubAccordions.value = [label];
    }
};

const handleBackdropClick = () => {
    emit('close');
};
const iconMap: any = {
    about: Users,
    profile: NotebookPen,
    conservation: TreePine,
    regulation: FileText,
    simaksi: Mountain,
    collaboration: Handshake,
    gallery: GalleryVertical,
    default: Menu,
    home: Home,
};
const menuItems: MenuItem[] = [
    {
        label: 'Informasi Utama',
        icon: 'profile',
        children: [
            {
                label: 'Profil BKSDA',
                children: [
                    { label: 'Visi & Misi', href: '#' },
                    { label: 'Organisasi', href: '#' },
                    { label: 'Wilayah Kerja', href: '#' },
                    { label: 'Tentang Kami', href: '/tentang' },
                ],
            },
            {
                label: 'Publikasi',
                children: [{ label: 'Belum Ada Sub Menu' }],
            },
            {
                label: 'Aplikasi SIMAKSI',
                children: [
                    { label: 'Buku Panduan' },
                    { label: 'Perizinan TSL' },
                    { label: 'Perizinan Wisata' },
                ],
            },
        ],
    },
    {
        label: 'Kawasan Konservasi',
        icon: 'conservation',
        isAccordion: true,
        children: [
            {
                label: 'Suaka Margasatwa',
                children: [
                    { label: 'Dangku' },
                    { label: 'Bentayan' },
                    { label: 'Isau Isau' },
                    { label: 'Gumai Pasemah' },
                    { label: 'Gunung Raya' },
                ],
            },
            {
                label: 'Taman Wisata Alam',
                children: [
                    { label: 'Punti Kayu' },
                    { label: 'Isau-Isau' },
                    { label: 'Jering Menduyung' },
                    { label: 'Gunung Permisan' },
                ],
            },
            {
                label: 'Taman Nasional',
                children: [{ label: 'Gunung Maras' }],
            },
        ],
    },
    {
        label: 'Kerjasama & Galeri',
        icon: 'collaboration',
        children: [
            {
                label: 'Kerjasama',
                children: [
                    { label: 'Pemulihan Ekosistem' },
                    { label: 'Penguatan Fungsi' },
                ],
            },
            {
                label: 'Galeri',
                children: [
                    { label: 'Foto', href: '/galeri/foto' },
                    { label: 'Video', href: '#' },
                ],
            },
        ],
    },
];
</script>
