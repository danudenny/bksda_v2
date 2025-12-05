<template>
    <section
        class="relative overflow-hidden bg-gradient-to-b from-emerald-50 via-emerald-50/30 to-white py-16 sm:py-24"
    >
        <!-- Background Decorations -->
        <div class="absolute inset-0 -z-10 pointer-events-none">
            <div
                class="absolute left-0 top-0 h-96 w-96 rounded-full bg-emerald-100/50 blur-3xl filter"
            ></div>
            <div
                class="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-teal-100/50 blur-3xl filter"
            ></div>
            <div
                class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full border border-emerald-900/5"
            ></div>
            <div
                class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full border border-emerald-900/5"
            ></div>
        </div>

        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
                class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
            >
                <!-- Left Column: Content -->
                <div class="text-left">
                    <div
                        class="inline-flex items-center gap-2 rounded-full bg-emerald-600/10 px-3 py-1 text-sm font-semibold text-emerald-600 ring-1 ring-inset ring-emerald-600/20 mb-6"
                    >
                        <span class="relative flex h-2 w-2">
                            <span
                                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
                            ></span>
                            <span
                                class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"
                            ></span>
                        </span>
                        Tentang BKSDA Sumsel
                    </div>

                    <h2
                        class="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-6"
                    >
                        Menjaga Harmoni Alam, <br />
                        <span class="text-emerald-600"
                            >Melestarikan Kehidupan</span
                        >
                    </h2>

                    <div
                        class="space-y-6 text-lg text-slate-600 leading-relaxed"
                    >
                        <p>
                            Balai Konservasi Sumber Daya Alam (BKSDA) Sumatera
                            Selatan hadir sebagai garda terdepan dalam menjaga
                            kekayaan hayati bumi Sriwijaya. Kami berdedikasi
                            untuk melindungi kawasan konservasi, melestarikan
                            satwa liar, dan memberdayakan masyarakat sekitar
                            hutan.
                        </p>
                        <p>
                            Dari harimau sumatera yang megah hingga gajah
                            sumatera yang bijaksana, kami memastikan setiap
                            makhluk hidup memiliki tempat yang aman untuk
                            berkembang biak demi keseimbangan ekosistem masa
                            depan.
                        </p>
                    </div>

                    <!-- Stats / Features Grid -->
                    <div class="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div
                            v-for="stat in stats"
                            :key="stat.label"
                            class="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-emerald-100 shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            <component
                                :is="stat.icon"
                                class="h-8 w-8 text-emerald-600 mb-3"
                            />
                            <div class="font-bold text-2xl text-slate-900">
                                {{ stat.value }}
                            </div>
                            <div class="text-sm text-slate-600 font-medium">
                                {{ stat.label }}
                            </div>
                        </div>
                    </div>

                    <div class="mt-10 flex flex-col sm:flex-row gap-4">
                        <NuxtLink
                            to="/tentang"
                            class="inline-flex justify-center items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 hover:shadow-emerald-600/30 transition-all duration-300 hover:-translate-y-0.5"
                        >
                            Profil BKSDA Sumatera Selatan
                            <ArrowRight class="h-4 w-4" />
                        </NuxtLink>
                    </div>
                </div>

                <!-- Right Column: Map -->
                <div class="relative lg:h-[700px] flex flex-col">
                    <div
                        class="absolute -inset-4 bg-linear-to-r from-emerald-100 to-teal-100 rounded-[2.5rem] -z-10 blur-2xl opacity-60"
                    ></div>

                    <div
                        class="relative flex-1 w-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-900/5 bg-white"
                    >
                        <ClientOnly>
                            <KawasanMap :disable-popup="false" />
                            <template #fallback>
                                <div
                                    class="w-full h-full flex flex-col items-center justify-center bg-slate-50"
                                >
                                    <div
                                        class="h-10 w-10 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent"
                                    ></div>
                                    <p
                                        class="mt-4 text-sm font-medium text-slate-500"
                                    >
                                        Memuat Peta Kawasan...
                                    </p>
                                </div>
                            </template>
                        </ClientOnly>

                        <!-- Map Overlay Info -->
                        <div
                            class="absolute bottom-6 left-6 right-6 z-400 pointer-events-none"
                        >
                            <div
                                class="bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/50 flex items-start gap-4 pointer-events-auto"
                            >
                                <div
                                    class="p-2.5 bg-emerald-100 rounded-lg shrink-0"
                                >
                                    <Map class="h-6 w-6 text-emerald-600" />
                                </div>
                                <div>
                                    <h4
                                        class="font-semibold text-slate-900 text-sm"
                                    >
                                        Peta Persebaran
                                    </h4>
                                    <p
                                        class="text-xs text-slate-600 mt-1 leading-relaxed"
                                    >
                                        Klik pada marker di peta untuk melihat
                                        detail informasi setiap kawasan
                                        konservasi yang kami kelola.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ArrowRight, Camera, Map, Mountain, Shield } from 'lucide-vue-next';

const stats = [
    {
        label: 'Taman Nasional',
        value: '1',
        icon: Mountain,
    },
    {
        label: 'Taman Wisata Alam',
        value: '4',
        icon: Camera,
    },
    {
        label: 'Suaka Margasatwa',
        value: '6',
        icon: Shield,
    },
];
</script>

<style scoped>
/* Custom animations if needed */
</style>
