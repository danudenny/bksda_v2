<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Save,
  Loader,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-vue-next";
import { useApi } from "@/composables/useApi";
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { toast } from "vue-sonner";

definePageMeta({
  layout: "admin",
});

const router = useRouter();
const route = useRoute();
const { 
  getSpeciesById, 
  createSpecies, 
  updateSpecies, 
  uploadImage,
  loading 
} = useApi();

// State
const isSaving = ref(false);
const isNew = computed(() => route.params.id === "create");
const uploadLoading = ref(false);

const form = ref({
  name: "",
  latinName: "",
  imageUrl: "",
  description: "",
  status: "",
  habitat: "",
  population: "",
  weight: "",
  length: "",
  threats: [] as string[],
  efforts: [] as string[],
  order: 0,
  isActive: true,
});

const errors = ref<Record<string, string>>({});

// Methods
async function fetchSpecies() {
  if (isNew.value) return;

  try {
    const response = await getSpeciesById(route.params.id as string);

    if (response.success && response.data) {
      form.value = {
        ...response.data,
        threats: response.data.threats || [],
        efforts: response.data.efforts || [],
      };
    } else {
      toast.error(response.message || "Failed to load species");
      router.push("/admin/fokus-konservasi");
    }
  } catch (error) {
    console.error("Failed to fetch species:", error);
    toast.error("Failed to load species");
    router.push("/admin/fokus-konservasi");
  }
}

async function handleImageUpload(event: Event) {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length) return;

  const file = input.files[0];
  uploadLoading.value = true;

  try {
    const response = await uploadImage(file);
    if (response.success) {
      form.value.imageUrl = response.data.url;
      toast.success("Image uploaded successfully");
    } else {
      toast.error(response.message || "Failed to upload image");
    }
  } catch (error) {
    console.error("Upload error:", error);
    toast.error("Failed to upload image");
  } finally {
    uploadLoading.value = false;
  }
}

function addThreat() {
  form.value.threats.push("");
}

function removeThreat(index: number) {
  form.value.threats.splice(index, 1);
}

function addEffort() {
  form.value.efforts.push("");
}

function removeEffort(index: number) {
  form.value.efforts.splice(index, 1);
}

function validateForm(): boolean {
  errors.value = {};
  if (!form.value.name.trim()) errors.value.name = "Name is required";
  if (!form.value.latinName.trim()) errors.value.latinName = "Latin name is required";
  if (!form.value.imageUrl) errors.value.imageUrl = "Image is required";
  return Object.keys(errors.value).length === 0;
}

async function saveSpecies() {
  if (!validateForm()) return;

  isSaving.value = true;
  try {
    // Filter empty threats/efforts
    const payload = {
      ...form.value,
      threats: form.value.threats.filter(t => t.trim()),
      efforts: form.value.efforts.filter(e => e.trim()),
    };

    let response;
    if (isNew.value) {
      response = await createSpecies(payload);
    } else {
      response = await updateSpecies(route.params.id as string, payload);
    }

    if (response.success) {
      toast.success(
        isNew.value
          ? "Species created successfully"
          : "Species updated successfully",
      );
      router.push("/admin/fokus-konservasi");
    } else {
      toast.error(response.message || "Failed to save species");
    }
  } catch (error: any) {
    console.error("Failed to save species:", error);
    toast.error(error.message || "Failed to save species");
  } finally {
    isSaving.value = false;
  }
}

onMounted(() => {
  fetchSpecies();
});
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-6 flex items-center gap-4">
      <Button
        variant="ghost"
        size="sm"
        @click="router.push('/admin/fokus-konservasi')"
        class="text-gray-600 hover:text-gray-800 dark:text-gray-400"
      >
        <ArrowLeft class="w-4 h-4 mr-2" />
        Back
      </Button>
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          {{ isNew ? "Add Species" : "Edit Species" }}
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">
          {{
            isNew
              ? "Add a new conservation focus species"
              : "Update species details"
          }}
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
              placeholder="e.g. Harimau Sumatera"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              :class="{ 'border-red-500': errors.name }"
            />
            <p v-if="errors.name" class="text-red-600 text-sm mt-1">{{ errors.name }}</p>
          </div>

          <!-- Latin Name -->
          <div>
            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Latin Name *</label>
            <input
              v-model="form.latinName"
              type="text"
              placeholder="e.g. Panthera tigris sumatrae"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white italic"
              :class="{ 'border-red-500': errors.latinName }"
            />
            <p v-if="errors.latinName" class="text-red-600 text-sm mt-1">{{ errors.latinName }}</p>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Description</label>
            <div class="prose-editor-wrapper border border-gray-300 dark:border-gray-500 rounded-lg overflow-hidden">
              <ClientOnly>
                <QuillEditor
                  v-model:content="form.description"
                  contentType="html"
                  theme="snow"
                  class="min-h-[200px]"
                />
                <template #fallback>
                  <div class="h-48 bg-gray-100 dark:bg-gray-600 animate-pulse"></div>
                </template>
              </ClientOnly>
            </div>
          </div>
        </div>

        <!-- Details -->
        <div class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600 space-y-4">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Species Details</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Status</label>
              <input
                v-model="form.status"
                type="text"
                placeholder="e.g. Critically Endangered"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Habitat</label>
              <input
                v-model="form.habitat"
                type="text"
                placeholder="e.g. Hutan Hujan Tropis"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Population</label>
              <input
                v-model="form.population"
                type="text"
                placeholder="e.g. < 400 individu"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Weight</label>
              <input
                v-model="form.weight"
                type="text"
                placeholder="e.g. 100-140 kg"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Length</label>
              <input
                v-model="form.length"
                type="text"
                placeholder="e.g. 2.2-2.5 meter"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
            </div>
          </div>
        </div>

        <!-- Lists -->
        <div class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600 space-y-6">
          <!-- Threats -->
          <div>
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Threats</h2>
              <Button size="sm" variant="outline" @click="addThreat">
                <Plus class="w-4 h-4 mr-2" /> Add Threat
              </Button>
            </div>
            <div class="space-y-3">
              <div v-for="(threat, index) in form.threats" :key="index" class="flex gap-2">
                <input
                  v-model="form.threats[index]"
                  type="text"
                  placeholder="Enter threat..."
                  class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                />
                <Button variant="ghost" size="icon" class="text-red-500 hover:text-red-700 hover:bg-red-50" @click="removeThreat(index)">
                  <Trash2 class="w-4 h-4" />
                </Button>
              </div>
              <div v-if="form.threats.length === 0" class="text-sm text-gray-500 italic">No threats added yet.</div>
            </div>
          </div>

          <!-- Efforts -->
          <div>
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Conservation Efforts</h2>
              <Button size="sm" variant="outline" @click="addEffort">
                <Plus class="w-4 h-4 mr-2" /> Add Effort
              </Button>
            </div>
            <div class="space-y-3">
              <div v-for="(effort, index) in form.efforts" :key="index" class="flex gap-2">
                <input
                  v-model="form.efforts[index]"
                  type="text"
                  placeholder="Enter effort..."
                  class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                />
                <Button variant="ghost" size="icon" class="text-red-500 hover:text-red-700 hover:bg-red-50" @click="removeEffort(index)">
                  <Trash2 class="w-4 h-4" />
                </Button>
              </div>
              <div v-if="form.efforts.length === 0" class="text-sm text-gray-500 italic">No efforts added yet.</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Publish Actions -->
        <div class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600 space-y-4">
          <h3 class="font-medium text-gray-900 dark:text-white">Publish</h3>
          
          <div class="flex items-center space-x-3">
            <input
              v-model="form.isActive"
              type="checkbox"
              id="isActive"
              class="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label for="isActive" class="text-sm text-gray-700 dark:text-gray-200">Active</label>
          </div>

          <div class="pt-4 space-y-2">
            <Button
              @click="saveSpecies"
              :disabled="isSaving"
              class="w-full bg-primary hover:bg-primary-600 dark:bg-green-500 dark:hover:bg-green-600"
            >
              <Save class="w-4 h-4 mr-2" />
              {{ isSaving ? "Saving..." : "Save Species" }}
            </Button>
            <Button
              variant="outline"
              @click="router.push('/admin/fokus-konservasi')"
              class="w-full"
            >
              Cancel
            </Button>
          </div>
        </div>

        <!-- Image -->
        <div class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600 space-y-4">
          <h3 class="font-medium text-gray-900 dark:text-white">Featured Image *</h3>
          
          <div 
            class="relative aspect-[3/4] w-full bg-gray-100 dark:bg-gray-600 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-500 flex items-center justify-center group"
          >
            <img
              v-if="form.imageUrl"
              :src="form.imageUrl"
              class="absolute inset-0 w-full h-full object-cover"
            />
            <div v-else class="text-center p-4">
              <Upload class="w-8 h-8 mx-auto text-gray-400 mb-2" />
              <p class="text-xs text-gray-500">Click to upload image</p>
            </div>
            
            <div class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" v-if="form.imageUrl">
              <p class="text-white text-sm font-medium">Change Image</p>
            </div>

            <div class="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-800/80 z-10" v-if="uploadLoading">
              <Loader class="w-8 h-8 animate-spin text-primary" />
            </div>

            <input
              type="file"
              accept="image/*"
              class="absolute inset-0 opacity-0 cursor-pointer z-20"
              @change="handleImageUpload"
              :disabled="uploadLoading"
            />
          </div>
          <p v-if="errors.imageUrl" class="text-red-600 text-sm">{{ errors.imageUrl }}</p>
        </div>

        <!-- Order -->
        <div class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600 space-y-4">
          <h3 class="font-medium text-gray-900 dark:text-white">Order</h3>
          <input
            v-model.number="form.order"
            type="number"
            placeholder="0"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
          />
          <p class="text-xs text-gray-500">Lower numbers appear first.</p>
        </div>
      </div>
    </div>
  </div>
</template>
