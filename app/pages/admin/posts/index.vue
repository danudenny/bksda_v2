<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useAuthStore } from "@/stores/auth";
import { useConfirmDialog } from "@/composables/useConfirmDialog";
import { toast } from "vue-sonner";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Search,
  ChevronLeft,
  ChevronRight,
  Loader,
  Check,
} from "lucide-vue-next";

definePageMeta({
  layout: "admin",
});

const router = useRouter();

// State
const posts = ref<any[]>([]);
const categories = ref<any[]>([]);
const loading = ref(false);
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(10);
const totalItems = ref(0);
const filterPublished = ref<"all" | "published" | "draft">("all");
const filterCategory = ref("all");

// Helper function to format date
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

// Computed
const filteredPosts = computed(() => {
  return posts.value.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.slug.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesFilter =
      filterPublished.value === "all" ||
      (filterPublished.value === "published" && post.published) ||
      (filterPublished.value === "draft" && !post.published);

    const matchesCategory =
      filterCategory.value === "all" || post.categoryId === filterCategory.value;

    return matchesSearch && matchesFilter && matchesCategory;
  });
});

const publishedCount = computed(
  () => posts.value.filter((p) => p.published).length,
);

const draftCount = computed(
  () => posts.value.filter((p) => !p.published).length,
);

const totalPages = computed(() =>
  Math.ceil(filteredPosts.value.length / itemsPerPage.value),
);

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredPosts.value.slice(start, end);
});

// Methods
async function fetchPosts() {
  loading.value = true;
  try {
    const authStore = useAuthStore();
    const response = await $fetch("/api/posts", {
      query: {
        page: 1,
        limit: 100,
      },
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    if (response.success) {
      posts.value = response.data;
      totalItems.value = response.total;
    }
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  } finally {
    loading.value = false;
  }
}

async function fetchCategories() {
  try {
    const authStore = useAuthStore();
    const response = await $fetch("/api/categories", {
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
    console.error("Failed to fetch categories:", error);
  }
}

async function deletePost(id: string) {
  const { open } = useConfirmDialog();
  const confirmed = await open({
    title: "Delete Post",
    message:
      "Are you sure you want to delete this post? This action cannot be undone.",
    confirmText: "Delete",
    cancelText: "Cancel",
    isDangerous: true,
  });

  if (!confirmed) return;

  try {
    const authStore = useAuthStore();
    await $fetch(`/api/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    posts.value = posts.value.filter((p) => p.id !== id);
    toast.success("Post deleted successfully");
  } catch (error) {
    console.error("Failed to delete post:", error);
    toast.error("Failed to delete post");
  }
}

async function togglePublish(post: any, checked: boolean) {
  try {
    const authStore = useAuthStore();
    const formData = new FormData();
    formData.append("published", String(checked));

    // We need to include other required fields if validation fails without them,
    // but looking at the backend, it seems to handle partial updates gracefully.
    // However, since we use readMultipartFormData, we must send FormData.

    const response = await $fetch(`/api/posts/${post.id}`, {
      method: "PUT",
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
          response.data.published ? "Post published" : "Post unpublished",
        );
      }
    }
  } catch (error) {
    console.error("Failed to toggle publish:", error);
    toast.error("Failed to update post");
    // Revert the switch state visually if API fails
    post.published = !checked;
  }
}

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

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
        <p class="text-sm text-gray-600 dark:text-gray-300">Total Posts</p>
        <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">
          {{ posts.length }}
        </p>
      </div>
      <div
        class="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-600"
      >
        <p class="text-sm text-gray-600 dark:text-gray-300">Published</p>
        <p class="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
          {{ publishedCount }}
        </p>
      </div>
      <div
        class="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-600"
      >
        <p class="text-sm text-gray-600 dark:text-gray-300">Drafts</p>
        <p class="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">
          {{ draftCount }}
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
          <Search class="absolute left-3 top-3 w-5 h-5 text-gray-400" />
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
                class="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider w-[300px]"
              >
                Title
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider"
              >
                Author
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-600">
            <tr
              v-for="post in paginatedPosts"
              :key="post.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              <td class="px-6 py-4">
                <div class="max-w-[300px]">
                  <p class="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 break-words">
                    {{ post.title }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {{ post.slug }}
                  </p>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <Badge
                  :variant="post.category?.color ? 'default' : 'secondary'"
                  :style="
                    post.category?.color
                      ? { backgroundColor: post.category.color, color: '#fff' }
                      : {}
                  "
                >
                  {{ post.category?.name || "N/A" }}
                </Badge>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300"
              >
                {{ post.author?.name || "Unknown" }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <Badge
                  v-if="post.published"
                  variant="default"
                  class="bg-green-600 hover:bg-green-700 dark:bg-green-700"
                >
                  <Check class="w-3 h-3 mr-1" />
                  Published
                </Badge>
                <Badge
                  v-else
                  variant="secondary"
                  class="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                >
                  Draft
                </Badge>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300"
              >
                {{ formatDate(post.createdAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                <div class="flex items-center gap-4">
                  <div class="flex items-center gap-2">
                    <Switch
                      v-model="post.published"
                      @update:checked="(val) => togglePublish(post, val)"
                    />
                    <span class="text-xs text-gray-500">
                      {{ post.published ? "On" : "Off" }}
                    </span>
                  </div>
                  <div class="flex items-center space-x-2 border-l pl-4 border-gray-300 dark:border-gray-600">
                    <Button
                      variant="ghost"
                      size="sm"
                      @click="router.push(`/admin/posts/${post.id}`)"
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
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="paginatedPosts.length === 0" class="px-6 py-12 text-center">
        <p class="text-gray-600 dark:text-gray-400">
          {{
            searchQuery || filterPublished !== "all"
              ? "No posts found"
              : "No posts yet"
          }}
        </p>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="mt-6 flex items-center justify-between">
      <div class="text-sm text-gray-600 dark:text-gray-400">
        Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to
        {{ Math.min(currentPage * itemsPerPage, filteredPosts.length) }} of
        {{ filteredPosts.length }} posts
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
