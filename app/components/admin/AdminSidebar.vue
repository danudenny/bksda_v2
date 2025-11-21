<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { useAuth } from '@/composables/useAuth';
import { adminMenuGroups } from '@/data/admin-menu';
import { LogOut } from 'lucide-vue-next';

const { logout } = useAuth();

async function handleLogout() {
    await logout();
}
</script>

<template>
    <aside
        class="hidden lg:flex flex-col w-64 border-r border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-lg h-screen sticky top-0"
    >
        <!-- Logo Section -->
        <div
            class="h-16 flex items-center justify-center border-b border-gray-300 dark:border-gray-700 px-4"
        >
            <div class="flex flex-col items-center">
                <h1 class="text-lg font-bold text-primary dark:text-green-400">
                    ADMIN
                </h1>
                <p class="text-xs text-gray-500 dark:text-gray-400">BKSDA</p>
            </div>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 p-4 space-y-6 overflow-y-auto">
            <div v-for="(group, index) in adminMenuGroups" :key="index">
                <h3
                    v-if="group.title"
                    class="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400"
                >
                    {{ group.title }}
                </h3>
                <div class="space-y-1">
                    <RouterLink
                        v-for="item in group.items"
                        :key="item.name"
                        :to="item.href"
                        custom
                        v-slot="{ href, navigate, isActive }"
                    >
                        <a
                            :href="href"
                            @click="navigate"
                            :class="[
                                'flex items-center space-x-3 p-2 rounded-lg transition-colors duration-200 group text-sm',
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
                </div>
            </div>
        </nav>

        <!-- Logout Button -->
        <div class="p-4 border-t border-gray-300 dark:border-gray-700">
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
