<script setup lang="ts">
import MenuModal from '@/components/admin/MenuModal.vue';
import { Button } from '@/components/ui/button';
import { useConfirmDialog } from '@/composables/useConfirmDialog';
import { useAuthStore } from '@/stores/auth';
import {
    ChevronDown,
    ChevronRight,
    Edit,
    Loader,
    Plus,
    Trash2,
} from 'lucide-vue-next';
import { onMounted, ref } from 'vue';
import { toast } from 'vue-sonner';

definePageMeta({
    layout: 'admin',
});

// State
const menus = ref<any[]>([]);
const pages = ref<any[]>([]); // We need to fetch pages too
const loading = ref(false);
const isModalOpen = ref(false);
const selectedMenu = ref<any | null>(null);
const expandedMenus = ref<string[]>([]);

// Methods
async function fetchMenus() {
    loading.value = true;
    try {
        const authStore = useAuthStore();
        const response = await $fetch('/api/menus', {
            headers: {
                Authorization: `Bearer ${authStore.token}`,
            },
        });

        if (response.success) {
            menus.value = response.data;
        }
    } catch (error) {
        console.error('Failed to fetch menus:', error);
        toast.error('Failed to fetch menus');
    } finally {
        loading.value = false;
    }
}

async function fetchPages() {
    try {
        const authStore = useAuthStore();
        const response = await $fetch('/api/pages', {
            headers: {
                Authorization: `Bearer ${authStore.token}`,
            },
        });

        if (response.success) {
            pages.value = response.data;
        }
    } catch (error) {
        console.warn('Failed to fetch pages:', error);
    }
}

function toggleExpand(id: string) {
    const index = expandedMenus.value.indexOf(id);
    if (index > -1) {
        expandedMenus.value.splice(index, 1);
    } else {
        expandedMenus.value.push(id);
    }
}

function openModal(menu: any = null) {
    selectedMenu.value = menu;
    isModalOpen.value = true;
}

function closeModal() {
    isModalOpen.value = false;
    selectedMenu.value = null;
}

async function handleSave(menuData: any) {
    try {
        const authStore = useAuthStore();
        let response;

        if (selectedMenu.value) {
            // Update
            response = await $fetch(`/api/menus/${selectedMenu.value.id}`, {
                method: 'PUT',
                body: menuData,
                headers: {
                    Authorization: `Bearer ${authStore.token}`,
                },
            });
        } else {
            // Create
            response = await $fetch('/api/menus', {
                method: 'POST',
                body: menuData,
                headers: {
                    Authorization: `Bearer ${authStore.token}`,
                },
            });
        }

        if (response.success) {
            toast.success(
                `Menu ${selectedMenu.value ? 'updated' : 'created'} successfully`
            );
            fetchMenus();
            closeModal();
        }
    } catch (error) {
        console.error('Failed to save menu:', error);
        toast.error('Failed to save menu');
    }
}

async function deleteMenu(id: string) {
    const { open } = useConfirmDialog();
    const confirmed = await open({
        title: 'Delete Menu',
        message:
            'Are you sure you want to delete this menu? All children will also be deleted.',
        confirmText: 'Delete',
        cancelText: 'Cancel',
        isDangerous: true,
    });

    if (!confirmed) return;

    try {
        const authStore = useAuthStore();
        await $fetch(`/api/menus/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${authStore.token}`,
            },
        });

        toast.success('Menu deleted successfully');
        fetchMenus();
    } catch (error) {
        console.error('Failed to delete menu:', error);
        toast.error('Failed to delete menu');
    }
}

// Recursive component for menu list
const MenuList = {
    name: 'MenuList',
    props: ['items', 'depth'],
    setup(props: any) {
        return () =>
            props.items.map((item: any) => {
                const hasChildren = item.children && item.children.length > 0;
                const isExpanded = expandedMenus.value.includes(item.id);

                return [
                    h(
                        'div',
                        {
                            class: 'flex items-center py-3 px-4 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 transition-colors',
                            style: {
                                paddingLeft: `${props.depth * 20 + 16}px`,
                            },
                        },
                        [
                            // Expand/Collapse Icon
                            h(
                                'button',
                                {
                                    class: `mr-2 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${hasChildren ? 'visible' : 'invisible'}`,
                                    onClick: () => toggleExpand(item.id),
                                },
                                isExpanded
                                    ? h(ChevronDown, { class: 'w-4 h-4' })
                                    : h(ChevronRight, { class: 'w-4 h-4' })
                            ),
                            // Label & Icon
                            h(
                                'div',
                                { class: 'flex-1 flex items-center gap-3' },
                                [
                                    h(
                                        'span',
                                        { class: 'font-medium' },
                                        item.label
                                    ),
                                    item.type === 'PAGE'
                                        ? h(
                                              'span',
                                              {
                                                  class: 'text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded',
                                              },
                                              'Page'
                                          )
                                        : null,
                                    !item.isActive
                                        ? h(
                                              'span',
                                              {
                                                  class: 'text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded',
                                              },
                                              'Inactive'
                                          )
                                        : null,
                                ]
                            ),
                            // Actions
                            h('div', { class: 'flex items-center gap-2' }, [
                                h(
                                    Button,
                                    {
                                        variant: 'ghost',
                                        size: 'sm',
                                        onClick: () => openModal(item),
                                        class: 'h-8 w-8 p-0',
                                    },
                                    () => h(Edit, { class: 'w-4 h-4' })
                                ),
                                h(
                                    Button,
                                    {
                                        variant: 'ghost',
                                        size: 'sm',
                                        onClick: () => deleteMenu(item.id),
                                        class: 'h-8 w-8 p-0 text-red-600 hover:text-red-700',
                                    },
                                    () => h(Trash2, { class: 'w-4 h-4' })
                                ),
                            ]),
                        ]
                    ),
                    // Children
                    hasChildren && isExpanded
                        ? h(MenuList, {
                              items: item.children,
                              depth: props.depth + 1,
                          })
                        : null,
                ];
            });
    },
};

onMounted(() => {
    fetchMenus();
    fetchPages();
});
</script>

<template>
    <div>
        <!-- Page Header -->
        <div class="mb-6 flex items-center justify-between">
            <div>
                <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
                    Menu Management
                </h1>
                <p class="text-gray-600 dark:text-gray-400 mt-2">
                    Manage your website navigation menus
                </p>
            </div>
            <Button
                @click="openModal()"
                class="bg-primary hover:bg-primary-600 dark:bg-green-500 dark:hover:bg-green-600"
            >
                <Plus class="w-4 h-4 mr-2" />
                Add Menu
            </Button>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center py-12">
            <Loader class="w-8 h-8 animate-spin text-primary" />
        </div>

        <!-- Menu List -->
        <div
            v-else
            class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
            <div class="min-w-full">
                <div
                    class="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 px-4 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider flex"
                >
                    <div class="w-8"></div>
                    <div class="flex-1">Label</div>
                    <div class="w-20 text-right">Actions</div>
                </div>
                <div class="divide-y divide-gray-200 dark:divide-gray-700">
                    <component :is="MenuList" :items="menus" :depth="0" />
                </div>
                <div
                    v-if="menus.length === 0"
                    class="px-6 py-12 text-center text-gray-500"
                >
                    No menus found. Create one to get started.
                </div>
            </div>
        </div>

        <MenuModal
            :is-open="isModalOpen"
            :menu="selectedMenu"
            :menus="menus"
            :pages="pages"
            @close="closeModal"
            @save="handleSave"
        />
    </div>
</template>
