<script setup lang="ts">
import { useConfirmDialog } from "@/composables/useConfirmDialog";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-vue-next";

const { isOpen, options, confirm, cancel } = useConfirmDialog();
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Backdrop -->
    <div
      class="absolute inset-0 bg-black/50"
      @click="cancel"
    />

    <!-- Dialog -->
    <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-sm w-full mx-4 p-6 space-y-4">
      <!-- Icon and Title -->
      <div class="flex items-start gap-3">
        <div
          v-if="options.isDangerous"
          class="flex-shrink-0 mt-0.5"
        >
          <AlertCircle class="w-5 h-5 text-red-600 dark:text-red-400" />
        </div>
        <div class="flex-1">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ options.title }}
          </h2>
        </div>
      </div>

      <!-- Message -->
      <p class="text-sm text-gray-600 dark:text-gray-300">
        {{ options.message }}
      </p>

      <!-- Actions -->
      <div class="flex gap-3 justify-end pt-2">
        <Button
          variant="outline"
          @click="cancel"
          class="w-full sm:w-auto"
        >
          {{ options.cancelText }}
        </Button>
        <Button
          :class="[
            'w-full sm:w-auto',
            options.isDangerous
              ? 'bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white'
              : 'bg-primary hover:bg-primary-600 dark:bg-green-600 dark:hover:bg-green-700 text-white'
          ]"
          @click="confirm"
        >
          {{ options.confirmText }}
        </Button>
      </div>
    </div>
  </div>
</template>
