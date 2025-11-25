<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth";
import { useConfirmDialog } from "@/composables/useConfirmDialog";
import { toast } from "vue-sonner";
import CategoryModal from "@/components/admin/CategoryModal.vue";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
  Loader,
} from "lucide-vue-next";

definePageMeta({
  layout: "admin",
});

const router = useRouter();

// State
const categories = ref<any[]>([]);
const loading = ref(false);
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(10);
const totalItems = ref(0);
const isModalOpen = ref(false);
const selectedCategory = ref<any | null>(null);

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
const filteredCategories = computed(() => {
  return categories.value.filter((category) => {
    return (
      category.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      category.slug.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
});

const totalPages = computed(() =>
  Math.ceil(filteredCategories.value.length / itemsPerPage.value),
);

const paginatedCategories = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredCategories.value.slice(start, end);
});

// Methods
async function fetchCategories() {
  loading.value = true;
  try {
    const authStore = useAuthStore();
    const response = await $fetch("/api/categories", {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    if (response.success) {
      categories.value = response.data;
      totalItems.value = response.total;
    }
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  } finally {
    loading.value = false;
  }
}

async function deleteCategory(id: string) {
  const { open } = useConfirmDialog();
  const confirmed = await open({
    title: "Delete Category",
    message:
      "Are you sure you want to delete this category? This action cannot be undone.",
    confirmText: "Delete",
    cancelText: "Cancel",
    isDangerous: true,
  });

  if (!confirmed) return;

  try {
    const authStore = useAuthStore();
    await $fetch(`/api/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    categories.value = categories.value.filter((c) => c.id !== id);
    toast.success("Category deleted successfully");
  } catch (error) {
    console.error("Failed to delete category:", error);
    toast.error("Failed to delete category");
  }
}

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

function openModal(category: any = null) {
  selectedCategory.value = category;
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
  selectedCategory.value = null;
}

async function handleSave(categoryData: any) {
  try {
    const authStore = useAuthStore();
    let response;

    if (selectedCategory.value) {
      // Update
      response = await $fetch(`/api/categories/${selectedCategory.value.id}`, {
        method: "PUT",
        body: categoryData,
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
    } else {
      // Create
      response = await $fetch("/api/categories", {
        method: "POST",
        body: categoryData,
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
    }

    if (response.success) {
      toast.success(
        `Category ${selectedCategory.value ? "updated" : "created"} successfully`,
      );
      fetchCategories();
      closeModal();
    }
  } catch (error) {
    console.error("Failed to save category:", error);
    toast.error("Failed to save category");
  }
}

// Lifecycle
onMounted(() => {
  fetchCategories();
});
</script>

<template>
  <div>
    <!-- Page Header -->
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          Categories
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">
          Manage your post categories
        </p>
      </div>
      <Button
        @click="openModal()"
        class="bg-primary hover:bg-primary-600 dark:bg-green-500 dark:hover:bg-green-600"
      >
        <Plus class="w-4 h-4 mr-2" />
        New Category
      </Button>
    </div>

    <!-- Filters and Search -->
    <div
      class="bg-white dark:bg-gray-700 rounded-lg p-4 mb-6 shadow-sm border border-gray-200 dark:border-gray-600"
    >
      <div class="relative">
        <Search class="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by name or slug..."
          class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
        />
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <Loader class="w-8 h-8 animate-spin text-primary" />
    </div>

    <!-- Categories Table -->
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
                Name
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider"
              >
                Slug
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider"
              >
                Color
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider"
              >
                Date Created
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
              v-for="category in paginatedCategories"
              :key="category.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <p class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ category.name }}
                </p>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300"
              >
                <div class="flex items-center gap-2">
                  <div
                    class="w-4 h-4 rounded-full border border-gray-200 dark:border-gray-600"
                    :style="{ backgroundColor: category.color || '#000000' }"
                  ></div>
                  <span class="uppercase">{{ category.color || 'N/A' }}</span>
                </div>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300"
              >
                {{ category.slug }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300"
              >
                {{ formatDate(category.createdAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  @click="openModal(category)"
                  class="text-gray-600 hover:text-gray-800 dark:text-gray-400"
                >
                  <Edit class="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  @click="deleteCategory(category.id)"
                  class="text-red-600 hover:text-red-800 dark:text-red-400"
                >
                  <Trash2 class="w-4 h-4" />
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div
        v-if="paginatedCategories.length === 0"
        class="px-6 py-12 text-center"
      >
        <p class="text-gray-600 dark:text-gray-400">
          {{
            searchQuery ? "No categories found" : "No categories yet"
          }}
        </p>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="mt-6 flex items-center justify-between">
      <div class="text-sm text-gray-600 dark:text-gray-400">
        Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to
        {{ Math.min(currentPage * itemsPerPage, filteredCategories.length) }}
        of {{ filteredCategories.length }} categories
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
    <CategoryModal
      :is-open="isModalOpen"
      :category="selectedCategory"
      @close="closeModal"
      @save="handleSave"
    />
  </div>
</template>
