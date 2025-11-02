<script setup lang="ts">
import { computed } from "vue";
import {
  Menu,
  Search,
  Bell,
  LogOut,
  Moon,
  Sun,
  Globe,
} from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { adminMenuItems } from "@/data/admin-menu";
import { useAuth } from "@/composables/useAuth";
import { useAuthStore } from "@/stores/auth";
import { useColorMode } from "#imports";

const { logout } = useAuth();
const authStore = useAuthStore();
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");
const nextColorMode = computed(() => (isDark.value ? "light" : "dark"));

function toggleColorMode() {
  colorMode.preference = nextColorMode.value;
}

const userInitials = computed(() => {
  if (!authStore.user) return "U";
  const name = authStore.user.name || authStore.user.email;
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
});

async function handleLogout() {
  await logout();
}
</script>

<template>
  <header
    class="sticky top-0 z-40 h-16 border-b bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm flex items-center justify-between px-4 lg:px-8"
  >
    <!-- Mobile Menu Trigger -->
    <Sheet>
      <SheetTrigger as-child class="lg:hidden">
        <Button variant="ghost" size="icon">
          <Menu class="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" class="w-64 p-0 flex flex-col">
        <!-- Mobile Sidebar Header -->
        <div
          class="h-16 flex items-center justify-center border-b dark:border-gray-700"
        >
          <div class="flex flex-col items-center">
            <h1 class="text-lg font-bold text-primary dark:text-green-400">
              ADMIN
            </h1>
            <p class="text-xs text-gray-500 dark:text-gray-400">BKSDA</p>
          </div>
        </div>

        <!-- Mobile Navigation -->
        <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
          <template v-for="item in adminMenuItems" :key="item.name">
            <RouterLink
              v-if="!item.children || item.children.length === 0"
              :to="item.href"
              custom
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                :class="[
                  'flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200',
                  isActive
                    ? 'bg-primary text-white dark:bg-green-500'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700',
                ]"
              >
                <component :is="item.icon" class="w-5 h-5" />
                <span class="font-medium">{{ item.name }}</span>
              </a>
            </RouterLink>

            <div v-else>
              <p
                class="text-xs font-semibold text-gray-500 dark:text-gray-400 px-3 py-2"
              >
                {{ item.name }}
              </p>
              <div class="space-y-1">
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
                      'flex items-center space-x-3 p-2 rounded-lg transition-colors duration-200 text-sm ml-2',
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
            </div>
          </template>
        </nav>

        <!-- Mobile Logout -->
        <div class="p-4 border-t dark:border-gray-700">
          <Button
            variant="ghost"
            class="w-full justify-start text-red-600 hover:text-white hover:bg-red-500"
            @click="handleLogout"
          >
            <LogOut class="w-5 h-5 mr-3" />
            <span>Logout</span>
          </Button>
        </div>
      </SheetContent>
    </Sheet>

    <!-- Header Title -->
    <h2
      class="text-lg font-semibold ml-4 hidden lg:block text-gray-900 dark:text-white"
    >
      Admin Panel
    </h2>

    <!-- Header Actions -->
    <div class="flex items-center space-x-3 ml-auto">
      <Button
        variant="ghost"
        size="icon"
        @click="toggleColorMode"
        :title="`Switch to ${nextColorMode} mode`"
        :aria-label="`Switch to ${nextColorMode} mode`"
      >
        <Sun v-if="isDark" class="h-5 w-5" />
        <Moon v-else class="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" title="Search">
        <Search class="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" title="Notifications">
        <Bell class="h-5 w-5" />
      </Button>

      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        class="hidden sm:inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"
      >
        <Globe class="h-4 w-4" />
        <span>View Website</span>
      </a>

      <!-- User Avatar -->
      <div
        class="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-600 dark:from-green-500 dark:to-green-600 flex items-center justify-center text-xs font-bold text-white cursor-pointer hover:shadow-lg transition-shadow"
        :title="authStore.user?.email"
      >
        {{ userInitials }}
      </div>
    </div>
  </header>
</template>
