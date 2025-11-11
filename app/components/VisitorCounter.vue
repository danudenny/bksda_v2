<template>
    <div class="flex justify-center">
        <div
            class="inline-flex items-center gap-4 sm:gap-6 rounded-2xl bg-gradient-to-r from-emerald-900/40 via-teal-900/40 to-emerald-900/40 px-6 py-4 backdrop-blur-sm ring-1 ring-white/10"
        >
            <!-- Icon -->
            <div
                class="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/50 flex-shrink-0"
            >
                <Users class="h-5 w-5 text-white" />
            </div>
            <!-- Stats -->
            <div
                class="flex items-center gap-4 sm:gap-6 divide-x divide-white/10"
            >
                <!-- Today -->
                <div class="flex items-center gap-2">
                    <TrendingUp
                        class="h-4 w-4 text-emerald-400 hidden sm:block"
                    />
                    <div>
                        <p class="text-xs text-gray-400">Hari Ini</p>
                        <p class="text-lg font-bold text-white tabular-nums">
                            <AnimatedNumber :value="todayVisitors" />
                        </p>
                    </div>
                </div>
                <!-- Month -->
                <div class="flex items-center gap-2 pl-4 sm:pl-6">
                    <Calendar class="h-4 w-4 text-blue-400 hidden sm:block" />
                    <div>
                        <p class="text-xs text-gray-400">Bulan Ini</p>
                        <p class="text-lg font-bold text-white tabular-nums">
                            <AnimatedNumber :value="monthVisitors" />
                        </p>
                    </div>
                </div>
                <!-- Total -->
                <div class="flex items-center gap-2 pl-4 sm:pl-6">
                    <Eye class="h-4 w-4 text-purple-400 hidden sm:block" />
                    <div>
                        <p class="text-xs text-gray-400">Total</p>
                        <p class="text-lg font-bold text-white tabular-nums">
                            <AnimatedNumber :value="totalVisitors" />
                        </p>
                    </div>
                </div>
            </div>
            <!-- Live Indicator -->
            <div class="flex items-center gap-1.5 flex-shrink-0">
                <div class="relative flex h-2 w-2">
                    <span
                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
                    ></span>
                    <span
                        class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"
                    ></span>
                </div>
                <span
                    class="text-xs text-emerald-400 font-semibold hidden sm:inline"
                    >Live</span
                >
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Calendar, Eye, TrendingUp, Users } from 'lucide-vue-next';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import AnimatedNumber from './AnimatedNumber.vue';
const todayVisitors = ref(0);
const monthVisitors = ref(0);
const totalVisitors = ref(0);
let updateInterval: NodeJS.Timeout | null = null;
const fetchVisitorData = async () => {
    try {
        todayVisitors.value = Math.floor(Math.random() * 500) + 150;
        monthVisitors.value = Math.floor(Math.random() * 15000) + 5000;
        totalVisitors.value = Math.floor(Math.random() * 500000) + 100000;
    } catch (error) {
        console.error('Failed to fetch visitor data:', error);
    }
};
const startUpdating = () => {
    updateInterval = setInterval(() => {
        todayVisitors.value += Math.random() > 0.7 ? 1 : 0;
    }, 10000);
};
onMounted(async () => {
    await fetchVisitorData();
    startUpdating();
});
onBeforeUnmount(() => {
    if (updateInterval) {
        clearInterval(updateInterval);
    }
});
</script>
<style scoped>
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
.tabular-nums {
    font-variant-numeric: tabular-nums;
}
</style>
