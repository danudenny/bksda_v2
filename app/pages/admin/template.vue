<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

// Your page logic here
</script>

<template>
  <div>
    <!-- Page Header -->
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        Page Title
      </h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">
        Page description goes here
      </p>
    </div>

    <!-- Content Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Card Example -->
      <div
        class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600"
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Card Title
        </h3>
        <p class="text-gray-600 dark:text-gray-300">
          Card content goes here
        </p>
      </div>
    </div>
  </div>
</template>
