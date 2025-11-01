<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Loader, Upload, X } from "lucide-vue-next";
import { useAuthStore } from "@/stores/auth";
import { toast } from "vue-sonner";

definePageMeta({
  layout: "admin",
});

const router = useRouter();
const route = useRoute();

// State
const isLoading = ref(false);
const isSaving = ref(false);
const isNew = computed(() => route.params.id === "create");

const form = ref({
  title: "",
  slug: "",
  content: "",
  excerpt: "",
  imageUrl: "",
  categoryId: "",
  published: false,
});

const categories = ref<any[]>([]);
const errors = ref<Record<string, string>>({});
const imageSource = ref<"url" | "upload">("url");
const uploadedFile = ref<File | null>(null);
const fileInputRef = ref<HTMLInputElement | null>(null);
const isUploadingImage = ref(false);

// Methods
async function fetchCategories() {
  try {
    const response = await $fetch("/api/categories", {
      query: { limit: 100 },
    });

    if (response.success) {
      categories.value = response.data;
    }
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
}

async function fetchPost() {
  if (isNew.value) return;

  isLoading.value = true;
  try {
    const authStore = useAuthStore();
    const response = await $fetch(`/api/posts/${route.params.id}`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    if (response.success) {
      form.value = {
        title: response.data.title,
        slug: response.data.slug,
        content: response.data.content,
        excerpt: response.data.excerpt || "",
        imageUrl: response.data.imageUrl,
        categoryId: response.data.categoryId,
        published: response.data.published,
      };
    }
  } catch (error) {
    console.error("Failed to fetch post:", error);
    alert("Failed to load post");
    router.push("/admin/posts");
  } finally {
    isLoading.value = false;
  }
}

function generateSlug() {
  form.value.slug = form.value.title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Watch title for real-time slug generation
watch(
  () => form.value.title,
  () => {
    generateSlug();
  }
);

function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  
  if (file) {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file");
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }
    
    uploadedFile.value = file;
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      form.value.imageUrl = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
}

function triggerFileInput() {
  fileInputRef.value?.click();
}

function clearUploadedFile() {
  uploadedFile.value = null;
  form.value.imageUrl = "";
  if (fileInputRef.value) {
    fileInputRef.value.value = "";
  }
}

function validateForm(): boolean {
  errors.value = {};

  if (!form.value.title.trim()) {
    errors.value.title = "Title is required";
  }

  if (!form.value.slug.trim()) {
    errors.value.slug = "Slug is required";
  }

  if (!form.value.content.trim()) {
    errors.value.content = "Content is required";
  }

  if (!form.value.categoryId) {
    errors.value.categoryId = "Category is required";
  }

  if (!form.value.imageUrl.trim()) {
    errors.value.imageUrl = "Image URL is required";
  }

  return Object.keys(errors.value).length === 0;
}

async function savePost() {
  if (!validateForm()) return;

  isSaving.value = true;
  try {
    const authStore = useAuthStore();
    const method = isNew.value ? "POST" : "PUT";
    const url = isNew.value ? "/api/posts" : `/api/posts/${route.params.id}`;

    const response = await $fetch(url, {
      method,
      body: form.value,
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    if (response.success) {
      toast.success(isNew.value ? "Post created successfully" : "Post updated successfully");
      router.push("/admin/posts");
    }
  } catch (error: any) {
    console.error("Failed to save post:", error);
    toast.error(error.data?.message || "Failed to save post");
  } finally {
    isSaving.value = false;
  }
}

// Lifecycle
onMounted(() => {
  fetchCategories();
  fetchPost();
});
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-6 flex items-center gap-4">
      <Button
        variant="ghost"
        size="sm"
        @click="router.push('/admin/posts')"
        class="text-gray-600 hover:text-gray-800 dark:text-gray-400"
      >
        <ArrowLeft class="w-4 h-4 mr-2" />
        Back
      </Button>
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          {{ isNew ? "Create Post" : "Edit Post" }}
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">
          {{ isNew ? "Create a new blog post or news article" : "Update post details" }}
        </p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <Loader class="w-8 h-8 animate-spin text-primary" />
    </div>

    <!-- Form -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Title -->
        <div class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600">
          <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Title *
          </label>
          <input
            v-model="form.title"
            type="text"
            placeholder="Enter post title"
            @blur="generateSlug"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
            :class="{ 'border-red-500': errors.title }"
          />
          <p v-if="errors.title" class="text-red-600 text-sm mt-1">
            {{ errors.title }}
          </p>
        </div>

        <!-- Slug -->
        <div class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600">
          <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Slug *
          </label>
          <input
            v-model="form.slug"
            type="text"
            placeholder="post-slug"
            readonly
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white bg-gray-100 dark:bg-gray-600 cursor-not-allowed"
            :class="{ 'border-red-500': errors.slug }"
          />
          <p v-if="errors.slug" class="text-red-600 text-sm mt-1">
            {{ errors.slug }}
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Auto-generated from title (read-only)
          </p>
        </div>

        <!-- Excerpt -->
        <div class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600">
          <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Excerpt
          </label>
          <textarea
            v-model="form.excerpt"
            placeholder="Brief summary of the post"
            rows="3"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
          />
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Optional: Brief summary for preview
          </p>
        </div>

        <!-- Content -->
        <div class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600">
          <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Content *
          </label>
          <textarea
            v-model="form.content"
            placeholder="Write your post content here..."
            rows="12"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white font-mono text-sm"
            :class="{ 'border-red-500': errors.content }"
          />
          <p v-if="errors.content" class="text-red-600 text-sm mt-1">
            {{ errors.content }}
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Supports plain text or HTML
          </p>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Category -->
        <div class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600">
          <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Category *
          </label>
          <select
            v-model="form.categoryId"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
            :class="{ 'border-red-500': errors.categoryId }"
          >
            <option value="">Select a category</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
          <p v-if="errors.categoryId" class="text-red-600 text-sm mt-1">
            {{ errors.categoryId }}
          </p>
        </div>

        <!-- Image Source -->
        <div class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600">
          <label class="block text-sm font-medium text-gray-900 dark:text-white mb-3">
            Image Source *
          </label>
          <div class="flex gap-4 mb-4">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="imageSource"
                type="radio"
                value="url"
                class="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span class="text-sm text-gray-700 dark:text-gray-300">URL</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="imageSource"
                type="radio"
                value="upload"
                class="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span class="text-sm text-gray-700 dark:text-gray-300">Upload</span>
            </label>
          </div>

          <!-- URL Input -->
          <div v-if="imageSource === 'url'" class="space-y-2">
            <input
              v-model="form.imageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              :class="{ 'border-red-500': errors.imageUrl }"
            />
            <p class="text-xs text-gray-500 dark:text-gray-400">
              Enter image URL
            </p>
          </div>

          <!-- File Upload -->
          <div v-else class="space-y-2">
            <input
              ref="fileInputRef"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleFileSelect"
            />
            <Button
              type="button"
              variant="outline"
              class="w-full"
              @click="triggerFileInput"
              :disabled="isUploadingImage"
            >
              <Upload class="w-4 h-4 mr-2" />
              {{ uploadedFile ? "Change Image" : "Upload Image" }}
            </Button>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              Max 5MB. Formats: JPG, PNG, WebP, AVIF
            </p>
          </div>

          <p v-if="errors.imageUrl" class="text-red-600 text-sm mt-2">
            {{ errors.imageUrl }}
          </p>

          <!-- Image Preview -->
          <div v-if="form.imageUrl" class="mt-4 relative">
            <img
              :src="form.imageUrl"
              :alt="form.title"
              class="w-full h-40 object-cover rounded-lg"
              @error="form.imageUrl = ''"
            />
            <button
              v-if="imageSource === 'upload' && uploadedFile"
              @click="clearUploadedFile"
              class="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full transition-colors"
              title="Remove image"
            >
              <X class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Status -->
        <div class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600">
          <label class="flex items-center space-x-3 cursor-pointer">
            <input
              v-model="form.published"
              type="checkbox"
              class="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span class="text-sm font-medium text-gray-900 dark:text-white">
              Publish immediately
            </span>
          </label>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {{ form.published ? "This post will be visible to public" : "This post will be saved as draft" }}
          </p>
        </div>

        <!-- Actions -->
        <div class="space-y-2">
          <Button
            @click="savePost"
            :disabled="isSaving"
            class="w-full bg-primary hover:bg-primary-600 dark:bg-green-500 dark:hover:bg-green-600"
          >
            <Save class="w-4 h-4 mr-2" />
            {{ isSaving ? "Saving..." : "Save Post" }}
          </Button>
          <Button
            variant="outline"
            @click="router.push('/admin/posts')"
            class="w-full"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
