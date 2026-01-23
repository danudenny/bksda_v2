<template>
    <section class="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-24">
        <!-- Decorative background elements -->
        <div class="absolute inset-0 -z-10">
            <div
                class="absolute right-0 top-0 h-96 w-96 rounded-full bg-emerald-100/40 blur-3xl filter"
            ></div>
            <div
                class="absolute left-0 bottom-0 h-96 w-96 rounded-full bg-teal-100/40 blur-3xl filter"
            ></div>
        </div>

        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <!-- Header Section -->
            <div class="text-center">
                <div
                    class="inline-flex items-center gap-2 rounded-full bg-emerald-600/10 px-3 py-1.5 sm:px-4 sm:py-2 ring-1 ring-inset ring-emerald-600/20"
                >
                    <svg
                        class="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                        />
                    </svg>
                    <span
                        class="font-semibold text-emerald-700"
                        style="font-size: clamp(0.75rem, 1.25vw, 0.875rem)"
                    >
                        Berita & Kegiatan
                    </span>
                </div>

                <h2
                    class="mt-4 sm:mt-6 font-bold tracking-tight text-slate-900"
                    style="font-size: clamp(1.875rem, 4vw, 3rem)"
                >
                    Berita Terbaru
                </h2>
                <p
                    class="mx-auto mt-3 sm:mt-4 max-w-2xl text-slate-600"
                    style="font-size: clamp(0.875rem, 1.5vw, 1.125rem)"
                >
                    Ikuti perkembangan terkini kegiatan konservasi dan
                    pelestarian alam di Sumatera Selatan
                </p>

                <div class="mt-6 sm:mt-8">
                    <NuxtLink
                        to="/berita"
                        class="group inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 sm:px-6 sm:py-3 font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/40 hover:scale-105"
                        style="font-size: clamp(0.75rem, 1.25vw, 0.875rem)"
                    >
                        Lihat Semua Berita
                        <ArrowRightCircleIcon
                            class="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1"
                            aria-hidden="true"
                        />
                    </NuxtLink>
                </div>
            </div>

            <!-- Featured Post -->
            <article
                v-if="featuredPost"
                class="mt-16 overflow-hidden rounded-3xl bg-gradient-to-br from-white to-slate-50 shadow-2xl ring-1 ring-slate-900/5 transition-all duration-500 hover:shadow-emerald-500/20"
            >
                <div class="grid grid-cols-1 lg:grid-cols-2">
                    <!-- Image -->
                    <NuxtLink
                        :to="featuredPost.href"
                        class="group relative block overflow-hidden"
                    >
                        <div
                            class="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        ></div>
                        <NuxtImg
                            :src="
                                featuredPost.imageUrl ||
                                'https://placehold.co/600x400?text=No+Image'
                            "
                            :alt="featuredPost.title"
                            :provider="featuredPost.imageUrl?.startsWith('/uploads') ? undefined : 'cloudinary'"
                            format="webp"
                            quality="80"
                            sizes="sm:100vw md:50vw lg:600px"
                            class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div
                            class="absolute bottom-4 left-4 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        >
                            <span
                                class="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-slate-900"
                            >
                                Lihat Detail
                                <ArrowRightCircleIcon class="h-4 w-4" />
                            </span>
                        </div>
                    </NuxtLink>

                    <!-- Content -->
                    <div class="flex flex-col justify-center p-8 lg:p-12">
                        <div class="flex items-center gap-3">
                            <span
                                class="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20"
                            >
                                <svg
                                    class="h-3 w-3"
                                    fill="currentColor"
                                    viewBox="0 0 6 6"
                                >
                                    <circle cx="3" cy="3" r="3" />
                                </svg>
                                {{ featuredPost.category.title }}
                            </span>
                            <time
                                :datetime="featuredPost.datetime"
                                class="text-sm text-slate-500"
                            >
                                {{ featuredPost.date }}
                            </time>
                        </div>

                        <h3
                            class="mt-4 text-3xl font-bold leading-tight text-slate-900 lg:text-4xl capitalize"
                        >
                            <NuxtLink
                                :to="featuredPost.href"
                                class="hover:text-emerald-600 transition-colors"
                            >
                                {{ featuredPost.title }}
                            </NuxtLink>
                        </h3>

                        <p class="mt-4 text-base leading-7 text-slate-600">
                            {{ featuredPost.description }}
                        </p>

                        <!-- Author -->
                        <div class="mt-6 flex items-center gap-4">
                            <div
                                class="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 ring-2 ring-white shadow-lg"
                            >
                                <UserIcon class="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <p class="text-sm font-semibold text-slate-900">
                                    {{ featuredPost.author.name }}
                                </p>
                                <p class="text-xs text-slate-500">
                                    {{ featuredPost.author.role }}
                                </p>
                            </div>
                        </div>

                        <div class="mt-6">
                            <NuxtLink
                                :to="featuredPost.href"
                                class="group inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition-all hover:gap-3 hover:text-emerald-700"
                            >
                                Baca selengkapnya
                                <ArrowRightCircleIcon
                                    class="h-4 w-4 transition-transform group-hover:translate-x-1"
                                    aria-hidden="true"
                                />
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </article>

            <!-- Grid Posts -->
            <div
                class="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
                <article
                    v-for="post in sidePosts"
                    :key="post.id"
                    class="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-900/5 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-2"
                >
                    <!-- Image Container -->
                    <NuxtLink
                        :to="post.href"
                        class="relative block overflow-hidden"
                    >
                        <div
                            class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent z-10"
                        ></div>
                        <NuxtImg
                            :src="
                                post.imageUrl ||
                                'https://placehold.co/600x400?text=No+Image'
                            "
                            :alt="post.title"
                            :provider="post.imageUrl?.startsWith('/uploads') ? undefined : 'cloudinary'"
                            format="webp"
                            quality="80"
                            sizes="sm:100vw md:50vw lg:400px"
                            class="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        <!-- Category Badge -->
                        <div class="absolute top-4 left-4 z-20">
                            <span
                                class="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-lg"
                            >
                                <svg
                                    class="h-2.5 w-2.5 text-emerald-600"
                                    fill="currentColor"
                                    viewBox="0 0 6 6"
                                >
                                    <circle cx="3" cy="3" r="3" />
                                </svg>
                                {{ post.category.title }}
                            </span>
                        </div>

                        <!-- Date Badge -->
                        <div class="absolute bottom-4 right-4 z-20">
                            <time
                                :datetime="post.datetime"
                                class="inline-flex items-center gap-1.5 rounded-lg bg-white/90 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-slate-700 shadow-lg"
                            >
                                <svg
                                    class="h-3.5 w-3.5 text-emerald-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="2"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                                    />
                                </svg>
                                {{ post.date }}
                            </time>
                        </div>
                    </NuxtLink>

                    <!-- Content -->
                    <div class="flex flex-1 flex-col justify-between p-6">
                        <div>
                            <h3
                                class="text-xl font-bold leading-7 text-slate-900 group-hover:text-emerald-600 transition-colors capitalize"
                            >
                                <NuxtLink :to="post.href">
                                    <span class="absolute inset-0 capitalize" />
                                    {{ post.title }}
                                </NuxtLink>
                            </h3>

                            <p
                                v-if="post.description"
                                class="mt-3 text-sm leading-6 text-slate-600 line-clamp-2"
                            >
                                {{ post.description }}
                            </p>
                        </div>

                        <!-- Author -->
                        <div
                            class="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4"
                        >
                            <div
                                class="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-md"
                            >
                                <UserIcon class="h-4 w-4 text-white" />
                            </div>
                            <div class="flex-1 min-w-0">
                                <p
                                    class="text-xs font-semibold text-slate-900 truncate"
                                >
                                    {{ post.author.name }}
                                </p>
                                <p class="text-xs text-slate-500 truncate">
                                    {{ post.author.role }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Hover indicator -->
                    <div
                        class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                    ></div>
                </article>
            </div>
        </div>
    </section>
</template>

<script setup>
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';
import { ArrowRightCircleIcon, UserIcon } from 'lucide-vue-next';
import { computed } from 'vue';

const {
    data: posts,
    pending,
    error,
} = await useAsyncData(
    'posts-section',
    () => $fetch('/api/posts?limit=4&published=true'),
    {
        transform: (response) => response.data,
    }
);

const formattedPosts = computed(() => {
    if (!posts.value) return [];
    return posts.value.map((post) => ({
        ...post,
        href: `/berita/${post.slug}`,
        title: post.title.charAt(0).toUpperCase() + post.title.slice(1),
        imageUrl: post.imageUrl,
        date: format(parseISO(post.createdAt), 'dd MMMM yyyy', { locale: id }),
        datetime: post.createdAt,
        category: {
            ...post.category,
            title: post.category.name,
        },
        author: {
            ...post.author,
            role: post.author.role || 'Kontributor',
        },
    }));
});

const featuredPost = computed(() => formattedPosts.value[0]);
const sidePosts = computed(() => formattedPosts.value.slice(1, 4));
</script>
