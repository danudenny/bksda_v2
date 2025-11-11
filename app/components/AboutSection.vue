<template>
    <section
        class="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/30 to-white py-12 sm:py-16 lg:py-24"
    >
        <div class="absolute inset-0 -z-10">
            <div
                class="absolute left-0 top-0 h-96 w-96 rounded-full bg-emerald-100/50 blur-3xl filter"
            ></div>
            <div
                class="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-teal-100/50 blur-3xl filter"
            ></div>
        </div>

        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
                class="grid grid-cols-1 items-center gap-x-12 gap-y-12 lg:grid-cols-2 lg:gap-x-16"
            >
                <div class="relative">
                    <div class="max-w-xl">
                        <div
                            class="inline-flex items-center gap-2 rounded-full bg-emerald-600/10 px-3 py-1.5 sm:px-4 sm:py-2 ring-1 ring-inset ring-emerald-600/20"
                        >
                            <svg
                                class="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="2"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                                />
                            </svg>
                            <span
                                class="font-semibold text-emerald-700"
                                style="
                                    font-size: clamp(0.75rem, 1.25vw, 0.875rem);
                                "
                            >
                                Tentang Kami
                            </span>
                        </div>

                        <h2
                            class="mt-4 sm:mt-6 font-bold tracking-tight text-slate-900"
                            style="font-size: clamp(1.875rem, 4vw, 3.75rem)"
                        >
                            Menjaga
                            <span
                                class="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
                                >Jantung Hijau</span
                            >
                            Sumatera
                        </h2>

                        <p
                            class="mt-4 sm:mt-6 leading-7 sm:leading-8 text-slate-700"
                            style="font-size: clamp(0.875rem, 1.5vw, 1.125rem)"
                        >
                            Balai Konservasi Sumber Daya Alam (BKSDA) Sumatera
                            Selatan adalah unit pelaksana teknis yang
                            berdedikasi untuk melindungi keanekaragaman hayati
                            dan ekosistem unik di provinsi ini.
                        </p>

                        <div
                            class="mt-4 sm:mt-6 flex items-start gap-3 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 p-4 sm:p-5 ring-1 ring-emerald-100"
                        >
                            <svg
                                class="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 text-emerald-600 mt-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="2"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                                />
                            </svg>
                            <p
                                class="leading-6 sm:leading-7 text-slate-700"
                                style="font-size: clamp(0.875rem, 1.5vw, 1rem)"
                            >
                                Kami mengelola jaringan kawasan konservasi yang
                                luas, menjadi rumah bagi spesies terancam
                                seperti
                                <span class="font-semibold text-emerald-700"
                                    >Harimau Sumatera</span
                                >,
                                <span class="font-semibold text-emerald-700"
                                    >Gajah</span
                                >, dan
                                <span class="font-semibold text-emerald-700"
                                    >Rangkong</span
                                >. Misi kami adalah memastikan warisan alam ini
                                tetap lestari untuk generasi mendatang.
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    class="relative flex items-center justify-center lg:justify-end"
                >
                    <div class="relative">
                        <div
                            class="absolute -inset-4 rounded-3xl bg-gradient-to-r from-emerald-400 to-teal-400 opacity-20 blur-2xl"
                        ></div>

                        <NuxtImg
                            src="/kws_konservasi/gnmaras.avif"
                            alt="Pemandangan Danau Ranau di kawasan konservasi BKSDA Sumsel"
                            class="relative w-full max-w-lg rounded-3xl object-cover shadow-2xl shadow-emerald-500/30 ring-1 ring-slate-900/5 aspect-[4/3] lg:max-w-none"
                            sizes="100vw sm:512px lg:640px"
                            loading="lazy"
                            format="avif,webp"
                            quality="80"
                        />

                        <div
                            class="absolute -bottom-6 -left-6 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-slate-900/5"
                        >
                            <div class="flex items-center gap-3">
                                <div class="rounded-full bg-emerald-100 p-3">
                                    <svg
                                        class="h-6 w-6 text-emerald-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="2"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p
                                        class="text-sm font-semibold text-slate-900"
                                    >
                                        Konservasi Terpadu
                                    </p>
                                    <p class="text-xs text-slate-600">
                                        Sejak 1975
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-16 sm:mt-20 lg:mt-28">
                <div class="mb-6 sm:mb-8 text-center">
                    <h3
                        class="font-bold text-slate-900"
                        style="font-size: clamp(1.5rem, 3vw, 1.875rem)"
                    >
                        Kawasan yang Kami Kelola
                    </h3>
                    <p
                        class="mt-2 text-slate-600"
                        style="font-size: clamp(0.875rem, 1.5vw, 1rem)"
                    >
                        Klik marker pada peta untuk melihat informasi detail
                        kawasan konservasi
                    </p>
                </div>

                <ClientOnly>
                    <KawasanMap />
                    <template #fallback>
                        <div
                            class="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-900/5 bg-slate-100 flex items-center justify-center"
                        >
                            <div class="text-center">
                                <div
                                    class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-emerald-600 border-r-transparent"
                                ></div>
                                <p class="mt-4 text-slate-600">
                                    Memuat peta...
                                </p>
                            </div>
                        </div>
                    </template>
                </ClientOnly>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
// Stats data removed as we're now using the map component
</script>

<style scoped></style>
