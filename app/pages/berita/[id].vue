<template>
    <NuxtLayout name="detail">
        <template #breadcrumb>
            <NuxtLink
                to="/berita"
                class="text-emerald-200 transition-colors hover:text-white"
            >
                Berita
            </NuxtLink>
            <span class="text-emerald-400">/</span>
            <span class="text-white line-clamp-1">{{
                post?.title || 'Detail'
            }}</span>
        </template>

        <template #header>
            <h1
                class="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl"
            >
                {{ post?.title || 'Berita Tidak Ditemukan' }}
            </h1>
        </template>

        <template #meta>
            <div
                v-if="post"
                class="mt-6 flex flex-wrap items-center gap-3 text-sm"
            >
                <time
                    :datetime="post.datetime"
                    class="flex items-center gap-2 text-emerald-100"
                >
                    <Icon icon="mdi:calendar-blank-outline" />
                    {{ post.date }}
                </time>
                <span class="text-emerald-400">•</span>
                <span
                    class="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1.5 font-medium text-white"
                >
                    <Icon icon="mdi:tag-outline" />
                    {{ post.category.title }}
                </span>
            </div>
        </template>

        <article
            v-if="post"
            class="bg-white rounded-2xl shadow-xl ring-1 ring-gray-900/5 p-6 sm:p-8 lg:p-12 -mt-8"
        >
           <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
                <div class="flex items-center gap-3">
                    <span class="text-sm font-semibold text-gray-500 uppercase tracking-wider">
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
                                social.colorClass
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
                                :icon="copySuccess ? 'mdi:check' : 'mdi:link-variant'" 
                                :class="[
                                    'text-lg transition-all duration-300',
                                    copySuccess ? 'text-emerald-600 scale-110' : ''
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

            <div class="relative overflow-hidden rounded-xl mb-8">
                <NuxtImg
                    :src="post.imageUrl || 'https://placehold.co/600x400?text=No+Image'"
                    :alt="post.title"
                    class="w-full aspect-video object-cover"
                    loading="lazy"
                />
            </div>

            <!-- Article Content -->
            <div class="prose prose-lg prose-emerald max-w-none">
                <div
                    class="lead text-xl text-gray-700 font-medium leading-relaxed"
                    v-html="post.description"
                ></div>

                <div v-html="post.content"></div>
            </div>

            <!-- Author Information -->
            <div class="mt-12 pt-8 border-t border-gray-200">
                <div class="flex items-start gap-4">
                    <div
                        class="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 p-0.5"
                    >
                        <div
                            class="h-full w-full text-emerald-600 rounded-full bg-white flex items-center justify-center"
                        >
                            {{ avatarFromName(post.author.name) }}
                        </div>
                    </div>
                    <div class="flex-1 min-w-0">
                        <p
                            class="text-xs font-medium text-emerald-600 uppercase tracking-wide"
                        >
                            Ditulis oleh
                        </p>
                        <p class="mt-1 text-lg font-bold text-gray-900">
                            {{ post.author.name }}
                        </p>
                        <p class="text-sm text-gray-600">
                            {{ post.author.role }}
                        </p>
                    </div>
                </div>
            </div>
        </article>

        <!-- Related Posts -->
        <div
            v-if="relatedPosts.length > 0"
            class="mt-16 pt-12 border-t border-gray-200"
        >
            <div class="flex items-center gap-3 mb-8">
                <div
                    class="h-1 w-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full"
                ></div>
                <h2 class="text-2xl font-bold text-gray-900">Berita Terkait</h2>
            </div>
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <article
                    v-for="relatedPost in relatedPosts"
                    :key="relatedPost.id"
                    class="group relative flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-gray-900/5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                    <NuxtLink :to="relatedPost.href" class="block">
                        <div class="relative overflow-hidden">
                            <NuxtImg
                                :src="relatedPost.imageUrl || 'https://placehold.co/600x400?text=No+Image'"
                                :alt="relatedPost.title"
                                class="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                            />
                            <div
                                class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            ></div>
                        </div>
                        <div class="flex flex-1 flex-col p-5">
                            <div class="flex items-center gap-2 text-xs mb-3">
                                <time
                                    :datetime="relatedPost.datetime"
                                    class="flex items-center gap-1 text-gray-500"
                                >
                                    <Icon icon="mdi:calendar" />
                                    {{ relatedPost.date }}
                                </time>
                                <span class="text-gray-400">•</span>
                                <span
                                    class="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700"
                                >
                                    {{ relatedPost.category.title }}
                                </span>
                            </div>
                            <h3
                                class="text-base font-bold leading-snug text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition-colors"
                            >
                                <span class="absolute inset-0" />
                                {{ relatedPost.title }}
                            </h3>
                        </div>
                    </NuxtLink>
                </article>
            </div>
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

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import type { Post } from '../../../types/types';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

const route = useRoute();
const postId = route.params.id;
const avatarFromName = (name: string) => {
    const initials = name
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase())
        .join('');
    return initials;
};

const copySuccess = ref(false);
const canNativeShare = ref(false);

const onShareError = (err: unknown) => {
    console.error('Share failed:', err);
    copyLink();
};

const handleShare = async () => {
    if (navigator.share && post.value) {
        try {
            await navigator.share({
                title: post.value.title,
                text: post.value.description || post.value.title,
                url: window.location.href,
            });
        } catch (err) {
             // User cancelled or share failed, try fallback if not cancellation
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

onMounted(() => {
    canNativeShare.value = !!navigator.share;
    if (post.value) {
        setTimeout(async () => {
            try {
                await $fetch('/api/visitors/track', {
                    method: 'POST',
                    body: {
                        path: route.path,
                        postId: post.value?.id 
                    }
                });
            } catch (err) {
                console.error('Tracking failed', err);
            }
        }, 3000);
    }
});

const { data: postData, error } = await useAsyncData<{data: Post}>(
    `post-${postId}`,
    () => $fetch(`/api/posts/${postId}`),
);

const socialShares = [
    {
        name: 'WhatsApp',
        icon: 'mdi:whatsapp',
        colorClass: 'border-green-200 bg-green-50 text-green-600 hover:bg-green-600 hover:border-green-600 hover:text-white focus:ring-green-500',
        getUrl: (url: string, title: string) => `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`
    },
    {
        name: 'Facebook',
        icon: 'mdi:facebook',
        colorClass: 'border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:border-blue-600 hover:text-white focus:ring-blue-500',
        getUrl: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    },
    {
        name: 'X (Twitter)',
        icon: 'ri:twitter-x-fill', // atau ri:twitter-x-fill jika ingin logo X baru
        colorClass: 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-black hover:border-black hover:text-white focus:ring-gray-800',
        getUrl: (url: string, title: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
    }
];

const openSocialShare = (social: any) => {
    if (!post.value) return;
    
    const url = window.location.href;
    const title = post.value.title;
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

if (error.value) {
    throw createError({ statusCode: 404, statusMessage: 'Berita tidak ditemukan' });
}

const post = computed(() => {
    if (!postData.value?.data) return null;
    const p = postData.value.data;
    return {
        ...p,
        href: `/berita/${p.slug}`,
        imageUrl: p.imageUrl,
        date: format(parseISO(p.createdAt), 'dd MMMM yyyy', { locale: id }),
        datetime: p.createdAt,
        category: {
            ...p.category,
            title: p.category.name,
        },
        author: {
            ...p.author,
            role: p.author.role || 'Kontributor',
        },
    };
});

const { data: relatedPostsData } = useAsyncData<Post[]>(
    `related-posts-${postId}`,
    () => {
        if (!post.value?.slug) return Promise.resolve([])
        return $fetch(`/api/posts?limit=3&category_ids=${post.value.categoryId}&exclude=${post.value.slug}`)
            .then((res: any) => res.data || [])
    },
    {
        watch: [() => post.value?.slug]
    },
);

const relatedPosts = computed(() => {
    if (!relatedPostsData.value) return [];
    return relatedPostsData.value.filter((p: Post) => p.id !== post.value?.id).map((p: Post) => ({
        ...p,
        href: `/berita/${p.slug}`,
        imageUrl: p.imageUrl,
        date: format(parseISO(p.createdAt), 'dd MMMM yyyy', { locale: id }),
        datetime: p.createdAt,
        category: {
            ...p.category,
            title: p.category.name,
        },
    }));
});

// Set page title dynamically
useSeoMeta({
    title: post.value
        ? `${post.value.title} - BKSDA Sumatera Selatan`
        : 'Berita Tidak Ditemukan',
    description: post.value?.description || '',
    ogTitle: post.value?.title || '',
    ogDescription: post.value?.description || '',
    ogImage: post.value?.imageUrl || '',
});
</script>

<style>
.prose-lg :where(p) {
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  line-height: 1.8;
}
</style>
