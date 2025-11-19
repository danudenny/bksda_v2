<script setup lang="ts">
import { ref, onMounted, computed, watch, onBeforeUnmount } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Loader, Upload, X, Sparkles, Wand2 } from "lucide-vue-next";
import { useAuthStore } from "@/stores/auth";
import { toast } from "vue-sonner";

// --- QUILL EDITOR IMPORTS ---
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

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

// --- QUILL EDITOR CONFIGURATION ---
const editorOptions = ref({
  theme: 'snow',
  placeholder: 'Tulis konten berita di sini...',
  modules: {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered'}, { list: 'bullet' }],
      [{ script: 'sub'}, { script: 'super' }],
      [{ indent: '-1'}, { indent: '+1' }],
      [{ color: [] }, { background: [] }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  },
});

const categories = ref<any[]>([]);
const errors = ref<Record<string, string>>({});
const imageSource = ref<"url" | "upload">("url");
const uploadedFile = ref<File | null>(null);
const fileInputRef = ref<HTMLInputElement | null>(null);
const isUploadingImage = ref(false);
const isGeneratingExcerpt = ref(false);
const isEnhancingContent = ref(false);

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
        excerpt: response.data.description || "",
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

const previewUrl = ref<string | null>(null);

watch(uploadedFile, (newFile) => {
  if (newFile) {
    previewUrl.value = URL.createObjectURL(newFile);
  } else {
    if (previewUrl.value) {
      URL.revokeObjectURL(previewUrl.value);
      previewUrl.value = null;
    }
  }
});

onBeforeUnmount(() => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
  }
});

function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  
  if (file) {
    if (!file.type.startsWith("image/")) {
      toast.error("Invalid File Type", { description: "Please select a valid image file." });
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB
      toast.error("File Too Large", { description: "Image size must be less than 5MB." });
      return;
    }
    
    uploadedFile.value = file;
    // The watcher will create the preview URL
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

async function generateExcerpt() {
  if (!form.value.content) {
    toast.warning("Content is empty", { description: "Please write some content before generating an excerpt." });
    return;
  }

  isGeneratingExcerpt.value = true;
  try {
    const response = await $fetch('/api/generate-excerpt', {
      method: 'POST',
      body: { content: form.value.content },
    });

    if (response.success) {
      form.value.excerpt = response.data.excerpt;
      toast.success("Excerpt generated successfully");
    } else {
      toast.error("Failed to generate excerpt", { description: response.message });
    }
  } catch (error: any) {
    toast.error("An error occurred", { description: error.message });
  }
  isGeneratingExcerpt.value = false;
}

async function enhanceContent() {
  if (!form.value.content || form.value.content.trim().length < 20) {
    toast.warning("Content is too short", { description: "Please write more content before enhancing it with AI." });
    return;
  }

  isEnhancingContent.value = true;
  try {
    const response = await $fetch('/api/enhance-content', {
      method: 'POST',
      body: { content: form.value.content },
    });

    if (response.success) {
      form.value.content = response.data.enhancedContent;
      toast.success("Content enhanced successfully");
    } else {
      toast.error("Failed to enhance content", { description: response.message });
    }
  } catch (error: any) {
    toast.error("An error occurred", { description: error.message });
  }
  isEnhancingContent.value = false;
}

async function savePost() {
  if (!validateForm()) return;

  isSaving.value = true;
  try {
    const authStore = useAuthStore();
    const method = isNew.value ? "POST" : "PUT";
    const url = isNew.value ? "/api/posts" : `/api/posts/${route.params.id}`;

    const formData = new FormData();
    formData.append('title', form.value.title);
    formData.append('slug', form.value.slug);
    formData.append('content', form.value.content);
    formData.append('excerpt', form.value.excerpt);
    formData.append('categoryId', form.value.categoryId);
    formData.append('published', String(form.value.published));

    if (imageSource.value === 'upload' && uploadedFile.value) {
      formData.append('image', uploadedFile.value);
    } else {
      formData.append('imageUrl', form.value.imageUrl);
    }

    const response = await $fetch(url, {
      method,
      body: formData,
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

onMounted(() => {
  fetchCategories();
  fetchPost();
});
</script>

<template>
  <div>
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

    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <Loader class="w-8 h-8 animate-spin text-primary" />
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
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
        </div>

        <div class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600">
          <div class="flex justify-between items-center mb-2">
            <label class="block text-sm font-medium text-gray-900 dark:text-white">
              Excerpt
            </label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              @click="generateExcerpt"
              :disabled="isGeneratingExcerpt"
            >
              <Loader v-if="isGeneratingExcerpt" class="w-4 h-4 mr-2 animate-spin" />
              <Sparkles v-else class="w-4 h-4 mr-2" />
              Generate
            </Button>
          </div>
          <textarea
            v-model="form.excerpt"
            placeholder="A short summary of the post, or generate one from the content."
            rows="3"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
          />
        </div>

        <div class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600">
          <div class="flex justify-between items-center mb-2">
            <label class="block text-sm font-medium text-gray-900 dark:text-white">
              Content *
            </label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              @click="enhanceContent"
              :disabled="isEnhancingContent"
            >
              <Loader v-if="isEnhancingContent" class="w-4 h-4 mr-2 animate-spin" />
              <Wand2 v-else class="w-4 h-4 mr-2" />
              Enhance with AI
            </Button>
          </div>
          
          <div class="prose-editor-wrapper" :class="{ 'border-red-500 border rounded-lg': errors.content }">
            <ClientOnly>
              <QuillEditor
                v-model:content="form.content"
                contentType="html"
                :options="editorOptions"
                class="min-h-[300px]"
              />
              <template #fallback>
                <div class="h-64 bg-gray-100 dark:bg-gray-600 animate-pulse rounded-lg"></div>
              </template>
            </ClientOnly>
          </div>

          <p v-if="errors.content" class="text-red-600 text-sm mt-1">
            {{ errors.content }}
          </p>
        </div>
      </div>

      <div class="space-y-6">
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

        <div class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600">
          <label class="block text-sm font-medium text-gray-900 dark:text-white mb-3">
            Image Source *
          </label>
          <div class="flex gap-4 mb-4">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input v-model="imageSource" type="radio" value="url" class="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"/>
              <span class="text-sm text-gray-700 dark:text-gray-300">URL</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input v-model="imageSource" type="radio" value="upload" class="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"/>
              <span class="text-sm text-gray-700 dark:text-gray-300">Upload</span>
            </label>
          </div>

          <div v-if="imageSource === 'url'" class="space-y-2">
            <input v-model="form.imageUrl" type="url" placeholder="https://example.com/image.jpg" class="w-full px-4 py-2 border border-gray-300 rounded-lg" :class="{ 'border-red-500': errors.imageUrl }"/>
          </div>
          <div v-else class="space-y-2">
            <input ref="fileInputRef" type="file" accept="image/*" class="hidden" @change="handleFileSelect"/>
            <Button type="button" variant="outline" class="w-full" @click="triggerFileInput">
              <Upload class="w-4 h-4 mr-2" />
              {{ uploadedFile ? "Change Image" : "Upload Image" }}
            </Button>
          </div>
           <p v-if="errors.imageUrl" class="text-red-600 text-sm mt-2">{{ errors.imageUrl }}</p>
                      <div v-if="previewUrl || form.imageUrl" class="mt-4 relative">
            <img :src="previewUrl || form.imageUrl" class="w-full h-40 object-cover rounded-lg"/>
            <button v-if="imageSource === 'upload' && uploadedFile" @click="clearUploadedFile" class="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-lg hover:bg-red-600 transition-colors"><X class="w-4 h-4"/></button>
           </div>
        </div>

        <div class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600">
          <label class="flex items-center space-x-3 cursor-pointer">
            <input v-model="form.published" type="checkbox" class="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"/>
            <span class="text-sm font-medium text-gray-900 dark:text-white">Publish immediately</span>
          </label>
        </div>

        <div class="space-y-2">
          <Button @click="savePost" :disabled="isSaving" class="w-full bg-primary hover:bg-primary-600">
            <Save class="w-4 h-4 mr-2" />{{ isSaving ? "Saving..." : "Save Post" }}
          </Button>
          <Button variant="outline" @click="router.push('/admin/posts')" class="w-full">Cancel</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.prose-editor-wrapper .ql-editor {
  min-height: 300px;
}
.dark .prose-editor-wrapper .ql-toolbar {
  border-color: #4b5563;
}
.dark .prose-editor-wrapper .ql-container {
  border-color: #4b5563;
}
.dark .prose-editor-wrapper .ql-editor {
  background-color: #374151;
  color: white;
}
.dark .prose-editor-wrapper .ql-snow .ql-stroke {
  stroke: #e5e7eb;
}
.dark .prose-editor-wrapper .ql-snow .ql-picker-label {
  color: #e5e7eb;
}
</style>