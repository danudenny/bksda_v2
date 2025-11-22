<script setup lang="ts">
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { computed, ref, watch } from 'vue';

const props = defineProps<{
    isOpen: boolean;
    menu: any | null;
    menus: any[]; // For parent selection
    pages: any[]; // For page selection
}>();

const emit = defineEmits(['close', 'save']);

const formData = ref({
    label: '',
    type: 'LINK',
    href: '',
    pageId: '',
    parentId: 'root', // Use 'root' for top-level
    icon: '',
    order: 0,
    isActive: true,
});

const isEdit = computed(() => !!props.menu);

// Flatten menus for parent selection
const flatMenus = computed(() => {
    const result: any[] = [];
    const traverse = (items: any[], depth = 0) => {
        for (const item of items) {
            // Don't allow selecting itself or its children as parent (to prevent cycles)
            if (
                props.menu &&
                (item.id === props.menu.id || isChild(item, props.menu.id))
            ) {
                continue;
            }
            result.push({
                id: item.id,
                label: '-'.repeat(depth * 2) + ' ' + item.label,
            });
            if (item.children) {
                traverse(item.children, depth + 1);
            }
        }
    };
    traverse(props.menus);
    return result;
});

function isChild(item: any, parentId: string): boolean {
    if (item.parentId === parentId) return true;
    if (item.children) {
        return item.children.some((child: any) => isChild(child, parentId));
    }
    return false;
}

watch(
    () => props.menu,
    (newMenu) => {
        if (newMenu) {
            formData.value = {
                label: newMenu.label,
                type: newMenu.type || 'LINK',
                href: newMenu.href || '',
                pageId: newMenu.pageId || '',
                parentId: newMenu.parentId || 'root',
                icon: newMenu.icon || '',
                order: newMenu.order || 0,
                isActive: newMenu.isActive,
            };
        } else {
            formData.value = {
                label: '',
                type: 'LINK',
                href: '',
                pageId: '',
                parentId: 'root',
                icon: '',
                order: 0,
                isActive: true,
            };
        }
    },
    { immediate: true }
);

watch(
    () => props.isOpen,
    (val) => {
        if (val && !props.menu) {
            formData.value = {
                label: '',
                type: 'LINK',
                href: '',
                pageId: '',
                parentId: 'root',
                icon: '',
                order: 0,
                isActive: true,
            };
        }
    }
);

function handleSubmit() {
    const payload = { ...formData.value };
    if (payload.parentId === 'root') {
        // @ts-ignore
        payload.parentId = null;
    }
    emit('save', payload);
}
</script>

<template>
    <Dialog :open="isOpen" @update:open="(val) => !val && emit('close')">
        <DialogContent class="sm:max-w-[500px]">
            <DialogHeader>
                <DialogTitle>{{
                    isEdit ? 'Edit Menu' : 'Add Menu'
                }}</DialogTitle>
                <DialogDescription>
                    {{
                        isEdit
                            ? 'Edit the menu item details below.'
                            : 'Create a new menu item.'
                    }}
                </DialogDescription>
            </DialogHeader>

            <div class="grid gap-4 py-4">
                <div class="grid gap-2">
                    <Label for="label">Label</Label>
                    <Input
                        id="label"
                        v-model="formData.label"
                        placeholder="Menu Label"
                    />
                </div>

                <div class="grid gap-2">
                    <Label for="parent">Parent Menu</Label>
                    <Select v-model="formData.parentId">
                        <SelectTrigger>
                            <SelectValue placeholder="Select parent menu" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="root">Top Level</SelectItem>
                            <SelectItem
                                v-for="item in flatMenus"
                                :key="item.id"
                                :value="item.id"
                            >
                                {{ item.label }}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div class="grid gap-2">
                    <Label for="type">Type</Label>
                    <Select v-model="formData.type">
                        <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="LINK"
                                >External Link / Custom URL</SelectItem
                            >
                            <SelectItem value="PAGE">Static Page</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div v-if="formData.type === 'LINK'" class="grid gap-2">
                    <Label for="href">URL</Label>
                    <Input
                        id="href"
                        v-model="formData.href"
                        placeholder="/path/to/page or https://..."
                    />
                </div>

                <div v-if="formData.type === 'PAGE'" class="grid gap-2">
                    <Label for="page">Page</Label>
                    <Select v-model="formData.pageId">
                        <SelectTrigger>
                            <SelectValue placeholder="Select page" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem
                                v-for="page in pages"
                                :key="page.id"
                                :value="page.id"
                            >
                                {{ page.title }}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div class="grid gap-2">
                    <Label for="icon">Icon (Lucide Name)</Label>
                    <Input
                        id="icon"
                        v-model="formData.icon"
                        placeholder="e.g. Home, Users (optional)"
                    />
                </div>

                <div class="grid gap-2">
                    <Label for="order">Order</Label>
                    <Input
                        id="order"
                        type="number"
                        v-model="formData.order"
                        placeholder="0"
                    />
                </div>

                <div class="flex items-center justify-between">
                    <Label for="isActive">Active</Label>
                    <Switch id="isActive" v-model="formData.isActive" />
                </div>
            </div>

            <DialogFooter>
                <Button variant="outline" @click="emit('close')">Cancel</Button>
                <Button @click="handleSubmit">Save</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
