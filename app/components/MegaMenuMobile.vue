<template>
    <div id="mega-menu-mobile" role="dialog" aria-modal="true">
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
                class="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                @click="handleBackdropClick"
                aria-hidden="true"
            ></div>
        </transition>

        <!-- Menu content with slide transition -->
        <transition
            enter-active-class="transition-transform duration-300 ease-out"
            enter-from-class="-translate-x-full"
            enter-to-class="translate-x-0"
            leave-active-class="transition-transform duration-300 ease-in"
            leave-from-class="translate-x-0"
            leave-to-class="-translate-x-full"
        >
            <div
                v-if="isOpen"
                class="fixed inset-y-0 left-0 z-50 w-4/5 max-w-sm bg-white shadow-2xl overflow-y-auto"
            >
                <div class="p-5">
                    <!-- Header -->
                    <div class="flex items-center justify-between mb-6">
                        <div class="flex items-center gap-2">
                            <div
                                class="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600 text-white"
                            >
                                <Menu class="h-5 w-5" />
                            </div>
                            <span class="font-bold text-lg text-slate-900"
                                >Menu</span
                            >
                        </div>
                        <button
                            @click="emit('close')"
                            class="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                        >
                            <X class="h-5 w-5" />
                        </button>
                    </div>

                    <!-- Menu Items -->
                    <div class="space-y-4">
                        <NuxtLink
                            to="/"
                            class="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 text-emerald-700 font-semibold hover:bg-emerald-100 transition-colors"
                            @click="emit('close')"
                        >
                            <Home class="h-5 w-5" />
                            Beranda
                        </NuxtLink>

                        <div v-for="item in menuItems" :key="item.label">
                            <!-- Accordion Item -->
                            <div
                                class="border border-slate-100 rounded-xl overflow-hidden"
                            >
                                <button
                                    @click="toggleAccordion(item.label)"
                                    class="w-full flex items-center justify-between p-3 bg-white hover:bg-slate-50 transition-colors"
                                >
                                    <div class="flex items-center gap-3">
                                        <component
                                            :is="
                                                iconMap[item.icon || 'default']
                                            "
                                            class="h-5 w-5 text-emerald-600"
                                        />
                                        <span
                                            class="font-medium text-slate-700"
                                            >{{ item.label }}</span
                                        >
                                    </div>
                                    <ChevronDown
                                        class="h-4 w-4 text-slate-400 transition-transform duration-300"
                                        :class="{
                                            'rotate-180':
                                                openAccordions.includes(
                                                    item.label
                                                ),
                                        }"
                                    />
                                </button>

                                <transition
                                    enter-active-class="transition-all duration-300 ease-out"
                                    enter-from-class="max-h-0 opacity-0"
                                    enter-to-class="max-h-[500px] opacity-100"
                                    leave-active-class="transition-all duration-200 ease-in"
                                    leave-from-class="max-h-[500px] opacity-100"
                                    leave-to-class="max-h-0 opacity-0"
                                >
                                    <div
                                        v-show="
                                            openAccordions.includes(item.label)
                                        "
                                        class="bg-slate-50 border-t border-slate-100"
                                    >
                                        <div class="p-2 space-y-1">
                                            <div
                                                v-for="child in item.children"
                                                :key="child.label"
                                            >
                                                <!-- Sub-Accordion or Link -->
                                                <div
                                                    v-if="
                                                        child.children &&
                                                        child.children.length >
                                                            0
                                                    "
                                                >
                                                    <button
                                                        @click="
                                                            toggleSubAccordion(
                                                                child.label
                                                            )
                                                        "
                                                        class="w-full flex items-center justify-between p-2 rounded-lg text-sm text-slate-600 hover:bg-emerald-50/50 hover:text-emerald-700 transition-colors"
                                                    >
                                                        <span>{{
                                                            child.label
                                                        }}</span>
                                                        <ChevronDown
                                                            class="h-3.5 w-3.5 transition-transform duration-200"
                                                            :class="{
                                                                'rotate-180':
                                                                    openSubAccordions.includes(
                                                                        child.label
                                                                    ),
                                                            }"
                                                        />
                                                    </button>
                                                    <transition
                                                        enter-active-class="transition-all duration-200 ease-out"
                                                        enter-from-class="max-h-0 opacity-0"
                                                        enter-to-class="max-h-[300px] opacity-100"
                                                        leave-active-class="transition-all duration-200 ease-in"
                                                        leave-from-class="max-h-[300px] opacity-100"
                                                        leave-to-class="max-h-0 opacity-0"
                                                    >
                                                        <div
                                                            v-show="
                                                                openSubAccordions.includes(
                                                                    child.label
                                                                )
                                                            "
                                                            class="pl-4 py-1 space-y-1"
                                                        >
                                                            <NuxtLink
                                                                v-for="grandchild in child.children"
                                                                :key="
                                                                    grandchild.label
                                                                "
                                                                :to="
                                                                    grandchild.href ||
                                                                    '#'
                                                                "
                                                                class="block p-2 text-sm text-slate-500 rounded-lg hover:text-emerald-600 hover:bg-emerald-50/30"
                                                                @click="
                                                                    emit(
                                                                        'close'
                                                                    )
                                                                "
                                                            >
                                                                {{
                                                                    grandchild.label
                                                                }}
                                                            </NuxtLink>
                                                        </div>
                                                    </transition>
                                                </div>
                                                <NuxtLink
                                                    v-else
                                                    :to="child.href || '#'"
                                                    class="block p-2 rounded-lg text-sm text-slate-600 hover:bg-emerald-50/50 hover:text-emerald-700 transition-colors"
                                                    @click="emit('close')"
                                                >
                                                    {{ child.label }}
                                                </NuxtLink>
                                            </div>
                                        </div>
                                    </div>
                                </transition>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { useApi } from '@/composables/useApi';
import {
    ChevronDown,
    FileText,
    GalleryVertical,
    Handshake,
    Home,
    Menu,
    Mountain,
    NotebookPen,
    TreePine,
    Users,
    X,
} from 'lucide-vue-next';
import { onMounted, ref } from 'vue';

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
}>();

const emit = defineEmits<{
    close: [];
}>();

const { getKawasanCategories } = useApi();

const openAccordions = ref<string[]>([]);
const openSubAccordions = ref<string[]>([]);

const toggleAccordion = (label: string) => {
    const index = openAccordions.value.indexOf(label);
    if (index > -1) {
        openAccordions.value.splice(index, 1);
    } else {
        openAccordions.value = [label];
    }
};

const toggleSubAccordion = (label: string) => {
    const index = openSubAccordions.value.indexOf(label);
    if (index > -1) {
        openSubAccordions.value.splice(index, 1);
    } else {
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

const menuItems = ref<MenuItem[]>([]);

async function fetchKawasanMenu() {
    const response = await getKawasanCategories(1, 100);
    if (response.success && response.data) {
        const categories = response.data;
        return {
            label: 'Kawasan Konservasi',
            icon: 'conservation',
            isAccordion: true,
            children: categories.map((cat: any) => ({
                label: cat.name,
                children:
                    cat.locations?.map((loc: any) => ({
                        label: loc.name,
                        href: `/kawasan/${cat.slug}/${loc.slug}`,
                    })) || [],
            })),
        };
    }
    return null;
}

function transformMenu(menu: any): MenuItem {
    let href = menu.href || '#';
    if (menu.type === 'PAGE' && menu.page) {
        href = `/${menu.page.slug}`;
    }

    return {
        label: menu.label,
        icon: menu.icon || 'default',
        href,
        isAccordion: false,
        children: menu.children ? menu.children.map(transformMenu) : [],
    };
}

async function fetchMenus() {
    try {
        const [kawasanMenu, dynamicMenusResponse] = await Promise.all([
            fetchKawasanMenu(),
            $fetch('/api/menus'),
        ]);

        // @ts-ignore
        const dynamicMenus = dynamicMenusResponse.success
            ? // @ts-ignore
              dynamicMenusResponse.data.map(transformMenu)
            : [];

        if (dynamicMenus.length > 0) {
            menuItems.value = [...dynamicMenus];

            if (kawasanMenu) {
                const exists = menuItems.value.find(
                    (m) => m.label === kawasanMenu.label
                );
                if (!exists) {
                    if (menuItems.value.length > 0) {
                        menuItems.value.splice(1, 0, kawasanMenu);
                    } else {
                        menuItems.value.push(kawasanMenu);
                    }
                }
            }
        } else {
            if (kawasanMenu) {
                menuItems.value = [
                    {
                        label: 'Profil',
                        icon: 'profile',
                        children: [
                            { label: 'Visi & Misi', href: '#' },
                            { label: 'Struktur Organisasi', href: '#' },
                            { label: 'Wilayah Kerja', href: '#' },
                            { label: 'Tentang Kami', href: '/tentang' },
                        ],
                    },
                    kawasanMenu,
                    {
                        label: 'Peraturan',
                        icon: 'regulation',
                        children: [
                            { label: 'Undang-Undang', href: '#' },
                            { label: 'Peraturan Pemerintah', href: '#' },
                            { label: 'Peraturan Menteri', href: '#' },
                            { label: 'SK Direktur Jenderal', href: '#' },
                        ],
                    },
                    {
                        label: 'Pelayanan',
                        icon: 'simaksi',
                        children: [
                            { label: 'Aplikasi SIMAKSI', href: '#' },
                            { label: 'Perizinan TSL', href: '#' },
                            { label: 'Perizinan Wisata', href: '#' },
                            { label: 'Buku Panduan', href: '#' },
                        ],
                    },
                    {
                        label: 'Publikasi',
                        icon: 'notebookpen',
                        children: [
                            { label: 'Berita', href: '/berita' },
                            { label: 'Artikel', href: '#' },
                            { label: 'Jurnal', href: '#' },
                            { label: 'Laporan', href: '#' },
                        ],
                    },
                    {
                        label: 'Galeri',
                        icon: 'gallery',
                        children: [
                            { label: 'Galeri Foto', href: '/galeri/foto' },
                            { label: 'Galeri Video', href: '#' },
                        ],
                    },
                ];
            }
        }
    } catch (e) {
        console.error('Failed to fetch menus', e);
    }
}

onMounted(() => {
    fetchMenus();
});
</script>
