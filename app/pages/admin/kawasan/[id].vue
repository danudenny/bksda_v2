<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Loader, Plus, Trash2, Upload } from "lucide-vue-next";
import { useApi } from "@/composables/useApi";
import { toast } from "vue-sonner";

definePageMeta({
  layout: "admin",
});

const router = useRouter();
const route = useRoute();
const {
  getKawasanCategory,
  createKawasanCategory,
  updateKawasanCategory,
  createKawasanLocation,
  updateKawasanLocation,
  deleteKawasanLocation,
  request,
  loading,
} = useApi();

// State
const isSaving = ref(false);
const isNew = computed(() => route.params.id === "create");
const uploadLoading = ref(false);
const isSavingLocations = ref(false);
const categoryFileInput = ref<HTMLInputElement | null>(null);
const categorySelectedFile = ref<File | null>(null);
const categoryPreviewUrl = ref<string | null>(null);

const categoryId = ref<string | null>(null);

const form = ref({
  name: "",
  description: "",
  imageUrl: "",
  order: 0,
  isActive: true,
});

const locations = ref<any[]>([]);

const errors = ref<Record<string, string>>({});

// Methods
async function fetchCategory() {
  if (isNew.value) return;

  try {
    const response = await request(`/kawasan/categories/${route.params.id}`, {
      params: { includeInactive: 1 },
    });

    if (response.success && response.data) {
      categoryId.value = response.data.id;
      form.value = {
        name: response.data.name,
        description: response.data.description || "",
        imageUrl: response.data.imageUrl,
        order: response.data.order || 0,
        isActive: response.data.isActive,
      };
      locations.value = response.data.locations || [];
    } else {
      toast.error(response.message || "Failed to load category");
      router.push("/admin/kawasan");
    }
  } catch (error) {
    console.error("Failed to fetch category:", error);
    toast.error("Failed to load category");
    router.push("/admin/kawasan");
  }
}

async function handleImageUpload(event: Event) {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length) return;

  const file = input.files[0] as File;
  categorySelectedFile.value = file;

  if (categoryPreviewUrl.value) {
    URL.revokeObjectURL(categoryPreviewUrl.value);
  }
  categoryPreviewUrl.value = URL.createObjectURL(file);
  // Show preview in sidebar and pass validation
  form.value.imageUrl = categoryPreviewUrl.value;
}

function validateForm(): boolean {
  errors.value = {};
  if (!form.value.name.trim()) errors.value.name = "Name is required";
  if (!form.value.imageUrl) errors.value.imageUrl = "Image is required";
  if (!form.value.description.trim()) errors.value.description = "Description is required";
  return Object.keys(errors.value).length === 0;
}

async function saveCategory() {
  if (!validateForm()) return;

  isSaving.value = true;
  try {
    // Persist any pending location edits before saving the category
    if (!isNew.value && locations.value.length) {
      await saveAllLocations();
    }
    // If a new image file was selected, upload it first to get a permanent URL
    if (categorySelectedFile.value) {
      const fd = new FormData();
      fd.append('file', categorySelectedFile.value);
      const uploadRes = await request('/upload', {
        method: 'POST',
        data: fd,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (!uploadRes.success) {
        toast.error(uploadRes.message || 'Failed to upload image');
        isSaving.value = false;
        return;
      }
      form.value.imageUrl = uploadRes.data.url;
    }

    const payload = { ...form.value };
    let response;
    if (isNew.value) {
      response = await createKawasanCategory(payload);
    } else {
      response = await updateKawasanCategory(route.params.id as string, payload);
    }

    if (response.success) {
      toast.success(isNew.value ? "Category created successfully" : "Category updated successfully");
      // Refresh to ensure UI reflects persisted data
      await fetchCategory();
      router.push("/admin/kawasan");
    } else {
      toast.error(response.message || "Failed to save category");
    }
  } catch (error: any) {
    console.error("Failed to save category:", error);
    toast.error(error.message || "Failed to save category");
  } finally {
    isSaving.value = false;
  }
}

// Locations management
const newLocation = ref({
  name: "",
  description: "",
  content: "",
  imageUrl: "",
  latitude: undefined as number | undefined,
  longitude: undefined as number | undefined,
  order: 0,
});

async function addLocation() {
  if (!categoryId.value && !isNew.value) return;
  const payload = {
    name: newLocation.value.name.trim(),
    description: newLocation.value.description?.trim() || null,
    content: newLocation.value.content?.trim() || null,
    imageUrl: newLocation.value.imageUrl || null,
    latitude: newLocation.value.latitude,
    longitude: newLocation.value.longitude,
    order: newLocation.value.order || 0,
    categoryId: categoryId.value || (route.params.id as string),
  } as any;

  if (!payload.name) {
    toast.error("Location name is required");
    return;
  }

  const res = await createKawasanLocation(payload);
  if (res.success) {
    toast.success("Location added");
    // push to list
    locations.value.push(res.data);
    newLocation.value = { name: "", description: "", content: "", imageUrl: "", latitude: undefined, longitude: undefined, order: 0 };
  } else {
    toast.error(res.message || "Failed to add location");
  }
}

async function saveLocation(loc: any) {
  const res = await updateKawasanLocation(loc.id, {
    name: loc.name,
    description: loc.description,
    content: loc.content,
    imageUrl: loc.imageUrl,
    latitude: loc.latitude,
    longitude: loc.longitude,
    order: loc.order,
    isActive: loc.isActive,
  });
  if (res.success) {
    toast.success("Location updated");
    await fetchCategory();
  } else {
    toast.error(res.message || "Failed to update location");
  }
}

async function saveAllLocations() {
  if (!locations.value.length) return;
  isSavingLocations.value = true;
  try {
    const results = await Promise.all(
      locations.value.map((loc: any) =>
        updateKawasanLocation(loc.id, {
          name: loc.name,
          description: loc.description,
          content: loc.content,
          imageUrl: loc.imageUrl,
          latitude: loc.latitude,
          longitude: loc.longitude,
          order: loc.order,
          isActive: loc.isActive,
        })
      )
    );
    const failed = results.filter((r: any) => !r.success);
    if (failed.length === 0) {
      toast.success("All locations saved");
      await fetchCategory();
    } else {
      toast.error(`Failed to save ${failed.length} location(s)`);
    }
  } finally {
    isSavingLocations.value = false;
  }
}

async function removeLocation(id: string) {
  const res = await deleteKawasanLocation(id);
  if (res.success) {
    locations.value = locations.value.filter((l) => l.id !== id);
    toast.success("Location deleted");
  } else {
    toast.error(res.message || "Failed to delete location");
  }
}

async function handleLocationImageUpload(loc: any, event: Event) {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length) return;
  const file = input.files[0] as File;
  try {
    const formData = new FormData();
    formData.append('file', file);
    const resp = await request('/upload', {
      method: 'POST',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    if (resp.success) {
      loc.imageUrl = resp.data.url;
      toast.success('Image uploaded');
    } else {
      toast.error(resp.message || 'Failed to upload image');
    }
  } catch (e) {
    console.error('Upload error:', e);
    toast.error('Failed to upload image');
  }
}

async function handleNewLocationImageUpload(event: Event) {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length) return;
  const file = input.files[0] as File;
  try {
    const formData = new FormData();
    formData.append('file', file);
    const resp = await request('/upload', {
      method: 'POST',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    if (resp.success) {
      newLocation.value.imageUrl = resp.data.url;
      toast.success('Image uploaded');
    } else {
      toast.error(resp.message || 'Failed to upload image');
    }
  } catch (e) {
    console.error('Upload error:', e);
    toast.error('Failed to upload image');
  }
}

onMounted(() => {
  fetchCategory();
});
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-6 flex items-center gap-4">
      <Button
        variant="ghost"
        size="sm"
        @click="router.push('/admin/kawasan')"
        class="text-gray-600 hover:text-gray-800 dark:text-gray-400"
      >
        <ArrowLeft class="w-4 h-4 mr-2" />
        Back
      </Button>
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          {{ isNew ? "Add Category" : "Edit Category" }}
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">
          {{ isNew ? "Add a new conservation category" : "Update category details" }}
        </p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading && !isNew" class="flex items-center justify-center py-12">
      <Loader class="w-8 h-8 animate-spin text-primary" />
    </div>

    <!-- Form -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600 space-y-4">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Basic Information</h2>

          <!-- Name -->
          <div>
            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Name *</label>
            <input
              v-model="form.name"
              type="text"
              placeholder="e.g. Suaka Margasatwa"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              :class="{ 'border-red-500': errors.name }"
            />
            <p v-if="errors.name" class="text-red-600 text-sm mt-1">{{ errors.name }}</p>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Description *</label>
            <textarea
              v-model="form.description"
              rows="4"
              placeholder="Describe this category..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              :class="{ 'border-red-500': errors.description }"
            />
            <p v-if="errors.description" class="text-red-600 text-sm mt-1">{{ errors.description }}</p>
          </div>
        </div>

        <!-- Locations -->
        <div class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600 space-y-4">
          <div class="flex items-center justify-between mb-2">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Locations</h2>
            <div class="flex items-center gap-2">
              <div class="text-xs text-gray-500" v-if="isNew">Save category first to add locations.</div>
              <Button v-else size="sm" variant="outline" @click="saveAllLocations" :disabled="isSavingLocations">
                <Save class="w-4 h-4 mr-1" />
                {{ isSavingLocations ? 'Saving…' : 'Save All' }}
              </Button>
            </div>
          </div>

          <div class="space-y-4" v-if="!isNew">
            <!-- Add new location -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                v-model="newLocation.name"
                type="text"
                placeholder="Location name"
                class="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
              <input
                v-model="newLocation.description"
                type="text"
                placeholder="Short description"
                class="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
              <input
                v-model.number="newLocation.latitude"
                type="number"
                step="any"
                placeholder="Latitude"
                class="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
              <input
                v-model.number="newLocation.longitude"
                type="number"
                step="any"
                placeholder="Longitude"
                class="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
              <input
                v-model.number="newLocation.order"
                type="number"
                placeholder="Order"
                class="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
              <Button class="w-full md:w-auto" @click="addLocation"><Plus class="w-4 h-4 mr-2" /> Add</Button>
            </div>
            <textarea
              v-model="newLocation.content"
              rows="3"
              placeholder="Location content (HTML or text)"
              class="w-full mt-3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
            />
            <div class="mt-3 flex items-center gap-3">
              <div class="w-24 h-16 bg-gray-100 dark:bg-gray-600 rounded overflow-hidden border border-gray-200 dark:border-gray-500">
                <img v-if="newLocation.imageUrl" :key="newLocation.imageUrl" :src="newLocation.imageUrl" class="w-full h-full object-cover" />
              </div>
              <input type="file" accept="image/*" @change="handleNewLocationImageUpload" />
            </div>

            <!-- Existing locations -->
            <div class="space-y-4">
              <div
                v-for="loc in locations"
                :key="loc.id"
                class="rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 p-4"
              >
                <!-- Header row: name, order, active, actions -->
                <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div class="flex-1">
                    <label class="block text-xs text-gray-500 dark:text-gray-300 mb-1">Name</label>
                    <input v-model="loc.name" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white" />
                  </div>
                  <div class="flex items-center gap-3">
                    <div>
                      <label class="block text-xs text-gray-500 dark:text-gray-300 mb-1">Order</label>
                      <input v-model.number="loc.order" type="number" class="w-24 px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white" />
                    </div>
                    <div class="mt-6 md:mt-0 flex items-center gap-2">
                      <input v-model="loc.isActive" type="checkbox" :id="`active_${loc.id}`" class="w-4 h-4" />
                      <label :for="`active_${loc.id}`" class="text-sm text-gray-700 dark:text-gray-200">Active</label>
                    </div>
                    <div class="mt-6 md:mt-0 flex items-center gap-2">
                      <Button variant="outline" size="sm" @click="saveLocation(loc)">Save</Button>
                      <Button variant="ghost" size="sm" class="text-red-600" @click="removeLocation(loc.id)">
                        <Trash2 class="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <!-- Body: two columns -->
                <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- Left column -->
                  <div class="space-y-3">
                    <div>
                      <label class="block text-xs text-gray-500 dark:text-gray-300 mb-1">Short Description</label>
                      <input v-model="loc.description" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white" />
                    </div>
                    <div>
                      <label class="block text-xs text-gray-500 dark:text-gray-300 mb-1">Content</label>
                      <textarea v-model="loc.content" rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"></textarea>
                    </div>
                  </div>

                  <!-- Right column -->
                  <div class="space-y-3">
                    <div>
                      <label class="block text-xs text-gray-500 dark:text-gray-300 mb-1">Image</label>
                      <div class="flex items-center gap-3">
                        <div class="w-28 h-20 bg-gray-100 dark:bg-gray-600 rounded overflow-hidden border border-gray-200 dark:border-gray-500">
                          <img v-if="loc.imageUrl" :key="loc.imageUrl" :src="loc.imageUrl" class="w-full h-full object-cover" />
                        </div>
                        <input type="file" accept="image/*" @change="handleLocationImageUpload(loc, $event)" />
                      </div>
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                      <div>
                        <label class="block text-xs text-gray-500 dark:text-gray-300 mb-1">Latitude</label>
                        <input v-model.number="loc.latitude" type="number" step="any" class="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white" />
                      </div>
                      <div>
                        <label class="block text-xs text-gray-500 dark:text-gray-300 mb-1">Longitude</label>
                        <input v-model.number="loc.longitude" type="number" step="any" class="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Image -->
        <div class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600 space-y-4">
          <h3 class="font-medium text-gray-900 dark:text-white">Featured Image *</h3>

          <div
            class="relative aspect-[3/2] w-full bg-gray-100 dark:bg-gray-600 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-500 flex items-center justify-center"
          >
            <img
              v-if="form.imageUrl"
              :key="form.imageUrl"
              :src="form.imageUrl"
              class="absolute inset-0 w-full h-full object-cover"
            />
            <div v-else class="text-center p-4">
              <Upload class="w-8 h-8 mx-auto text-gray-400 mb-2" />
              <p class="text-xs text-gray-500">No image selected</p>
            </div>

            <div class="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-800/80 z-10" v-if="uploadLoading">
              <Loader class="w-8 h-8 animate-spin text-primary" />
            </div>
          </div>

          <div class="flex gap-2">
            <input ref="categoryFileInput" type="file" accept="image/*" class="hidden" @change="handleImageUpload" />
            <Button type="button" variant="outline" class="w-full" @click="categoryFileInput?.click()">
              <Upload class="w-4 h-4 mr-2" />
              {{ form.imageUrl ? "Change Image" : "Upload Image" }}
            </Button>
          </div>

          <input
            v-if="form.imageUrl"
            v-model="form.imageUrl"
            type="text"
            readonly
            class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
          />

          <p v-if="errors.imageUrl" class="text-red-600 text-sm">{{ errors.imageUrl }}</p>
        </div>

        <!-- Publish Actions -->
        <div class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600 space-y-4">
          <h3 class="font-medium text-gray-900 dark:text-white">Publish</h3>

          <div class="flex items-center space-x-3">
            <input v-model="form.isActive" type="checkbox" id="isActive" class="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
            <label for="isActive" class="text-sm text-gray-700 dark:text-gray-200">Active</label>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Order</label>
            <input
              v-model.number="form.order"
              type="number"
              placeholder="0"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
            />
            <p class="text-xs text-gray-500">Lower numbers appear first.</p>
          </div>

          <div class="pt-2 space-y-2">
            <Button @click="saveCategory" :disabled="isSaving" class="w-full bg-primary hover:bg-primary-600 dark:bg-green-500 dark:hover:bg-green-600">
              <Save class="w-4 h-4 mr-2" />
              {{ isSaving ? "Saving..." : (isNew ? "Create Category" : "Save Changes") }}
            </Button>
            <Button variant="outline" @click="router.push('/admin/kawasan')" class="w-full">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
