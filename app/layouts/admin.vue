<script setup lang="ts">
import AdminSidebar from "@/components/admin/AdminSidebar.vue";
import AdminHeader from "@/components/admin/AdminHeader.vue";
import AdminFooter from "@/components/admin/AdminFooter.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import { Toaster } from "@/components/ui/sonner";
const colorMode = useColorMode();
</script>

<template>
  <div class="flex min-h-screen bg-gray-50 dark:bg-gray-900 relative">
    <!-- Desktop Sidebar -->
    <AdminSidebar />

    <!-- Main Content Area -->
    <div class="flex flex-col flex-1">
      <!-- Header -->
      <AdminHeader />

      <!-- Main Content -->
      <main class="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div
          class="p-6 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-700 min-h-[400px]"
        >
          <slot />
        </div>
      </main>

      <!-- Footer -->
      <AdminFooter />
    </div>

    <!-- Toast Notifications - Fixed positioning outside flex container -->
    <div class="fixed top-0 right-0 z-[9999] pointer-events-none">
      <Toaster :theme="colorMode.value === 'dark' ? 'dark' : 'light'" />
    </div>

    <!-- Confirm Dialog -->
    <ConfirmDialog />
  </div>
</template>
