<script setup lang="ts">
import { Toaster } from '~/components/ui/sonner';
</script>

<template>
  <div class="min-h-screen bg-background font-sans antialiased">
    <Toaster />
    <slot />
  </div>
</template>
