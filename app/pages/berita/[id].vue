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
                    <svg
                        class="h-4 w-4"
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
                <span class="text-emerald-400">•</span>
                <span
                    class="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1.5 font-medium text-white"
                >
                    <svg
                        class="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                        />
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 6h.008v.008H6V6z"
                        />
                    </svg>
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
                        class="inline-flex items-center gap-2 rounded-lg border border-emerald-600 bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-emerald-700 hover:border-emerald-700 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                    >
                        <ShareIcon class="h-4 w-4" aria-hidden="true" />
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
                                    <svg
                                        class="h-5 w-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                                        />
                                    </svg>
                                    Facebook
                                </button>
                                <button
                                    @click="shareToTwitter"
                                    class="group flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-600 transition-colors"
                                >
                                    <svg
                                        class="h-5 w-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                                        />
                                    </svg>
                                    Twitter
                                </button>
                                <button
                                    @click="shareToWhatsApp"
                                    class="group flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                                >
                                    <svg
                                        class="h-5 w-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
                                        />
                                    </svg>
                                    WhatsApp
                                </button>
                                <button
                                    @click="copyLink"
                                    class="group flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors border-t border-gray-100"
                                >
                                    <svg
                                        class="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="2"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                                        />
                                    </svg>
                                    Salin Tautan
                                </button>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>

            <!-- Featured Image -->
            <div class="relative overflow-hidden rounded-xl mb-8">
                <NuxtImg
                    :src="post.imageUrl"
                    :alt="post.title"
                    class="w-full aspect-video object-cover"
                />
            </div>

            <!-- Article Content -->
            <div class="prose prose-lg prose-emerald max-w-none">
                <p
                    class="lead text-xl text-gray-700 font-medium leading-relaxed"
                >
                    {{ post.description }}
                </p>

                <!-- TODO: Replace with actual content from API -->
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                </p>
                <p>
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae vitae dicta sunt explicabo.
                </p>
                <h2>Kesimpulan</h2>
                <p>
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                    odit aut fugit, sed quia consequuntur magni dolores eos qui
                    ratione voluptatem sequi nesciunt.
                </p>
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
                            <NuxtImg
                                :src="relatedPost.imageUrl"
                                alt=""
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
                                    <svg
                                        class="h-3.5 w-3.5"
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
                <svg
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <span class="font-medium">Tautan berhasil disalin!</span>
            </div>
        </transition>
    </Teleport>
</template>

<script setup lang="ts">
import { ShareIcon, UserIcon } from 'lucide-vue-next';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

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

// TODO: Fetch from API
// Example API integration:
/*
const { data: post, error } = await useAsyncData(
    `post-${postId}`,
    () => $fetch(`/api/posts/${postId}`)
);

const { data: relatedPosts } = await useAsyncData(
    `related-posts-${postId}`,
    () => $fetch(`/api/posts/${postId}/related?limit=3`)
);
*/

// In a real application, this data would come from an API or CMS
const posts = [
    {
        id: 1,
        title: 'BKSDA Sumsel Gelar Operasi Penyelamatan Satwa Dilindungi',
        href: '/berita/1',
        description:
            'Tim BKSDA berhasil menyelamatkan seekor harimau sumatera yang terjebak di area perkebunan warga, kini dalam proses rehabilitasi.',
        imageUrl: '/news-1.jpg',
        date: '10 April 2024',
        datetime: '2024-04-10',
        category: { title: 'Penyelamatan Satwa' },
        author: {
            name: 'Dra. Siti Nurhaliza, M.Si',
            role: 'Kepala BKSDA Sumsel',
        },
    },
    {
        id: 2,
        title: 'Edukasi Konservasi: BKSDA Kunjungi Sekolah di Muara Enim',
        href: '/berita/2',
        description:
            'Program edukasi interaktif untuk menumbuhkan kesadaran konservasi sejak dini.',
        imageUrl: '/news-2.jpg',
        date: '05 April 2024',
        datetime: '2024-04-05',
        category: { title: 'Edukasi' },
        author: {
            name: 'Dr. Budi Santoso, S.Hut., M.Sc.',
            role: 'Koordinator Edukasi',
        },
    },
    {
        id: 3,
        title: 'Penanaman Ribuan Bibit Pohon di Kawasan Hutan Lindung',
        href: '/berita/3',
        description:
            'Kolaborasi BKSDA dengan masyarakat dalam upaya reforestasi memulihkan fungsi hutan.',
        imageUrl: '/news-3.webp',
        date: '28 Maret 2024',
        datetime: '2024-03-28',
        category: { title: 'Rehabilitasi Hutan' },
        author: {
            name: 'Ir. Rina Permata, M.For.Sc.',
            role: 'Koordinator Rehabilitasi',
        },
    },
    {
        id: 4,
        title: 'Studi Habitat Baru untuk Badak Sumatera di Taman Nasional',
        href: '/berita/4',
        description:
            'Penelitian mendalam untuk menemukan zona aman dan ideal bagi pelepasliaran badak.',
        imageUrl: '/news-4.jpg',
        date: '20 Maret 2024',
        datetime: '2024-03-20',
        category: { title: 'Penelitian' },
        author: {
            name: 'Dr. Andi Prasetyo, S.Si., M.Biol.',
            role: 'Kepala Laboratorium',
        },
    },
    {
        id: 5,
        title: 'Pelatihan Teknis Pengelolaan Kawasan Konservasi untuk Staf Baru',
        href: '/berita/5',
        description:
            'BKSDA Sumsel mengadakan pelatihan intensif untuk meningkatkan kapasitas staf baru dalam pengelolaan kawasan konservasi.',
        imageUrl: '/news-5.jpg',
        date: '15 Maret 2024',
        datetime: '2024-03-15',
        category: { title: 'Pelatihan' },
        author: { name: 'Drs. H. Mulyadi, M.Si.', role: 'Koordinator SDM' },
    },
    {
        id: 6,
        title: 'Kampanye Anti Perdagangan Satwa Liar di Pasar Tradisional',
        href: '/berita/6',
        description:
            'Tim edukasi BKSDA melakukan sosialisasi anti perdagangan satwa liar di pasar-pasar tradisional di Palembang.',
        imageUrl: '/news-6.jpg',
        date: '08 Maret 2024',
        datetime: '2024-03-08',
        category: { title: 'Edukasi' },
        author: { name: 'Fitriani, S.Psi., M.Si.', role: 'Staf Edukasi' },
    },
];

const post = computed(() => {
    return posts.find((p) => p.id === Number(postId));
});

const relatedPosts = computed(() => {
    return posts.filter((p) => p.id !== Number(postId)).slice(0, 3);
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
