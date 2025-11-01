<script setup lang="ts">
// Script setup tetap sama
defineProps<{
  tabs: string[];
  modelValue: string;
}>();

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="flex space-x-2">
    <button
      v-for="tab in tabs"
      :key="tab"
      @click="emit('update:modelValue', tab)"
      :class="[
        'py-1.5 px-3 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out cursor-pointer',
        modelValue === tab
          ? 'bg-primary text-white shadow-sm dark:bg-green-500 dark:text-white'
          : // --- STYLING TIDAK AKTIF ---
            // Saat tidak aktif: transparan dengan teks abu-abu
            'text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200',
      ]"
    >
      {{ tab.replace("_", " ") }}
    </button>
  </div>
</template>
