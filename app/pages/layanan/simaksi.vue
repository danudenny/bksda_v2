<template>
  <div>
    <section class="bg-white py-16 sm:py-24 mt-8">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center lg:max-w-4xl">
          <h2 class="text-base font-semibold leading-7 text-emerald-600">
            Perizinan
          </h2>
          <p
            class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Prosedur Permohonan SIMAKSI
          </p>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            SIMAKSI (Surat Izin Masuk Kawasan Konservasi) adalah izin yang wajib
            dimiliki oleh setiap orang, baik WNI maupun WNA, yang akan memasuki
            kawasan suaka alam, kawasan pelestarian alam, dan taman buru untuk
            kegiatan tertentu.
          </p>
        </div>
      </div>
    </section>

    <section class="bg-slate-50 py-8 sm:py-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center lg:max-w-4xl">
          <h3
            class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
          >
            Ruang Lingkup Kegiatan
          </h3>
          <p class="mt-4 text-lg leading-8 text-gray-600">
            SIMAKSI diperlukan untuk kegiatan-kegiatan sebagai berikut:
          </p>
        </div>

        <div class="mt-16 flex gap-4">
          <div
            v-for="item in scopeItems"
            :key="item.name"
            class="flex h-36 flex-col w-full items-center rounded-2xl bg-white p-6 text-center shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:scale-105 sm:p-8 hover:ring-emerald-300"
          >
            <div
              class="flex h-16 w-16 p-4 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-100"
            >
              <component
                :is="item.icon"
                class="h-8 w-8 text-emerald-600"
                aria-hidden="true"
              />
            </div>

            <h4 class="mt-5 text-base font-semibold leading-7 text-gray-900">
              {{ item.name }}
            </h4>

            <!--            <p class="mt-2 text-sm leading-relaxed text-gray-600">-->
            <!--              {{ item.description }}-->
            <!--            </p>-->
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white py-16 sm:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center lg:max-w-4xl">
          <h3
            class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
          >
            Prosedur Permohonan
          </h3>
          <p class="mt-4 text-lg leading-8 text-gray-600">
            Pilih kewarganegaraan Anda untuk melihat prosedur yang sesuai.
          </p>
        </div>

        <div
          class="mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-4"
        >
          <button
            @click="activeTab = 'wni'"
            :class="[
              'flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm sm:text-base font-semibold transition-all duration-300 transform',
              activeTab === 'wni'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-105'
                : 'bg-white text-gray-700 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-100 hover:scale-105',
            ]"
          >
            <User class="h-5 w-5" aria-hidden="true" />
            <span>Warga Negara Indonesia (WNI)</span>
          </button>
          <button
            @click="activeTab = 'wna'"
            :class="[
              'flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm sm:text-base font-semibold transition-all duration-300 transform',
              activeTab === 'wna'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-105'
                : 'bg-white text-gray-700 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-100 hover:scale-105',
            ]"
          >
            <Globe class="h-5 w-5" aria-hidden="true" />
            <span>Warga Negara Asing (WNA)</span>
          </button>
        </div>

        <div class="relative mt-12 sm:mt-16">
          <transition
            mode="out-in"
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div v-if="activeTab === 'wni'" key="wni" class="mx-auto max-w-4xl">
              <div class="space-y-8">
                <div class="flex gap-4">
                  <div
                    class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 font-bold text-white"
                  >
                    1
                  </div>
                  <div>
                    <h4 class="text-lg font-semibold text-gray-900">
                      Booking Online
                    </h4>
                    <p class="mt-1 text-gray-600">
                      Mengisi SIMAKSI Online yang ada di Website BKSDA Sumatera
                      Selatan untuk membooking kuota.
                    </p>
                  </div>
                </div>
                <div class="flex gap-4">
                  <div
                    class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 font-bold text-white"
                  >
                    2
                  </div>
                  <div>
                    <h4 class="text-lg font-semibold text-gray-900">
                      Surat Permohonan
                    </h4>
                    <p class="mt-1 text-gray-600">
                      Membuat Surat Permohonan yang ditujukan kepada
                      <strong class="text-gray-800"
                        >Kepala BKSDA Sumatera Selatan</strong
                      >
                      dengan tembusan disampaikan kepada:
                    </p>
                    <ul class="mt-2 list-disc space-y-1 pl-6 text-gray-600">
                      <li>
                        Kepala Pusat Penelitian dan Pengembangan Kehutanan.
                      </li>
                      <li>Sekretaris Direktorat Jenderal PHKA.</li>
                      <li>Direktorat Konservasi Keanekaragaman Hayati.</li>
                      <li>Kepala Seksi Konservasi Wilayah setempat.</li>
                    </ul>
                  </div>
                </div>
                <div class="flex gap-4">
                  <div
                    class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 font-bold text-white"
                  >
                    3
                  </div>
                  <div>
                    <h4 class="text-lg font-semibold text-gray-900">
                      Persyaratan Dokumen
                    </h4>
                    <p class="mt-1 text-gray-600">
                      Menyerahkan fotocopy KTP dan Materai Rp 6.000, serta
                      melampirkan dokumen sesuai kegiatan:
                    </p>
                    <div class="mt-4 space-y-4">
                      <div
                        class="rounded-lg border border-gray-200 bg-slate-50 p-4"
                      >
                        <h5 class="font-semibold text-gray-800">
                          Kegiatan Penelitian, Pengembangan, Ilmu Pengetahuan,
                          Pendidikan, Foto Komersial & Ekspedisi
                        </h5>
                        <ul class="mt-2 list-disc space-y-1 pl-6 text-gray-600">
                          <li>Proposal kegiatan.</li>
                          <li>Fotocopy tanda pengenal.</li>
                        </ul>
                      </div>
                      <div
                        class="rounded-lg border border-gray-200 bg-slate-50 p-4"
                      >
                        <h5 class="font-semibold text-gray-800">
                          Kegiatan Pembuatan Film atau Videoklip
                        </h5>
                        <ul class="mt-2 list-disc space-y-1 pl-6 text-gray-600">
                          <li>Surat izin produksi (untuk tujuan komersial).</li>
                          <li>
                            Tanda pendaftaran rekaman video/film dari Badan
                            Informasi dan Komunikasi Nasional.
                          </li>
                          <li>Sinopsis film yang akan dibuat.</li>
                          <li>Daftar crew.</li>
                          <li>
                            Surat Peryataan tidak merusak lingkungan serta
                            kesediaan mematuhi ketentuan perundang-undangan yang
                            berlaku.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex gap-4">
                  <div
                    class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 font-bold text-white"
                  >
                    4
                  </div>
                  <div>
                    <h4 class="text-lg font-semibold text-gray-900">
                      Pengambilan SIMAKSI
                    </h4>
                    <p class="mt-1 text-gray-600">
                      Datang ke Kantor BKSDA Sumatera Selatan untuk menyerahkan
                      seluruh syarat-syarat (poin 2 dan 3) dan mengambil SIMAKSI
                      yang telah diterbitkan.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div v-else key="wna" class="mx-auto max-w-4xl">
              <div class="space-y-8">
                <div class="flex gap-4">
                  <div
                    class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 font-bold text-white"
                  >
                    1
                  </div>
                  <div>
                    <h4 class="text-lg font-semibold text-gray-900">
                      Booking Online
                    </h4>
                    <p class="mt-1 text-gray-600">
                      Mengisi SIMAKSI Online yang ada di Website BKSDA Sumatera
                      Selatan untuk membooking kuota.
                    </p>
                  </div>
                </div>
                <div class="flex gap-4">
                  <div
                    class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 font-bold text-white"
                  >
                    2
                  </div>
                  <div>
                    <h4 class="text-lg font-semibold text-gray-900">
                      Surat Permohonan
                    </h4>
                    <p class="mt-1 text-gray-600">
                      Membuat Surat Permohonan yang ditujukan kepada
                      <strong class="text-gray-800"
                        >Sekretaris Direktorat Jenderal Perlindungan Hutan dan
                        Konservasi Alam</strong
                      >
                      dengan tembusan kepada:
                    </p>
                    <ul class="mt-2 list-disc space-y-1 pl-6 text-gray-600">
                      <li>
                        Kepala Pusat Penelitian dan Pengembangan Kehutanan.
                      </li>
                      <li>Direktorat Konservasi Keanekaragaman Hayati.</li>
                      <li>Kepala Balai setempat.</li>
                    </ul>
                  </div>
                </div>
                <div class="flex gap-4">
                  <div
                    class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 font-bold text-white"
                  >
                    3
                  </div>
                  <div>
                    <h4 class="text-lg font-semibold text-gray-900">
                      Persyaratan Dokumen
                    </h4>
                    <p class="mt-1 text-gray-600">
                      Menyerahkan fotocopy KTP dan Materai Rp 6.000, serta
                      melampirkan dokumen sesuai kegiatan:
                    </p>
                    <div class="mt-4 space-y-4">
                      <div
                        class="rounded-lg border border-gray-200 bg-slate-50 p-4"
                      >
                        <h5 class="font-semibold text-gray-800">
                          Kegiatan Penelitian, Pengembangan, Ilmu Pengetahuan,
                          Pendidikan, Foto Komersial & Ekspedisi
                        </h5>
                        <ul class="mt-2 list-disc space-y-1 pl-6 text-gray-600">
                          <li>Surat izin dari penelitian LIPI.</li>
                          <li>Proposal kegiatan.</li>
                          <li>Fotocopy Passport.</li>
                          <li>
                            Surat Pemberitahuan Penelitian dari Direktorat
                            Kesatuan Bangsa dan Politik Departemen Dalam Negeri.
                          </li>
                          <li>Surat Jalan dari Kepolisian.</li>
                          <li>
                            Surat peryataan tidak merusak lingkungan serta
                            kesediaan mematuhi ketentuan perundang-undangan yang
                            berlaku.
                          </li>
                        </ul>
                      </div>
                      <div
                        class="rounded-lg border border-gray-200 bg-slate-50 p-4"
                      >
                        <h5 class="font-semibold text-gray-800">
                          Kegiatan Pembuatan Film atau Videoklip
                        </h5>
                        <ul class="mt-2 list-disc space-y-1 pl-6 text-gray-600">
                          <li>Surat izin produksi (untuk tujuan komersial).</li>
                          <li>
                            Tanda pendaftaran rekaman video/film dari Badan
                            Informasi dan Komunikasi Nasional. U
                          </li>
                          <li>Sinopsis film yang yang akan dibuat.</li>
                          <li>Daftar crew.</li>
                          <li>
                            Surat Peryataan tidak merusak lingkungan serta
                            kesedian mematuhi ketentuan perundang-undangan yang
                            berlaku.
                          </li>
                        </ul>
                      </div>
                      <div
                        class="rounded-lg border border-gray-200 bg-slate-50 p-4"
                      >
                        <h5 class="font-semibold text-gray-800">
                          Kegiatan Pembuatan Foto Komersial & Ekspedisi
                        </h5>
                        <ul class="mt-2 list-disc space-y-1 pl-6 text-gray-600">
                          <li>Proposal.</li>
                          <li>Fotocopy Passport.</li>
                          <li>Daftar peralatan.</li>
                          <li>Surat Jalan dari Kepolisian.</li>
                          <li>
                            Surat Peryataan tidak merusak lingkungan serta
                            kesedian mematuhi ketentuan perundang-undangan yang
                            berlaku.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex gap-4">
                  <div
                    class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 font-bold text-white"
                  >
                    4
                  </div>
                  <div>
                    <h4 class="text-lg font-semibold text-gray-900">
                      Pengambilan SIMAKSI
                    </h4>
                    <p class="mt-1 text-gray-600">
                      Datang ke Kantor BKSDA Sumatera Selatan untuk menyerahkan
                      seluruh syarat-syarat (poin 2 dan 3) dan mengambil SIMAKSI
                      yang telah diterbitkan.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  User,
  Globe,
  Search,
  GraduationCap,
  Video,
  Camera,
  Mountain,
} from "lucide-vue-next";

definePageMeta({
  title: "Prosedur SIMAKSI",
  layout: "default",
});

const activeTab = ref("wni");

const scopeItems = [
  {
    name: "Penelitian & Pengembangan",
    icon: Search,
    description: "Kegiatan observasi dan pengumpulan data ilmiah di lapangan.",
  },
  {
    name: "Ilmu Pengetahuan & Pendidikan",
    icon: GraduationCap,
    description: "Studi, praktek lapangan, atau program edukasi non-komersial.",
  },
  {
    name: "Film & Videoklip",
    icon: Video,
    description:
      "Pengambilan gambar bergerak, baik komersial maupun dokumenter.",
  },
  {
    name: "Foto Komersial",
    icon: Camera,
    description: "Pengambilan foto untuk tujuan komersial, iklan, atau stok.",
  },
  {
    name: "Ekspedisi",
    icon: Mountain,
    description:
      "Kegiatan penjelajahan khusus yang bersifat petualangan atau non-penelitian.",
  },
];
</script>
