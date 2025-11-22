<script setup lang="ts">
import FeaturesBlock from '@/components/builder/blocks/FeaturesBlock.vue';
import ImageBlock from '@/components/builder/blocks/ImageBlock.vue';
import TextBlock from '@/components/builder/blocks/TextBlock.vue';
import { Button } from '@/components/ui/button';
import {
    GripVertical,
    Image as ImageIcon,
    Layers,
    LayoutGrid,
    Plus,
    Trash2,
    Type,
} from 'lucide-vue-next';
import { ref, watch } from 'vue';
import draggable from 'vuedraggable';

const props = defineProps<{
    modelValue: any[];
}>();

const emit = defineEmits(['update:modelValue']);

const blocks = ref([...props.modelValue]);

// Mapping ikon agar sesuai dengan string tipe
const iconMap: Record<string, any> = {
    text: Type,
    image: ImageIcon,
    features: LayoutGrid,
};

const availableBlocks = [
    {
        type: 'text',
        label: 'Text Content',
        description: 'Paragraphs & headings',
        icon: 'text',
    },
    {
        type: 'image',
        label: 'Image Media',
        description: 'Photos & captions',
        icon: 'image',
    },
    {
        type: 'features',
        label: 'Features Grid',
        description: '3-column feature list',
        icon: 'features',
    },
];

watch(
    () => props.modelValue,
    (val) => {
        if (JSON.stringify(val) !== JSON.stringify(blocks.value)) {
            blocks.value = [...val];
        }
    },
    { deep: true }
);

watch(
    blocks,
    (val) => {
        emit('update:modelValue', val);
    },
    { deep: true }
);

function addBlock(type: string) {
    const newBlock = {
        id: crypto.randomUUID(),
        type,
        data: {},
    };
    blocks.value.push(newBlock);

    // Auto scroll to bottom
    setTimeout(() => {
        const container = document.getElementById('canvas-container');
        if (container) container.scrollTop = container.scrollHeight;
    }, 100);
}

function removeBlock(index: number) {
    blocks.value.splice(index, 1);
}

function getComponent(type: string) {
    switch (type) {
        case 'text':
            return TextBlock;
        case 'image':
            return ImageBlock;
        case 'features':
            return FeaturesBlock;
        default:
            return null;
    }
}

// Helper untuk mendapatkan label yang rapi di header block
function getBlockLabel(type: string) {
    return (
        availableBlocks.find((b) => b.type === type)?.label || 'Unknown Block'
    );
}
</script>

<template>
    <div class="flex h-full overflow-hidden bg-background border-t">
        <!-- Sidebar Component Library -->
        <div
            class="w-72 flex-shrink-0 border-r bg-white dark:bg-slate-950 flex flex-col z-10"
        >
            <div class="p-4 border-b bg-white dark:bg-slate-950">
                <h3 class="font-semibold flex items-center gap-2 text-sm">
                    <Layers class="w-4 h-4 text-primary" />
                    Components
                </h3>
                <p class="text-xs text-muted-foreground mt-1">
                    Drag to add to page
                </p>
            </div>

            <div class="p-4 overflow-y-auto flex-1 custom-scrollbar">
                <div class="grid gap-3">
                    <button
                        v-for="block in availableBlocks"
                        :key="block.type"
                        class="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent hover:border-primary/50 transition-all text-left group relative overflow-hidden"
                        @click="addBlock(block.type)"
                    >
                        <div
                            class="p-2 bg-muted rounded-md group-hover:bg-background border transition-colors z-10"
                        >
                            <component
                                :is="iconMap[block.icon]"
                                class="w-4 h-4 text-foreground"
                            />
                        </div>
                        <div class="z-10">
                            <div class="font-medium text-sm">
                                {{ block.label }}
                            </div>
                            <div class="text-xs text-muted-foreground">
                                {{ block.description }}
                            </div>
                        </div>
                        <div
                            class="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"
                        ></div>
                        <Plus
                            class="w-4 h-4 absolute right-3 top-3 opacity-0 group-hover:opacity-100 text-primary transition-opacity z-10"
                        />
                    </button>
                </div>
            </div>
        </div>

        <!-- Main Canvas Area -->
        <div
            class="flex-1 flex flex-col min-w-0 bg-slate-50/50 dark:bg-slate-900/50 relative"
        >
            <!-- Canvas Header -->
            <div
                class="h-12 border-b bg-white dark:bg-slate-950 flex items-center px-6 justify-between shrink-0 z-10 shadow-sm"
            >
                <div class="flex items-center gap-2">
                    <span
                        class="text-xs font-medium text-muted-foreground uppercase tracking-wider"
                    >
                        Canvas
                    </span>
                    <span
                        class="bg-slate-100 dark:bg-slate-800 text-xs px-2 py-0.5 rounded-full text-slate-600 dark:text-slate-400"
                    >
                        {{ blocks.length }} Blocks
                    </span>
                </div>
                <div class="text-xs text-muted-foreground">
                    Auto-saving enabled
                </div>
            </div>

            <!-- Canvas Scroll Area -->
            <div
                id="canvas-container"
                class="flex-1 overflow-y-auto p-8 custom-scrollbar scroll-smooth"
            >
                <div class="max-w-4xl mx-auto min-h-[500px] pb-32">
                    <draggable
                        v-model="blocks"
                        item-key="id"
                        handle=".drag-handle"
                        class="space-y-6"
                        ghost-class="opacity-40"
                        drag-class="cursor-grabbing"
                        :animation="200"
                    >
                        <template #item="{ element, index }">
                            <div
                                class="group relative bg-white dark:bg-slate-950 rounded-xl border shadow-sm hover:shadow-md transition-all duration-200"
                            >
                                <!-- Block Header / Controls -->
                                <div
                                    class="flex items-center justify-between px-4 py-2 border-b bg-slate-50/50 dark:bg-slate-900/50 rounded-t-xl select-none group-hover:bg-slate-100/50 dark:group-hover:bg-slate-800/50 transition-colors"
                                >
                                    <div class="flex items-center gap-3">
                                        <div
                                            class="drag-handle cursor-grab active:cursor-grabbing p-1.5 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-colors text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                                            title="Drag to reorder"
                                        >
                                            <GripVertical class="w-4 h-4" />
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <div
                                                class="p-1 bg-white dark:bg-slate-800 rounded border shadow-sm"
                                            >
                                                <component
                                                    :is="iconMap[element.type]"
                                                    class="w-3 h-3 text-primary"
                                                />
                                            </div>
                                            <span
                                                class="text-sm font-medium text-slate-700 dark:text-slate-200"
                                            >
                                                {{
                                                    getBlockLabel(element.type)
                                                }}
                                            </span>
                                        </div>
                                    </div>

                                    <div
                                        class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            class="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
                                            @click="removeBlock(index)"
                                            title="Remove block"
                                        >
                                            <Trash2 class="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>

                                <!-- Block Content -->
                                <div class="p-6">
                                    <component
                                        :is="getComponent(element.type)"
                                        v-model="element.data"
                                    />
                                </div>
                            </div>
                        </template>
                    </draggable>

                    <!-- Empty State -->
                    <div
                        v-if="blocks.length === 0"
                        class="flex flex-col items-center justify-center py-24 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/20"
                    >
                        <div
                            class="p-4 bg-white dark:bg-slate-800 rounded-full mb-4 shadow-sm ring-1 ring-slate-100 dark:ring-slate-700"
                        >
                            <Plus class="w-8 h-8 text-slate-400" />
                        </div>
                        <h3
                            class="font-medium text-slate-900 dark:text-slate-200 text-lg"
                        >
                            Start Building
                        </h3>
                        <p
                            class="text-sm text-slate-500 mt-2 max-w-xs text-center leading-relaxed"
                        >
                            Select a component from the library on the left to
                            add it to your page.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(148, 163, 184, 0.5);
    border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(148, 163, 184, 0.8);
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(71, 85, 105, 0.5);
}
</style>
