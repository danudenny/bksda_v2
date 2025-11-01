<script setup lang="ts">
import { computed } from "vue";

const currentYear = computed(() => new Date().getFullYear());
</script>

<template>
  <footer
    class="p-4 border-t text-center text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400"
  >
    <p>
      © {{ currentYear }} BKSDA Kalimantan Selatan. All rights reserved.
    </p>
    <p class="mt-1 text-gray-400 dark:text-gray-500">
      Admin Panel v1.0
    </p>
  </footer>
</template>
