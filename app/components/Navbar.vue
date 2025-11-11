<template>
    <header
        class="fixed left-0 right-0 z-50 transition-all duration-300 ease-out"
        :class="[
            isHomepage
                ? isScrolled
                    ? 'top-0 bg-white/95 backdrop-blur-lg shadow-lg'
                    : 'top-5 bg-transparent'
                : 'top-0 bg-white/95 backdrop-blur-lg shadow-lg',
        ]"
    >
        <div
            ref="megaMenuContainer"
            class="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
        >
            <nav class="flex w-full items-center justify-between py-4 lg:py-5">
                <!-- Logo Section -->
                <NuxtLink
                    to="/"
                    class="flex items-center gap-2 sm:gap-3 group transition duration-300"
                    @click="emit('close-menu')"
                >
                    <div class="flex items-center gap-2 flex-shrink-0">
                        <NuxtImg
                            src="/logo1.avif"
                            alt="BKSDA Logo"
                            width="300"
                            height="300"
                            class="h-8 w-8 sm:h-10 sm:w-10 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <NuxtImg
                            src="/logo2.png"
                            alt="Kementerian LHK Logo"
                            width="300"
                            height="300"
                            class="h-8 w-auto sm:h-10 object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                    </div>
                    <div class="hidden sm:flex flex-col leading-tight">
                        <span
                            class="text-sm sm:text-base font-bold leading-none tracking-tight transition-colors duration-300"
                            :class="isScrolled ? 'text-black' : 'text-white'"
                        >
                            BKSDA Sumatera Selatan
                        </span>
                        <span
                            class="text-xs font-bold leading-none mt-1 transition-colors duration-300"
                            :class="
                                isScrolled
                                    ? 'text-emerald-600'
                                    : 'text-emerald-300'
                            "
                        >
                            Kementerian Kehutanan
                        </span>
                    </div>
                </NuxtLink>

                <!-- Action Buttons -->
                <div class="flex items-center gap-2 sm:gap-3">
                    <!-- Search Button -->
                    <button
                        type="button"
                        class="group cursor-pointer flex items-center justify-center rounded-lg border p-2 text-sm font-semibold shadow-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                        :class="
                            isScrolled
                                ? 'border-gray-300 bg-gray-100 text-gray-700 hover:border-emerald-400 hover:bg-gray-200 hover:text-emerald-600'
                                : 'border-white/30 bg-white/10 text-white hover:border-emerald-400 hover:bg-white/20 hover:text-emerald-300'
                        "
                        aria-label="Search"
                        @click="handleSearch"
                    >
                        <Search
                            class="h-4 w-4 transition-all duration-300 group-hover:scale-110"
                            aria-hidden="true"
                        />
                    </button>

                    <!-- Menu Button -->
                    <button
                        ref="menuTrigger"
                        type="button"
                        class="group cursor-pointer flex items-center gap-2 rounded-lg border px-3 py-2 sm:px-5 text-sm font-semibold shadow-sm transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                        :class="{
                            'border-emerald-400 bg-emerald-600 text-white hover:bg-emerald-700 hover:text-white shadow-lg shadow-emerald-600/50':
                                isOpen,
                            'border-gray-300 bg-gray-100 text-gray-700 hover:border-emerald-400 hover:bg-gray-200 hover:text-emerald-600':
                                !isOpen && isScrolled,
                            'border-white/30 bg-white/10 text-white hover:border-emerald-400 hover:bg-white/20 hover:text-emerald-300':
                                !isOpen && !isScrolled,
                        }"
                        aria-haspopup="true"
                        aria-controls="mega-menu"
                        :aria-expanded="isOpen"
                        @click.stop="emit('toggle-menu')"
                        @keydown.enter.prevent.stop="emit('toggle-menu')"
                        @keydown.space.prevent.stop="emit('toggle-menu')"
                    >
                        <AlignVerticalJustifyStart
                            class="h-4 w-4 transition-all duration-500 ease-out flex-shrink-0"
                            :class="{
                                'rotate-90 scale-110': isOpen,
                                'scale-100': !isOpen,
                            }"
                            aria-hidden="true"
                        />
                        <span
                            class="hidden sm:inline transition-all duration-500"
                            >{{ isOpen ? 'Tutup / Tekan Esc' : 'Menu' }}</span
                        >
                    </button>
                </div>
            </nav>
        </div>
    </header>
</template>

<script setup lang="ts">
import { AlignVerticalJustifyStart, Search } from 'lucide-vue-next';
import { ref } from 'vue';

const props = defineProps<{
    isOpen: boolean;
    isScrolled?: boolean;
    isHomepage?: boolean;
}>();

const emit = defineEmits<{
    'toggle-menu': [];
    'close-menu': [];
    'toggle-search': [];
}>();

const menuTrigger = ref<HTMLButtonElement | null>(null);

const handleSearch = () => {
    emit('toggle-search');
};

defineExpose({
    menuTrigger,
});
</script>
