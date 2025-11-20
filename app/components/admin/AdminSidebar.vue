<script setup lang="ts">
import { ref } from "vue";
import { LogOut } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { adminMenuItems } from "@/data/admin-menu";
import { useAuth } from "@/composables/useAuth";

const expandedItems = ref<string[]>([]);
const { logout } = useAuth();

function toggleExpand(itemName: string) {
  const index = expandedItems.value.indexOf(itemName);
  if (index > -1) {
    expandedItems.value.splice(index, 1);
  } else {
    expandedItems.value.push(itemName);
  }
}

function isExpanded(itemName: string) {
  return expandedItems.value.includes(itemName);
}

async function handleLogout() {
  await logout();
}
</script>

<template>
  <aside
    class="hidden lg:flex flex-col w-64 border-r bg-white dark:bg-gray-800 dark:border-gray-700 shadow-lg h-screen sticky top-0"
  >
    <!-- Logo Section -->
    <div
      class="h-16 flex items-center justify-center border-b dark:border-gray-700 px-4"
    >
      <div class="flex flex-col items-center">
        <h1 class="text-lg font-bold text-primary dark:text-green-400">
          ADMIN
        </h1>
        <p class="text-xs text-gray-500 dark:text-gray-400">BKSDA</p>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 p-4 space-y-1 overflow-y-auto">
      <template v-for="item in adminMenuItems" :key="item.name">
        <!-- Parent Item with Children -->
        <div v-if="item.children && item.children.length > 0">
          <button
            @click="toggleExpand(item.name)"
            class="w-full flex items-center justify-between p-3 rounded-lg transition-colors duration-200 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 group"
          >
            <div class="flex items-center space-x-3">
              <component :is="item.icon" class="w-5 h-5" />
              <span class="font-medium text-sm">{{ item.name }}</span>
            </div>
            <svg
              :class="[
                'w-4 h-4 transition-transform duration-200',
                isExpanded(item.name) ? 'rotate-180' : '',
              ]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>

          <!-- Child Items -->
          <transition
            enter-active-class="transition-all duration-200"
            leave-active-class="transition-all duration-200"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-96"
            leave-from-class="opacity-100 max-h-96"
            leave-to-class="opacity-0 max-h-0"
          >
            <div v-if="isExpanded(item.name)" class="ml-4 space-y-1">
              <RouterLink
                v-for="child in item.children"
                :key="child.name"
                :to="child.href"
                custom
                v-slot="{ href, navigate, isActive }"
              >
                <a
                  :href="href"
                  @click="navigate"
                  :class="[
                    'flex items-center space-x-3 p-2 rounded-lg transition-colors duration-200 text-sm',
                    isActive
                      ? 'bg-primary/10 text-primary dark:bg-green-400/10 dark:text-green-400'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700',
                  ]"
                >
                  <component :is="child.icon" class="w-4 h-4" />
                  <span class="font-medium">{{ child.name }}</span>
                </a>
              </RouterLink>
            </div>
          </transition>
        </div>

        <!-- Single Item (No Children) -->
        <RouterLink
          v-else
          :to="item.href"
          custom
          v-slot="{ href, navigate, isActive }"
        >
          <a
            :href="href"
            @click="navigate"
            :class="[
              'flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 group',
              isActive
                ? 'bg-primary text-white hover:bg-primary-600 shadow-md dark:bg-green-500 dark:hover:bg-green-600'
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700',
            ]"
          >
            <component :is="item.icon" class="w-5 h-5" />
            <span class="font-medium">{{ item.name }}</span>
            <span
              v-if="item.badge"
              class="ml-auto text-xs font-semibold px-2 py-1 rounded-full bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200"
            >
              {{ item.badge }}
            </span>
          </a>
        </RouterLink>
      </template>
    </nav>

    <!-- Logout Button -->
    <div class="p-4 border-t dark:border-gray-700">
      <Button
        variant="ghost"
        class="w-full justify-start text-red-600 hover:text-white hover:bg-red-500 dark:hover:bg-red-600"
        @click="handleLogout"
      >
        <LogOut class="w-5 h-5 mr-3" />
        <span>Logout</span>
      </Button>
    </div>
  </aside>
</template>
