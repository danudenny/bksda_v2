<template>
    <NuxtLayout name="detail">
        <template #breadcrumb>
            <span class="text-white">Perizinan Masuk Kawasan (Simaksi)</span>
        </template>

        <template #header>
            <div class="mb-4">
                <span
                    class="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 text-sm font-semibold text-white"
                >
                    <svg
                        class="h-5 w-5"
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
                    Perizinan
                </span>
            </div>
            <h1 class="text-3xl font-bold sm:text-4xl lg:text-5xl">
                Prosedur Permohonan Perizinan Masuk Kawasan (Simaksi)
            </h1>
        </template>

        <template #meta>
            <p class="mt-4 text-lg text-emerald-100 sm:text-xl">
                SIMAKSI (Surat Izin Masuk Kawasan Konservasi) adalah izin yang
                wajib dimiliki oleh setiap orang, baik WNI maupun WNA, yang akan
                memasuki kawasan suaka alam, kawasan pelestarian alam, dan taman
                buru untuk kegiatan tertentu.
            </p>
        </template>

        <!-- Main Content -->
        <div class="space-y-8">
            <!-- Ruang Lingkup Section -->
            <section
                class="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5 sm:p-8"
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
                                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                            />
                        </svg>
                    </div>
                    Ruang Lingkup Kegiatan
                </h2>

                <p class="mb-8 text-lg leading-relaxed text-gray-700">
                    SIMAKSI diperlukan untuk kegiatan-kegiatan sebagai berikut:
                </p>

                <div
                    class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                >
                    <div
                        v-for="item in scopeItems"
                        :key="item.name"
                        class="group relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 p-6 shadow-md ring-1 ring-emerald-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                        <div
                            class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-emerald-200 transition-transform duration-300 group-hover:scale-110"
                        >
                            <component
                                :is="item.icon"
                                class="h-6 w-6 text-emerald-600"
                                aria-hidden="true"
                            />
                        </div>
                        <h4 class="font-semibold text-gray-900">
                            {{ item.name }}
                        </h4>
                    </div>
                </div>
            </section>

            <!-- Prosedur Permohonan Section -->
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
                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    Prosedur Permohonan
                </h2>

                <p class="mb-6 text-lg leading-relaxed text-gray-700">
                    Pilih kewarganegaraan Anda untuk melihat prosedur yang
                    sesuai:
                </p>

                <!-- Tab Buttons -->
                <div class="mb-8 flex flex-wrap gap-3">
                    <button
                        @click="activeTab = 'wni'"
                        :class="[
                            'flex items-center gap-2.5 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 sm:text-base',
                            activeTab === 'wni'
                                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-105'
                                : 'bg-white text-gray-700 shadow-sm ring-1 ring-gray-200 hover:bg-gray-50 hover:shadow-md',
                        ]"
                    >
                        <User class="h-5 w-5" aria-hidden="true" />
                        <span>Warga Negara Indonesia (WNI)</span>
                    </button>
                    <button
                        @click="activeTab = 'wna'"
                        :class="[
                            'flex items-center gap-2.5 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 sm:text-base',
                            activeTab === 'wna'
                                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-105'
                                : 'bg-white text-gray-700 shadow-sm ring-1 ring-gray-200 hover:bg-gray-50 hover:shadow-md',
                        ]"
                    >
                        <Globe class="h-5 w-5" aria-hidden="true" />
                        <span>Warga Negara Asing (WNA)</span>
                    </button>
                </div>

                <!-- Tab Content -->
                <div class="relative">
                    <transition
                        mode="out-in"
                        enter-active-class="transition-all duration-300 ease-out"
                        enter-from-class="opacity-0 scale-95"
                        enter-to-class="opacity-100 scale-100"
                        leave-active-class="transition-all duration-200 ease-in"
                        leave-from-class="opacity-100 scale-100"
                        leave-to-class="opacity-0 scale-95"
                    >
                        <div
                            v-if="activeTab === 'wni'"
                            key="wni"
                            class="overflow-hidden rounded-xl bg-white shadow-md"
                        >
                            <div class="space-y-6 p-6 sm:p-8">
                                <div class="border-t border-gray-200"></div>
                                <div class="flex gap-5">
                                    <div
                                        class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 font-bold text-white shadow-lg"
                                    >
                                        1
                                    </div>
                                    <div class="flex-1">
                                        <h4
                                            class="text-lg font-bold text-gray-900"
                                        >
                                            Surat Permohonan
                                        </h4>
                                        <p
                                            class="mt-2 leading-relaxed text-gray-600"
                                        >
                                            Membuat Surat Permohonan yang
                                            ditujukan kepada
                                            <strong class="text-emerald-700"
                                                >Kepala BKSDA Sumatera
                                                Selatan</strong
                                            >
                                            dengan tembusan disampaikan kepada:
                                        </p>
                                        <ul
                                            class="mt-3 space-y-2 pl-6 text-gray-600"
                                        >
                                            <li class="flex items-start gap-2">
                                                <svg
                                                    class="h-5 w-5 shrink-0 text-emerald-600 mt-0.5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="2"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                                <span
                                                    >Kepala Pusat Penelitian dan
                                                    Pengembangan
                                                    Kehutanan.</span
                                                >
                                            </li>
                                            <li class="flex items-start gap-2">
                                                <svg
                                                    class="h-5 w-5 shrink-0 text-emerald-600 mt-0.5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="2"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                                <span
                                                    >Sekretaris Direktorat
                                                    Jenderal PHKA.</span
                                                >
                                            </li>
                                            <li class="flex items-start gap-2">
                                                <svg
                                                    class="h-5 w-5 shrink-0 text-emerald-600 mt-0.5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="2"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                                <span
                                                    >Direktorat Konservasi
                                                    Keanekaragaman Hayati.</span
                                                >
                                            </li>
                                            <li class="flex items-start gap-2">
                                                <svg
                                                    class="h-5 w-5 shrink-0 text-emerald-600 mt-0.5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="2"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                                <span
                                                    >Kepala Seksi Konservasi
                                                    Wilayah setempat.</span
                                                >
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="border-t border-gray-200"></div>

                                <!-- Step 2 -->
                                <div class="flex gap-5">
                                    <div
                                        class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 font-bold text-white shadow-lg"
                                    >
                                        2
                                    </div>
                                    <div class="flex-1">
                                        <h4
                                            class="text-lg font-bold text-gray-900"
                                        >
                                            Persyaratan Dokumen
                                        </h4>
                                        <p
                                            class="mt-2 leading-relaxed text-gray-600"
                                        >
                                            Menyerahkan fotocopy KTP dan Materai
                                            Rp 6.000, serta melampirkan dokumen
                                            sesuai kegiatan:
                                        </p>
                                        <div class="mt-4 space-y-4">
                                            <div
                                                class="rounded-lg border-2 border-emerald-100 bg-emerald-50/50 p-4"
                                            >
                                                <h5
                                                    class="font-bold text-emerald-900"
                                                >
                                                    Kegiatan Penelitian,
                                                    Pengembangan, Ilmu
                                                    Pengetahuan, Pendidikan,
                                                    Foto Komersial & Ekspedisi
                                                </h5>
                                                <ul
                                                    class="mt-3 space-y-2 text-gray-700"
                                                >
                                                    <li
                                                        class="flex items-start gap-2"
                                                    >
                                                        <svg
                                                            class="h-5 w-5 shrink-0 text-emerald-600 mt-0.5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke-width="2"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                        <span
                                                            >Proposal
                                                            kegiatan.</span
                                                        >
                                                    </li>
                                                    <li
                                                        class="flex items-start gap-2"
                                                    >
                                                        <svg
                                                            class="h-5 w-5 shrink-0 text-emerald-600 mt-0.5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke-width="2"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                        <span
                                                            >Fotocopy tanda
                                                            pengenal.</span
                                                        >
                                                    </li>
                                                </ul>
                                            </div>
                                            <div
                                                class="rounded-lg border-2 border-teal-100 bg-teal-50/50 p-4"
                                            >
                                                <h5
                                                    class="font-bold text-teal-900"
                                                >
                                                    Kegiatan Pembuatan Film atau
                                                    Videoklip
                                                </h5>
                                                <ul
                                                    class="mt-3 space-y-2 text-gray-700"
                                                >
                                                    <li
                                                        class="flex items-start gap-2"
                                                    >
                                                        <svg
                                                            class="h-5 w-5 shrink-0 text-teal-600 mt-0.5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke-width="2"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                        <span
                                                            >Surat izin produksi
                                                            (untuk tujuan
                                                            komersial).</span
                                                        >
                                                    </li>
                                                    <li
                                                        class="flex items-start gap-2"
                                                    >
                                                        <svg
                                                            class="h-5 w-5 shrink-0 text-teal-600 mt-0.5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke-width="2"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                        <span
                                                            >Tanda pendaftaran
                                                            rekaman video/film
                                                            dari Badan Informasi
                                                            dan Komunikasi
                                                            Nasional.</span
                                                        >
                                                    </li>
                                                    <li
                                                        class="flex items-start gap-2"
                                                    >
                                                        <svg
                                                            class="h-5 w-5 shrink-0 text-teal-600 mt-0.5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke-width="2"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                        <span
                                                            >Sinopsis film yang
                                                            akan dibuat.</span
                                                        >
                                                    </li>
                                                    <li
                                                        class="flex items-start gap-2"
                                                    >
                                                        <svg
                                                            class="h-5 w-5 shrink-0 text-teal-600 mt-0.5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke-width="2"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                        <span
                                                            >Daftar crew.</span
                                                        >
                                                    </li>
                                                    <li
                                                        class="flex items-start gap-2"
                                                    >
                                                        <svg
                                                            class="h-5 w-5 shrink-0 text-teal-600 mt-0.5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke-width="2"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                        <span
                                                            >Surat Peryataan
                                                            tidak merusak
                                                            lingkungan serta
                                                            kesediaan mematuhi
                                                            ketentuan
                                                            perundang-undangan
                                                            yang berlaku.</span
                                                        >
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="border-t border-gray-200"></div>

                                <!-- Step 3 -->
                                <div class="flex gap-5">
                                    <div
                                        class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 font-bold text-white shadow-lg"
                                    >
                                        3
                                    </div>
                                    <div class="flex-1">
                                        <h4
                                            class="text-lg font-bold text-gray-900"
                                        >
                                            Pengambilan SIMAKSI
                                        </h4>
                                        <p
                                            class="mt-2 leading-relaxed text-gray-600"
                                        >
                                            Datang ke Kantor BKSDA Sumatera
                                            Selatan untuk menyerahkan seluruh
                                            syarat-syarat (poin 2 dan 3) dan
                                            mengambil SIMAKSI yang telah
                                            diterbitkan.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            v-else
                            key="wna"
                            class="overflow-hidden rounded-xl bg-white shadow-md"
                        >
                            <div class="space-y-6 p-6 sm:p-8">
                                <div class="border-t border-gray-200"></div>

                                <div class="flex gap-5">
                                    <div
                                        class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 font-bold text-white shadow-lg"
                                    >
                                        1
                                    </div>
                                    <div class="flex-1">
                                        <h4
                                            class="text-lg font-bold text-gray-900"
                                        >
                                            Surat Permohonan
                                        </h4>
                                        <p
                                            class="mt-2 leading-relaxed text-gray-600"
                                        >
                                            Membuat Surat Permohonan yang
                                            ditujukan kepada
                                            <strong class="text-emerald-700"
                                                >Sekretaris Direktorat Jenderal
                                                Perlindungan Hutan dan
                                                Konservasi Alam</strong
                                            >
                                            dengan tembusan kepada:
                                        </p>
                                        <ul
                                            class="mt-3 space-y-2 text-gray-600"
                                        >
                                            <li class="flex items-start gap-2">
                                                <svg
                                                    class="h-5 w-5 shrink-0 text-emerald-600 mt-0.5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="2"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                                <span
                                                    >Kepala Pusat Penelitian dan
                                                    Pengembangan
                                                    Kehutanan.</span
                                                >
                                            </li>
                                            <li class="flex items-start gap-2">
                                                <svg
                                                    class="h-5 w-5 shrink-0 text-emerald-600 mt-0.5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="2"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                                <span
                                                    >Direktorat Konservasi
                                                    Keanekaragaman Hayati.</span
                                                >
                                            </li>
                                            <li class="flex items-start gap-2">
                                                <svg
                                                    class="h-5 w-5 shrink-0 text-emerald-600 mt-0.5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="2"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                                <span
                                                    >Kepala Balai
                                                    setempat.</span
                                                >
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="border-t border-gray-200"></div>

                                <div class="flex gap-5">
                                    <div
                                        class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 font-bold text-white shadow-lg"
                                    >
                                        2
                                    </div>
                                    <div class="flex-1">
                                        <h4
                                            class="text-lg font-bold text-gray-900"
                                        >
                                            Persyaratan Dokumen
                                        </h4>
                                        <p
                                            class="mt-2 leading-relaxed text-gray-600"
                                        >
                                            Menyerahkan fotocopy KTP dan Materai
                                            Rp 6.000, serta melampirkan dokumen
                                            sesuai kegiatan:
                                        </p>
                                        <div class="mt-4 space-y-4">
                                            <div
                                                class="rounded-lg border-2 border-emerald-100 bg-emerald-50/50 p-4"
                                            >
                                                <h5
                                                    class="font-bold text-emerald-900"
                                                >
                                                    Kegiatan Penelitian,
                                                    Pengembangan, Ilmu
                                                    Pengetahuan, Pendidikan,
                                                    Foto Komersial & Ekspedisi
                                                </h5>
                                                <ul
                                                    class="mt-3 space-y-2 text-gray-700"
                                                >
                                                    <li
                                                        class="flex items-start gap-2"
                                                    >
                                                        <svg
                                                            class="h-5 w-5 shrink-0 text-emerald-600 mt-0.5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke-width="2"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                        <span
                                                            >Surat izin dari
                                                            penelitian
                                                            LIPI.</span
                                                        >
                                                    </li>
                                                    <li
                                                        class="flex items-start gap-2"
                                                    >
                                                        <svg
                                                            class="h-5 w-5 shrink-0 text-emerald-600 mt-0.5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke-width="2"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                        <span
                                                            >Proposal
                                                            kegiatan.</span
                                                        >
                                                    </li>
                                                    <li
                                                        class="flex items-start gap-2"
                                                    >
                                                        <svg
                                                            class="h-5 w-5 shrink-0 text-emerald-600 mt-0.5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke-width="2"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                        <span
                                                            >Fotocopy
                                                            Passport.</span
                                                        >
                                                    </li>
                                                    <li
                                                        class="flex items-start gap-2"
                                                    >
                                                        <svg
                                                            class="h-5 w-5 shrink-0 text-emerald-600 mt-0.5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke-width="2"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                        <span
                                                            >Surat Pemberitahuan
                                                            Penelitian dari
                                                            Direktorat Kesatuan
                                                            Bangsa dan Politik
                                                            Departemen Dalam
                                                            Negeri.</span
                                                        >
                                                    </li>
                                                    <li
                                                        class="flex items-start gap-2"
                                                    >
                                                        <svg
                                                            class="h-5 w-5 shrink-0 text-emerald-600 mt-0.5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke-width="2"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                        <span
                                                            >Surat Jalan dari
                                                            Kepolisian.</span
                                                        >
                                                    </li>
                                                    <li
                                                        class="flex items-start gap-2"
                                                    >
                                                        <svg
                                                            class="h-5 w-5 shrink-0 text-emerald-600 mt-0.5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke-width="2"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                        <span
                                                            >Surat peryataan
                                                            tidak merusak
                                                            lingkungan serta
                                                            kesediaan mematuhi
                                                            ketentuan
                                                            perundang-undangan
                                                            yang berlaku.</span
                                                        >
                                                    </li>
                                                </ul>
                                            </div>
                                            <div
                                                class="rounded-lg border-2 border-teal-100 bg-teal-50/50 p-4"
                                            >
                                                <h5
                                                    class="font-bold text-teal-900"
                                                >
                                                    Kegiatan Pembuatan Film atau
                                                    Videoklip
                                                </h5>
                                                <ul
                                                    class="mt-3 space-y-2 text-gray-700"
                                                >
                                                    <li
                                                        class="flex items-start gap-2"
                                                    >
                                                        <svg
                                                            class="h-5 w-5 shrink-0 text-teal-600 mt-0.5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke-width="2"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                        <span
                                                            >Surat izin produksi
                                                            (untuk tujuan
                                                            komersial).</span
                                                        >
                                                    </li>
                                                    <li
                                                        class="flex items-start gap-2"
                                                    >
                                                        <svg
                                                            class="h-5 w-5 shrink-0 text-teal-600 mt-0.5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke-width="2"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                        <span
                                                            >Tanda pendaftaran
                                                            rekaman video/film
                                                            dari Badan Informasi
                                                            dan Komunikasi
                                                            Nasional.</span
                                                        >
                                                    </li>
                                                    <li
                                                        class="flex items-start gap-2"
                                                    >
                                                        <svg
                                                            class="h-5 w-5 shrink-0 text-teal-600 mt-0.5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke-width="2"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                        <span
                                                            >Sinopsis film yang
                                                            akan dibuat.</span
                                                        >
                                                    </li>
                                                    <li
                                                        class="flex items-start gap-2"
                                                    >
                                                        <svg
                                                            class="h-5 w-5 shrink-0 text-teal-600 mt-0.5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke-width="2"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                        <span
                                                            >Daftar crew.</span
                                                        >
                                                    </li>
                                                    <li
                                                        class="flex items-start gap-2"
                                                    >
                                                        <svg
                                                            class="h-5 w-5 shrink-0 text-teal-600 mt-0.5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke-width="2"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                        <span
                                                            >Surat Peryataan
                                                            tidak merusak
                                                            lingkungan serta
                                                            kesedian mematuhi
                                                            ketentuan
                                                            perundang-undangan
                                                            yang berlaku.</span
                                                        >
                                                    </li>
                                                </ul>
                                            </div>
                                            <div
                                                class="rounded-lg border-2 border-blue-100 bg-blue-50/50 p-4"
                                            >
                                                <h5
                                                    class="font-bold text-blue-900"
                                                >
                                                    Kegiatan Pembuatan Foto
                                                    Komersial & Ekspedisi
                                                </h5>
                                                <ul
                                                    class="mt-3 space-y-2 text-gray-700"
                                                >
                                                    <li
                                                        class="flex items-start gap-2"
                                                    >
                                                        <svg
                                                            class="h-5 w-5 shrink-0 text-blue-600 mt-0.5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke-width="2"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                        <span>Proposal.</span>
                                                    </li>
                                                    <li
                                                        class="flex items-start gap-2"
                                                    >
                                                        <svg
                                                            class="h-5 w-5 shrink-0 text-blue-600 mt-0.5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke-width="2"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                        <span
                                                            >Fotocopy
                                                            Passport.</span
                                                        >
                                                    </li>
                                                    <li
                                                        class="flex items-start gap-2"
                                                    >
                                                        <svg
                                                            class="h-5 w-5 shrink-0 text-blue-600 mt-0.5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke-width="2"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                        <span
                                                            >Daftar
                                                            peralatan.</span
                                                        >
                                                    </li>
                                                    <li
                                                        class="flex items-start gap-2"
                                                    >
                                                        <svg
                                                            class="h-5 w-5 shrink-0 text-blue-600 mt-0.5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke-width="2"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                        <span
                                                            >Surat Jalan dari
                                                            Kepolisian.</span
                                                        >
                                                    </li>
                                                    <li
                                                        class="flex items-start gap-2"
                                                    >
                                                        <svg
                                                            class="h-5 w-5 shrink-0 text-blue-600 mt-0.5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke-width="2"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                        <span
                                                            >Surat Peryataan
                                                            tidak merusak
                                                            lingkungan serta
                                                            kesedian mematuhi
                                                            ketentuan
                                                            perundang-undangan
                                                            yang berlaku.</span
                                                        >
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="border-t border-gray-200"></div>

                                <div class="flex gap-5">
                                    <div
                                        class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 font-bold text-white shadow-lg"
                                    >
                                        3
                                    </div>
                                    <div class="flex-1">
                                        <h4
                                            class="text-lg font-bold text-gray-900"
                                        >
                                            Pengambilan SIMAKSI
                                        </h4>
                                        <p
                                            class="mt-2 leading-relaxed text-gray-600"
                                        >
                                            Datang ke Kantor BKSDA Sumatera
                                            Selatan untuk menyerahkan seluruh
                                            syarat-syarat (poin 2 dan 3) dan
                                            mengambil SIMAKSI yang telah
                                            diterbitkan.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
            </section>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import {
    Camera,
    Globe,
    GraduationCap,
    Mountain,
    Search,
    User,
    Video,
} from 'lucide-vue-next';
import { ref } from 'vue';

useSeoMeta({
    title: 'Prosedur SIMAKSI - BKSDA Sumatera Selatan',
    description:
        'SIMAKSI (Surat Izin Masuk Kawasan Konservasi) adalah izin yang wajib dimiliki untuk memasuki kawasan suaka alam, kawasan pelestarian alam, dan taman buru.',
});

const activeTab = ref('wni');

const scopeItems = [
    {
        name: 'Penelitian & Pengembangan',
        icon: Search,
        description:
            'Kegiatan observasi dan pengumpulan data ilmiah di lapangan.',
    },
    {
        name: 'Ilmu Pengetahuan & Pendidikan',
        icon: GraduationCap,
        description:
            'Studi, praktek lapangan, atau program edukasi non-komersial.',
    },
    {
        name: 'Film & Videoklip',
        icon: Video,
        description:
            'Pengambilan gambar bergerak, baik komersial maupun dokumenter.',
    },
    {
        name: 'Foto Komersial',
        icon: Camera,
        description:
            'Pengambilan foto untuk tujuan komersial, iklan, atau stok.',
    },
    {
        name: 'Ekspedisi',
        icon: Mountain,
        description:
            'Kegiatan penjelajahan khusus yang bersifat petualangan atau non-penelitian.',
    },
];
</script>
