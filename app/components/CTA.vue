<template>
    <section
        class="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white py-16 sm:py-24 lg:py-32"
    >
        <!-- Decorative background elements -->
        <div class="absolute inset-0 -z-10">
            <div
                class="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-emerald-100/50 blur-3xl filter"
            ></div>
            <div
                class="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-teal-100/50 blur-3xl filter"
            ></div>
        </div>

        <!-- Decorative pattern -->
        <div class="absolute inset-0 -z-10 opacity-5">
            <svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern
                        id="grid"
                        width="32"
                        height="32"
                        patternUnits="userSpaceOnUse"
                    >
                        <path
                            d="M0 32V0h32"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="0.5"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
        </div>

        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <!-- Header Section -->
            <div class="mx-auto max-w-3xl text-center">
                <div
                    class="inline-flex items-center gap-2 rounded-full bg-emerald-600/10 px-4 py-2 ring-1 ring-inset ring-emerald-600/20"
                >
                    <svg
                        class="h-4 w-4 text-emerald-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                        />
                    </svg>
                    <span class="text-sm font-semibold text-emerald-700">
                        Layanan Perizinan
                    </span>
                </div>

                <h2
                    class="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
                >
                    Pelayanan Perizinan
                    <span
                        class="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
                        >Konservasi</span
                    >
                </h2>
                <p class="mt-4 text-lg leading-8 text-slate-600">
                    Jelajahi berbagai prosedur perizinan resmi kami untuk
                    kegiatan di kawasan konservasi, Perizinan Tumbuhan dan Satwa
                    Liar, dan Perizinan Jasa Lingkungan dan Wisata Alam.
                </p>
            </div>

            <!-- Services Grid -->
            <div
                class="mx-auto mt-16 grid max-w-none grid-cols-1 gap-8 lg:grid-cols-3"
            >
                <article
                    v-for="(service, index) in services"
                    :key="service.id"
                    class="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-900/5 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-2"
                >
                    <!-- Image Container with Gradient Overlay -->
                    <div class="relative h-64 overflow-hidden">
                        <div
                            class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent z-10"
                        ></div>
                        <img
                            :src="service.imageUrl"
                            :alt="`Gambar untuk ${service.title}`"
                            class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        <!-- Service Number Badge -->
                        <div
                            class="absolute top-4 right-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg ring-1 ring-slate-900/5"
                        >
                            <span
                                class="text-lg font-bold bg-gradient-to-br from-emerald-600 to-teal-600 bg-clip-text text-transparent"
                            >
                                0{{ index + 1 }}
                            </span>
                        </div>

                        <!-- Icon Badge -->
                        <div
                            class="absolute top-4 left-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg transition-transform duration-300 group-hover:scale-110"
                        >
                            <component
                                :is="service.icon"
                                class="h-6 w-6 text-white"
                            />
                        </div>
                    </div>

                    <!-- Content -->
                    <div class="flex flex-1 flex-col p-8">
                        <h3
                            class="text-2xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors"
                        >
                            {{ service.title }}
                        </h3>

                        <p
                            class="mt-3 flex-1 text-base leading-7 text-slate-600"
                        >
                            {{ service.description }}
                        </p>

                        <!-- CTA Button -->
                        <div class="mt-8">
                            <NuxtLink
                                :to="service.link"
                                class="group/btn flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/40 hover:scale-105"
                            >
                                <span>Lihat Prosedur</span>
                                <ArrowUpRightFromCircle
                                    class="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"
                                />
                            </NuxtLink>
                        </div>
                    </div>

                    <!-- Hover indicator -->
                    <div
                        class="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                    ></div>
                </article>
            </div>

            <!-- Additional Info Section -->
            <div
                class="mt-16 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 p-8 ring-1 ring-emerald-100"
            >
                <div
                    class="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left"
                >
                    <div
                        class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg"
                    >
                        <svg
                            class="h-8 w-8 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                            />
                        </svg>
                    </div>
                    <div class="flex-1">
                        <h3 class="text-lg font-semibold text-slate-900">
                            Butuh Bantuan?
                        </h3>
                        <p class="mt-1 text-sm text-slate-600">
                            Tim kami siap membantu Anda dalam proses pengajuan
                            perizinan. Hubungi kami untuk informasi lebih
                            lanjut.
                        </p>
                    </div>
                    <NuxtLink
                        to="/kontak"
                        class="flex-shrink-0 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-emerald-700 shadow-md transition-all duration-300 hover:bg-emerald-50 hover:shadow-lg"
                    >
                        Hubungi Kami
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import {
    ArrowUpRightFromCircle,
    FileCheck,
    Mountain,
    Trees,
} from 'lucide-vue-next';

const services = [
    {
        id: 'simaksi',
        title: 'Perizinan Masuk Kawasan (Simaksi)',
        description:
            'Surat Izin Masuk Kawasan Konservasi untuk pendakian, penelitian, atau perkemahan.',
        link: '/layanan/simaksi',
        imageUrl: '/cta.avif',
        icon: Mountain,
        features: [
            'Pendakian gunung',
            'Penelitian ilmiah',
            'Kegiatan perkemahan',
        ],
    },
    {
        id: 'tsl',
        title: 'Perizinan Tumbuhan dan Satwa Liar',
        description:
            'Prosedur untuk perizinan tumbuhan dan satwa liar, termasuk penangkaran dan peredaran.',
        link: '/layanan/tsl',
        imageUrl: '/fokus_konservasi/harimau.avif',
        icon: Trees,
        features: ['Penangkaran satwa', 'Peredaran TSL', 'Pemanfaatan hasil'],
    },
    {
        id: 'wisata',
        title: 'Perizinan Jasa Lingkungan dan Wisata Alam',
        description:
            'Prosedur untuk penyelenggaraan kegiatan wisata alam di dalam kawasan konservasi.',
        link: '/layanan/wisata',
        imageUrl: '/kws_konservasi/gnmaras.avif',
        icon: FileCheck,
        features: ['Wisata alam', 'Aktivitas outdoor', 'Event & gathering'],
    },
];
</script>
