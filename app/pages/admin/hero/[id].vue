<script setup lang="ts">
import CloudinaryAssetPicker from '@/components/admin/CloudinaryAssetPicker.vue';
import { Button } from '@/components/ui/button';
import { useApi } from '@/composables/useApi';
import { ArrowLeft, Loader, Save, Upload } from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

definePageMeta({
    layout: 'admin',
});

const router = useRouter();
const route = useRoute();
const { getHeroSlides, createHeroSlide, updateHeroSlide, loading } = useApi();

// State
const isSaving = ref(false);
const isNew = computed(() => route.params.id === 'create');
const showAssetPicker = ref(false);

const form = ref({
    name: '',
    type: '',
    location: '',
    imageUrl: '',
    description: '',
    order: 0,
    isActive: true,
});

const errors = ref<Record<string, string>>({});

// Methods
function handleAssetSelect(asset: { url: string; public_id?: string }) {
    form.value.imageUrl = asset.url;
    showAssetPicker.value = false;
}

async function fetchSlide() {
    if (isNew.value) return;

    const response = await getHeroSlides();
    if (response.success) {
        const slide = response.data.find((s: any) => s.id === route.params.id);
        if (slide) {
            form.value = { ...slide };
        } else {
            toast.error('Hero slide not found');
            router.push('/admin/hero');
        }
    } else {
        toast.error(response.message || 'Failed to load hero slide');
        router.push('/admin/hero');
    }
}

function validateForm(): boolean {
    errors.value = {};
    if (!form.value.name?.trim()) errors.value.name = 'Name is required';
    if (!form.value.type?.trim()) errors.value.type = 'Type is required';
    if (!form.value.location?.trim())
        errors.value.location = 'Location is required';
    if (!form.value.imageUrl?.trim())
        errors.value.imageUrl = 'Image is required';
    if (!form.value.description?.trim())
        errors.value.description = 'Description is required';
    return Object.keys(errors.value).length === 0;
}

async function saveSlide() {
    if (!validateForm()) return;

    isSaving.value = true;
    let response;

    const formData = new FormData();
    formData.append('name', form.value.name);
    formData.append('type', form.value.type);
    formData.append('location', form.value.location);
    formData.append('description', form.value.description);
    formData.append('order', form.value.order.toString());
    formData.append('isActive', form.value.isActive.toString());

    formData.append('imageUrl', form.value.imageUrl);

    try {
        if (isNew.value) {
            response = await createHeroSlide(formData);
        } else {
            response = await updateHeroSlide(
                route.params.id as string,
                formData
            );
        }

        if (response.success) {
            toast.success(
                isNew.value
                    ? 'Hero slide created successfully'
                    : 'Hero slide updated successfully'
            );
            router.push('/admin/hero');
        } else {
            toast.error(response.message || 'Failed to save hero slide');
        }
    } catch (error) {
        console.error(error);
        toast.error('An error occurred while saving');
    } finally {
        isSaving.value = false;
    }
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
                    {{ isNew ? 'Create Hero Slide' : 'Edit Hero Slide' }}
                </h1>
                <p class="text-gray-600 dark:text-gray-400 mt-1">
                    {{
                        isNew
                            ? 'Add a new slide to the hero section'
                            : 'Update hero slide details'
                    }}
                </p>
            </div>
        </div>

        <!-- Loading State -->
        <div
            v-if="loading && !isNew"
            class="flex items-center justify-center py-12"
        >
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
                    <p
                        v-if="errors.description"
                        class="text-red-600 text-sm mt-1"
                    >
                        {{ errors.description }}
                    </p>
                </div>

                <!-- Image -->
                <div
                    class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600 space-y-4"
                >
                    <h3 class="font-medium text-gray-900 dark:text-white">
                        Featured Image *
                    </h3>

                    <div
                        class="relative aspect-video w-full bg-gray-100 dark:bg-gray-600 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-500 flex items-center justify-center group cursor-pointer"
                        @click="showAssetPicker = true"
                    >
                        <img
                            v-if="form.imageUrl"
                            :src="form.imageUrl"
                            class="absolute inset-0 w-full h-full object-cover"
                        />
                        <div v-else class="text-center p-4">
                            <Upload
                                class="w-8 h-8 mx-auto text-gray-400 mb-2"
                            />
                            <p class="text-xs text-gray-500">
                                Click to choose or upload image
                            </p>
                        </div>
                        <div
                            class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            v-if="form.imageUrl"
                        >
                            <p class="text-white text-sm font-medium">
                                Change Image
                            </p>
                        </div>
                    </div>
                    <p v-if="errors.imageUrl" class="text-red-600 text-sm">
                        {{ errors.imageUrl }}
                    </p>
                </div>

                <!-- Order -->
                <div
                    class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600 space-y-4"
                >
                    <h3 class="font-medium text-gray-900 dark:text-white">
                        Order
                    </h3>
                    <input
                        v-model.number="form.order"
                        type="number"
                        placeholder="0"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                    />
                    <p class="text-xs text-gray-500">
                        Lower numbers appear first.
                    </p>
                </div>

                <!-- Status -->
                <div
                    class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600 space-y-4"
                >
                    <h3 class="font-medium text-gray-900 dark:text-white">
                        Status
                    </h3>
                    <div class="flex items-center space-x-3">
                        <input
                            v-model="form.isActive"
                            type="checkbox"
                            id="isActive"
                            class="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label
                            for="isActive"
                            class="text-sm text-gray-700 dark:text-gray-200"
                            >Active</label
                        >
                    </div>
                </div>
            </div>

            <!-- Sidebar -->
            <div class="lg:col-span-1 space-y-6">
                <!-- Publish Actions -->
                <div
                    class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600 space-y-4"
                >
                    <h3 class="font-medium text-gray-900 dark:text-white">
                        Publish
                    </h3>
                    <div class="space-y-2">
                        <Button
                            @click="saveSlide"
                            :disabled="isSaving"
                            class="w-full bg-primary hover:bg-primary-600 dark:bg-green-500 dark:hover:bg-green-600"
                        >
                            <Save class="w-4 h-4 mr-2" />
                            {{ isSaving ? 'Saving...' : 'Save Slide' }}
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
    </div>

    <CloudinaryAssetPicker
        v-model:open="showAssetPicker"
        @select="handleAssetSelect"
        folder="bksda_v2"
    />
</template>
