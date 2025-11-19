<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import { Cookie, ShieldCheck, X } from 'lucide-vue-next'

// State untuk menyimpan preferensi cookie user
const cookieConsent = useCookie('cookie-consent', {
  default: () => ({
    necessary: true,
    analytics: false,
    marketing: false,
    responded: false // Menandakan user sudah memilih (Accept/Decline)
  }),
  watch: true,
  maxAge: 60 * 60 * 24 * 365 // 1 Tahun
})

const isVisible = ref(false)

// Tampilkan banner hanya jika user belum pernah merespon
onMounted(() => {
  if (!cookieConsent.value.responded) {
    // Delay sedikit agar animasi munculnya smooth
    setTimeout(() => {
      isVisible.value = true
    }, 1000)
  } else {
    // Jika sudah ada consent, jalankan script tracking (misal GA)
    initializeAnalytics()
  }
})

function acceptAll() {
  cookieConsent.value = {
    necessary: true,
    analytics: true,
    marketing: true,
    responded: true
  }
  isVisible.value = false
  initializeAnalytics()
}

function acceptNecessary() {
  cookieConsent.value = {
    necessary: true,
    analytics: false,
    marketing: false,
    responded: true
  }
  isVisible.value = false
}

function initializeAnalytics() {
  if (cookieConsent.value.analytics) {
    // CONTOH: Inisialisasi Google Analytics di sini
    // const config = useRuntimeConfig()
    // if (config.public.gtagId) {
    //   useHead({
    //     script: [
    //       {
    //         src: `https://www.googletagmanager.com/gtag/js?id=${config.public.gtagId}`,
    //         async: true,
    //       },
    //       {
    //         innerHTML: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${config.public.gtagId}');`
    //       }
    //     ]
    //   })
    //   console.log('Analytics Initialized')
    // }
  }
}
</script>

<template>
  <Transition
    enter-active-class="transform ease-out duration-300 transition"
    enter-from-class="translate-y-full opacity-0 sm:translate-y-10"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0 translate-y-10"
  >
    <div 
      v-if="isVisible" 
      class="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-5xl md:bottom-8"
    >
      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        
        <div class="flex-1 space-y-2">
          <div class="flex items-center gap-2 text-primary mb-2">
            <Cookie class="w-6 h-6" />
            <span class="font-bold text-lg text-gray-900 dark:text-white">Cookie Settings</span>
          </div>
          <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
          </p>
          <a href="/privacy-policy" class="text-xs text-primary hover:underline inline-flex items-center mt-2">
            Read Privacy Policy <ShieldCheck class="w-3 h-3 ml-1" />
          </a>
        </div>

        <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
          <Button variant="outline" @click="acceptNecessary" class="whitespace-nowrap">
            Necessary Only
          </Button>
          <Button @click="acceptAll" class="whitespace-nowrap bg-primary hover:bg-primary/90">
            Accept All
          </Button>
        </div>

        <!-- Close button (optional, acts as necessary only or dismiss) -->
        <button 
          @click="isVisible = false" 
          class="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 md:hidden"
        >
          <X class="w-4 h-4" />
        </button>

      </div>
    </div>
  </Transition>
</template>