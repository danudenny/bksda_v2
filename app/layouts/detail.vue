<template>
    <div class="min-h-screen bg-gray-50 pt-14">
        <Navbar
            :is-open="isMegaMenuOpen"
            :is-scrolled="isScrolled"
            :is-homepage="false"
            @toggle-menu="toggleMegaMenu"
            @close-menu="closeMegaMenu"
            @toggle-search="toggleSearch"
        />

        <MegaMenu
            :is-open="isMegaMenuOpen"
            :is-scrolled="isScrolled"
            :is-homepage="false"
            @close="closeMegaMenu"
        />

        <SearchModal :is-open="isSearchOpen" @close="closeSearch" />

        <!-- Hero/Header Section for Detail Pages -->
        <div
            class="relative bg-linear-to-br from-emerald-900 via-teal-800 to-emerald-900 text-white py-16 sm:py-20 lg:py-24"
        >
            <div
                class="absolute inset-0 bg-cover bg-center opacity-20 transition-opacity duration-700"
                :style="{
                    backgroundImage: `url('${backgroundImage || '/hero-background.avif'}')`,
                }"
            ></div>
            <div
                class="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"
            ></div>

            <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="mx-auto max-w-4xl">
                    <!-- Breadcrumb -->
                    <nav class="mb-6 flex items-center gap-2 text-sm">
                        <NuxtLink
                            to="/"
                            class="text-emerald-200 transition-colors hover:text-white"
                        >
                            Beranda
                        </NuxtLink>
                        <span class="text-emerald-400">/</span>
                        <slot name="breadcrumb">
                            <span class="text-white">Detail</span>
                        </slot>
                    </nav>

                    <!-- Page Title -->
                    <slot name="header">
                        <h1 class="text-3xl font-bold sm:text-4xl lg:text-5xl">
                            Detail Content
                        </h1>
                    </slot>

                    <!-- Meta Information -->
                    <slot name="meta"></slot>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <main class="relative z-0">
            <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div class="mx-auto max-w-5xl">
                    <slot />
                </div>
            </div>
        </main>

        <BackToTop />
        <WhatsAppButton />
    </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

defineProps<{
    backgroundImage?: string;
}>();

const isMegaMenuOpen = ref(false);
const isSearchOpen = ref(false);
const isScrolled = ref(false);

const toggleMegaMenu = () => {
    isMegaMenuOpen.value = !isMegaMenuOpen.value;
    if (isMegaMenuOpen.value) {
        isSearchOpen.value = false;
    }
};

const closeMegaMenu = () => {
    isMegaMenuOpen.value = false;
};

const toggleSearch = () => {
    isSearchOpen.value = !isSearchOpen.value;
    if (isSearchOpen.value) {
        isMegaMenuOpen.value = false;
    }
};

const closeSearch = () => {
    isSearchOpen.value = false;
};

const handleScroll = () => {
    if (typeof window !== 'undefined') {
        isScrolled.value = window.scrollY > 50;
    }
};

const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        if (isSearchOpen.value) {
            closeSearch();
        } else if (isMegaMenuOpen.value) {
            closeMegaMenu();
        }
    }
};

onMounted(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('keydown', handleKeydown);
});
</script>
