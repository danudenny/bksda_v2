<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth";
import { useConfirmDialog } from "@/composables/useConfirmDialog";
import { toast } from "vue-sonner";
import UserModal from "@/components/admin/UserModal.vue";
import { Badge } from "@/components/ui/badge";
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

// State
const users = ref<any[]>([]);
const loading = ref(false);
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(10);
const totalItems = ref(0);
const isModalOpen = ref(false);
const selectedUser = ref<any | null>(null);

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
const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
});

const totalPages = computed(() =>
  Math.ceil(filteredUsers.value.length / itemsPerPage.value)
);

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredUsers.value.slice(start, end);
});

// Methods
async function fetchUsers() {
  loading.value = true;
  try {
    const authStore = useAuthStore();
    const response = await $fetch("/api/users", {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    if (response.success) {
      users.value = response.data;
      totalItems.value = response.total;
    }
  } catch (error) {
    console.error("Failed to fetch users:", error);
  } finally {
    loading.value = false;
  }
}

async function deleteUser(id: string) {
  const { open } = useConfirmDialog();
  const confirmed = await open({
    title: "Delete User",
    message:
      "Are you sure you want to delete this user? This action cannot be undone.",
    confirmText: "Delete",
    cancelText: "Cancel",
    isDangerous: true,
  });

  if (!confirmed) return;

  try {
    const authStore = useAuthStore();
    await $fetch(`/api/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    users.value = users.value.filter((u) => u.id !== id);
    toast.success("User deleted successfully");
  } catch (error: any) {
    console.error("Failed to delete user:", error);
    toast.error(error.data?.message || "Failed to delete user");
  }
}

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

function openModal(user: any = null) {
  selectedUser.value = user;
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
  selectedUser.value = null;
}

async function handleSave(userData: any) {
  try {
    const authStore = useAuthStore();
    let response;

    if (selectedUser.value) {
      // Update
      response = await $fetch(`/api/users/${selectedUser.value.id}`, {
        method: "PUT",
        body: userData,
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
    } else {
      // Create
      response = await $fetch("/api/users", {
        method: "POST",
        body: userData,
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
    }

    if (response.success) {
      toast.success(
        `User ${selectedUser.value ? "updated" : "created"} successfully`
      );
      fetchUsers();
      closeModal();
    }
  } catch (error: any) {
    console.error("Failed to save user:", error);
    toast.error(error.data?.message || "Failed to save user");
  }
}

// Lifecycle
onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <div>
    <!-- Page Header -->
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          Users
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">
          Manage system users and roles
        </p>
      </div>
      <Button
        @click="openModal()"
        class="bg-primary hover:bg-primary-600 dark:bg-green-500 dark:hover:bg-green-600"
      >
        <Plus class="w-4 h-4 mr-2" />
        New User
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
          placeholder="Search by name or email..."
          class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
        />
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <Loader class="w-8 h-8 animate-spin text-primary" />
    </div>

    <!-- Users Table -->
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
                Role
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider"
              >
                Status
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
              v-for="user in paginatedUsers"
              :key="user.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ user.name }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {{ user.email }}
                  </p>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                 <Badge variant="outline">
                  {{ user.role }}
                 </Badge>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <Badge
                  :variant="user.isActive ? 'default' : 'destructive'"
                  class="uppercase"
                >
                  {{ user.isActive ? "Active" : "Inactive" }}
                </Badge>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300"
              >
                {{ formatDate(user.createdAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  @click="openModal(user)"
                  class="text-gray-600 hover:text-gray-800 dark:text-gray-400"
                >
                  <Edit class="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  @click="deleteUser(user.id)"
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
        v-if="paginatedUsers.length === 0"
        class="px-6 py-12 text-center"
      >
        <p class="text-gray-600 dark:text-gray-400">
          {{
            searchQuery ? "No users found" : "No users yet"
          }}
        </p>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="mt-6 flex items-center justify-between">
      <div class="text-sm text-gray-600 dark:text-gray-400">
        Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to
        {{ Math.min(currentPage * itemsPerPage, filteredUsers.length) }}
        of {{ filteredUsers.length }} users
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
    <UserModal
      :is-open="isModalOpen"
      :user="selectedUser"
      @close="closeModal"
      @save="handleSave"
    />
  </div>
</template>
