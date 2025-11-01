<template>
  <section class="bg-slate-50 py-8 sm:py-16">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid items-start gap-y-16 lg:grid-cols-2 lg:gap-x-24">
        <div>
          <h2 class="text-base font-semibold leading-7 text-emerald-600">
            Tentang Kami
          </h2>
          <p
            class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Mengenal BKSDA Sumatera Selatan Lebih Dekat
          </p>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            Balai Konservasi Sumber Daya Alam (BKSDA) Sumatera Selatan adalah
            unit pelaksana teknis Kementerian Lingkungan Hidup dan Kehutanan.
            Kami memiliki tugas mulia untuk melindungi dan melestarikan
            keanekaragaman hayati serta ekosistem di wilayah ini.
          </p>
          <ul role="list" class="mt-10 space-y-5">
            <li class="flex items-start gap-3">
              <div
                class="flex-shrink-0 rounded-full bg-emerald-100 p-2 ring-1 ring-emerald-200"
              >
                <ShieldCheck
                  class="h-5 w-5 text-emerald-700"
                  aria-hidden="true"
                />
              </div>
              <div>
                <dt class="font-semibold text-gray-900">
                  Perlindungan & Pengamanan
                </dt>
                <dd class="text-gray-600">
                  Mengamankan kawasan konservasi serta flora dan fauna langka
                  dari segala ancaman.
                </dd>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <div
                class="flex-shrink-0 rounded-full bg-emerald-100 p-2 ring-1 ring-emerald-200"
              >
                <Map class="h-5 w-5 text-emerald-700" aria-hidden="true" />
              </div>
              <div>
                <dt class="font-semibold text-gray-900">Manajemen Kawasan</dt>
                <dd class="text-gray-600">
                  Mengelola suaka margasatwa, cagar alam, dan taman wisata alam
                  secara berkelanjutan.
                </dd>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <div
                class="flex-shrink-0 rounded-full bg-emerald-100 p-2 ring-1 ring-emerald-200"
              >
                <Users class="h-5 w-5 text-emerald-700" aria-hidden="true" />
              </div>
              <div>
                <dt class="font-semibold text-gray-900">Kemitraan & Edukasi</dt>
                <dd class="text-gray-600">
                  Bekerja sama dengan masyarakat dan mitra untuk membangun
                  kesadaran konservasi.
                </dd>
              </div>
            </li>
          </ul>
          <div class="mt-12">
            <NuxtLink
              to="/profil/tentang-kami"
              class="inline-flex items-center gap-1.5 rounded-md bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors duration-300 hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              Lihat Profil Lengkap
              <span aria-hidden="true">&rarr;</span>
            </NuxtLink>
          </div>
        </div>

        <div class="relative w-full aspect-square">
          <div
            class="absolute top-14 left-0 w-[85%] transition-all duration-500 hover:scale-105 hover:z-20"
          >
            <lazy-nuxt-img
              src="/about-1.avif"
              alt="Tim BKSDA Sumsel di lapangan"
              class="aspect-[4/3] w-full rounded-2xl bg-gray-100 object-cover shadow-lg"
              sizes="40vw"
            />
          </div>
          <div
            class="absolute bottom-0 right-0 w-[60%] transition-all duration-500 hover:scale-105 hover:z-20"
          >
            <lazy-nuxt-img
              src="/about-2.avif"
              alt="Satwa dilindungi BKSDA Sumsel"
              class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover shadow-2xl ring-4 ring-slate-50"
              sizes="30vw"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ShieldCheck, Map, Users } from "lucide-vue-next";
</script>
