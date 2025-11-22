<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { useConfirmDialog } from '@/composables/useConfirmDialog';
import { useAuthStore } from '@/stores/auth';
import { Edit, Loader, Plus, Trash2 } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

definePageMeta({
    layout: 'admin',
});

const router = useRouter();
// State
const pages = ref<any[]>([]);
const loading = ref(false);

// Methods
async function fetchPages() {
    loading.value = true;
    try {
        const authStore = useAuthStore();
        const response = await $fetch('/api/pages', {
            headers: {
                Authorization: `Bearer ${authStore.token}`,
            },
        });

        if (response.success) {
            pages.value = response.data;
        }
    } catch (error) {
        console.error('Failed to fetch pages:', error);
        toast.error('Failed to fetch pages');
    } finally {
        loading.value = false;
    }
}

async function deletePage(id: string) {
    const { open } = useConfirmDialog();
    const confirmed = await open({
        title: 'Delete Page',
        message:
            'Are you sure you want to delete this page? This action cannot be undone.',
        confirmText: 'Delete',
        cancelText: 'Cancel',
        isDangerous: true,
    });

    if (!confirmed) return;

    try {
        const authStore = useAuthStore();
        await $fetch(`/api/pages/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${authStore.token}`,
            },
        });

        toast.success('Page deleted successfully');
        fetchPages();
    } catch (error) {
        console.error('Failed to delete page:', error);
        toast.error('Failed to delete page');
    }
}

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

onMounted(() => {
    fetchPages();
});
</script>

<template>
    <div>
        <!-- Page Header -->
        <div class="mb-6 flex items-center justify-between">
            <div>
                <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
                    Static Pages
                </h1>
                <p class="text-gray-600 dark:text-gray-400 mt-2">
                    Manage static content pages (e.g., About Us, Vision &
                    Mission)
                </p>
            </div>
            <Button
                @click="router.push('/admin/pages/create')"
                class="bg-primary hover:bg-primary-600 dark:bg-green-500 dark:hover:bg-green-600"
            >
                <Plus class="w-4 h-4 mr-2" />
                Add Page
            </Button>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center py-12">
            <Loader class="w-8 h-8 animate-spin text-primary" />
        </div>

        <!-- Page List -->
        <div
            v-else
            class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead
                        class="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600"
                    >
                        <tr>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                            >
                                Title
                            </th>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                            >
                                Slug
                            </th>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                            >
                                Status
                            </th>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                            >
                                Last Updated
                            </th>
                            <th
                                class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody
                        class="divide-y divide-gray-200 dark:divide-gray-700"
                    >
                        <tr
                            v-for="page in pages"
                            :key="page.id"
                            class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    {{ page.title }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm text-gray-500 dark:text-gray-400"
                                >
                                    {{ page.slug }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    :class="[
                                        'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                                        page.published
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800',
                                    ]"
                                >
                                    {{ page.published ? 'Published' : 'Draft' }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm text-gray-500 dark:text-gray-400"
                                >
                                    {{ formatDate(page.updatedAt) }}
                                </div>
                            </td>
                            <td
                                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                            >
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    @click="
                                        router.push(
                                            `/admin/pages/edit/${page.id}`
                                        )
                                    "
                                    class="text-blue-600 hover:text-blue-900 mr-2"
                                >
                                    <Edit class="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    @click="deletePage(page.id)"
                                    class="text-red-600 hover:text-red-900"
                                >
                                    <Trash2 class="w-4 h-4" />
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div
                v-if="pages.length === 0"
                class="px-6 py-12 text-center text-gray-500"
            >
                No pages found. Create one to get started.
            </div>
        </div>
    </div>
</template>
