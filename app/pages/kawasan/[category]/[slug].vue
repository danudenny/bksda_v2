<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { useApi } from '@/composables/useApi';
import { Loader, MapPin, TreeDeciduous } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const { getKawasanLocationBySlug, loading } = useApi();

const categorySlug = route.params.category as string;
const locationSlug = route.params.slug as string;

const location = ref<any>(null);
const error = ref<string | null>(null);

async function fetchLocation() {
    const response = await getKawasanLocationBySlug(categorySlug, locationSlug);
    if (response.success && response.data) {
        location.value = response.data;
        useHead({
            title: `${location.value.name} - ${location.value.category?.name || 'BKSDA'}`,
            meta: [
                {
                    name: 'description',
                    content: location.value.description,
                },
            ],
        });
    } else {
        error.value = 'Location not found';
    }
}

onMounted(() => {
    fetchLocation();
});
</script>

<template>
    <NuxtLayout name="detail" :background-image="location?.imageUrl">
        <!-- Breadcrumb Slot -->
        <template #breadcrumb>
            <NuxtLink
                :to="`/kawasan/${categorySlug}`"
                class="text-emerald-200 transition-colors hover:text-white"
            >
                {{ location?.category?.name }}
            </NuxtLink>
            <span class="text-emerald-400">/</span>
            <span class="text-white font-medium">{{ location?.name }}</span>
        </template>

        <!-- Header Slot -->
        <template #header>
            <h1 class="text-3xl font-bold sm:text-4xl lg:text-6xl mb-4">
                {{ location?.name }}
            </h1>
            <p class="text-xl text-emerald-50 max-w-3xl leading-relaxed">
                {{ location?.description }}
            </p>
        </template>

        <!-- Main Content -->
        <div
            v-if="loading && !location"
            class="flex items-center justify-center py-20"
        >
            <Loader class="w-10 h-10 animate-spin text-emerald-600" />
        </div>

        <div v-else-if="error" class="text-center py-20">
            <h2 class="text-2xl font-bold text-slate-900 mb-2">
                Terjadi Kesalahan
            </h2>
            <p class="text-slate-600 mb-6">{{ error }}</p>
            <Button @click="router.push(`/kawasan/${categorySlug}`)">
                Kembali ke Kategori
            </Button>
        </div>

        <div
            v-else-if="location"
            class="grid grid-cols-1 lg:grid-cols-3 gap-12"
        >
            <!-- Left: Content -->
            <div class="lg:col-span-2 space-y-12">
                <!-- Description/Content -->
                <div
                    class="prose prose-lg prose-emerald max-w-none bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
                >
                    <div v-html="location.content"></div>
                </div>

                <!-- Map Section -->
                <div class="space-y-4">
                    <h3
                        class="text-2xl font-bold text-slate-900 flex items-center gap-2"
                    >
                        <MapPin class="w-6 h-6 text-emerald-600" />
                        Lokasi Kawasan
                    </h3>
                    <KawasanMap
                        :locations="[
                            {
                                id: location.id,
                                name: location.name,
                                type: location.category?.name,
                                lat: location.latitude,
                                lng: location.longitude,
                                description: location.description,
                                icon: MapPin,
                            },
                        ]"
                        :initial-location="{
                            id: location.id,
                            name: location.name,
                            type: location.category?.name,
                            lat: location.latitude,
                            lng: location.longitude,
                            description: location.description,
                            icon: MapPin,
                        }"
                        :disable-popup="true"
                    />
                </div>
            </div>

            <!-- Right: Info Sidebar -->
            <div class="space-y-6">
                <div
                    class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-24"
                >
                    <h3
                        class="text-lg font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100"
                    >
                        Informasi Kawasan
                    </h3>

                    <div class="space-y-4">
                        <div
                            v-if="location.latitude && location.longitude"
                            class="flex items-start gap-3"
                        >
                            <div
                                class="p-2 rounded-lg bg-emerald-50 text-emerald-600"
                            >
                                <MapPin class="w-5 h-5" />
                            </div>
                            <div>
                                <p class="text-sm font-medium text-slate-500">
                                    Koordinat
                                </p>
                                <p class="text-slate-900 font-mono text-sm">
                                    {{ location.latitude }},
                                    {{ location.longitude }}
                                </p>
                            </div>
                        </div>

                        <div class="flex items-start gap-3">
                            <div
                                class="p-2 rounded-lg bg-emerald-50 text-emerald-600"
                            >
                                <TreeDeciduous class="w-5 h-5" />
                            </div>
                            <div>
                                <p class="text-sm font-medium text-slate-500">
                                    Kategori
                                </p>
                                <p class="text-slate-900 font-medium">
                                    {{ location.category?.name }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="mt-8 pt-6 border-t border-slate-100">
                        <Button
                            class="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                            Unduh Brosur
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>
