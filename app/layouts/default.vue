<template>
  <div
    class="min-h-screen bg-white text-gray-900"
    :class="{ 'overflow-hidden': isMenuOpen }"
  >
    <!-- Navbar Component -->
    <Navbar
      :is-open="isMenuOpen"
      :is-scrolled="isScrolled"
      :is-homepage="isHomepage"
      @toggle-menu="toggleMenu"
      @close-menu="closeMenu"
      @toggle-search="toggleSearch"
    />

    <!-- Mega Menu Component -->
    <MegaMenu
      :is-open="isMenuOpen"
      :is-scrolled="isScrolled"
      :is-homepage="isHomepage"
      @close="closeMenu"
    />

    <!-- Search Modal Component -->
    <SearchModal :is-open="isSearchOpen" @close="closeSearch" />

    <!-- Main Content -->
    <main class="pt-0">
      <NuxtPage />
    </main>

    <!-- Footer Component -->
    <Footer />

    <!-- Floating Buttons -->
    <WhatsAppButton />
    <SurveyButton />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import Navbar from "~/components/Navbar.vue";
import MegaMenu from "~/components/MegaMenu.vue";
import SearchModal from "~/components/SearchModal.vue";
import Footer from "~/components/Footer.vue";
import WhatsAppButton from "~/components/WhatsAppButton.vue";
import SurveyButton from "~/components/SurveyButton.vue";

const route = useRoute();
const isMenuOpen = ref(false);
const isSearchOpen = ref(false);
const isScrolled = ref(false);
let megaMenuContainer: HTMLElement | null = null;

const isHomepage = computed(() => route.path === "/");

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

// ...existing code...

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  // Close search when opening menu
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
    // Focus restoration can be added if needed
  }
};

const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value;
  // Close menu when opening search
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

  const megaMenuElement = document.getElementById("mega-menu");
  const navbarElement = document.querySelector("header");

  // Don't close if clicking inside the mega menu or navbar (including the menu button)
  if (
    (megaMenuElement && megaMenuElement.contains(target)) ||
    (navbarElement && navbarElement.contains(target))
  ) {
    return;
  }

  // Close the menu if clicking outside both
  closeMenu();
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    if (isSearchOpen.value) {
      closeSearch();
    } else if (isMenuOpen.value) {
      closeMenu({ restoreFocus: true });
    }
  }
};

onMounted(() => {
  megaMenuContainer = document.getElementById("mega-menu");
  window.addEventListener("mousedown", handleClickOutside);
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll(); // Check initial scroll position
});

onBeforeUnmount(() => {
  window.removeEventListener("mousedown", handleClickOutside);
  window.removeEventListener("keydown", handleKeydown);
  window.removeEventListener("scroll", handleScroll);
});
</script>
