<script setup lang="ts">
import PageBuilder from '@/components/builder/PageBuilder.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAuthStore } from '@/stores/auth';
import { ArrowLeft, Loader, Save } from 'lucide-vue-next';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

definePageMeta({
    layout: 'admin',
});

const route = useRoute();
const router = useRouter();
const loading = ref(false);
const fetching = ref(true);

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

async function fetchPage() {
    try {
        const authStore = useAuthStore();
        const response = await $fetch(`/api/pages/${route.params.id}`, {
            headers: {
                Authorization: `Bearer ${authStore.token}`,
            },
        });

        if (response.success) {
            const page = response.data;
            formData.value = {
                title: page.title,
                slug: page.slug,
                blocks: page.blocks || [],
                published: page.published,
            };
        }
    } catch (error) {
        console.error('Failed to fetch page:', error);
        toast.error('Failed to fetch page');
        router.push('/admin/pages');
    } finally {
        fetching.value = false;
    }
}

async function handleSave() {
    if (!formData.value.title) {
        toast.error('Title is required');
        return;
    }

    loading.value = true;
    try {
        const authStore = useAuthStore();
        const content = '<p>Page built with builder</p>';

        console.log(formData.value);

        const response = await $fetch(`/api/pages/${route.params.id}`, {
            method: 'PUT',
            body: {
                ...formData.value,
                content,
            },
            headers: {
                Authorization: `Bearer ${authStore.token}`,
            },
        });

        if (response.success) {
            toast.success('Page updated successfully');
        }
    } catch (error: any) {
        console.error('Failed to save page:', error);
        toast.error(error.statusMessage || 'Failed to save page');
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    fetchPage();
});
</script>

<template>
    <div v-if="fetching" class="flex items-center justify-center h-full">
        <Loader class="w-8 h-8 animate-spin text-primary" />
    </div>
    <div v-else class="h-[calc(100vh-100px)] flex flex-col">
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
                        Edit Page
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
