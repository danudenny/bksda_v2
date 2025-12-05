<template>
    <div class="min-h-screen bg-gray-50 pt-16">
        <Navbar
            :is-open="isMegaMenuOpen"
            :is-scrolled="isScrolled"
            :is-homepage="false"
            @toggle-menu="toggleMegaMenu"
            @close-menu="closeMegaMenu"
            @toggle-search="toggleSearch"
        />

        <div class="hidden lg:block">
            <MegaMenu
                :is-open="isMegaMenuOpen"
                :is-scrolled="isScrolled"
                :is-homepage="false"
                @close="closeMegaMenu"
            />
        </div>

        <div class="lg:hidden">
            <MegaMenuMobile :is-open="isMegaMenuOpen" @close="closeMegaMenu" />
        </div>

        <SearchModal :is-open="isSearchOpen" @close="closeSearch" />

        <!-- Hero/Header Section for Archive/List Pages -->
        <div
            class="relative bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-900 text-white py-12 sm:py-16 lg:py-20"
        >
            <div
                class="absolute inset-0 bg-[url('/hero-background.avif')] bg-cover bg-center opacity-10"
            ></div>
            <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
            ></div>

            <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="text-center">
                    <!-- Breadcrumb -->
                    <nav
                        class="mb-6 flex items-center justify-center gap-2 text-sm"
                    >
                        <NuxtLink
                            to="/"
                            class="text-emerald-200 transition-colors hover:text-white"
                        >
                            Beranda
                        </NuxtLink>
                        <span class="text-emerald-400">/</span>
                        <slot name="breadcrumb">
                            <span class="text-white">Arsip</span>
                        </slot>
                    </nav>

                    <!-- Category Badge -->
                    <slot name="badge"></slot>

                    <!-- Page Title -->
                    <slot name="header">
                        <h1 class="text-3xl font-bold sm:text-4xl lg:text-5xl">
                            Semua Konten
                        </h1>
                    </slot>

                    <!-- Page Description -->
                    <slot name="description">
                        <p
                            class="mx-auto mt-4 max-w-2xl text-lg text-emerald-100"
                        >
                            Jelajahi koleksi lengkap konten kami
                        </p>
                    </slot>
                </div>
            </div>
        </div>

        <!-- Filters/Search Section (Optional) -->
        <div
            v-if="$slots.filters"
            class="border-b border-gray-200 bg-white shadow-sm"
        >
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <slot name="filters"></slot>
            </div>
        </div>

        <!-- Main Content (List/Grid) -->
        <main class="relative z-0">
            <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <slot />
            </div>
        </main>

        <!-- Pagination Section -->
        <div v-if="$slots.pagination" class="border-t border-gray-200 bg-white">
            <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <slot name="pagination"></slot>
            </div>
        </div>

        <BackToTop />
        <WhatsAppButton />
    </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import MegaMenu from '~/components/MegaMenu.vue';
import MegaMenuMobile from '~/components/MegaMenuMobile.vue';
import Navbar from '~/components/Navbar.vue';
import SearchModal from '~/components/SearchModal.vue';

// Layout for list/archive pages like all news, all announcements, etc.
const isMegaMenuOpen = ref(false);
const isSearchOpen = ref(false);
const isScrolled = ref(false);

const toggleMegaMenu = () => {
    isMegaMenuOpen.value = !isMegaMenuOpen.value;
    // Close search when opening menu
    if (isMegaMenuOpen.value) {
        isSearchOpen.value = false;
    }
};

const closeMegaMenu = () => {
    isMegaMenuOpen.value = false;
};

const toggleSearch = () => {
    isSearchOpen.value = !isSearchOpen.value;
    // Close menu when opening search
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

const handleClickOutside = (event: MouseEvent) => {
    if (!isMegaMenuOpen.value) return;

    const target = event.target as Node | null;
    if (!target) return;

    const megaMenuElement = document.getElementById('mega-menu');
    const megaMenuMobileElement = document.getElementById('mega-menu-mobile');
    const navbarElement = document.querySelector('header');

    if (
        (megaMenuElement && megaMenuElement.contains(target)) ||
        (megaMenuMobileElement && megaMenuMobileElement.contains(target)) ||
        (navbarElement && navbarElement.contains(target))
    ) {
        return;
    }

    closeMegaMenu();
};

onMounted(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('mousedown', handleClickOutside);
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('keydown', handleKeydown);
    window.removeEventListener('mousedown', handleClickOutside);
});
</script>
