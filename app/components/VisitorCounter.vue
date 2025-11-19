<template>
    <div class="flex justify-center w-full">
        <div class="group relative inline-flex items-center rounded-full bg-gray-900/80 p-1.5 pr-6 ring-1 ring-white/10 backdrop-blur-md hover:bg-gray-900/90">
            
            <div class="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 mr-3">
                <div class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </div>
                <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Live</span>
            </div>

            <div class="flex items-center gap-6 text-sm">
                
                <div class="flex flex-col items-start">
                    <span class="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">Hari Ini</span>
                    <div class="flex items-baseline gap-1.5">
                        <span class="font-bold text-white tabular-nums">
                            <AnimatedNumber :value="stats.today.views" />
                        </span>
                        <span class="text-[10px] text-gray-500">
                            (<AnimatedNumber :value="stats.today.visitors" /> viewers)
                        </span>
                    </div>
                </div>

                <div class="h-4 w-px bg-white/10"></div>

                <div class="flex flex-col items-start">
                    <span class="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">Bulan Ini</span>
                    <div class="flex items-baseline gap-1.5">
                        <span class="font-bold text-emerald-200 tabular-nums">
                            <AnimatedNumber :value="stats.month.views" />
                        </span>
                        <span class="text-[10px] text-emerald-500/60">
                            (<AnimatedNumber :value="stats.month.visitors" /> viewers)
                        </span>
                    </div>
                </div>

                <div class="h-4 w-px bg-white/10"></div>

                <div class="flex flex-col items-start">
                    <span class="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">Total</span>
                    <div class="flex items-baseline gap-1.5">
                        <span class="font-bold text-gray-300 tabular-nums">
                            <AnimatedNumber :value="stats.total.views" />
                        </span>
                         <span class="hidden sm:inline text-[10px] text-gray-600">
                            (<AnimatedNumber :value="stats.total.visitors" /> viewers)
                        </span>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import AnimatedNumber from './AnimatedNumber.vue';

const route = useRoute();

const stats = reactive({
    today: { visitors: 0, views: 0 },
    month: { visitors: 0, views: 0 },
    total: { visitors: 0, views: 0 }
});

const fetchVisitorData = async () => {
    try {
        const response: any = await $fetch(`/api/visitors/stats?t=${Date.now()}`);
        if (response.success) {
            stats.today = response.data.today;
            stats.month = response.data.month;
            stats.total = response.data.total;
        }
    } catch (error) {
        console.error('Failed to fetch stats:', error);
    }
};

onMounted(async () => {
    // 1. Track
    try {
        await $fetch('/api/visitors/track', { 
            method: 'POST',
            body: {
                path: route.path,
                postId: route.params.id || null 
            }
        });
    } catch (e) {}

    // 2. Fetch Stats
    await fetchVisitorData();
});
</script>