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
import { Switch } from '@/components/ui/switch';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { computed, ref, watch } from 'vue';

const props = defineProps<{
    isOpen: boolean;
    page: any | null;
}>();

const emit = defineEmits(['close', 'save']);

const formData = ref({
    title: '',
    slug: '',
    content: '',
    published: false,
});

const isEdit = computed(() => !!props.page);

watch(
    () => props.page,
    (newPage) => {
        if (newPage) {
            formData.value = {
                title: newPage.title,
                slug: newPage.slug,
                content: newPage.content,
                published: newPage.published,
            };
        } else {
            formData.value = {
                title: '',
                slug: '',
                content: '',
                published: false,
            };
        }
    },
    { immediate: true }
);

function handleSubmit() {
    emit('save', { ...formData.value });
}
</script>

<template>
    <Dialog :open="isOpen" @update:open="(val) => !val && emit('close')">
        <DialogContent class="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>{{
                    isEdit ? 'Edit Page' : 'Add Page'
                }}</DialogTitle>
                <DialogDescription>
                    {{
                        isEdit
                            ? 'Edit the page content below.'
                            : 'Create a new static page.'
                    }}
                </DialogDescription>
            </DialogHeader>

            <div class="grid gap-4 py-4">
                <div class="grid gap-2">
                    <Label for="title">Title</Label>
                    <Input
                        id="title"
                        v-model="formData.title"
                        placeholder="Page Title"
                    />
                </div>

                <div class="grid gap-2">
                    <Label for="slug">Slug (Optional)</Label>
                    <Input
                        id="slug"
                        v-model="formData.slug"
                        placeholder="page-slug"
                    />
                    <p class="text-xs text-gray-500">
                        Leave empty to auto-generate from title.
                    </p>
                </div>

                <div class="grid gap-2">
                    <Label>Content</Label>
                    <div class="min-h-[300px] border rounded-md">
                        <QuillEditor
                            v-model:content="formData.content"
                            contentType="html"
                            theme="snow"
                            toolbar="full"
                        />
                    </div>
                </div>

                <div class="flex items-center justify-between">
                    <Label for="published">Published</Label>
                    <Switch
                        id="published"
                        :checked="formData.published"
                        @update:checked="
                            (val: boolean) => (formData.published = val)
                        "
                    />
                </div>
            </div>

            <DialogFooter>
                <Button variant="outline" @click="emit('close')">Cancel</Button>
                <Button @click="handleSubmit">Save</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
