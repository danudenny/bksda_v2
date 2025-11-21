<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useApi } from '@/composables/useApi';
import { useConfirmDialog } from '@/composables/useConfirmDialog';
import {
    Check,
    ChevronLeft,
    ChevronRight,
    Edit,
    ExternalLink as ExternalLinkIcon,
    Loader,
    Plus,
    Search,
    Trash2,
    X,
} from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

definePageMeta({
    layout: 'admin',
});

const router = useRouter();
const { getExternalLinks, deleteExternalLink: deleteApi, loading } = useApi();

// State
const linksList = ref<any[]>([]);
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(10);

// Computed
const filteredLinks = computed(() => {
    return linksList.value.filter((item) => {
        return (
            item.title
                .toLowerCase()
                .includes(searchQuery.value.toLowerCase()) ||
            item.subtitle
                .toLowerCase()
                .includes(searchQuery.value.toLowerCase())
        );
    });
});

const totalPages = computed(() =>
    Math.ceil(filteredLinks.value.length / itemsPerPage.value)
);

const paginatedLinks = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredLinks.value.slice(start, end);
});

// Methods
async function fetchLinks() {
    const response = await getExternalLinks(1, 100); // Fetch all for client-side filtering for now
    if (response.success) {
        linksList.value = response.data || [];
    } else {
        toast.error(response.message || 'Failed to fetch external links');
    }
}

async function deleteLink(id: string) {
    const { open } = useConfirmDialog();
    const confirmed = await open({
        title: 'Delete Link',
        message:
            'Are you sure you want to delete this link? This action cannot be undone.',
        confirmText: 'Delete',
        cancelText: 'Cancel',
        isDangerous: true,
    });

    if (!confirmed) return;

    const response = await deleteApi(id);
    if (response.success) {
        linksList.value = linksList.value.filter((s) => s.id !== id);
        toast.success('Link deleted successfully');
    } else {
        toast.error(response.message || 'Failed to delete link');
    }
}

function goToPage(page: number) {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
}

// Lifecycle
onMounted(() => {
    fetchLinks();
});
</script>

<template>
    <div>
        <!-- Page Header -->
        <div class="mb-6 flex items-center justify-between">
            <div>
                <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
                    External Links
                </h1>
                <p class="text-gray-600 dark:text-gray-400 mt-2">
                    Manage important external links (Belida)
                </p>
            </div>
            <Button
                @click="router.push('/admin/external-links/create')"
                class="bg-primary hover:bg-primary-600 dark:bg-green-500 dark:hover:bg-green-600"
            >
                <Plus class="w-4 h-4 mr-2" />
                New Link
            </Button>
        </div>

        <!-- Search -->
        <div class="mb-6">
            <div class="relative">
                <Search class="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search by title or subtitle..."
                    class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                />
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center py-12">
            <Loader class="w-8 h-8 animate-spin text-primary" />
        </div>

        <!-- Links Table -->
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
                                Link Info
                            </th>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider"
                            >
                                URL
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
                            v-for="link in paginatedLinks"
                            :key="link.id"
                            class="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                        >
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex flex-col">
                                    <span
                                        class="text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        {{ link.title }}
                                    </span>
                                    <span
                                        class="text-sm text-gray-500 dark:text-gray-400"
                                    >
                                        {{ link.subtitle }}
                                    </span>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <a
                                    :href="link.url"
                                    target="_blank"
                                    class="text-sm text-blue-600 hover:underline flex items-center"
                                >
                                    {{ link.url }}
                                    <ExternalLinkIcon class="w-3 h-3 ml-1" />
                                </a>
                            </td>
                            <td
                                class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300"
                            >
                                {{ link.order }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <Badge
                                    v-if="link.isActive"
                                    variant="default"
                                    class="bg-green-600 hover:bg-green-700 dark:bg-green-700"
                                >
                                    <Check class="w-3 h-3 mr-1" />
                                    Active
                                </Badge>
                                <Badge
                                    v-else
                                    variant="secondary"
                                    class="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                >
                                    <X class="w-3 h-3 mr-1" />
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
                                            `/admin/external-links/${link.id}`
                                        )
                                    "
                                    class="text-gray-600 hover:text-gray-800 dark:text-gray-400"
                                >
                                    <Edit class="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    @click="deleteLink(link.id)"
                                    class="text-red-600 hover:text-red-800 dark:text-red-400"
                                >
                                    <Trash2 class="w-4 h-4" />
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div
                v-if="paginatedLinks.length === 0"
                class="px-6 py-12 text-center"
            >
                <p class="text-gray-600 dark:text-gray-400">
                    {{ searchQuery ? 'No links found' : 'No links yet' }}
                </p>
            </div>
        </div>

        <!-- Pagination -->
        <div
            v-if="totalPages > 1"
            class="mt-6 flex items-center justify-between"
        >
            <div class="text-sm text-gray-600 dark:text-gray-400">
                Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to
                {{ Math.min(currentPage * itemsPerPage, filteredLinks.length) }}
                of {{ filteredLinks.length }} links
            </div>
            <div class="flex space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    @click="goToPage(currentPage - 1)"
                    :disabled="currentPage === 1"
                >
                    <ChevronLeft class="w-4 h-4" />
                </Button>
                <div class="flex space-x-1">
                    <Button
                        v-for="page in Math.min(5, totalPages)"
                        :key="page"
                        variant="outline"
                        size="sm"
                        @click="goToPage(page)"
                        :class="[
                            page === currentPage
                                ? 'bg-primary text-white dark:bg-green-500'
                                : '',
                        ]"
                    >
                        {{ page }}
                    </Button>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    @click="goToPage(currentPage + 1)"
                    :disabled="currentPage === totalPages"
                >
                    <ChevronRight class="w-4 h-4" />
                </Button>
            </div>
        </div>
    </div>
</template>
