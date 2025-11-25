<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { useAuth } from '@/composables/useAuth';
import { adminMenuGroups } from '@/data/admin-menu';
import { LogOut, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { ref } from 'vue';

const { logout } = useAuth();
const isCollapsed = ref(false);

function toggleSidebar() {
    isCollapsed.value = !isCollapsed.value;
}

async function handleLogout() {
    await logout();
}
</script>

<template>
    <aside
        class="hidden lg:flex flex-col border-r border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-lg h-screen sticky top-0 transition-all duration-300"
        :class="[isCollapsed ? 'w-20' : 'w-64']"
    >
        <!-- Toggle Button -->
        <button
            @click="toggleSidebar"
            class="absolute -right-3 top-9 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full p-1 shadow-md z-50 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
        >
            <component
                :is="isCollapsed ? ChevronRight : ChevronLeft"
                class="w-4 h-4 text-gray-500"
            />
        </button>

        <!-- Logo Section -->
        <div
            class="h-16 flex items-center justify-center border-b border-gray-300 dark:border-gray-700 px-4"
        >
            <div class="flex flex-col items-center" v-if="!isCollapsed">
                <h1 class="text-lg font-bold text-primary dark:text-green-400">
                    ADMIN
                </h1>
                <p class="text-xs text-gray-500 dark:text-gray-400">BKSDA</p>
            </div>
            <div v-else class="flex flex-col items-center">
                <h1 class="text-xl font-bold text-primary dark:text-green-400">
                    A
                </h1>
            </div>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 p-4 space-y-6 overflow-y-auto scrollbar-thin">
            <div v-for="(group, index) in adminMenuGroups" :key="index">
                <h3
                    v-if="group.title && !isCollapsed"
                    class="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400"
                >
                    {{ group.title }}
                </h3>
                <div
                    v-if="group.title && isCollapsed"
                    class="px-2 mb-2 h-4 border-b border-gray-200 dark:border-gray-700"
                ></div>
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
                            :title="isCollapsed ? item.name : ''"
                            :class="[
                                'flex items-center rounded-lg transition-colors duration-200 group text-sm relative',
                                isActive
                                    ? 'bg-primary text-white hover:bg-primary-600 shadow-md dark:bg-green-500 dark:hover:bg-green-600'
                                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700',
                                isCollapsed ? 'justify-center p-2' : 'space-x-3 p-2',
                            ]"
                        >
                            <component :is="item.icon" class="w-5 h-5" />
                            <span v-if="!isCollapsed" class="font-medium">{{
                                item.name
                            }}</span>
                            <span
                                v-if="item.badge && !isCollapsed"
                                class="ml-auto text-xs font-semibold px-2 py-1 rounded-full bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200"
                            >
                                {{ item.badge }}
                            </span>
                            <span
                                v-if="item.badge && isCollapsed"
                                class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"
                            ></span>
                        </a>
                    </RouterLink>
                </div>
            </div>
        </nav>

        <!-- Logout Button -->
        <div class="p-4 border-t border-gray-300 dark:border-gray-700">
            <Button
                variant="ghost"
                :class="[
                    'w-full text-red-600 hover:text-white hover:bg-red-500 dark:hover:bg-red-600',
                    isCollapsed ? 'justify-center px-0' : 'justify-start',
                ]"
                @click="handleLogout"
                :title="isCollapsed ? 'Logout' : ''"
            >
                <LogOut
                    :class="['w-5 h-5', isCollapsed ? '' : 'mr-3']"
                />
                <span v-if="!isCollapsed">Logout</span>
            </Button>
        </div>
    </aside>
</template>
