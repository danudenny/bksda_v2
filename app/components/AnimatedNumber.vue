<template>
  <span ref="targetElement">{{ roundedOutput }}</span>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useTransition, useIntersectionObserver } from "@vueuse/core";

const props = defineProps({
  value: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    default: 1500,
  },
});

const targetElement = ref(null);
const isVisible = ref(false);

const source = computed(() => (isVisible.value ? props.value : 0));

const output = useTransition(source, {
  duration: props.duration,
  transition: (n) => 1 - Math.pow(1 - n, 3),
});

const roundedOutput = computed(() => Math.round(output.value));

useIntersectionObserver(
  targetElement,
  ([{ isIntersecting }], observerElement) => {
    if (isIntersecting) {
      isVisible.value = true;
      observerElement.unobserve(targetElement.value);
    }
  },
  {
    threshold: 0.5,
  },
);
</script>
