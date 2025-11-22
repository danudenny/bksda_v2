<script setup lang="ts">
import { Label } from '@/components/ui/label';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { ref, watch } from 'vue';

const props = defineProps<{
    modelValue: any;
}>();

const emit = defineEmits(['update:modelValue']);

const data = ref({ ...props.modelValue });

watch(
    data,
    (val) => {
        emit('update:modelValue', val);
    },
    { deep: true }
);
</script>

<template>
    <div class="space-y-4 p-4 border rounded-lg bg-white dark:bg-gray-800">
        <div class="grid gap-2">
            <Label>Content</Label>
            <div class="min-h-[200px] border rounded-md">
                <QuillEditor
                    v-model:content="data.content"
                    contentType="html"
                    theme="snow"
                    toolbar="minimal"
                />
            </div>
        </div>
    </div>
</template>
