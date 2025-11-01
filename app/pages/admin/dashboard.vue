<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

definePageMeta({
  layout: "admin",
});

const authStore = useAuthStore();
</script>

<template>
  <div v-if="authStore.isAuthenticated">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        Dashboard
      </h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">Welcome back!</p>
    </div>

    <div v-if="authStore.user" class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-lg"
      >
        <h3 class="text-sm font-medium opacity-90">Logged In As</h3>
        <p class="text-2xl font-bold mt-2">
          {{ authStore.user.name || authStore.user.email }}
        </p>
      </div>

      <div
        class="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white shadow-lg"
      >
        <h3 class="text-sm font-medium opacity-90">Role</h3>
        <p class="text-2xl font-bold mt-2">
          {{ authStore.user.role || "User" }}
        </p>
      </div>

      <div
        class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white shadow-lg"
      >
        <h3 class="text-sm font-medium opacity-90">Status</h3>
        <p class="text-2xl font-bold mt-2">Active</p>
      </div>
    </div>

    <div
      class="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
    >
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Welcome to Admin Panel
      </h2>
      <p class="text-gray-700 dark:text-gray-300">
        You have successfully logged in. Use the sidebar to navigate through
        different sections of the admin panel.
      </p>
    </div>
  </div>

  <div v-else>
    <p>Loading...</p>
  </div>
</template>
