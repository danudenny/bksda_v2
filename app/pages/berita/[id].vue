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
            <!-- Share Button -->
            <div class="mb-8 flex justify-end">
                <div class="relative" ref="shareMenuRef">
                    <button
                        @click="toggleShareMenu"
                        class="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-emerald-600 bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-emerald-700 hover:border-emerald-700 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                    >
                        <Icon icon="mdi:share-variant-outline" class="h-4 w-4" aria-hidden="true" />
                        Bagikan
                    </button>

                    <!-- Share Menu -->
                    <transition
                        enter-active-class="transition ease-out duration-100"
                        enter-from-class="transform opacity-0 scale-95"
                        enter-to-class="transform opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-75"
                        leave-from-class="transform opacity-100 scale-100"
                        leave-to-class="transform opacity-0 scale-95"
                    >
                        <div
                            v-if="showShareMenu"
                            class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-xl ring-1 ring-black/5"
                        >
                            <div class="py-1">
                                <button
                                    @click="shareToFacebook"
                                    class="group flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                >
                                    <Icon icon="ic:baseline-facebook" />
                                    Facebook
                                </button>
                                <button
                                    @click="shareToTwitter"
                                    class="group flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-600 transition-colors"
                                >
                                    <Icon icon="prime:twitter" />
                                    Twitter / X
                                </button>
                                <button
                                    @click="shareToWhatsApp"
                                    class="group flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                                >
                                    <Icon icon="ic:baseline-whatsapp" />
                                    WhatsApp
                                </button>
                                <button
                                    @click="copyLink"
                                    class="group flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors border-t border-gray-100"
                                >
                                    <Icon icon="material-symbols:link"  />
                                    Salin Tautan
                                </button>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>

            <!-- Featured Image -->
            <div class="relative overflow-hidden rounded-xl mb-8">
                <img
                    :src="post.imageUrl || 'https://placehold.co/600x400?text=No+Image'"
                    :alt="post.title"
                    class="w-full aspect-video object-cover"
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
                            class="h-full w-full rounded-full bg-white flex items-center justify-center"
                        >
                            <UserIcon class="h-8 w-8 text-emerald-600" />
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
                            <img
                                :src="relatedPost.imageUrl || 'https://placehold.co/600x400?text=No+Image'"
                                :alt="relatedPost.title"
                                class="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-110"
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

const route = useRoute();
const postId = route.params.id;

// Share functionality
const showShareMenu = ref(false);
const shareMenuRef = ref<HTMLElement | null>(null);
const copySuccess = ref(false);

// Close share menu when clicking outside
const handleClickOutside = (event: MouseEvent) => {
    if (
        shareMenuRef.value &&
        !shareMenuRef.value.contains(event.target as Node)
    ) {
        showShareMenu.value = false;
    }
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);

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

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});

const toggleShareMenu = () => {
    showShareMenu.value = !showShareMenu.value;
};

const shareToFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post.value?.title || 'Berita BKSDA');
    window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}&t=${title}`,
        '_blank'
    );
    showShareMenu.value = false;
};

const shareToTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post.value?.title || 'Berita BKSDA');
    window.open(
        `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
        '_blank'
    );
    showShareMenu.value = false;
};

const shareToWhatsApp = () => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post.value?.title || 'Berita BKSDA');
    window.open(`https://wa.me/?text=${title}%20${url}`, '_blank');
    showShareMenu.value = false;
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
    showShareMenu.value = false;
};

import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

const { data: postData, error } = await useAsyncData<{data: Post}>(
    `post-${postId}`,
    () => $fetch(`/api/posts/${postId}`),
);

if (error.value) {
    throw createError({ statusCode: 404, statusMessage: 'Berita tidak ditemukan' });
}

const post = computed(() => {
    if (!postData.value?.data) return null;
    const p = postData.value.data;
    return {
        ...p,
        href: `/berita/${p.slug}`,
        imageUrl: p.coverImage,
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
        if (!post.value?.slug) return Promise.resolve(null)
        return $fetch(`/api/posts?limit=3&exclude=${post.value.slug}`)
    },
    {
        transform: (response: any) => response.data,
        watch: [() => post.value?.slug]
    },
);

const relatedPosts = computed(() => {
    if (!relatedPostsData.value) return [];
    return relatedPostsData.value.map((p: Post) => ({
        ...p,
        href: `/berita/${p.slug}`,
        imageUrl: p.coverImage,
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
