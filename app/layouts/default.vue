<template>
    <div
        class="min-h-screen bg-white text-gray-900"
        :class="{ 'overflow-hidden': isMenuOpen }"
    >
        <Navbar
            :is-open="isMenuOpen"
            :is-scrolled="isScrolled"
            :is-homepage="isHomepage"
            @toggle-menu="toggleMenu"
            @close-menu="closeMenu"
            @toggle-search="toggleSearch"
        />

        <MegaMenu
            :is-open="isMenuOpen"
            :is-scrolled="isScrolled"
            :is-homepage="isHomepage"
            @close="closeMenu"
        />

        <SearchModal :is-open="isSearchOpen" @close="closeSearch" />

        <main class="pt-0">
            <NuxtPage />
        </main>

        <Footer />

        <WhatsAppButton />
        <SurveyButton />
        <ClientOnly>
            <CookieBanner />
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Footer from '~/components/Footer.vue';
import MegaMenu from '~/components/MegaMenu.vue';
import Navbar from '~/components/Navbar.vue';
import SearchModal from '~/components/SearchModal.vue';
import SurveyButton from '~/components/SurveyButton.vue';
import WhatsAppButton from '~/components/WhatsAppButton.vue';
import CookieBanner from '~/components/CookieBanner.vue';


useHead({
    htmlAttrs: {
        lang: 'id',
    },

    titleTemplate: (titleChunk) => {
        return titleChunk
            ? `${titleChunk} - BKSDA Sumatera Selatan`
            : 'Balai Konservasi Sumber Daya Alam Sumatera Selatan';
    },

    link: [
        {
            rel: 'icon',
            type: 'image/png',
            href: '/logo2.png',
        },
    ],

    meta: [
        {
            name: 'description',
            content:
                'Situs resmi Balai Konservasi Sumber Daya Alam (BKSDA) Sumatera Selatan. Temukan informasi terbaru tentang kawasan konservasi, flora, fauna, dan upaya pelestarian.',
        },
        {
            name: 'keywords',
            content:
                'BKSDA, Sumatera Selatan, Konservasi, Sumber Daya Alam, Taman Nasional, Cagar Alam, Flora, Fauna, Harimau Sumatera, Gajah Sumatera',
        },

        {
            property: 'og:title',
            content: 'Balai Konservasi Sumber Daya Alam Sumatera Selatan', // Judul default saat di-share
        },
        {
            property: 'og:description',
            content:
                'Situs resmi BKSDA Sumatera Selatan. Informasi konservasi, kawasan, flora, dan fauna.',
        },
        {
            property: 'og:image',
            // PENTING: Ganti ini dengan URL gambar default untuk sharing
            // (misalnya logo besar atau gambar header)
            content: 'https://bksdasumsel.go.id/gambar-default-share.jpg',
        },
        {
            property: 'og:type',
            content: 'website',
        },
        {
            property: 'og:url',
            content: 'https://bksdasumsel.go.id',
        },

        {
            name: 'twitter:card',
            content: 'summary_large_image',
        },
        {
            name: 'twitter:title',
            content: 'Balai Konservasi Sumber Daya Alam Sumatera Selatan',
        },
        {
            name: 'twitter:description',
            content:
                'Situs resmi BKSDA Sumatera Selatan. Informasi konservasi, kawasan, flora, dan fauna.',
        },
        {
            name: 'twitter:image',
            content: 'https://bksdasumsel.go.id/gambar-default-share.jpg',
        },
    ],
});

const route = useRoute();
const isMenuOpen = ref(false);
const isSearchOpen = ref(false);
const isScrolled = ref(false);
let megaMenuContainer: HTMLElement | null = null;

const isHomepage = computed(() => route.path === '/');

const handleScroll = () => {
    isScrolled.value = window.scrollY > 50;
};

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
    if (isMenuOpen.value) {
        isSearchOpen.value = false;
    }
};

const closeMenu = (options: { restoreFocus?: boolean } = {}) => {
    if (!isMenuOpen.value) {
        return;
    }

    isMenuOpen.value = false;

    if (options.restoreFocus) {
    }
};

const toggleSearch = () => {
    isSearchOpen.value = !isSearchOpen.value;
    if (isSearchOpen.value) {
        isMenuOpen.value = false;
    }
};

const closeSearch = () => {
    isSearchOpen.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
    if (!isMenuOpen.value) return;

    const target = event.target as Node | null;
    if (!target) return;

    const megaMenuElement = document.getElementById('mega-menu');
    const navbarElement = document.querySelector('header');

    if (
        (megaMenuElement && megaMenuElement.contains(target)) ||
        (navbarElement && navbarElement.contains(target))
    ) {
        return;
    }

    closeMenu();
};

const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        if (isSearchOpen.value) {
            closeSearch();
        } else if (isMenuOpen.value) {
            closeMenu({ restoreFocus: true });
        }
    }
};

onMounted(() => {
    megaMenuContainer = document.getElementById('mega-menu');
    window.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
});

onBeforeUnmount(() => {
    window.removeEventListener('mousedown', handleClickOutside);
    window.removeEventListener('keydown', handleKeydown);
    window.removeEventListener('scroll', handleScroll);
});
</script>
