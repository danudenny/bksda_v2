<script setup lang="ts">
const props = defineProps<{
    blocks: any[];
}>();

function getComponent(type: string) {
    switch (type) {
        case 'text':
            return null;
        case 'image':
            return null;
        case 'features':
            return null;
        default:
            return null;
    }
}
</script>

<template>
    <div class="space-y-12">
        <template v-for="block in blocks" :key="block.id">
            <!-- Text Block -->
            <section
                v-if="block.type === 'text'"
                class="container mx-auto px-4"
            >
                <div
                    class="prose dark:prose-invert max-w-none"
                    v-html="block.data.content"
                ></div>
            </section>

            <!-- Image Block -->
            <section
                v-else-if="block.type === 'image'"
                class="container mx-auto px-4"
            >
                <figure>
                    <img
                        :src="block.data.imageUrl"
                        :alt="block.data.caption"
                        class="w-full rounded-lg shadow-lg"
                    />
                    <figcaption
                        v-if="block.data.caption"
                        class="mt-2 text-center text-gray-500"
                    >
                        {{ block.data.caption }}
                    </figcaption>
                </figure>
            </section>

            <!-- Features Block -->
            <section
                v-else-if="block.type === 'features'"
                class="container mx-auto px-4"
            >
                <h2 class="text-3xl font-bold text-center mb-8">
                    {{ block.data.title }}
                </h2>
                <div class="grid md:grid-cols-3 gap-8">
                    <div
                        v-for="(feature, index) in block.data.features"
                        :key="index"
                        class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border"
                    >
                        <!-- Icon placeholder -->
                        <div class="mb-4 text-primary">
                            <!-- We would need a dynamic icon component here -->
                            <span class="font-bold">{{ feature.icon }}</span>
                        </div>
                        <h3 class="text-xl font-semibold mb-2">
                            {{ feature.title }}
                        </h3>
                        <p class="text-gray-600 dark:text-gray-400">
                            {{ feature.description }}
                        </p>
                    </div>
                </div>
            </section>
        </template>
    </div>
</template>
