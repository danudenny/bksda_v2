<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-vue-next';
import { ref, watch } from 'vue';

const props = defineProps<{
    modelValue: any;
}>();

const emit = defineEmits(['update:modelValue']);

const data = ref({
    title: props.modelValue.title || '',
    features: props.modelValue.features || [],
});

watch(
    data,
    (val) => {
        emit('update:modelValue', val);
    },
    { deep: true }
);

function addFeature() {
    data.value.features.push({
        title: '',
        description: '',
        icon: '',
    });
}

function removeFeature(index: number) {
    data.value.features.splice(index, 1);
}
</script>

<template>
    <div class="space-y-4 p-4 border rounded-lg bg-white dark:bg-gray-800">
        <div class="grid gap-2">
            <Label>Section Title</Label>
            <Input v-model="data.title" placeholder="Features Section Title" />
        </div>

        <div class="space-y-2">
            <Label>Features</Label>
            <div
                v-for="(feature, index) in data.features"
                :key="index"
                class="flex gap-4 items-start p-3 border rounded-md bg-gray-50 dark:bg-gray-900"
            >
                <div class="flex-1 space-y-2">
                    <Input
                        v-model="feature.title"
                        placeholder="Feature Title"
                    />
                    <Textarea
                        v-model="feature.description"
                        placeholder="Feature Description"
                        rows="2"
                    />
                    <Input
                        v-model="feature.icon"
                        placeholder="Icon Name (Lucide)"
                    />
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    @click="removeFeature(index)"
                    class="text-red-500 hover:text-red-700"
                >
                    <Trash2 class="w-4 h-4" />
                </Button>
            </div>
            <Button
                variant="outline"
                size="sm"
                @click="addFeature"
                class="w-full"
            >
                <Plus class="w-4 h-4 mr-2" />
                Add Feature
            </Button>
        </div>
    </div>
</template>
