import { ref, computed } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

export function useMotionAnimation() {
  const isVisible = ref(false);
  const element = ref<HTMLElement | null>(null);

  useIntersectionObserver(
    element,
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        isVisible.value = true;
      }
    },
    {
      threshold: 0.1,
    }
  );

  const fadeInUpAnimation = computed(() => ({
    initial: { opacity: 0, y: 20 },
    animate: isVisible.value
      ? { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
      : { opacity: 0, y: 20 },
  }));

  const fadeInDownAnimation = computed(() => ({
    initial: { opacity: 0, y: -20 },
    animate: isVisible.value
      ? { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
      : { opacity: 0, y: -20 },
  }));

  const scaleInAnimation = computed(() => ({
    initial: { opacity: 0, scale: 0.9 },
    animate: isVisible.value
      ? {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.6, ease: "easeOut" },
        }
      : { opacity: 0, scale: 0.9 },
  }));

  const slideInLeftAnimation = computed(() => ({
    initial: { opacity: 0, x: -30 },
    animate: isVisible.value
      ? { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
      : { opacity: 0, x: -30 },
  }));

  const slideInRightAnimation = computed(() => ({
    initial: { opacity: 0, x: 30 },
    animate: isVisible.value
      ? { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
      : { opacity: 0, x: 30 },
  }));

  return {
    element,
    isVisible,
    fadeInUpAnimation,
    fadeInDownAnimation,
    scaleInAnimation,
    slideInLeftAnimation,
    slideInRightAnimation,
  };
}
