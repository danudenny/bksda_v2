<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import CloudinaryAssetPicker from "@/components/admin/CloudinaryAssetPicker.vue";
import { useApi } from "@/composables/useApi";
import { toast } from "vue-sonner";
import { ArrowLeft, Save, Loader, Image as ImageIcon, Upload } from "lucide-vue-next";

definePageMeta({
  layout: "admin",
});

const router = useRouter();
const route = useRoute();
const { getGalleryImage, createGalleryImage, updateGalleryImage, loading, request, uploadImage } = useApi();

// State
const isSaving = ref(false);
const isNew = computed(() => route.params.id === "create");
const uploadLoading = ref(false);
const showAssetDialog = ref(false);
const assets = ref<any[]>([]);
const assetsLoading = ref(false);
const assetSearch = ref("");
const nextCursor = ref<string | null>(null);
const localFileInput = ref<HTMLInputElement | null>(null);
const assetScrollRef = ref<HTMLElement | null>(null);

const isCloudinaryUrl = computed(() => {
  const u = form.value.imageUrl || "";
  return /res\.cloudinary\.com/.test(u);
});

const form = ref({
  imageUrl: "",
  altText: "",
  row: "ROW_1",
  order: 0,
  isActive: true,
});

const errors = ref<Record<string, string>>({});

const rowOptions = ["ROW_1", "ROW_2", "ROW_3"];

// Methods
async function fetchImage() {
  if (isNew.value) return;

  const response = await getGalleryImage(route.params.id as string);
  if (response.success) {
    form.value = response.data;
  } else {
    toast.error(response.message || "Failed to load image");
    router.push("/admin/gallery");
  }

function onAssetsScroll(e: Event) {
  const el = e.target as HTMLElement;
  if (!el) return;
  const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 200;
  if (nearBottom && nextCursor.value && !assetsLoading.value) {
    fetchCloudinaryAssets(false);
  }
}
}

async function importUrlToCloudinary() {
  if (!form.value.imageUrl || isCloudinaryUrl.value) return;
  uploadLoading.value = true;
  try {
    let src = form.value.imageUrl;
    if (src.startsWith("/") && typeof window !== "undefined") {
      src = window.location.origin + src;
    }
    const res = await request("/upload/remote", {
      method: "POST",
      data: { url: src, folder: "bksda_v2/uploads" },
    });
    if (res.success) {
      form.value.imageUrl = (res.data as any).url;
      toast.success("Imported to Cloudinary");
      showAssetDialog.value = false;
    } else {
      toast.error(res.message || "Failed to import to Cloudinary");
    }
  } catch (e) {
    toast.error("Failed to import to Cloudinary");
  } finally {
    uploadLoading.value = false;
  }
}

function validateForm(): boolean {
  errors.value = {};
  if (!form.value.imageUrl.trim()) errors.value.imageUrl = "Image URL is required";
  if (!form.value.altText.trim()) errors.value.altText = "Alt text is required";
  return Object.keys(errors.value).length === 0;
}

async function saveImage() {
  if (!validateForm()) return;

  isSaving.value = true;
  // Ensure image is hosted on Cloudinary
  if (!isCloudinaryUrl.value) {
    await importUrlToCloudinary();
    if (!isCloudinaryUrl.value) {
      isSaving.value = false;
      return;
    }
  }
  let response;
  if (isNew.value) {
    response = await createGalleryImage(form.value);
  } else {
    response = await updateGalleryImage(route.params.id as string, form.value);
  }

  if (response.success) {
    toast.success(isNew.value ? "Image added successfully" : "Image updated successfully");
    router.push("/admin/gallery");
  } else {
    toast.error(response.message || "Failed to save image");
  }
  isSaving.value = false;
}

// Cloudinary Picker helpers
async function fetchCloudinaryAssets(reset = false) {
  if (assetsLoading.value) return;
  assetsLoading.value = true;
  try {
    const params: any = { limit: 10 };
    if (assetSearch.value) params.q = assetSearch.value;
    if (!reset && nextCursor.value) params.nextCursor = nextCursor.value;
    const res = await request<{ assets: any[]; nextCursor: string | null }>("/cloudinary/assets", { params });
    if (res.success && res.data) {
      if (reset) assets.value = [];
      assets.value = [...assets.value, ...res.data.assets];
      nextCursor.value = res.data.nextCursor || null;
    } else {
      toast.error(res.message || "Failed to load assets");
    }
  } finally {
    assetsLoading.value = false;
  }
}

function openAssetDialog() {
  showAssetDialog.value = true;
  nextCursor.value = null;
  assets.value = [];
  fetchCloudinaryAssets(true);
}

function selectAsset(asset: any) {
  form.value.imageUrl = asset.url;
  showAssetDialog.value = false;
  toast.success("Image selected");
}

function triggerLocalUpload() {
  localFileInput.value?.click();
}

async function handleLocalUpload(event: Event) {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length) return;
  const file = input.files[0] as File;
  uploadLoading.value = true;
  try {
    const res = await uploadImage(file);
    if (res.success) {
      form.value.imageUrl = res.data.url;
      toast.success("Image uploaded successfully");
      showAssetDialog.value = false;
    } else {
      toast.error(res.message || "Failed to upload image");
    }
  } catch (e) {
    toast.error("Failed to upload image");
  } finally {
    uploadLoading.value = false;
  }
}

// Lifecycle
onMounted(() => {
  fetchImage();
});
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-6 flex items-center gap-4">
      <Button variant="ghost" size="sm" @click="router.back()" class="h-9 w-9 p-0">
        <ArrowLeft class="w-5 h-5" />
      </Button>
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          {{ isNew ? "Add New Image" : "Edit Image" }}
        </h1>
        <p class="text-gray-500 dark:text-gray-400 text-sm">
          Fill in the details below to add or update a gallery image.
        </p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading && !isNew" class="flex justify-center items-center py-20">
      <Loader class="w-10 h-10 animate-spin text-primary" />
    </div>

    <!-- Form Layout -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left: Form Fields -->
      <div class="lg:col-span-2 bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600 space-y-6">
        <!-- Image URL -->
        <div>
          <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Image URL *</label>
          <div class="flex gap-2">
            <input v-model="form.imageUrl" type="text" placeholder="https://example.com/image.jpg" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white" :class="{ 'border-red-500': errors.imageUrl }" />
            <Button type="button" variant="outline" @click="openAssetDialog">
              <Upload class="w-4 h-4 mr-2" /> Choose/Upload
            </Button>
            <Button type="button" variant="outline" @click="importUrlToCloudinary" :disabled="uploadLoading || isCloudinaryUrl">
              Import
            </Button>
          </div>
          <p v-if="errors.imageUrl" class="text-red-600 text-sm mt-1">{{ errors.imageUrl }}</p>
          <input ref="localFileInput" type="file" accept="image/*" class="hidden" @change="handleLocalUpload" :disabled="uploadLoading" />
        </div>

        <!-- Alt Text -->
        <div>
          <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Alt Text *</label>
          <input v-model="form.altText" type="text" placeholder="A descriptive alt text for the image" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white" :class="{ 'border-red-500': errors.altText }" />
          <p v-if="errors.altText" class="text-red-600 text-sm mt-1">{{ errors.altText }}</p>
        </div>

        <!-- Row -->
        <div>
          <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Row</label>
          <select v-model="form.row" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white">
            <option v-for="row in rowOptions" :key="row" :value="row">{{ row.replace('_', ' ') }}</option>
          </select>
        </div>

        <!-- Order -->
        <div>
          <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Order</label>
          <input v-model.number="form.order" type="number" placeholder="0" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white" />
        </div>

        <!-- Status -->
        <div>
          <label class="flex items-center space-x-3 cursor-pointer">
            <input v-model="form.isActive" type="checkbox" class="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
            <span class="text-sm font-medium text-gray-900 dark:text-white">Active</span>
          </label>
        </div>
      </div>

      <!-- Right: Image Preview & Actions -->
      <div class="lg:col-span-1 space-y-6">
        <div class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Image Preview</h3>
          <div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-600 flex items-center justify-center">
            <img v-if="form.imageUrl" :src="form.imageUrl" :alt="form.altText" class="w-full h-full object-cover" />
            <div v-else class="text-gray-400">
              <ImageIcon class="w-12 h-12" />
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <Button @click="saveImage" :disabled="isSaving" class="w-full bg-primary hover:bg-primary-600 dark:bg-green-500 dark:hover:bg-green-600">
            <Save class="w-4 h-4 mr-2" />
            {{ isSaving ? 'Saving...' : 'Save Image' }}
          </Button>
          <Button variant="outline" @click="router.push('/admin/gallery')" class="w-full">
            Cancel
          </Button>
        </div>
        <CloudinaryAssetPicker v-model:open="showAssetDialog" @select="selectAsset" />
      </div>
    </div>
  </div>
</template>
