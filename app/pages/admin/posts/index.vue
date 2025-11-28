<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useConfirmDialog } from '@/composables/useConfirmDialog';
import { useAuthStore } from '@/stores/auth';
import {
    ChevronLeft,
    ChevronRight,
    Edit,
    Loader,
    Plus,
    Search,
    Trash2,
} from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

definePageMeta({
    layout: 'admin',
});

const router = useRouter();

// State
const posts = ref<any[]>([]);
const categories = ref<any[]>([]);
const loading = ref(false);
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(10);
const totalItems = ref(0);
const filterPublished = ref<'all' | 'published' | 'draft'>('all');
const filterCategory = ref('all');
const stats = ref({
    total: 0,
    published: 0,
    draft: 0,
});

// Helper function to format date
function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
}

// Computed
const totalPages = computed(() =>
    Math.ceil(totalItems.value / itemsPerPage.value)
);

const visiblePages = computed(() => {
    const total = totalPages.value;
    const current = currentPage.value;
    const maxVisible = 5;

    if (total <= maxVisible) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }

    let start = current - Math.floor(maxVisible / 2);
    let end = current + Math.floor(maxVisible / 2);

    if (start < 1) {
        start = 1;
        end = Math.min(total, maxVisible);
    }

    if (end > total) {
        end = total;
        start = Math.max(1, total - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

// Methods
async function fetchPosts() {
    loading.value = true;
    try {
        const authStore = useAuthStore();
        const response = await $fetch('/api/posts', {
            query: {
                page: currentPage.value,
                limit: itemsPerPage.value,
                search: searchQuery.value,
                published: filterPublished.value,
                category_ids:
                    filterCategory.value !== 'all'
                        ? filterCategory.value
                        : undefined,
            },
            headers: {
                Authorization: `Bearer ${authStore.token}`,
            },
        });

        if (response.success) {
            posts.value = response.data;
            totalItems.value = response.pagination.total;
            if (response.stats) {
                stats.value = response.stats;
            }
        }
    } catch (error) {
        console.error('Failed to fetch posts:', error);
    } finally {
        loading.value = false;
    }
}

async function fetchCategories() {
    try {
        const authStore = useAuthStore();
        const response = await $fetch('/api/categories', {
            query: {
                page: 1,
                limit: 100,
            },
            headers: {
                Authorization: `Bearer ${authStore.token}`,
            },
        });

        if (response.success) {
            categories.value = response.data;
        }
    } catch (error) {
        console.error('Failed to fetch categories:', error);
    }
}

async function deletePost(id: string) {
    const { open } = useConfirmDialog();
    const confirmed = await open({
        title: 'Delete Post',
        message:
            'Are you sure you want to delete this post? This action cannot be undone.',
        confirmText: 'Delete',
        cancelText: 'Cancel',
        isDangerous: true,
    });

    if (!confirmed) return;

    try {
        const authStore = useAuthStore();
        await $fetch(`/api/posts/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${authStore.token}`,
            },
        });

        posts.value = posts.value.filter((p) => p.id !== id);
        toast.success('Post deleted successfully');
        fetchPosts(); // Re-fetch to update stats and pagination
    } catch (error) {
        console.error('Failed to delete post:', error);
        toast.error('Failed to delete post');
    }
}

async function togglePublish(post: any, checked: boolean) {
    try {
        const authStore = useAuthStore();
        const formData = new FormData();
        formData.append('published', String(checked));

        // We need to include other required fields if validation fails without them,
        // but looking at the backend, it seems to handle partial updates gracefully.
        // However, since we use readMultipartFormData, we must send FormData.

        const response = await $fetch(`/api/posts/${post.id}`, {
            method: 'PUT',
            body: formData,
            headers: {
                Authorization: `Bearer ${authStore.token}`,
            },
        });

        if (response.success) {
            const index = posts.value.findIndex((p) => p.id === post.id);
            if (index !== -1) {
                posts.value[index] = response.data;
                toast.success(
                    response.data.published
                        ? 'Post published'
                        : 'Post unpublished'
                );
                fetchPosts(); // Re-fetch to update stats
            }
        }
    } catch (error) {
        console.error('Failed to toggle publish:', error);
        toast.error('Failed to update post');
        // Revert the switch state visually if API fails
        post.published = !checked;
    }
}

function goToPage(page: number) {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
}

// Watchers for server-side filtering
const debouncedSearch = useDebounceFn(() => {
    currentPage.value = 1;
    fetchPosts();
}, 500);

watch(searchQuery, () => {
    debouncedSearch();
});

watch([filterPublished, filterCategory], () => {
    currentPage.value = 1;
    fetchPosts();
});

watch(currentPage, () => {
    fetchPosts();
});

// Lifecycle
onMounted(() => {
    fetchPosts();
    fetchCategories();
});
</script>

<template>
    <div>
        <!-- Page Header -->
        <div class="mb-6 flex items-center justify-between">
            <div>
                <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
                    Posts & News
                </h1>
                <p class="text-gray-600 dark:text-gray-400 mt-2">
                    Manage blog posts and news articles
                </p>
            </div>
            <Button
                @click="router.push('/admin/posts/create')"
                class="bg-primary hover:bg-primary-600 dark:bg-green-500 dark:hover:bg-green-600"
            >
                <Plus class="w-4 h-4 mr-2" />
                New Post
            </Button>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div
                class="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-600"
            >
                <p class="text-sm text-gray-600 dark:text-gray-300">
                    Total Posts
                </p>
                <p
                    class="text-2xl font-bold text-gray-900 dark:text-white mt-1"
                >
                    {{ stats.total }}
                </p>
            </div>
            <div
                class="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-600"
            >
                <p class="text-sm text-gray-600 dark:text-gray-300">
                    Published
                </p>
                <p
                    class="text-2xl font-bold text-green-600 dark:text-green-400 mt-1"
                >
                    {{ stats.published }}
                </p>
            </div>
            <div
                class="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-600"
            >
                <p class="text-sm text-gray-600 dark:text-gray-300">Drafts</p>
                <p
                    class="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-1"
                >
                    {{ stats.draft }}
                </p>
            </div>
        </div>

        <!-- Filters and Search -->
        <div
            class="bg-white dark:bg-gray-700 rounded-lg p-4 mb-6 shadow-sm border border-gray-200 dark:border-gray-600"
        >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Search -->
                <div class="relative">
                    <Search
                        class="absolute left-3 top-3 w-5 h-5 text-gray-400"
                    />
                    <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Search by title or slug..."
                        class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                    />
                </div>

                <!-- Filter -->
                <div class="flex gap-4">
                    <select
                        v-model="filterCategory"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                    >
                        <option value="all">All Categories</option>
                        <option
                            v-for="category in categories"
                            :key="category.id"
                            :value="category.id"
                        >
                            {{ category.name }}
                        </option>
                    </select>

                    <select
                        v-model="filterPublished"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                    >
                        <option value="all">All Posts</option>
                        <option value="published">Published Only</option>
                        <option value="draft">Drafts Only</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center py-12">
            <Loader class="w-8 h-8 animate-spin text-primary" />
        </div>

        <!-- Posts Table -->
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
                                class="px-6 py-3 text-center text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider"
                            >
                                Image
                            </th>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider w-[300px]"
                            >
                                Title
                            </th>
                            <th
                                class="px-6 py-3 text-center text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider"
                            >
                                Category
                            </th>
                            <th
                                class="px-6 py-3 text-center text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider"
                            >
                                Author
                            </th>
                            <th
                                class="px-6 py-3 text-center text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider"
                            >
                                Date
                            </th>
                            <th
                                class="px-6 py-3 text-center text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider"
                            >
                                Published
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
                            v-for="post in posts"
                            :key="post.id"
                            class="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                        >
                            <td class="px-6 py-4 whitespace-nowrap">
                                <img
                                    v-if="post.imageUrl"
                                    :src="post.imageUrl"
                                    alt="Thumbnail"
                                    class="h-12 w-16 rounded-md object-cover border border-gray-200 dark:border-gray-600"
                                />
                                <div
                                    v-else
                                    class="h-12 w-16 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 flex items-center justify-center text-xs text-gray-400"
                                >
                                    No Img
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="max-w-[300px]">
                                    <p
                                        class="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 break-words"
                                    >
                                        {{ post.title }}
                                    </p>
                                    <p
                                        class="text-xs text-gray-500 dark:text-gray-400 truncate"
                                    >
                                        {{ post.slug }}
                                    </p>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-center">
                                <Badge
                                    :variant="
                                        post.category?.color
                                            ? 'default'
                                            : 'secondary'
                                    "
                                    :style="
                                        post.category?.color
                                            ? {
                                                  backgroundColor:
                                                      post.category.color,
                                                  color: '#fff',
                                              }
                                            : {}
                                    "
                                >
                                    {{ post.category?.name || 'N/A' }}
                                </Badge>
                            </td>
                            <td
                                class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 text-center"
                            >
                                {{ post.author?.name || 'Unknown' }}
                            </td>
                            <td
                                class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 text-center"
                            >
                                {{ formatDate(post.createdAt) }}
                            </td>
                            <td>
                                <div class="flex items-center gap-2 flex-col">
                                    <Switch
                                        v-model="post.published"
                                        @update:checked="
                                            (val) => togglePublish(post, val)
                                        "
                                    />
                                </div>
                            </td>
                            <td
                                class="px-6 py-4 whitespace-nowrap text-sm space-x-2"
                            >
                                <div class="flex items-center">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        @click="
                                            router.push(
                                                `/admin/posts/${post.id}`
                                            )
                                        "
                                        class="text-gray-600 hover:text-gray-800 dark:text-gray-400"
                                    >
                                        <Edit class="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        @click="deletePost(post.id)"
                                        class="text-red-600 hover:text-red-800 dark:text-red-400"
                                    >
                                        <Trash2 class="w-4 h-4" />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Empty State -->
            <div v-if="posts.length === 0" class="px-6 py-12 text-center">
                <p class="text-gray-600 dark:text-gray-400">
                    {{
                        searchQuery || filterPublished !== 'all'
                            ? 'No posts found'
                            : 'No posts yet'
                    }}
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
                {{ Math.min(currentPage * itemsPerPage, totalItems) }}
                of {{ totalItems }} posts
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
                        v-for="page in visiblePages"
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
