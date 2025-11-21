<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useApi } from '@/composables/useApi';
import { ArrowLeft, Loader, Save } from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

definePageMeta({
    layout: 'admin',
});

const route = useRoute();
const router = useRouter();
const { createExternalLink, updateExternalLink, getExternalLink, loading } =
    useApi();

const isEditing = computed(() => route.params.id !== 'create');
const id = route.params.id as string;

const form = ref({
    title: '',
    subtitle: '',
    url: '',
    order: 0,
    isActive: true,
    status: 'ACTIVE', // Default status
});

const statusOptions = [
    { value: 'ACTIVE', label: 'Active' },
    { value: 'INACTIVE', label: 'Inactive' },
    { value: 'MAINTENANCE', label: 'Maintenance' },
];

async function fetchLink() {
    if (!isEditing.value) return;

    const response = await getExternalLink(id);
    if (response.success && response.data) {
        const data = response.data;
        form.value = {
            title: data.title,
            subtitle: data.subtitle,
            url: data.url,
            order: data.order,
            isActive: data.isActive,
            status: data.status,
        };
    } else {
        toast.error('Failed to fetch link details');
        router.push('/admin/external-links');
    }
}

async function handleSubmit() {
    if (!form.value.title || !form.value.url) {
        toast.error('Please fill in all required fields');
        return;
    }

    const payload = {
        ...form.value,
        order: Number(form.value.order),
    };

    let response;
    if (isEditing.value) {
        response = await updateExternalLink(id, payload);
    } else {
        response = await createExternalLink(payload);
    }

    if (response.success) {
        toast.success(
            `Link ${isEditing.value ? 'updated' : 'created'} successfully`
        );
        router.push('/admin/external-links');
    } else {
        toast.error(response.message || 'Failed to save link');
    }
}

onMounted(() => {
    fetchLink();
});
</script>

<template>
    <div class="mx-auto">
        <!-- Header -->
        <div class="mb-6 flex items-center justify-between">
            <div class="flex items-center space-x-4">
                <Button
                    variant="ghost"
                    size="icon"
                    @click="router.back()"
                    class="rounded-full"
                >
                    <ArrowLeft class="w-5 h-5" />
                </Button>
                <div>
                    <h1
                        class="text-2xl font-bold text-gray-900 dark:text-white"
                    >
                        {{ isEditing ? 'Edit Link' : 'Create New Link' }}
                    </h1>
                    <p class="text-gray-500 dark:text-gray-400 text-sm">
                        {{
                            isEditing
                                ? 'Update existing link details'
                                : 'Add a new external link'
                        }}
                    </p>
                </div>
            </div>
        </div>

        <!-- Form -->
        <div
            class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
            <div class="p-6 space-y-6">
                <!-- Title -->
                <div class="space-y-2">
                    <Label for="title"
                        >Title <span class="text-red-500">*</span></Label
                    >
                    <Input
                        id="title"
                        v-model="form.title"
                        placeholder="e.g. SIDAK KSDAE"
                        required
                    />
                </div>

                <!-- Subtitle -->
                <div class="space-y-2">
                    <Label for="subtitle">Subtitle</Label>
                    <Input
                        id="subtitle"
                        v-model="form.subtitle"
                        placeholder="e.g. Kementerian LHK"
                    />
                </div>

                <!-- URL -->
                <div class="space-y-2">
                    <Label for="url"
                        >URL <span class="text-red-500">*</span></Label
                    >
                    <Input
                        id="url"
                        v-model="form.url"
                        placeholder="https://..."
                        required
                    />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Order -->
                    <div class="space-y-2">
                        <Label for="order">Display Order</Label>
                        <Input
                            id="order"
                            type="number"
                            v-model="form.order"
                            placeholder="0"
                        />
                        <p class="text-xs text-gray-500">
                            Lower numbers appear first
                        </p>
                    </div>

                    <!-- Status Enum -->
                    <div class="space-y-2">
                        <Label for="status">Link Status</Label>
                        <select
                            id="status"
                            v-model="form.status"
                            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option
                                v-for="option in statusOptions"
                                :key="option.value"
                                :value="option.value"
                            >
                                {{ option.label }}
                            </option>
                        </select>
                    </div>
                </div>

                <!-- Active Switch -->
                <div
                    class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                    <div class="space-y-0.5">
                        <Label class="text-base">Active Status</Label>
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                            Enable or disable this link globally
                        </p>
                    </div>
                    <Switch
                        :checked="form.isActive"
                        @update:checked="form.isActive = $event"
                    />
                    <!-- Debug: {{ form.isActive }} -->
                </div>
            </div>

            <!-- Footer -->
            <div
                class="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 flex items-center justify-end space-x-4"
            >
                <Button
                    variant="outline"
                    @click="router.back()"
                    :disabled="loading"
                >
                    Cancel
                </Button>
                <Button @click="handleSubmit" :disabled="loading">
                    <Loader v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
                    <Save v-else class="w-4 h-4 mr-2" />
                    {{ isEditing ? 'Update Link' : 'Create Link' }}
                </Button>
            </div>
        </div>
    </div>
</template>
