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
                            <MapPin h="6" w="6" class="text-emerald-600"/>
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
                            <CheckSquare h="6" w="6" class="text-emerald-600"/>
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
import { MapPin, CheckSquare } from 'lucide-vue-next'
</script>

<style scoped></style>
