<template>
  <div
    class="min-h-screen bg-white text-gray-900"
    :class="{ 'overflow-hidden': isMenuOpen }"
  >
    <!-- Navbar Component -->
    <Navbar
      :is-open="isMenuOpen"
      @toggle-menu="toggleMenu"
      @close-menu="closeMenu"
    />

    <!-- Mega Menu Component -->
    <MegaMenu :is-open="isMenuOpen" @close="closeMenu" />

    <!-- Main Content -->
    <main class="pt-0">
      <NuxtPage />
    </main>

    <!-- Footer Component -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import Navbar from "~/components/Navbar.vue";
import MegaMenu from "~/components/MegaMenu.vue";
import Footer from "~/components/Footer.vue";

const isMenuOpen = ref(false);
let megaMenuContainer: HTMLElement | null = null;

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
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

const handleClickOutside = (event: MouseEvent) => {
  if (!isMenuOpen.value) return;

  const target = event.target as Node | null;
  const megaMenuElement = document.getElementById("mega-menu");

  if (
    target &&
    isMenuOpen.value &&
    megaMenuElement &&
    !megaMenuElement.contains(target)
  ) {
    closeMenu();
  }
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    closeMenu({ restoreFocus: true });
  }
};

onMounted(() => {
  megaMenuContainer = document.getElementById("mega-menu");
  window.addEventListener("mousedown", handleClickOutside);
  window.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("mousedown", handleClickOutside);
  window.removeEventListener("keydown", handleKeydown);
});
</script>
