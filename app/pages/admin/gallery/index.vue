<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
// Gunakan navigateTo dari Nuxt
import { navigateTo } from "#app";
import { Button } from "@/components/ui/button";
import { useConfirmDialog } from "@/composables/useConfirmDialog";
import { useApi } from "@/composables/useApi";
import { toast } from "vue-sonner";
import { Plus, Edit, Trash2, Loader, ImageOff } from "lucide-vue-next";
import { CustomTabs } from "@/components/ui/tabs";

definePageMeta({
  layout: "admin",
});

// --- 1. Peningkatan Type-Safety ---
// Definisikan tipe data untuk gambar
interface GalleryImage {
  id: string;
  imageUrl: string;
  altText: string;
  order: number;
  row: string; // Anda bisa lebih spesifik: 'ROW_1' | 'ROW_2' | 'ROW_3'
}

const {
  getGalleryImages,
  deleteGalleryImage,
  loading: initialLoading,
} = useApi();

const images = ref<GalleryImage[]>([]);
const activeTab = ref<string>("ALL");
const deletingId = ref<string | null>(null);

const tabs = ["ALL", "ROW_1", "ROW_2", "ROW_3"];

const filteredImages = computed(() => {
  if (activeTab.value === "ALL") {
    return images.value;
  }
  return images.value.filter((image) => image.row === activeTab.value);
});

async function fetchImages() {
  const response = await getGalleryImages();
  if (response.success) {
    images.value = response.data;
  } else {
    toast.error(response.message || "Failed to fetch images");
  }
}

async function confirmDelete(id: string) {
  const { open } = useConfirmDialog();
  const confirmed = await open({
    title: "Delete Image",
    message:
      "Are you sure you want to delete this image? This action is permanent.",
    confirmText: "Delete",
    cancelText: "Cancel",
    isDangerous: true,
  });

  if (!confirmed) return;

  deletingId.value = id;
  const response = await deleteGalleryImage(id);

  if (response.success) {
    images.value = images.value.filter((img) => img.id !== id);
    toast.success("Image deleted successfully");
  } else {
    toast.error(response.message || "Failed to delete image");
  }

  deletingId.value = null;
}

onMounted(() => {
  fetchImages();
});
</script>

<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          Gallery
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">
          Manage your gallery images
        </p>
      </div>
      <Button
        @click="navigateTo('/admin/gallery/create')"
        class="bg-primary hover:bg-primary-600 dark:bg-green-500 dark:hover:bg-green-600"
      >
        <Plus class="w-4 h-4 mr-2" />
        Add Image
      </Button>
    </div>

    <CustomTabs :tabs="tabs" v-model="activeTab" />

    <div class="mt-6"></div>

    <div
      v-if="initialLoading"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="n in 8"
        :key="n"
        class="group relative bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-600 animate-pulse"
      >
        <div class="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-600"></div>
        <div class="p-4">
          <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
          <div
            class="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/4 mt-2"
          ></div>
        </div>
      </div>
    </div>

    <div
      v-else-if="filteredImages.length === 0"
      class="text-center py-20 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600"
    >
      <ImageOff class="mx-auto h-12 w-12 text-gray-400" />
      <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">
        No images
      </h3>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Get started by adding a new image.
      </p>
      <div class="mt-6">
        <Button
          @click="navigateTo('/admin/gallery/create')"
          class="bg-primary hover:bg-primary-600 dark:bg-green-500 dark:hover:bg-green-600"
        >
          <Plus class="w-4 h-4 mr-2" />
          Add Image
        </Button>
      </div>
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="image in filteredImages"
        :key="image.id"
        class="group relative bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-600 transition-all hover:shadow-md"
      >
        <div
          v-if="deletingId === image.id"
          class="absolute inset-0 bg-white/70 dark:bg-gray-800/70 flex items-center justify-center z-10 transition-opacity"
        >
          <Loader class="w-6 h-6 animate-spin text-destructive" />
        </div>

        <div class="aspect-w-16 aspect-h-9">
          <img
            :src="image.imageUrl"
            :alt="image.altText"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="p-4">
          <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
            {{ image.altText }}
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            Order: {{ image.order }}
          </p>
        </div>
        <div
          class="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Button
            size="sm"
            variant="secondary"
            :disabled="!!deletingId"
            @click="navigateTo(`/admin/gallery/${image.id}`)"
          >
            <Edit class="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            :disabled="!!deletingId"
            @click="confirmDelete(image.id)"
          >
            <Trash2 class="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
