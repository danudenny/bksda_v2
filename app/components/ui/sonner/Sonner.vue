<script lang="ts" setup>
import type { ToasterProps } from "vue-sonner"
import { Toaster as Sonner } from "vue-sonner"

const props = defineProps<ToasterProps>()
</script>

<template>
  <Sonner
    class="toaster group"
    v-bind="props"
    :toast-options="{
      class: 'sonner-toast',
      classes: {
        success: 'success',
        error: 'error',
        warning: 'warning',
        info: 'info',
      }
    }"
  />
</template>
