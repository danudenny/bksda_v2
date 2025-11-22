<script setup lang="ts">
import BlockRenderer from '@/components/builder/BlockRenderer.vue';
import { Icon } from '@iconify/vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

definePageMeta({
    // layout: 'detail', // We use NuxtLayout wrapper instead to pass slots
});

const route = useRoute();

const { data: page, error } = await useFetch(
    `/api/pages/slug/${route.params.slug}`
);

if (error.value || !page.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page not found',
    });
}

useHead({
    title: page.value.title,
});

const copySuccess = ref(false);
const canNativeShare = ref(false);

const socialShares = [
    {
        name: 'WhatsApp',
        icon: 'mdi:whatsapp',
        colorClass:
            'border-green-200 bg-green-50 text-green-600 hover:bg-green-600 hover:border-green-600 hover:text-white focus:ring-green-500',
        getUrl: (url: string, title: string) =>
            `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
    },
    {
        name: 'Facebook',
        icon: 'mdi:facebook',
        colorClass:
            'border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:border-blue-600 hover:text-white focus:ring-blue-500',
        getUrl: (url: string) =>
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
        name: 'X (Twitter)',
        icon: 'ri:twitter-x-fill',
        colorClass:
            'border-gray-200 bg-gray-50 text-gray-700 hover:bg-black hover:border-black hover:text-white focus:ring-gray-800',
        getUrl: (url: string, title: string) =>
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
];

const openSocialShare = (social: any) => {
    if (!page.value) return;

    const url = window.location.href;
    const title = page.value.title;
    const shareUrl = social.getUrl(url, title);

    const width = 600;
    const height = 400;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    window.open(
        shareUrl,
        'share-window',
        `width=${width},height=${height},top=${top},left=${left},menubar=no,toolbar=no,resizable=yes,scrollbars=yes`
    );
};

const onShareError = (err: unknown) => {
    console.error('Share failed:', err);
    copyLink();
};

const handleShare = async () => {
    if (navigator.share && page.value) {
        try {
            await navigator.share({
                title: page.value.title,
                text: page.value.title,
                url: window.location.href,
            });
        } catch (err) {
            if (err instanceof Error && err.name !== 'AbortError') {
                onShareError(err);
            }
        }
    } else {
        copyLink();
    }
};

const copyLink = async () => {
    try {
        await navigator.clipboard.writeText(window.location.href);
        copySuccess.value = true;
        setTimeout(() => {
            copySuccess.value = false;
        }, 2000);
    } catch (err) {
        console.error('Gagal menyalin tautan: ', err);
    }
};

const formatContent = (content: string) => {
    if (!content) return '';
    return content
        .replace(/<ul[^>]*>/g, '<ul class="space-y-3 my-6 list-none pl-0">')
        .replace(
            /<li[^>]*>/g,
            `
            <li class="flex items-start gap-3">
                <span class="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3 h-3">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                </span>
                <span class="flex-1 text-gray-700 leading-relaxed">
        `
        )
        .replace(/<\/li>/g, '</span></li>');
};

onMounted(() => {
    canNativeShare.value = !!navigator.share;
});
</script>

<template>
    <NuxtLayout name="detail">
        <template #breadcrumb>
            <span class="text-white">{{ page.title }}</span>
        </template>

        <template #header>
            <h1 class="text-3xl font-bold sm:text-4xl lg:text-5xl">
                {{ page.title }}
            </h1>
        </template>

        <div
            class="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5 sm:p-8"
        >
            <!-- Share Buttons -->
            <div
                class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100"
            >
                <div class="flex items-center gap-3">
                    <span
                        class="text-sm font-semibold text-gray-500 uppercase tracking-wider"
                    >
                        Bagikan:
                    </span>

                    <div class="flex items-center gap-2">
                        <button
                            v-for="social in socialShares"
                            :key="social.name"
                            @click="openSocialShare(social)"
                            :class="[
                                'group relative flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300',
                                'hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-1',
                                social.colorClass,
                            ]"
                            :aria-label="'Bagikan ke ' + social.name"
                            :title="'Bagikan ke ' + social.name"
                        >
                            <Icon
                                :icon="social.icon"
                                class="text-lg transition-transform group-hover:scale-110"
                            />
                        </button>

                        <button
                            @click="copyLink"
                            class="group relative flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-gray-600 transition-all duration-300 hover:-translate-y-1 hover:bg-gray-100 hover:shadow-lg hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1"
                            aria-label="Salin Tautan"
                            title="Salin Tautan"
                        >
                            <Icon
                                :icon="
                                    copySuccess
                                        ? 'mdi:check'
                                        : 'mdi:link-variant'
                                "
                                :class="[
                                    'text-lg transition-all duration-300',
                                    copySuccess
                                        ? 'text-emerald-600 scale-110'
                                        : '',
                                ]"
                            />
                        </button>
                    </div>
                </div>

                <button
                    v-if="canNativeShare"
                    @click="handleShare"
                    class="hidden sm:flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                    <Icon icon="mdi:share-variant-outline" />
                    <span>Opsi Lainnya</span>
                </button>
            </div>

            <BlockRenderer v-if="page.blocks" :blocks="page.blocks" />
            <!-- Fallback for old content -->
            <div
                v-else
                class="prose dark:prose-invert max-w-none"
                v-html="formatContent(page.content)"
            ></div>
        </div>
    </NuxtLayout>

    <!-- Copy Success Toast -->
    <Teleport to="body">
        <transition
            enter-active-class="transition ease-out duration-300"
            enter-from-class="opacity-0 translate-y-4"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-200"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-4"
        >
            <div
                v-if="copySuccess"
                class="fixed bottom-8 right-8 z-50 flex items-center gap-3 rounded-lg bg-emerald-600 px-6 py-4 text-white shadow-xl"
            >
                <Icon icon="simple-line-icons:check" />
                <span class="font-medium">Tautan berhasil disalin!</span>
            </div>
        </transition>
    </Teleport>
</template>
