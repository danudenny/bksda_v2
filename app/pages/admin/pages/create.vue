<script setup lang="ts">
import PageBuilder from '@/components/builder/PageBuilder.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAuthStore } from '@/stores/auth';
import { ArrowLeft, Loader, Save } from 'lucide-vue-next';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

definePageMeta({
    layout: 'admin',
});

const router = useRouter();
const loading = ref(false);

const formData = ref({
    title: '',
    slug: '',
    blocks: [],
    published: false,
});

function slugify(text: string) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
}

watch(
    () => formData.value.title,
    (newTitle) => {
        formData.value.slug = slugify(newTitle);
    }
);

async function handleSave() {
    if (!formData.value.title) {
        toast.error('Title is required');
        return;
    }

    loading.value = true;
    try {
        const authStore = useAuthStore();
        // Generate HTML content from blocks for fallback/SEO
        // For now, we just send an empty string or basic HTML
        const content = '<p>Page built with builder</p>';

        const response = await $fetch('/api/pages', {
            method: 'POST',
            body: {
                ...formData.value,
                content,
            },
            headers: {
                Authorization: `Bearer ${authStore.token}`,
            },
        });

        if (response.success) {
            toast.success('Page created successfully');
            router.push('/admin/pages');
        }
    } catch (error: any) {
        console.error('Failed to save page:', error);
        toast.error(error.statusMessage || 'Failed to save page');
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <div class="h-[calc(100vh-100px)] flex flex-col">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-4">
                <Button variant="ghost" size="icon" @click="router.back()">
                    <ArrowLeft class="w-5 h-5" />
                </Button>
                <div>
                    <h1
                        class="text-2xl font-bold text-gray-900 dark:text-white"
                    >
                        Create Page
                    </h1>
                </div>
            </div>
            <div class="flex items-center gap-4">
                <div class="flex items-center gap-2">
                    <Label for="published">Published</Label>
                    <Switch id="published" v-model="formData.published" />
                </div>
                <Button @click="handleSave" :disabled="loading">
                    <Loader v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
                    <Save v-else class="w-4 h-4 mr-2" />
                    Save Page
                </Button>
            </div>
        </div>

        <!-- Settings -->
        <div class="grid grid-cols-2 gap-6 mb-6">
            <div class="grid gap-2">
                <Label for="title">Title</Label>
                <Input
                    id="title"
                    v-model="formData.title"
                    placeholder="Page Title"
                />
            </div>
            <div class="grid gap-2">
                <Label for="slug">Slug (Auto-generated)</Label>
                <Input
                    id="slug"
                    v-model="formData.slug"
                    placeholder="page-slug"
                    readonly
                    class="bg-muted text-muted-foreground cursor-not-allowed"
                />
            </div>
        </div>

        <!-- Builder -->
        <div class="flex-1 min-h-0">
            <PageBuilder v-model="formData.blocks" />
        </div>
    </div>
</template>
