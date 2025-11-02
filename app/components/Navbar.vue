<template>
  <header
    class="fixed left-0 right-0 z-50 transition-all duration-300 ease-out mt-4 mx-4 rounded-lg"
    :class="[
      isHomepage
        ? isScrolled
          ? 'top-0 bg-black/40 backdrop-blur-lg'
          : 'top-5 bg-transparent'
        : 'top-0 bg-black/40 backdrop-blur-lg',
    ]"
  >
    <div
      ref="megaMenuContainer"
      class="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      <nav class="flex w-full items-center justify-between py-4 lg:py-5">
        <!-- Logo Section -->
        <NuxtLink
          to="/"
          class="flex items-center gap-3 group transition duration-300"
          @click="emit('close-menu')"
        >
          <div
            class="h-10 w-10 overflow-hidden rounded-full group-hover:ring-emerald-300 transition duration-300"
          >
            <NuxtImg
              src="/logo.avif"
              alt="Kementerian Kehutanan Indonesia logo"
              width="40"
              height="40"
              class="h-full w-full object-cover"
            />
          </div>
          <div class="flex flex-col leading-tight">
            <span
              class="text-base font-bold leading-none tracking-tight text-white transition-colors duration-300"
            >
              BKSDA Sumatera Selatan
            </span>
            <span
              class="text-xs font-bold leading-none text-emerald-300 mt-1 transition-colors duration-300"
            >
              Kementerian LHK
            </span>
          </div>
        </NuxtLink>

        <!-- Menu Button -->
        <button
          ref="menuTrigger"
          type="button"
          class="group cursor-pointer flex items-center gap-2 rounded-lg border px-5 py-2 text-sm font-semibold shadow-sm transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          :class="{
            'border-emerald-400 bg-emerald-600 text-white hover:bg-emerald-700 hover:text-white shadow-lg shadow-emerald-600/50':
              isOpen,
            'border-white/30 bg-white/10 text-white hover:border-emerald-400 hover:bg-white/20 hover:text-emerald-300':
              !isOpen,
          }"
          aria-haspopup="true"
          aria-controls="mega-menu"
          :aria-expanded="isOpen"
          @click.stop="emit('toggle-menu')"
          @keydown.enter.prevent.stop="emit('toggle-menu')"
          @keydown.space.prevent.stop="emit('toggle-menu')"
        >
          <AlignVerticalJustifyStart
            class="h-4 w-4 transition-all duration-500 ease-out"
            :class="{ 'rotate-90 scale-110': isOpen, 'scale-100': !isOpen }"
            aria-hidden="true"
          />
          <span class="transition-all duration-500">{{
            isOpen ? "Tutup / Tekan Esc" : "Menu"
          }}</span>
        </button>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { AlignVerticalJustifyStart } from "lucide-vue-next";
import { ref, onMounted, onBeforeUnmount, computed } from "vue";

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  "toggle-menu": [];
  "close-menu": [];
}>();

const route = useRoute();
const menuTrigger = ref<HTMLButtonElement | null>(null);
const isScrolled = ref(false);

// Check if we're on the homepage
const isHomepage = computed(
  () => route.path === "/" || route.path === "/index.html",
);

const handleScroll = () => {
  if (typeof window !== "undefined") {
    isScrolled.value = window.scrollY > 10;
  }
};

onMounted(() => {
  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

defineExpose({
  menuTrigger,
});
</script>
