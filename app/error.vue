<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8"
  >
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"
      ></div>
      <div
        class="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl animate-pulse delay-1000"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-500"
      ></div>
    </div>

    <div class="absolute inset-0 opacity-5">
      <svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="error-grid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 32V0h32"
              fill="none"
              stroke="currentColor"
              stroke-width="0.5"
              class="text-white"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#error-grid)" />
      </svg>
    </div>

    <div class="relative z-10 max-w-2xl w-full text-center">
      <div class="mb-8">
        <h1
          class="font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 animate-gradient-x"
          style="font-size: clamp(4rem, 15vw, 10rem); line-height: 1"
        >
          {{ errorCode }}
        </h1>
      </div>

      <div class="flex justify-center mb-6">
        <div class="relative">
          <div
            class="absolute inset-0 bg-emerald-500/30 rounded-full blur-xl animate-pulse"
          ></div>
          <div
            class="relative flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 shadow-2xl shadow-emerald-500/50"
          >
            <AlertTriangle
              v-if="errorCode === 404"
              class="h-12 w-12 text-white animate-bounce"
            />
            <AlertCircle v-else class="h-12 w-12 text-white animate-bounce" />
          </div>
        </div>
      </div>

      <h2
        class="font-bold text-white mb-4"
        style="font-size: clamp(1.5rem, 4vw, 2.5rem)"
      >
        {{ errorTitle }}
      </h2>

      <p
        class="text-gray-300 mb-8 max-w-md mx-auto"
        style="font-size: clamp(0.875rem, 1.5vw, 1.125rem)"
      >
        {{ errorMessage }}
      </p>

      <div
        class="mb-8 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 inline-block"
      >
        <div class="flex items-center gap-3">
          <div class="relative flex h-3 w-3">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
            ></span>
            <span
              class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"
            ></span>
          </div>
          <p class="text-sm text-gray-300">
            Mengalihkan ke halaman utama dalam
            <span class="font-bold text-emerald-400 text-lg mx-1">{{
              countdown
            }}</span>
            detik...
          </p>
        </div>

        <div class="mt-3 w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000 ease-linear"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <NuxtLink
          to="/"
          class="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/50 hover:scale-105"
          style="font-size: clamp(0.875rem, 1.5vw, 1rem)"
        >
          <Home class="h-5 w-5" />
          <span>Kembali ke Beranda</span>
          <ArrowRight
            class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </NuxtLink>

        <button
          @click="goBack"
          class="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-white/20 text-white font-semibold backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/40"
          style="font-size: clamp(0.875rem, 1.5vw, 1rem)"
        >
          <ArrowLeft
            class="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
          />
          <span>Halaman Sebelumnya</span>
        </button>
      </div>

      <p class="mt-8 text-sm text-gray-400">
        Jika masalah berlanjut, silakan
        <NuxtLink
          to="/kontak"
          class="text-emerald-400 hover:text-emerald-300 underline transition-colors duration-200"
        >
          hubungi kami
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import {
  AlertTriangle,
  AlertCircle,
  Home,
  ArrowRight,
  ArrowLeft,
} from "lucide-vue-next";

const props = defineProps({
  error: Object as () => any,
});

const countdown = ref(3);
const progress = ref(100);
let countdownInterval: NodeJS.Timeout | null = null;

const errorCode = computed(() => {
  return props.error?.statusCode || 404;
});

const errorTitle = computed(() => {
  switch (errorCode.value) {
    case 404:
      return "Halaman Tidak Ditemukan";
    case 500:
      return "Terjadi Kesalahan Server";
    case 403:
      return "Akses Ditolak";
    default:
      return "Terjadi Kesalahan";
  }
});

const errorMessage = computed(() => {
  switch (errorCode.value) {
    case 404:
      return "Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman telah dipindahkan atau dihapus.";
    case 500:
      return "Maaf, terjadi kesalahan pada server kami. Tim kami sedang menangani masalah ini.";
    case 403:
      return "Maaf, Anda tidak memiliki izin untuk mengakses halaman ini.";
    default:
      return "Terjadi kesalahan yang tidak terduga. Silakan coba lagi nanti.";
  }
});

const goBack = () => {
  window.history.back();
};

const startCountdown = () => {
  countdownInterval = setInterval(() => {
    countdown.value--;
    progress.value = (countdown.value / 3) * 100;

    if (countdown.value <= 0) {
      navigateTo("/");
    }
  }, 1000);
};

onMounted(() => {
  startCountdown();
});

onBeforeUnmount(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
});
</script>

<style scoped>
@keyframes gradient-x {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 3s ease infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.delay-500 {
  animation-delay: 500ms;
}

.delay-1000 {
  animation-delay: 1000ms;
}

@keyframes ping {
  75%,
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

.animate-ping {
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}
</style>
