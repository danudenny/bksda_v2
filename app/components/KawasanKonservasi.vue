<template>
  <section class="bg-white py-8 sm:py-16">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center lg:max-w-4xl">
        <h2 class="text-base font-semibold leading-7 text-emerald-600">
          Kawasan Konservasi
        </h2>
        <p
          class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
        >
          Jelajahi Wilayah Perlindungan Kami
        </p>
        <p class="mt-6 text-lg leading-8 text-gray-600">
          Setiap kawasan memiliki fokus perlindungan yang unik. Pilih kategori
          di bawah untuk melihat daftar kawasan yang kami kelola.
        </p>
      </div>

      <div
        class="mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-4"
      >
        <button
          v-for="kategori in dataKawasan"
          :key="kategori.id"
          @click="activeTab = kategori.id"
          :class="[
            'flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm sm:text-base font-semibold transition-all duration-300 transform',
            activeTab === kategori.id
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-105'
              : 'bg-white text-gray-700 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-100 hover:scale-105',
          ]"
        >
          <component :is="kategori.icon" class="h-5 w-5" aria-hidden="true" />
          <span>{{ kategori.label }}</span>
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
          <div
            :key="activeShowcase.id"
            class="grid grid-cols-1 items-center overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-900/5 lg:grid-cols-2"
          >
            <div class="relative h-64 w-full lg:h-full">
              <img
                :src="activeShowcase.imageUrl"
                :alt="activeShowcase.label"
                class="absolute h-full w-full object-cover"
                sizes="50vw"
              />
            </div>

            <div class="flex h-full flex-col p-6 sm:p-8 lg:p-10">
              <h3 class="text-2xl font-bold text-gray-900 sm:text-3xl">
                {{ activeShowcase.label }}
              </h3>
              <p class="mt-2 text-base leading-7 text-gray-600">
                {{ activeShowcase.description }}
              </p>

              <div
                class="mt-6 pt-6 border-t border-gray-200"
                aria-label="Kawasan"
              >
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="kawasan in activeShowcase.children"
                    :key="kawasan.label"
                    @click="toggleChild(kawasan.label)"
                    type="button"
                    :class="[
                      'block transform rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-300',
                      activeChildLabel === kawasan.label
                        ? 'bg-emerald-600 text-white scale-105 shadow-md shadow-emerald-600/30'
                        : 'bg-slate-100 text-gray-700 hover:bg-emerald-100 hover:text-emerald-700 hover:scale-105',
                    ]"
                  >
                    {{ kawasan.label }}
                  </button>
                </div>

                <transition name="expand">
                  <div
                    v-if="activeChildData"
                    class="relative mt-4 pt-4 border-t border-gray-100"
                  >
                    <p class="text-sm leading-6 text-gray-600">
                      {{ activeChildData.description }}
                    </p>
                    <NuxtLink
                      :to="getKawasanUrl(activeChildData.label)"
                      class="mt-3 inline-block text-sm font-semibold text-emerald-600 transition-colors hover:text-emerald-500"
                    >
                      Jelajahi Selengkapnya &rarr;
                    </NuxtLink>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { Shield, Camera, Mountain } from "lucide-vue-next";

type KawasanChild = {
  label: string;
  description: string;
};
type KategoriKawasan = {
  id: string;
  label: string;
  icon: any;
  description: string;
  imageUrl: string;
  children: KawasanChild[];
};

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};

const dataKawasan: KategoriKawasan[] = [
  {
    id: "suaka-margasatwa",
    label: "Suaka Margasatwa",
    icon: Shield,
    description:
      "Kawasan suaka alam yang melindungi satwa liar khas, sebagai tempat perlindungan, perkembangbiakan, dan habitat penting.",
    imageUrl: "/kws_konservasi/dangku.avif",
    children: [
      {
        label: "Dangku",
        description:
          "Merupakan habitat Harimau Sumatera. Kawasan dengan luas 47.996,45 hektar menyimpan potensi flora fauna yang cukup beragam.",
      },
      {
        label: "Bentayan",
        description:
          "Kawasan yang sejak tahun 1981 berfungsi sebagai kawasan konservasi.",
      },
      {
        label: "Isau Isau",
        description:
          "Kawasan ini merupakan hutan hujan pegunungan dengan jenis tumbuhan yang didominasi oleh famili Dipterocarpaceae, Fagaceae, Lauraceae.",
      },
      {
        label: "Gumai Pasemah",
        description:
          "HSA Gumai Tebing Tinggi merupakan ekosistem hutan hujan yang vegetasinya beragam dan didominasi oleh famili Dipterocapaceae.",
      },
      {
        label: "Gunung Raya",
        description:
          "SM Gunung Raya menyimpan potensi jasa lingkungan berupa penyimpanan karbon, air, wisata alam terbatas, dan wisata religi.",
      },
    ],
  },
  {
    id: "taman-wisata-alam",
    label: "Taman Wisata Alam",
    icon: Camera,
    description:
      "Kawasan pelestarian alam yang dimanfaatkan untuk rekreasi, pariwisata alam, dan edukasi lingkungan secara berkelanjutan.",
    imageUrl: "/kws_konservasi/punti.avif",
    children: [
      {
        label: "Punti Kayu",
        description:
          "Punti Kayu merupakan hutan pinus dalam kota terbesar di Indonesia. Selain menjadi tempat wisata, Punti Kayu berkontribusi dalam penyerapan karbon dioksida.",
      },
      {
        label: "Isau-Isau",
        description:
          "Kawasan ini merupakan pusat pelatihan Gajah yang ada di Sumatera Selatan. Gajah yang dikelola di kawasan ini saat ini berjumlah 10 Gajah.",
      },
      {
        label: "Jering Menduyung",
        description:
          "Kawasan TWA Jering Menduyung merupakan ekosistem mangrove yang didominasi oleh dua jenis flora, yaitu bakau dan nipah.",
      },
      {
        label: "Gunung Permisan",
        description:
          "Yang menjadi daya tarik adalah Bukit Nenek, karena adanya goa di puncak bukitnya dan batu yang terbelah serta dataran di puncak untuk melihat pemandangan.",
      },
    ],
  },
  {
    id: "taman-nasional",
    label: "Taman Nasional",
    icon: Mountain,
    description:
      "Ekosistem asli yang dikelola untuk tujuan penelitian, ilmu pengetahuan, pendidikan, dan pelestarian keanekaragaman hayati.",
    imageUrl: "/kws_konservasi/gnmaras.avif",
    children: [
      {
        label: "Gunung Maras",
        description:
          "Keunikan kawasan ini terdiri dari beberapa tipe ekosistem yang menjadi satu kesatuan bentang alam, yaitu ekosistem mangrove, pegunungan, dan dataran rendah.",
      },
    ],
  },
];

const activeTab = ref<string>("suaka-margasatwa");
const activeShowcase = computed(() => {
  return dataKawasan.find((k) => k.id === activeTab.value)!;
});

const defaultActiveShowcase = dataKawasan.find((k) => k.id === activeTab.value);

const initialChildLabel =
  defaultActiveShowcase && defaultActiveShowcase.children.length > 0
    ? defaultActiveShowcase.children[0].label
    : null;

const activeChildLabel = ref<string | null>(initialChildLabel);

const activeChildData = computed(() => {
  if (!activeChildLabel.value) return null;
  return activeShowcase.value.children.find(
    (c) => c.label === activeChildLabel.value,
  );
});

function toggleChild(label: string) {
  if (activeChildLabel.value === label) {
    activeChildLabel.value = null;
  } else {
    activeChildLabel.value = label;
  }
}

const getKawasanUrl = (childLabel: string) => {
  if (!activeShowcase.value) return "/";
  return `/kawasan/${slugify(activeShowcase.value.id)}/${slugify(childLabel)}`;
};

watch(activeTab, (newTabId) => {
  const newShowcase = dataKawasan.find((k) => k.id === newTabId);

  if (newShowcase && newShowcase.children.length > 0) {
    activeChildLabel.value = newShowcase.children[0].label;
  } else {
    activeChildLabel.value = null;
  }
});
</script>
