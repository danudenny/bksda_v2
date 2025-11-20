<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Button } from "@/components/ui/button";
import { useApi } from "@/composables/useApi";
import { toast } from "vue-sonner";
import {
  ArrowLeft,
  Save,
  Loader,
  Image as ImageIcon,
  Upload,
} from "lucide-vue-next";

definePageMeta({
  layout: "admin",
});

const router = useRouter();
const route = useRoute();
const { getHeroSlides, createHeroSlide, updateHeroSlide, uploadImage, loading } = useApi();

// State
const isSaving = ref(false);
const isUploading = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const isNew = computed(() => route.params.id === "create");

const form = ref({
  name: "",
  type: "",
  location: "",
  imageUrl: "",
  description: "",
  order: 0,
  isActive: true,
});

const errors = ref<Record<string, string>>({});

// Methods
async function handleImageUpload(event: Event) {
  const input = event.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) return;

  const file = input.files[0];
  isUploading.value = true;

  try {
    const response = await uploadImage(file);
    if (response.success) {
      form.value.imageUrl = response.url;
      toast.success("Image uploaded successfully");
    } else {
      toast.error(response.message || "Failed to upload image");
    }
  } catch (error: any) {
    toast.error("Failed to upload image");
    console.error(error);
  } finally {
    isUploading.value = false;
    input.value = ""; // Reset input
  }
}

async function fetchSlide() {
  if (isNew.value) return;

  // Since there isn't a getHeroSlide(id) method, we'll fetch all and filter for now.
  // Ideally, we should add a getHeroSlide(id) endpoint, but this works given the small number of slides.
  // Wait, I can reuse the same endpoint pattern if I had a single fetch, but I only added getAll.
  // Actually, let's just use getAll and find it client side for now as MVP, or I can quickly add getOne endpoint.
  // Ah, I didn't add a getOne endpoint in my previous turn. I only added index.get, index.post, [id].put, [id].delete.
  // I should probably add [id].get.ts properly.
  // But for now, let's just fetch all and filter to save time, assuming few hero slides.
  // Actually, wait, I CANNOT just fetch all easily if I don't have the ID in the list response... wait I do have IDs.
  
  const response = await getHeroSlides();
  if (response.success) {
    const slide = response.data.find((s: any) => s.id === route.params.id);
    if (slide) {
      form.value = { ...slide };
    } else {
       toast.error("Hero slide not found");
       router.push("/admin/hero");
    }
  } else {
    toast.error(response.message || "Failed to load hero slide");
    router.push("/admin/hero");
  }
}

function validateForm(): boolean {
  errors.value = {};
  if (!form.value.name.trim()) errors.value.name = "Name is required";
  if (!form.value.type.trim()) errors.value.type = "Type is required";
  if (!form.value.location.trim()) errors.value.location = "Location is required";
  if (!form.value.imageUrl.trim()) errors.value.imageUrl = "Image URL is required";
  if (!form.value.description.trim()) errors.value.description = "Description is required";
  return Object.keys(errors.value).length === 0;
}

async function saveSlide() {
  if (!validateForm()) return;

  isSaving.value = true;
  let response;
  
  const payload = {
      ...form.value,
      order: Number(form.value.order)
  };

  if (isNew.value) {
    response = await createHeroSlide(payload);
  } else {
    response = await updateHeroSlide(route.params.id as string, payload);
  }

  if (response.success) {
    toast.success(
      isNew.value ? "Hero slide created successfully" : "Hero slide updated successfully"
    );
    router.push("/admin/hero");
  } else {
    toast.error(response.message || "Failed to save hero slide");
  }
  isSaving.value = false;
}

// Lifecycle
onMounted(() => {
  fetchSlide();
});
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-6 flex items-center gap-4">
      <Button
        variant="ghost"
        size="sm"
        @click="router.push('/admin/hero')"
        class="text-gray-600 hover:text-gray-800 dark:text-gray-400"
      >
        <ArrowLeft class="w-4 h-4 mr-2" />
        Back
      </Button>
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          {{ isNew ? "Create Hero Slide" : "Edit Hero Slide" }}
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">
          {{
            isNew
              ? "Add a new slide to the hero section"
              : "Update hero slide details"
          }}
        </p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading && !isNew" class="flex items-center justify-center py-12">
      <Loader class="w-8 h-8 animate-spin text-primary" />
    </div>

    <!-- Form -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left: Form Fields -->
      <div
        class="lg:col-span-2 bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600 space-y-6"
      >
        <!-- Name -->
        <div>
          <label
            class="block text-sm font-medium text-gray-900 dark:text-white mb-2"
            >Name *</label
          >
          <input
            v-model="form.name"
            type="text"
            placeholder="e.g. Gunung Maras"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
            :class="{ 'border-red-500': errors.name }"
          />
          <p v-if="errors.name" class="text-red-600 text-sm mt-1">
            {{ errors.name }}
          </p>
        </div>

        <!-- Type -->
        <div>
          <label
            class="block text-sm font-medium text-gray-900 dark:text-white mb-2"
            >Type *</label
          >
          <input
            v-model="form.type"
            type="text"
            placeholder="e.g. Taman Nasional"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
            :class="{ 'border-red-500': errors.type }"
          />
          <p v-if="errors.type" class="text-red-600 text-sm mt-1">
            {{ errors.type }}
          </p>
        </div>

        <!-- Location -->
        <div>
          <label
            class="block text-sm font-medium text-gray-900 dark:text-white mb-2"
            >Location *</label
          >
          <input
            v-model="form.location"
            type="text"
            placeholder="e.g. Kabupaten Bangka"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
            :class="{ 'border-red-500': errors.location }"
          />
          <p v-if="errors.location" class="text-red-600 text-sm mt-1">
            {{ errors.location }}
          </p>
        </div>

        <!-- Description -->
        <div>
          <label
            class="block text-sm font-medium text-gray-900 dark:text-white mb-2"
            >Description *</label
          >
          <textarea
            v-model="form.description"
            rows="4"
            placeholder="Brief description..."
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
            :class="{ 'border-red-500': errors.description }"
          ></textarea>
          <p v-if="errors.description" class="text-red-600 text-sm mt-1">
            {{ errors.description }}
          </p>
        </div>
        
        <!-- Image -->
        <div>
          <label
            class="block text-sm font-medium text-gray-900 dark:text-white mb-2"
            >Image *</label
          >
          
          <div class="flex gap-2">
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleImageUpload"
            />
            <Button
              type="button"
              variant="outline"
              class="w-full"
              @click="fileInput?.click()"
              :disabled="isUploading"
            >
              <Loader v-if="isUploading" class="w-4 h-4 mr-2 animate-spin" />
              <Upload v-else class="w-4 h-4 mr-2" />
              {{ isUploading ? "Uploading..." : "Upload Image" }}
            </Button>
          </div>
          
          <input
            v-if="form.imageUrl"
            v-model="form.imageUrl"
            type="text"
            readonly
            class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
          />
          
          <p v-if="errors.imageUrl" class="text-red-600 text-sm mt-1">
            {{ errors.imageUrl }}
          </p>
        </div>

        <!-- Order -->
        <div>
          <label
            class="block text-sm font-medium text-gray-900 dark:text-white mb-2"
            >Order</label
          >
          <input
            v-model.number="form.order"
            type="number"
            placeholder="0"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
          />
        </div>

        <!-- Status -->
        <div>
          <label class="flex items-center space-x-3 cursor-pointer">
            <input
              v-model="form.isActive"
              type="checkbox"
              class="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span class="text-sm font-medium text-gray-900 dark:text-white"
              >Active</span
            >
          </label>
        </div>
      </div>

      <!-- Right: Image Preview & Actions -->
      <div class="lg:col-span-1 space-y-6">
          <div class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Image Preview</h3>
          <div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-600 flex items-center justify-center">
            <img v-if="form.imageUrl" :src="form.imageUrl" :alt="form.name" class="w-full h-full object-cover" />
            <div v-else class="text-gray-400">
              <ImageIcon class="w-12 h-12" />
            </div>
          </div>
        </div>
      
        <div class="space-y-2">
          <Button
            @click="saveSlide"
            :disabled="isSaving"
            class="w-full bg-primary hover:bg-primary-600 dark:bg-green-500 dark:hover:bg-green-600"
          >
            <Save class="w-4 h-4 mr-2" />
            {{ isSaving ? "Saving..." : "Save Slide" }}
          </Button>
          <Button
            variant="outline"
            @click="router.push('/admin/hero')"
            class="w-full"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
