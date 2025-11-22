<script setup lang="ts">
import CloudinaryAssetPicker from '@/components/admin/CloudinaryAssetPicker.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Image as ImageIcon } from 'lucide-vue-next';
import { ref, watch } from 'vue';

const props = defineProps<{
    modelValue: any;
}>();

const emit = defineEmits(['update:modelValue']);

const data = ref({ ...props.modelValue });
const isPickerOpen = ref(false);

watch(
    data,
    (val) => {
        emit('update:modelValue', val);
    },
    { deep: true }
);

function handleSelect(asset: { url: string }) {
    data.value.imageUrl = asset.url;
}
</script>

<template>
    <div class="space-y-4 p-4 border rounded-lg bg-white dark:bg-gray-800">
        <div class="grid gap-2">
            <Label>Image</Label>
            <div class="flex gap-2">
                <Input v-model="data.imageUrl" placeholder="https://..." />
                <Button variant="outline" @click="isPickerOpen = true">
                    <ImageIcon class="w-4 h-4 mr-2" />
                    Select
                </Button>
            </div>
        </div>
        <div class="grid gap-2">
            <Label>Caption</Label>
            <Input v-model="data.caption" placeholder="Image Caption" />
        </div>
        <div v-if="data.imageUrl" class="mt-2">
            <img
                :src="data.imageUrl"
                alt="Preview"
                class="max-h-40 rounded-lg object-cover"
            />
        </div>

        <CloudinaryAssetPicker
            v-model:open="isPickerOpen"
            @select="handleSelect"
        />
    </div>
</template>
