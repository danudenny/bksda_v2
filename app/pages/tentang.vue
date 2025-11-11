<template>
    <NuxtLayout name="detail">
        <template #breadcrumb>
            <span class="text-white">Tentang Kami</span>
        </template>

        <template #header>
            <h1 class="text-3xl font-bold sm:text-4xl lg:text-5xl">
                Tentang Kami
            </h1>
        </template>

        <template #description>
            <p class="mt-4 text-lg text-emerald-100 sm:text-xl">
                Balai Konservasi Sumber Daya Alam Sumatera Selatan
            </p>
        </template>

        <!-- Main Content -->
        <div class="space-y-8">
            <!-- Introduction Section -->
            <section
                class="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5 sm:p-8"
            >
                <div class="prose prose-lg max-w-none">
                    <p class="text-lg leading-relaxed text-gray-700">
                        Kawasan konservasi terbagi atas kawasan suaka alam,
                        kawasan pelestarian alam, dan taman buru. Dalam
                        pengelolaanya, kawasan konservasi mempunyai fungsi
                        perlindungan sistem penyangga kehidupan, pengawetan
                        keanekaragaman jenis tumbuhan dan satwa, serta
                        pemanfaatan secara lestari sumber daya alam hayati dan
                        ekosistemnya.
                    </p>

                    <p class="mt-6 text-lg leading-relaxed text-gray-700">
                        Balai Konservasi Sumber Daya Alam (BKSDA) Sumatera
                        Selatan mengelola
                        <strong class="text-emerald-600"
                            >7 kawasan suaka alam</strong
                        >, yang terdiri dari 6 Suaka Margasatwa, serta
                        <strong class="text-emerald-600"
                            >4 kawasan pelestarian alam</strong
                        >, yang terdiri dari 1 Taman Nasional dan 4 Taman Wisata
                        Alam. Kesebelas kawasan tersebut terletak di Provinsi
                        Sumatera Selatan dan Provinsi Kepulauan Bangka Belitung.
                    </p>
                </div>
            </section>

            <!-- Organization Structure -->
            <section
                class="rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 p-6 shadow-lg ring-1 ring-emerald-100 sm:p-8"
            >
                <h2
                    class="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900"
                >
                    <div
                        class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600"
                    >
                        <svg
                            class="h-6 w-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                            />
                        </svg>
                    </div>
                    Struktur Organisasi Wilayah
                </h2>

                <div class="prose prose-lg max-w-none">
                    <p class="text-gray-700">
                        Wilayah kerja pengelolaan kawasan konservasi di BKSDA
                        Sumatera Selatan dibagi menjadi
                        <strong class="text-emerald-700"
                            >3 (tiga) Seksi Konservasi Wilayah (SKW)</strong
                        >
                        yaitu SKW I di Sekayu, SKW II di Lahat, dan SKW III di
                        Baturaja. Dalam rangka optimalisasi dan efektivitas
                        pengelolaan kawasan konservasi pada masing-masing SKW
                        dibagi menjadi beberapa Resor Konservasi Wilayah (RKW).
                    </p>
                </div>
            </section>

            <!-- SKW Details -->
            <div class="space-y-6">
                <!-- SKW I Sekayu -->
                <div
                    class="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5"
                >
                    <div
                        class="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4"
                    >
                        <h3 class="text-xl font-bold text-white">
                            Seksi Konservasi Wilayah (SKW) I Sekayu
                        </h3>
                    </div>
                    <div class="p-6">
                        <p class="mb-4 text-gray-700">
                            Terdiri dari
                            <strong class="text-emerald-600">5 (lima)</strong>
                            Resor Konservasi Wilayah (RKW):
                        </p>
                        <ul class="space-y-2">
                            <li
                                class="flex items-start gap-3 rounded-lg bg-emerald-50 p-3"
                            >
                                <span
                                    class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white"
                                    >I</span
                                >
                                <span class="text-gray-700"
                                    >RKW I Eksitu di Kota Palembang</span
                                >
                            </li>
                            <li
                                class="flex items-start gap-3 rounded-lg bg-emerald-50 p-3"
                            >
                                <span
                                    class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white"
                                    >II</span
                                >
                                <span class="text-gray-700">RKW II Dangku</span>
                            </li>
                            <li
                                class="flex items-start gap-3 rounded-lg bg-emerald-50 p-3"
                            >
                                <span
                                    class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white"
                                    >III</span
                                >
                                <span class="text-gray-700"
                                    >RKW III Dangku</span
                                >
                            </li>
                            <li
                                class="flex items-start gap-3 rounded-lg bg-emerald-50 p-3"
                            >
                                <span
                                    class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white"
                                    >IV</span
                                >
                                <span class="text-gray-700">RKW IV Dangku</span>
                            </li>
                            <li
                                class="flex items-start gap-3 rounded-lg bg-emerald-50 p-3"
                            >
                                <span
                                    class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white"
                                    >V</span
                                >
                                <span class="text-gray-700"
                                    >RKW V Bentayan</span
                                >
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- SKW II Lahat -->
                <div
                    class="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5"
                >
                    <div
                        class="bg-gradient-to-r from-teal-600 to-emerald-600 px-6 py-4"
                    >
                        <h3 class="text-xl font-bold text-white">
                            Seksi Konservasi Wilayah (SKW) II Lahat
                        </h3>
                    </div>
                    <div class="p-6">
                        <p class="mb-4 text-gray-700">
                            Terdiri dari
                            <strong class="text-teal-600">6 (enam)</strong>
                            Resor Konservasi Wilayah (RKW):
                        </p>
                        <ul class="space-y-2">
                            <li
                                class="flex items-start gap-3 rounded-lg bg-teal-50 p-3"
                            >
                                <span
                                    class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white"
                                    >VI</span
                                >
                                <span class="text-gray-700">RKW VI Gumai</span>
                            </li>
                            <li
                                class="flex items-start gap-3 rounded-lg bg-teal-50 p-3"
                            >
                                <span
                                    class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white"
                                    >VII</span
                                >
                                <span class="text-gray-700">RKW VII Gumai</span>
                            </li>
                            <li
                                class="flex items-start gap-3 rounded-lg bg-teal-50 p-3"
                            >
                                <span
                                    class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white"
                                    >VIII</span
                                >
                                <span class="text-gray-700"
                                    >RKW VIII Gumai</span
                                >
                            </li>
                            <li
                                class="flex items-start gap-3 rounded-lg bg-teal-50 p-3"
                            >
                                <span
                                    class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white"
                                    >IX</span
                                >
                                <span class="text-gray-700"
                                    >RKW IX Isau-Isau</span
                                >
                            </li>
                            <li
                                class="flex items-start gap-3 rounded-lg bg-teal-50 p-3"
                            >
                                <span
                                    class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white"
                                    >X</span
                                >
                                <span class="text-gray-700"
                                    >RKW X Isau-Isau</span
                                >
                            </li>
                            <li
                                class="flex items-start gap-3 rounded-lg bg-teal-50 p-3"
                            >
                                <span
                                    class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white"
                                    >XI</span
                                >
                                <span class="text-gray-700"
                                    >RKW XI PLG Bukit Serelo</span
                                >
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- SKW III Baturaja -->
                <div
                    class="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5"
                >
                    <div
                        class="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4"
                    >
                        <h3 class="text-xl font-bold text-white">
                            Seksi Konservasi Wilayah (SKW) III Baturaja
                        </h3>
                    </div>
                    <div class="p-6">
                        <p class="mb-4 text-gray-700">
                            Terdiri dari
                            <strong class="text-emerald-600"
                                >10 (sepuluh)</strong
                            >
                            Resor Konservasi Wilayah (RKW):
                        </p>
                        <ul class="space-y-2">
                            <li
                                class="flex items-start gap-3 rounded-lg bg-emerald-50 p-3"
                            >
                                <span
                                    class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white"
                                    >XII</span
                                >
                                <span class="text-gray-700"
                                    >RKW XII Eksitu di Kota Kayu Agung</span
                                >
                            </li>
                            <li
                                class="flex items-start gap-3 rounded-lg bg-emerald-50 p-3"
                            >
                                <span
                                    class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white"
                                    >XIII</span
                                >
                                <span class="text-gray-700"
                                    >RKW XIII Eksitu di Kota Tanjung
                                    Pandan</span
                                >
                            </li>
                            <li
                                class="flex items-start gap-3 rounded-lg bg-emerald-50 p-3"
                            >
                                <span
                                    class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white"
                                    >XIV</span
                                >
                                <span class="text-gray-700"
                                    >RKW XIV Gunung Raya</span
                                >
                            </li>
                            <li
                                class="flex items-start gap-3 rounded-lg bg-emerald-50 p-3"
                            >
                                <span
                                    class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white"
                                    >XV</span
                                >
                                <span class="text-gray-700"
                                    >RKW XV Gunung Raya</span
                                >
                            </li>
                            <li
                                class="flex items-start gap-3 rounded-lg bg-emerald-50 p-3"
                            >
                                <span
                                    class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white"
                                    >XVI</span
                                >
                                <span class="text-gray-700"
                                    >RKW XVI Padang Sugihan</span
                                >
                            </li>
                            <li
                                class="flex items-start gap-3 rounded-lg bg-emerald-50 p-3"
                            >
                                <span
                                    class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white"
                                    >XVII</span
                                >
                                <span class="text-gray-700"
                                    >RKW XVII Padang Sugihan</span
                                >
                            </li>
                            <li
                                class="flex items-start gap-3 rounded-lg bg-emerald-50 p-3"
                            >
                                <span
                                    class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white"
                                    >XIX</span
                                >
                                <span class="text-gray-700"
                                    >RKW XIX Maras I</span
                                >
                            </li>
                            <li
                                class="flex items-start gap-3 rounded-lg bg-emerald-50 p-3"
                            >
                                <span
                                    class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white"
                                    >XX</span
                                >
                                <span class="text-gray-700"
                                    >RKW XX Maras II</span
                                >
                            </li>
                            <li
                                class="flex items-start gap-3 rounded-lg bg-emerald-50 p-3"
                            >
                                <span
                                    class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white"
                                    >XXI</span
                                >
                                <span class="text-gray-700"
                                    >RKW XXI Permisan</span
                                >
                            </li>
                            <li
                                class="flex items-start gap-3 rounded-lg bg-emerald-50 p-3"
                            >
                                <span
                                    class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white"
                                    >XXII</span
                                >
                                <span class="text-gray-700"
                                    >RKW XXII Jering Menduyung</span
                                >
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Summary Stats -->
            <div
                class="grid gap-6 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 p-6 sm:grid-cols-3 sm:p-8"
            >
                <div class="text-center">
                    <div class="text-4xl font-bold text-white">3</div>
                    <div class="mt-2 text-sm font-medium text-emerald-100">
                        Seksi Konservasi Wilayah
                    </div>
                </div>
                <div class="text-center">
                    <div class="text-4xl font-bold text-white">21</div>
                    <div class="mt-2 text-sm font-medium text-emerald-100">
                        Resor Konservasi Wilayah
                    </div>
                </div>
                <div class="text-center">
                    <div class="text-4xl font-bold text-white">11</div>
                    <div class="mt-2 text-sm font-medium text-emerald-100">
                        Kawasan Konservasi
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
useSeoMeta({
    title: 'Tentang Kami - BKSDA Sumatera Selatan',
    description:
        'Balai Konservasi Sumber Daya Alam Sumatera Selatan mengelola 11 kawasan konservasi yang terbagi dalam 3 Seksi Konservasi Wilayah dan 21 Resor Konservasi Wilayah.',
    ogTitle: 'Tentang Kami - BKSDA Sumatera Selatan',
    ogDescription:
        'Balai Konservasi Sumber Daya Alam Sumatera Selatan mengelola 11 kawasan konservasi yang terbagi dalam 3 Seksi Konservasi Wilayah dan 21 Resor Konservasi Wilayah.',
});
</script>
