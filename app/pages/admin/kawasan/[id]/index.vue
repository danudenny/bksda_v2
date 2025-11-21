<script setup lang="ts">
import CloudinaryAssetPicker from '@/components/admin/CloudinaryAssetPicker.vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApi } from '@/composables/useApi';
import {
    ArrowLeft,
    Edit,
    Loader,
    MapPin,
    Plus,
    Save,
    Trash2,
    Upload,
} from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

definePageMeta({
    layout: 'admin',
});

const router = useRouter();
const route = useRoute();
const {
    request,
    createKawasanCategory,
    updateKawasanCategory,
    deleteKawasanLocation,
    loading,
} = useApi();

// State
const isSaving = ref(false);
const isNew = computed(() => route.params.id === 'create');
const uploadLoading = ref(false);
const categoryId = ref<string | null>(null);

// Cloudinary picker state
const showAssetDialog = ref(false);
const form = ref({
    name: '',
    description: '',
    imageUrl: '',
    order: 0,
    isActive: true,
});

const locations = ref<any[]>([]);
const errors = ref<Record<string, string>>({});

// Methods
async function fetchCategory() {
    if (isNew.value) return;

    try {
        const response = await request(
            `/kawasan/categories/${route.params.id}`,
            {
                params: { includeInactive: 1 },
            }
        );

        if (response.success && response.data) {
            categoryId.value = response.data.id;
            form.value = {
                name: response.data.name,
                description: response.data.description || '',
                imageUrl: response.data.imageUrl,
                order: response.data.order || 0,
                isActive: response.data.isActive,
            };
            locations.value = response.data.locations || [];
        } else {
            toast.error(response.message || 'Failed to load category');
            router.push('/admin/kawasan');
        }
    } catch (error) {
        console.error('Failed to fetch category:', error);
        toast.error('Failed to load category');
        router.push('/admin/kawasan');
    }
}

function openAssetDialog() {
    showAssetDialog.value = true;
}

function onAssetPicked(asset: any) {
    form.value.imageUrl = asset.url;
    showAssetDialog.value = false;
    toast.success('Image selected');
}

function validateForm(): boolean {
    errors.value = {};
    if (!form.value.name.trim()) errors.value.name = 'Name is required';
    if (!form.value.imageUrl) errors.value.imageUrl = 'Image is required';
    if (!form.value.description.trim())
        errors.value.description = 'Description is required';
    return Object.keys(errors.value).length === 0;
}

async function saveCategory() {
    if (!validateForm()) return;

    isSaving.value = true;
    try {
        const payload = { ...form.value };
        let response;
        if (isNew.value) {
            response = await createKawasanCategory(payload);
        } else {
            response = await updateKawasanCategory(
                route.params.id as string,
                payload
            );
        }

        if (response.success) {
            toast.success(
                isNew.value
                    ? 'Category created successfully'
                    : 'Category updated successfully'
            );
            if (isNew.value && response.data?.id) {
                // Redirect to edit page to allow adding locations
                router.replace(`/admin/kawasan/${response.data.id}`);
            } else {
                await fetchCategory();
            }
        } else {
            toast.error(response.message || 'Failed to save category');
        }
    } catch (error: any) {
        console.error('Failed to save category:', error);
        toast.error(error.message || 'Failed to save category');
    } finally {
        isSaving.value = false;
    }
}

async function removeLocation(id: string) {
    if (!confirm('Are you sure you want to delete this location?')) return;

    const res = await deleteKawasanLocation(id);
    if (res.success) {
        locations.value = locations.value.filter((l: any) => l.id !== id);
        toast.success('Location deleted');
    } else {
        toast.error(res.message || 'Failed to delete location');
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
                    {{ isNew ? 'Add Category' : 'Edit Category' }}
                </h1>
                <p class="text-gray-600 dark:text-gray-400 mt-1">
                    {{
                        isNew
                            ? 'Add a new conservation category'
                            : 'Manage category and its locations'
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

        <div v-else>
            <Tabs default-value="general" class="w-full">
                <TabsList class="mb-6">
                    <TabsTrigger value="general"
                        >General Information</TabsTrigger
                    >
                    <TabsTrigger value="locations" :disabled="isNew">
                        Locations
                        <Badge
                            v-if="locations.length"
                            variant="secondary"
                            class="ml-2 h-5 px-1.5 rounded-full text-xs"
                        >
                            {{ locations.length }}
                        </Badge>
                    </TabsTrigger>
                </TabsList>

                <!-- General Tab -->
                <TabsContent value="general">
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <!-- Main Content -->
                        <div class="lg:col-span-2 space-y-6">
                            <div
                                class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600 space-y-4"
                            >
                                <h2
                                    class="text-lg font-semibold text-gray-900 dark:text-white mb-4"
                                >
                                    Basic Information
                                </h2>

                                <!-- Name -->
                                <div>
                                    <label
                                        class="block text-sm font-medium text-gray-900 dark:text-white mb-2"
                                        >Name *</label
                                    >
                                    <input
                                        v-model="form.name"
                                        type="text"
                                        placeholder="e.g. Suaka Margasatwa"
                                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                        :class="{
                                            'border-red-500': errors.name,
                                        }"
                                    />
                                    <p
                                        v-if="errors.name"
                                        class="text-red-600 text-sm mt-1"
                                    >
                                        {{ errors.name }}
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
                                        placeholder="Describe this category..."
                                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                        :class="{
                                            'border-red-500':
                                                errors.description,
                                        }"
                                    />
                                    <p
                                        v-if="errors.description"
                                        class="text-red-600 text-sm mt-1"
                                    >
                                        {{ errors.description }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Sidebar -->
                        <div class="space-y-6">
                            <!-- Image -->
                            <div
                                class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600 space-y-4"
                            >
                                <h3
                                    class="font-medium text-gray-900 dark:text-white"
                                >
                                    Featured Image *
                                </h3>

                                <div
                                    class="relative aspect-3/2 w-full bg-gray-100 dark:bg-gray-600 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-500 flex items-center justify-center cursor-pointer"
                                    @click="openAssetDialog"
                                >
                                    <img
                                        v-if="form.imageUrl"
                                        :key="form.imageUrl"
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
                                        class="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-800/80 z-10"
                                        v-if="uploadLoading"
                                    >
                                        <Loader
                                            class="w-8 h-8 animate-spin text-primary"
                                        />
                                    </div>
                                </div>

                                <input
                                    v-if="form.imageUrl"
                                    v-model="form.imageUrl"
                                    type="text"
                                    readonly
                                    class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
                                />

                                <p
                                    v-if="errors.imageUrl"
                                    class="text-red-600 text-sm"
                                >
                                    {{ errors.imageUrl }}
                                </p>
                            </div>

                            <!-- Publish Actions -->
                            <div
                                class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600 space-y-4"
                            >
                                <h3
                                    class="font-medium text-gray-900 dark:text-white"
                                >
                                    Publish
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
                                    <p class="text-xs text-gray-500">
                                        Lower numbers appear first.
                                    </p>
                                </div>

                                <div class="pt-2 space-y-2">
                                    <Button
                                        @click="saveCategory"
                                        :disabled="isSaving"
                                        class="w-full bg-primary hover:bg-primary-600 dark:bg-green-500 dark:hover:bg-green-600"
                                    >
                                        <Save class="w-4 h-4 mr-2" />
                                        {{
                                            isSaving
                                                ? 'Saving...'
                                                : isNew
                                                  ? 'Create Category'
                                                  : 'Save Changes'
                                        }}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        @click="router.push('/admin/kawasan')"
                                        class="w-full"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <!-- Locations Tab -->
                <TabsContent value="locations">
                    <div class="space-y-6">
                        <div class="flex justify-between items-center">
                            <div>
                                <h2
                                    class="text-lg font-semibold text-gray-900 dark:text-white"
                                >
                                    Locations
                                </h2>
                                <p
                                    class="text-sm text-gray-500 dark:text-gray-400"
                                >
                                    Manage locations within this category
                                </p>
                            </div>
                            <Button
                                @click="
                                    router.push(
                                        `/admin/kawasan/${route.params.id}/locations/create`
                                    )
                                "
                                class="bg-primary hover:bg-primary-600 dark:bg-green-500 dark:hover:bg-green-600"
                            >
                                <Plus class="w-4 h-4 mr-2" />
                                Add Location
                            </Button>
                        </div>

                        <div
                            v-if="locations.length === 0"
                            class="text-center py-12 bg-white dark:bg-gray-700 rounded-lg border border-dashed border-gray-300 dark:border-gray-600"
                        >
                            <MapPin
                                class="w-12 h-12 mx-auto text-gray-400 mb-3"
                            />
                            <h3
                                class="text-lg font-medium text-gray-900 dark:text-white"
                            >
                                No locations yet
                            </h3>
                            <p class="text-gray-500 dark:text-gray-400 mb-4">
                                Get started by adding a new location to this
                                category.
                            </p>
                            <Button
                                @click="
                                    router.push(
                                        `/admin/kawasan/${route.params.id}/locations/create`
                                    )
                                "
                                variant="outline"
                            >
                                Add Location
                            </Button>
                        </div>

                        <div
                            v-else
                            class="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 overflow-hidden"
                        >
                            <div class="overflow-x-auto">
                                <table class="w-full">
                                    <thead
                                        class="bg-gray-50 dark:bg-gray-600 border-b border-gray-200 dark:border-gray-500"
                                    >
                                        <tr>
                                            <th
                                                class="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider"
                                            >
                                                Location
                                            </th>
                                            <th
                                                class="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider"
                                            >
                                                Coordinates
                                            </th>
                                            <th
                                                class="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider"
                                            >
                                                Order
                                            </th>
                                            <th
                                                class="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider"
                                            >
                                                Status
                                            </th>
                                            <th
                                                class="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider"
                                            >
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody
                                        class="divide-y divide-gray-200 dark:divide-gray-600"
                                    >
                                        <tr
                                            v-for="loc in locations"
                                            :key="loc.id"
                                            class="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                                        >
                                            <td class="px-6 py-4">
                                                <div class="flex items-center">
                                                    <div
                                                        class="h-10 w-10 shrink-0 bg-gray-100 rounded overflow-hidden"
                                                    >
                                                        <img
                                                            v-if="loc.imageUrl"
                                                            :src="loc.imageUrl"
                                                            class="h-full w-full object-cover"
                                                        />
                                                        <MapPin
                                                            v-else
                                                            class="h-5 w-5 m-2.5 text-gray-400"
                                                        />
                                                    </div>
                                                    <div class="ml-4">
                                                        <div
                                                            class="text-sm font-medium text-gray-900 dark:text-white"
                                                        >
                                                            {{ loc.name }}
                                                        </div>
                                                        <div
                                                            class="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs"
                                                        >
                                                            {{
                                                                loc.description
                                                            }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td
                                                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                                            >
                                                <div
                                                    v-if="
                                                        loc.latitude &&
                                                        loc.longitude
                                                    "
                                                >
                                                    {{
                                                        loc.latitude.toFixed(4)
                                                    }},
                                                    {{
                                                        loc.longitude.toFixed(4)
                                                    }}
                                                </div>
                                                <div
                                                    v-else
                                                    class="text-gray-400 italic"
                                                >
                                                    Not set
                                                </div>
                                            </td>
                                            <td
                                                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                                            >
                                                {{ loc.order }}
                                            </td>
                                            <td
                                                class="px-6 py-4 whitespace-nowrap"
                                            >
                                                <Badge
                                                    v-if="loc.isActive"
                                                    variant="default"
                                                    class="bg-green-600 hover:bg-green-700 dark:bg-green-700"
                                                >
                                                    Active
                                                </Badge>
                                                <Badge
                                                    v-else
                                                    variant="secondary"
                                                    class="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                                >
                                                    Inactive
                                                </Badge>
                                            </td>
                                            <td
                                                class="px-6 py-4 whitespace-nowrap text-sm space-x-2"
                                            >
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    @click="
                                                        router.push(
                                                            `/admin/kawasan/${route.params.id}/locations/${loc.id}`
                                                        )
                                                    "
                                                    class="text-gray-600 hover:text-gray-800 dark:text-gray-400"
                                                >
                                                    <Edit class="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    @click="
                                                        removeLocation(loc.id)
                                                    "
                                                    class="text-red-600 hover:text-red-800 dark:text-red-400"
                                                >
                                                    <Trash2 class="w-4 h-4" />
                                                </Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>

            <CloudinaryAssetPicker
                v-model:open="showAssetDialog"
                @select="onAssetPicked"
            />
        </div>
    </div>
</template>
