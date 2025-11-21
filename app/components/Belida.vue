<template>
    <section
        class="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-16 sm:py-24"
    >
        <!-- Decorative background elements -->
        <div class="absolute inset-0 -z-10">
            <div
                class="absolute right-0 top-0 h-96 w-96 rounded-full bg-emerald-100/40 blur-3xl filter"
            ></div>
            <div
                class="absolute left-0 bottom-0 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl filter"
            ></div>
        </div>

        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <!-- Header Section -->
            <div class="mx-auto max-w-3xl text-center">
                <div
                    class="inline-flex items-center gap-2 rounded-full bg-emerald-600/10 px-4 py-2 ring-1 ring-inset ring-emerald-600/20"
                >
                    <svg
                        class="h-4 w-4 text-emerald-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                        />
                    </svg>
                    <span class="text-sm font-semibold text-emerald-700">
                        Tautan Penting
                    </span>
                </div>

                <h2
                    class="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
                >
                    Akses
                    <span
                        class="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
                        >Tautan</span
                    >
                    Cepat
                </h2>
                <p class="mt-4 text-lg text-slate-600">
                    Akses cepat ke berbagai sistem dan platform penting untuk
                    mendukung pekerjaan Anda
                </p>
            </div>

            <!-- Search Bar -->
            <div class="mx-auto mt-12 max-w-2xl">
                <div class="relative group">
                    <div
                        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5"
                    >
                        <Search
                            class="h-5 w-5 text-slate-400 transition-colors duration-300 group-focus-within:text-emerald-600"
                            aria-hidden="true"
                        />
                    </div>
                    <input
                        v-model="searchQuery"
                        type="search"
                        name="search"
                        id="search"
                        class="block w-full rounded-2xl border-0 py-4 pl-14 pr-12 text-slate-900 shadow-lg ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-base transition-all duration-300"
                        placeholder="Cari tautan (misal: SAKTI, KSDAE, SIMPEG...)"
                    />
                    <div
                        v-if="searchQuery"
                        class="absolute inset-y-0 right-0 flex items-center pr-4"
                    >
                        <button
                            @click="searchQuery = ''"
                            class="rounded-full p-1.5 hover:bg-slate-100 transition-colors duration-200"
                            aria-label="Clear search"
                        >
                            <X class="h-4 w-4 text-slate-400" />
                        </button>
                    </div>
                </div>

                <!-- Search Results Info -->
                <div
                    v-if="searchQuery && filteredLinks.length > 0"
                    class="mt-3 text-center"
                >
                    <p class="text-sm text-slate-600">
                        Ditemukan
                        <span class="font-semibold text-emerald-600">{{
                            filteredLinks.length
                        }}</span>
                        tautan
                    </p>
                </div>
            </div>

            <!-- Links Grid -->
            <div
                class="mx-auto mt-16 grid max-w-none grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
                <NuxtLink
                    v-for="link in displayedLinks"
                    :key="link.id"
                    :to="link.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group relative flex transform flex-col overflow-hidden rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-1"
                >
                    <!-- Status Indicator -->
                    <div class="absolute top-4 right-4 flex items-center gap-2">
                        <span
                            class="relative flex h-3 w-3"
                            :title="
                                link.status === 'ACTIVE'
                                    ? 'Active'
                                    : link.status === 'INACTIVE'
                                      ? 'Inactive'
                                      : 'Maintenance'
                            "
                        >
                            <span
                                v-if="link.status === 'ACTIVE'"
                                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
                            ></span>
                            <span
                                class="relative inline-flex rounded-full h-3 w-3"
                                :class="{
                                    'bg-green-500': link.status === 'ACTIVE',
                                    'bg-red-500': link.status === 'INACTIVE',
                                    'bg-yellow-400':
                                        link.status === 'MAINTENANCE',
                                }"
                            ></span>
                        </span>
                    </div>

                    <!-- Icon -->
                    <div
                        class="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/50 transition-transform duration-300 group-hover:scale-110"
                    >
                        <AppWindow
                            class="h-7 w-7 text-white"
                            aria-hidden="true"
                        />
                    </div>

                    <!-- Content -->
                    <div class="flex-grow">
                        <h3
                            class="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors duration-300"
                        >
                            {{ link.title }}
                        </h3>
                        <p class="mt-2 text-sm text-slate-600">
                            {{ link.subtitle }}
                        </p>
                    </div>

                    <!-- Footer -->
                    <div
                        class="mt-4 flex items-center justify-between pt-4 border-t border-slate-100 transition-colors duration-300 group-hover:border-emerald-500"
                    >
                        <span class="text-sm font-semibold text-emerald-600">
                            Kunjungi
                        </span>
                        <ArrowRightCircleIcon
                            class="h-5 w-5 text-emerald-600 transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </div>

                    <!-- Hover Gradient Bar -->
                    <div
                        class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                    ></div>
                </NuxtLink>

                <!-- No Results Message -->
                <div
                    v-if="filteredLinks.length === 0"
                    class="col-span-full py-16 text-center"
                >
                    <div
                        class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100"
                    >
                        <Search class="h-10 w-10 text-slate-400" />
                    </div>
                    <p class="mt-6 text-lg font-semibold text-slate-900">
                        Tautan Tidak Ditemukan
                    </p>
                    <p class="mt-2 text-slate-600">
                        Tidak ada tautan yang cocok dengan pencarian "<span
                            class="font-semibold text-emerald-600"
                            >{{ searchQuery }}</span
                        >".
                    </p>
                    <button
                        @click="searchQuery = ''"
                        class="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-emerald-500 hover:shadow-lg"
                    >
                        <X class="h-4 w-4" />
                        Hapus Pencarian
                    </button>
                </div>
            </div>

            <!-- Show More/Less Button -->
            <div v-if="filteredLinks.length > 4" class="mt-12 text-center">
                <button
                    @click="isExpanded = !isExpanded"
                    type="button"
                    class="group inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/40 hover:scale-105"
                >
                    <template v-if="!isExpanded">
                        <span
                            >Tampilkan Semua Tautan ({{
                                filteredLinks.length
                            }})</span
                        >
                        <ChevronDown
                            class="h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5"
                        />
                    </template>
                    <template v-else>
                        <span>Tampilkan Lebih Sedikit</span>
                        <ChevronUp
                            class="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5"
                        />
                    </template>
                </button>
            </div>

            <!-- Total Links Info -->
            <div class="mt-8 text-center">
                <p class="text-sm text-slate-500">
                    Total
                    <span class="font-semibold text-slate-700">{{
                        allLinks.length
                    }}</span>
                    tautan tersedia
                </p>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { useApi } from '@/composables/useApi';
import {
    AppWindow,
    ArrowRightCircleIcon,
    ChevronDown,
    ChevronUp,
    Search,
    X,
} from 'lucide-vue-next';
import { computed, onMounted, ref, watch } from 'vue';

type AccessLink = {
    id: string;
    title: string;
    subtitle: string;
    url: string;
    status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
    isActive: boolean;
};

const { getExternalLinks } = useApi();
const searchQuery = ref('');
const isExpanded = ref(false);
const allLinks = ref<AccessLink[]>([]);

const filteredLinks = computed(() => {
    const query = searchQuery.value.toLowerCase().trim();
    if (!query) {
        return allLinks.value;
    }

    return allLinks.value.filter((link) => {
        const titleMatch = link.title.toLowerCase().includes(query);
        const subtitleMatch = link.subtitle.toLowerCase().includes(query);
        return titleMatch || subtitleMatch;
    });
});

const displayedLinks = computed(() => {
    if (isExpanded.value) {
        return filteredLinks.value;
    }
    return filteredLinks.value.slice(0, 4);
});

watch(searchQuery, () => {
    isExpanded.value = false;
});

onMounted(async () => {
    const response = await getExternalLinks(1, 100);
    if (response.success && response.data) {
        // Filter only active links for the public view
        allLinks.value = response.data.filter((link: any) => link.isActive);
    }
});
</script>

<style scoped>
@keyframes ping {
    75%,
    100% {
        transform: scale(1.5);
        opacity: 0;
    }
}

.animate-ping {
    animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}
</style>
