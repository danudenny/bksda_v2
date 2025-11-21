<script setup lang="ts">
import CloudinaryAssetPicker from '@/components/admin/CloudinaryAssetPicker.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useApi } from '@/composables/useApi';
import { useConfirmDialog } from '@/composables/useConfirmDialog';
import { ArrowLeft, Loader, Save, Trash2, Upload } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

definePageMeta({
    layout: 'admin',
});

const router = useRouter();
const route = useRoute();
const {
    getKawasanLocation,
    updateKawasanLocation,
    deleteKawasanLocation,
    loading,
} = useApi();

const categoryId = route.params.id as string;
const locationId = route.params.locationId as string;

// State
const showAssetDialog = ref(false);
const form = ref({
    name: '',
    description: '',
    content: '',
    imageUrl: '',
    latitude: undefined as number | undefined,
    longitude: undefined as number | undefined,
    order: 0,
    isActive: true,
});

// Methods
async function fetchLocation() {
    const response = await getKawasanLocation(locationId);
    if (response.success && response.data) {
        const data = response.data;
        form.value = {
            name: data.name,
            description: data.description || '',
            content: data.content || '',
            imageUrl: data.imageUrl || '',
            latitude: data.latitude,
            longitude: data.longitude,
            order: data.order || 0,
            isActive: data.isActive,
        };
    } else {
        toast.error('Failed to load location');
        router.push(`/admin/kawasan/${categoryId}`);
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

async function handleSubmit() {
    if (!form.value.name) {
        toast.error('Name is required');
        return;
    }

    const payload = {
        ...form.value,
        order: Number(form.value.order),
    };

    const response = await updateKawasanLocation(locationId, payload);

    if (response.success) {
        toast.success('Location updated successfully');
        router.push(`/admin/kawasan/${categoryId}`);
    } else {
        toast.error(response.message || 'Failed to update location');
    }
}

async function handleDelete() {
    const { open } = useConfirmDialog();
    const confirmed = await open({
        title: 'Delete Location',
        message:
            'Are you sure you want to delete this location? This action cannot be undone.',
        confirmText: 'Delete',
        cancelText: 'Cancel',
        isDangerous: true,
    });

    if (!confirmed) return;

    const response = await deleteKawasanLocation(locationId);
    if (response.success) {
        toast.success('Location deleted');
        router.push(`/admin/kawasan/${categoryId}`);
    } else {
        toast.error(response.message || 'Failed to delete location');
    }
}

onMounted(() => {
    fetchLocation();
});
</script>

<template>
    <div class="mx-auto">
        <!-- Header -->
        <div class="mb-6 flex items-center justify-between">
            <div class="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="sm"
                    @click="router.push(`/admin/kawasan/${categoryId}`)"
                    class="text-gray-600 hover:text-gray-800 dark:text-gray-400"
                >
                    <ArrowLeft class="w-4 h-4 mr-2" />
                    Back to Category
                </Button>
                <div>
                    <h1
                        class="text-2xl font-bold text-gray-900 dark:text-white"
                    >
                        Edit Location
                    </h1>
                    <p class="text-gray-600 dark:text-gray-400 mt-1">
                        Update location details
                    </p>
                </div>
            </div>
            <Button
                variant="ghost"
                class="text-red-600 hover:text-red-700 hover:bg-red-50"
                @click="handleDelete"
            >
                <Trash2 class="w-4 h-4 mr-2" />
                Delete Location
            </Button>
        </div>

        <div v-if="loading && !form.name" class="flex justify-center py-12">
            <Loader class="w-8 h-8 animate-spin text-primary" />
        </div>

        <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Main Form -->
            <div class="lg:col-span-2 space-y-6">
                <div
                    class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-6"
                >
                    <!-- Name -->
                    <div class="space-y-2">
                        <Label for="name"
                            >Name <span class="text-red-500">*</span></Label
                        >
                        <Input
                            id="name"
                            v-model="form.name"
                            placeholder="e.g. Pos Pengamatan 1"
                            required
                        />
                    </div>

                    <!-- Description -->
                    <div class="space-y-2">
                        <Label for="description">Short Description</Label>
                        <Textarea
                            id="description"
                            v-model="form.description"
                            placeholder="Brief summary..."
                            rows="2"
                        />
                    </div>

                    <!-- Content -->
                    <div class="space-y-2">
                        <Label for="content">Full Content</Label>
                        <Textarea
                            id="content"
                            v-model="form.content"
                            placeholder="Detailed information (HTML supported)..."
                            rows="6"
                        />
                    </div>

                    <!-- Coordinates -->
                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <Label for="latitude">Latitude</Label>
                            <Input
                                id="latitude"
                                type="number"
                                step="any"
                                v-model.number="form.latitude"
                                placeholder="-6.200000"
                            />
                        </div>
                        <div class="space-y-2">
                            <Label for="longitude">Longitude</Label>
                            <Input
                                id="longitude"
                                type="number"
                                step="any"
                                v-model.number="form.longitude"
                                placeholder="106.816666"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sidebar -->
            <div class="space-y-6">
                <!-- Image -->
                <div
                    class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-4"
                >
                    <Label>Location Image</Label>
                    <div
                        class="relative aspect-video w-full bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                        @click="openAssetDialog"
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
                                Click to select image
                            </p>
                        </div>
                    </div>
                    <Input
                        v-if="form.imageUrl"
                        v-model="form.imageUrl"
                        readonly
                        class="bg-gray-50 dark:bg-gray-900 text-xs"
                    />
                </div>

                <!-- Settings -->
                <div
                    class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-6"
                >
                    <div class="flex items-center justify-between">
                        <div class="space-y-0.5">
                            <Label>Active Status</Label>
                            <p class="text-xs text-gray-500">
                                Visible to public
                            </p>
                        </div>
                        <Switch
                            :checked="form.isActive"
                            @update:checked="form.isActive = $event"
                        />
                    </div>

                    <div class="space-y-2">
                        <Label for="order">Order</Label>
                        <Input
                            id="order"
                            type="number"
                            v-model.number="form.order"
                            placeholder="0"
                        />
                    </div>

                    <div class="pt-4 flex flex-col gap-2">
                        <Button @click="handleSubmit" :disabled="loading">
                            <Loader
                                v-if="loading"
                                class="w-4 h-4 mr-2 animate-spin"
                            />
                            <Save v-else class="w-4 h-4 mr-2" />
                            Save Changes
                        </Button>
                        <Button
                            variant="outline"
                            @click="router.push(`/admin/kawasan/${categoryId}`)"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </div>

        <CloudinaryAssetPicker
            v-model:open="showAssetDialog"
            @select="onAssetPicked"
        />
    </div>
</template>
