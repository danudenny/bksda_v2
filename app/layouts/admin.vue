<script setup lang="ts">
import AdminFooter from '@/components/admin/AdminFooter.vue';
import AdminHeader from '@/components/admin/AdminHeader.vue';
import AdminSidebar from '@/components/admin/AdminSidebar.vue';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import { Toaster } from '@/components/ui/sonner';
import { useAuthStore } from '@/stores/auth';
import { onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

// add website meta tags
useHead({
    htmlAttrs: {
        lang: 'id',
    },
    title: 'Admin - BKSDA Sumatera Selatan',
    meta: [
        {
            name: 'description',
            content: 'Admin panel for BKSDA Sumatera Selatan',
        },
    ],
});

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
    authStore.clear();
    toast.info('Session expired', { description: 'Please log in again.' });
    router.push('/admin/login');
};

onMounted(() => {
    if (authStore.isTokenExpired) {
        handleLogout();
    }
});

watch(
    () => authStore.isTokenExpired,
    (isExpired) => {
        if (isExpired) {
            handleLogout();
        }
    }
);
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
            <Toaster />
        </div>

        <!-- Confirm Dialog -->
        <ConfirmDialog />
    </div>
</template>
