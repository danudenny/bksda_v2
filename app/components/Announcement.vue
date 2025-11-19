<template>
    <section class="group relative bg-emerald-800 text-white">
        <transition
            mode="out-in"
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
        >
            <div v-if="!isExpanded" :key="1">
                <div
                    class="overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_10%,_black_90%,transparent_100%)]"
                >
                    <div
                        class="flex items-center animate-marquee-left py-4 sm:py-6"
                    >
                        <div
                            v-for="n in (announcements && announcements.length > 1 ? 2 : 1)"
                            :key="n"
                            class="flex flex-shrink-0 items-center"
                        >
                            <template
                                v-for="(item, index) in announcements"
                                :key="item.id"
                            >
                                <div
                                    @click="openAnnouncement(item)"
                                    class="flex flex-shrink-0 items-start px-6 sm:px-8 lg:px-12 transition-opacity duration-300 hover:opacity-80 cursor-pointer"
                                >
                                    <Megaphone
                                        class="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 mr-3 sm:mr-4 text-emerald-400 mt-0.5"
                                        aria-hidden="true"
                                    />
                                    <div class="flex flex-col">
                                        <div
                                            class="flex items-center gap-1.5 sm:gap-2 text-emerald-200"
                                            style="
                                                font-size: clamp(
                                                    0.625rem,
                                                    1vw,
                                                    0.75rem
                                                );
                                            "
                                        >
                                            <span>{{ item.date }}</span>
                                            <span aria-hidden="true"
                                                >&bull;</span
                                            >
                                            <span
                                                class="font-semibold uppercase tracking-wider"
                                                >{{ item.category.name }}</span
                                            >
                                        </div>
                                        <span
                                            class="font-semibold whitespace-nowrap text-white pt-1"
                                            style="
                                                font-size: clamp(
                                                    0.875rem,
                                                    1.5vw,
                                                    1.125rem
                                                );
                                            "
                                        >
                                            {{ item.title }}
                                        </span>
                                    </div>
                                </div>
                                <div
                                    v-if="index < announcements.length - 1"
                                    class="h-8 sm:h-12 w-px self-center bg-white/20"
                                    aria-hidden="true"
                                ></div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>

            <div
                v-else
                :key="2"
                class="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8"
            >
                <div class="mb-6 flex items-center justify-between">
                    <h2 class="text-2xl font-bold text-white">
                        Semua Pengumuman
                    </h2>
                    <button
                        @click="isExpanded = false"
                        class="flex cursor-pointer items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/20"
                    >
                        <X class="h-4 w-4" />
                        <span>Tutup</span>
                    </button>
                </div>
                <div class="space-y-5">
                    <div
                        v-for="item in announcements"
                        :key="item.id"
                        @click="openAnnouncement(item)"
                        class="block rounded-lg p-5 transition-colors duration-300 hover:bg-white/10 cursor-pointer"
                    >
                        <div
                            class="flex flex-col sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div>
                                <div
                                    class="flex items-center gap-2 text-xs text-emerald-200"
                                >
                                    <span
                                        class="font-semibold uppercase tracking-wider"
                                        >{{ item.category.name }}</span
                                    >
                                </div>
                                <span
                                    class="text-lg font-semibold whitespace-normal text-white pt-1"
                                >
                                    {{ item.title }}
                                </span>
                            </div>
                            <span
                                class="text-sm text-emerald-200 mt-2 sm:mt-0 sm:ml-4 flex-shrink-0"
                            >
                                {{ item.date }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <Teleport to="body">
            <transition
                enter-active-class="transition duration-300 ease-out"
                enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enter-to-class="opacity-100 translate-y-0 sm:scale-100"
                leave-active-class="transition duration-200 ease-in"
                leave-from-class="opacity-100 translate-y-0 sm:scale-100"
                leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
                <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
                    
                    <div @click="closeModal" class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"></div>

                    <div class="relative flex flex-col w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl ring-1 ring-white/10 overflow-hidden transform transition-all max-h-[85vh]">
                        
                        <div class="relative bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-8 sm:px-8 sm:py-10 shrink-0">
                            <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(#fff 1px, transparent 1px); background-size: 20px 20px;"></div>
                            
                            <div class="relative flex items-start gap-4">
                                <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm text-white shadow-inner">
                                    <Megaphone class="h-6 w-6" />
                                </div>
                                
                                <div class="flex-1 min-w-0 text-white">
                                    <div class="flex items-center gap-2 mb-1">
                                        <span class="inline-flex items-center rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium text-emerald-50 ring-1 ring-inset ring-white/30">
                                            {{ selectedAnnouncement?.category?.name || 'Pengumuman' }}
                                        </span>
                                        <span class="text-xs text-emerald-100 opacity-80">
                                            {{ formatDate(selectedAnnouncement?.createdAt) }}
                                        </span>
                                    </div>
                                    <h2 class="text-2xl font-bold leading-tight tracking-tight text-white">
                                        {{ selectedAnnouncement?.title }}
                                    </h2>
                                </div>

                                <button 
                                    @click="closeModal"
                                    class="absolute -top-4 -right-2 p-2 text-emerald-100 hover:text-white hover:bg-white/10 rounded-full transition-colors focus:outline-none"
                                >
                                    <X class="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        <div class="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar bg-white dark:bg-gray-900">
                            <div 
                                class="prose prose-lg prose-emerald max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-emerald-600 hover:prose-a:text-emerald-500 prose-img:rounded-xl"
                                v-html="selectedAnnouncement?.content"
                            ></div>
                        </div>

                        <div class="flex items-center justify-end gap-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 px-6 py-4 shrink-0">
                            <button 
                                @click="closeModal"
                                class="inline-flex justify-center rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:w-auto transition-colors dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:hover:bg-gray-700"
                            >
                                Tutup
                            </button>
                            <button 
                                v-if="selectedAnnouncement?.fileUrl"
                                class="inline-flex justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-colors"
                            >
                                Download Lampiran
                            </button>
                        </div>

                    </div>
                </div>
            </transition>
        </Teleport>
    </section>
    <div class="relative z-10 flex justify-center">
        <button
            @click="toggleExpanded"
            class="flex cursor-pointer items-center gap-2 rounded-b-lg bg-emerald-700 px-3 py-1.5 sm:px-4 sm:py-2 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-emerald-600 hover:shadow-xl"
            style="font-size: clamp(0.75rem, 1.25vw, 0.875rem)"
        >
            <ArrowDownCircleIcon class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>Lihat Semua Pengumuman</span>
        </button>
    </div>
</template>

<script setup lang="ts">
import { ArrowDownCircleIcon, Megaphone, X } from 'lucide-vue-next';
import { ref } from 'vue';
import { format } from 'date-fns';
import id from 'date-fns/locale/id';


const isExpanded = ref(false);

const toggleExpanded = () => {
    isExpanded.value = !isExpanded.value;
};

const isModalOpen = ref(false);
const selectedAnnouncement = ref<Announcement | null>(null);

const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return format(new Date(dateString), 'dd MMMM yyyy', { locale: id });
};

function openAnnouncement(announcement: Announcement) {
    selectedAnnouncement.value = announcement;
    isModalOpen.value = true;
}

function closeModal() {
    isModalOpen.value = false;
}

type Announcement = {
    id: string;
    title: string;
    date: string;
    category: { name: string };
    content: string;
};

const { data: announcements, pending, error } = useAsyncData<Announcement[]>('announcements-marquee', () => 
    $fetch('/api/announcements?limit=10').then(res => res.data)
);
</script>

<style>
/* CSS Marquee (Tidak berubah) */
@keyframes marquee-left {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(-50%);
    }
}

.animate-marquee-left {
    animation: marquee-left 60s linear infinite;
}

.group:hover .animate-marquee-left {
    animation-play-state: paused;
}

.custom-scrollbar::-webkit-scrollbar {
    width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #cbd5e1; /* gray-300 */
    border-radius: 20px;
    border: 3px solid transparent;
    background-clip: content-box;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #475569; /* gray-600 */
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #94a3b8; /* gray-400 */
}
</style>
