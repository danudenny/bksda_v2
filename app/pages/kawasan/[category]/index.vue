<script setup lang="ts">
import { useApi } from '@/composables/useApi';
import { ArrowRight, Loader, MapPin } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const { getKawasanCategory, loading } = useApi();

const categorySlug = route.params.category as string;
const category = ref<any>(null);
const error = ref<string | null>(null);

async function fetchCategory() {
    const response = await getKawasanCategory(categorySlug);
    if (response.success && response.data) {
        category.value = response.data;
        useHead({
            title: `${category.value.name} - BKSDA`,
            meta: [
                {
                    name: 'description',
                    content: category.value.description,
                },
            ],
        });
    } else {
        error.value = 'Category not found';
    }
}

onMounted(() => {
    fetchCategory();
});
</script>

<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
        <!-- Loading -->
        <div
            v-if="loading && !category"
            class="flex items-center justify-center min-h-[60vh]"
        >
            <Loader class="w-10 h-10 animate-spin text-primary" />
        </div>

        <!-- Error -->
        <div
            v-else-if="error"
            class="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
        >
            <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                404
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
                {{ error }}
            </p>
            <Button @click="router.push('/')">Back to Home</Button>
        </div>

        <!-- Content -->
        <div v-else-if="category">
            <!-- Hero -->
            <div class="relative h-[40vh] md:h-[50vh]">
                <img
                    :src="category.imageUrl"
                    class="absolute inset-0 w-full h-full object-cover"
                    :alt="category.name"
                />
                <div class="absolute inset-0 bg-black/50"></div>
                <div
                    class="absolute inset-0 flex items-center justify-center text-center px-4"
                >
                    <div class="max-w-4xl">
                        <h1
                            class="text-4xl md:text-5xl font-bold text-white mb-4"
                        >
                            {{ category.name }}
                        </h1>
                        <p
                            class="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto"
                        >
                            {{ category.description }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Locations Grid -->
            <div class="container mx-auto px-4 py-16">
                <h2
                    class="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center"
                >
                    Destinasi Wisata & Konservasi
                </h2>

                <div
                    v-if="category.locations && category.locations.length > 0"
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <div
                        v-for="loc in category.locations"
                        :key="loc.id"
                        class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 group cursor-pointer"
                        @click="
                            router.push(`/kawasan/${categorySlug}/${loc.slug}`)
                        "
                    >
                        <div class="relative h-48 overflow-hidden">
                            <img
                                v-if="loc.imageUrl"
                                :src="loc.imageUrl"
                                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                :alt="loc.name"
                            />
                            <div
                                v-else
                                class="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
                            >
                                <MapPin class="w-10 h-10 text-gray-400" />
                            </div>
                        </div>
                        <div class="p-6">
                            <h3
                                class="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors"
                            >
                                {{ loc.name }}
                            </h3>
                            <p
                                class="text-gray-600 dark:text-gray-400 text-sm line-clamp-3"
                            >
                                {{ loc.description }}
                            </p>
                            <div
                                class="mt-4 flex items-center text-primary font-medium text-sm"
                            >
                                Selengkapnya <ArrowRight class="w-4 h-4 ml-1" />
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else class="text-center py-12">
                    <p class="text-gray-500 dark:text-gray-400">
                        Belum ada lokasi yang terdaftar di kategori ini.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
