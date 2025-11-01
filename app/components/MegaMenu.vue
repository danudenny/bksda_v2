<template>
  <div id="mega-menu" role="dialog" aria-modal="true">
    <!-- Backdrop with fade transition -->
    <transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed top-[65px] lg:top-4 bg-black/10 backdrop-blur-sm z-40 left-2 sm:left-4 right-2 sm:right-4 bottom-2 sm:bottom-4 rounded-xl cursor-pointer"
        @click="handleBackdropClick"
        aria-hidden="true"
      ></div>
    </transition>

    <!-- Menu content with scale and fade transition -->
    <transition
      enter-active-class="transition-all duration-400 ease-out"
      enter-from-class="opacity-0 scale-95 -translate-y-4"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 -translate-y-4"
    >
      <div
        v-if="isOpen"
        class="fixed top-[65px] lg:top-[90px] z-50 flex w-auto justify-center pt-1 left-2 sm:left-4 right-2 sm:right-4 origin-top"
      >
        <div class="relative w-full max-w-7xl">
          <div
            class="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-2xl ring-1 ring-black/5 sm:p-8 md:p-10 cursor-default"
            @click.stop
          >
            <div class="grid gap-8 lg:grid-cols-4">
              <NuxtLink
                to="/"
                class="hidden lg:block lg:col-span-1 rounded-xl bg-emerald-50 p-6 transition duration-300 hover:bg-emerald-100 group cursor-pointer"
                @click="emit('close')"
              >
                <Home class="h-8 w-8 text-emerald-600 mb-4" />
                <h3
                  class="text-xl font-bold text-gray-900 group-hover:text-emerald-700 transition duration-300"
                >
                  Beranda Utama
                </h3>
                <p class="mt-2 text-sm text-gray-600">
                  Kembali ke halaman utama Balai Konservasi Sumber Daya Alam
                  Sumatera Selatan.
                </p>
                <span
                  class="mt-4 inline-flex items-center text-sm font-semibold text-emerald-600 group-hover:text-emerald-700 transition duration-300"
                >
                  Akses Cepat →
                </span>
              </NuxtLink>

              <div class="lg:col-span-3">
                <div
                  class="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
                >
                  <template v-for="item in menuItems" :key="item.label">
                    <div
                      v-for="child in item.children"
                      :key="child.label"
                      class="col-span-1"
                    >
                      <template v-if="child.children">
                        <div class="mb-3 flex items-center gap-3">
                          <span
                            class="rounded-full bg-emerald-100 p-1.5 text-emerald-600"
                          >
                            <component
                              :is="iconMap[item.icon || 'default']"
                              class="h-4 w-4"
                              aria-hidden="true"
                            />
                          </span>
                          <p
                            class="text-sm font-bold uppercase tracking-wide text-gray-700"
                          >
                            {{ child.label }}
                          </p>
                        </div>

                        <ul
                          class="ml-4 space-y-2 border-l border-gray-200 pl-4"
                        >
                          <li
                            v-for="grandchild in child.children"
                            :key="grandchild.label"
                          >
                            <NuxtLink
                              to="#"
                              class="flex items-center gap-2 text-sm text-gray-600 transition duration-200 hover:text-emerald-600 hover:translate-x-0.5"
                              @click="emit('close')"
                            >
                              {{ grandchild.label }}
                            </NuxtLink>
                          </li>
                        </ul>
                      </template>

                      <NuxtLink
                        v-else
                        to="#"
                        class="flex items-center gap-2 text-sm font-medium text-gray-600 transition duration-200 hover:translate-x-0.5 hover:text-emerald-600"
                        @click="emit('close')"
                      >
                        {{ child.label }}
                      </NuxtLink>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import {
  FileText,
  GalleryVertical,
  Handshake,
  Home,
  Menu,
  Mountain,
  NotebookPen,
  TreePine,
  Users,
} from "lucide-vue-next";

type MenuItem = {
  label: string;
  description?: string;
  icon?: string;
  children?: MenuItem[];
};

defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();

const handleBackdropClick = () => {
  emit('close');
};

const iconMap: any = {
  about: Users,
  profile: NotebookPen,
  conservation: TreePine,
  regulation: FileText,
  simaksi: Mountain,
  collaboration: Handshake,
  gallery: GalleryVertical,
  default: Menu,
  home: Home,
};

const menuItems: MenuItem[] = [
  {
    label: "Informasi Utama",
    icon: "profile",
    children: [
      {
        label: "Profil BKSDA",
        children: [
          { label: "Visi & Misi" },
          { label: "Organisasi" },
          { label: "Wilayah Kerja" },
          { label: "Tentang Kami" },
        ],
      },
      {
        label: "Regulasi",
        children: [
          { label: "Undang Undang" },
          { label: "Peraturan Pemerintah" },
          { label: "Peraturan Menteri" },
          { label: "Peraturan Dirjen" },
          { label: "Lainnya" },
          { label: "Internasional" },
          { label: "Pedoman" },
        ],
      },
      {
        label: "Aplikasi SIMAKSI",
        children: [
          { label: "Buku Panduan" },
          { label: "Perizinan TSL" },
          { label: "Perizinan Wisata" },
        ],
      },
    ],
  },
  {
    label: "Kawasan Konservasi",
    icon: "conservation",
    children: [
      {
        label: "Suaka Margasatwa",
        children: [
          { label: "Dangku" },
          { label: "Bentayan" },
          { label: "Isau Isau" },
          { label: "Gumai Pasemah" },
          { label: "Gunung Raya" },
        ],
      },
      {
        label: "Taman Wisata Alam",
        children: [
          { label: "Punti Kayu" },
          { label: "Isau-Isau" },
          { label: "Jering Menduyung" },
          { label: "Gunung Permisan" },
        ],
      },
      {
        label: "Taman Nasional",
        children: [{ label: "Gunung Maras" }],
      },
    ],
  },
  {
    label: "Kerjasama & Galeri",
    icon: "collaboration",
    children: [
      {
        label: "Kerjasama",
        children: [
          { label: "Pemulihan Ekosistem" },
          { label: "Penguatan Fungsi" },
        ],
      },
      {
        label: "Galeri",
        children: [{ label: "Foto" }, { label: "Video" }],
      },
    ],
  },
];
</script>
