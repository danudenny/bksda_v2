<template>
  <transition
    enter-active-class="transition-opacity duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <button
      v-if="isVisible"
      @click="scrollToTop"
      class="fixed cursor-pointer bottom-8 left-8 z-30 h-12 w-12 rounded-full bg-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
      aria-label="Kembali ke atas"
      title="Kembali ke atas"
    >
      <ArrowUp
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 text-emerald-600"
      />

      <svg
        class="h-full w-full -rotate-90"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke-width="4"
          class="stroke-gray-200"
        />
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke-width="4"
          class="stroke-emerald-600 transition-all duration-300"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="progressOffset"
        />
      </svg>
    </button>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { ArrowUp } from "lucide-vue-next";

const isVisible = ref(false);
const scrollProgress = ref(0);

const radius = 20;
const circumference = 2 * Math.PI * radius;

const progressOffset = computed(() => {
  return circumference - (scrollProgress.value / 100) * circumference;
});

const handleScroll = () => {
  const documentHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;
  const maxScrollableHeight = documentHeight - windowHeight;

  const currentScroll = window.scrollY;

  isVisible.value = currentScroll > 200;

  if (maxScrollableHeight > 0) {
    scrollProgress.value = (currentScroll / maxScrollableHeight) * 100;
  } else {
    scrollProgress.value = 0;
  }
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
