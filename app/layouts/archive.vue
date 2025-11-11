<template>
    <div class="min-h-screen bg-gray-50">
        <Navbar />

        <!-- Hero/Header Section for Archive/List Pages -->
        <div
            class="relative bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-900 text-white py-12 sm:py-16 lg:py-20"
        >
            <div
                class="absolute inset-0 bg-[url('/hero-background.avif')] bg-cover bg-center opacity-10"
            ></div>
            <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
            ></div>

            <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="text-center">
                    <!-- Breadcrumb -->
                    <nav
                        class="mb-6 flex items-center justify-center gap-2 text-sm"
                    >
                        <NuxtLink
                            to="/"
                            class="text-emerald-200 transition-colors hover:text-white"
                        >
                            Beranda
                        </NuxtLink>
                        <span class="text-emerald-400">/</span>
                        <slot name="breadcrumb">
                            <span class="text-white">Arsip</span>
                        </slot>
                    </nav>

                    <!-- Category Badge -->
                    <slot name="badge"></slot>

                    <!-- Page Title -->
                    <slot name="header">
                        <h1 class="text-3xl font-bold sm:text-4xl lg:text-5xl">
                            Semua Konten
                        </h1>
                    </slot>

                    <!-- Page Description -->
                    <slot name="description">
                        <p
                            class="mx-auto mt-4 max-w-2xl text-lg text-emerald-100"
                        >
                            Jelajahi koleksi lengkap konten kami
                        </p>
                    </slot>
                </div>
            </div>
        </div>

        <!-- Filters/Search Section (Optional) -->
        <div
            v-if="$slots.filters"
            class="border-b border-gray-200 bg-white shadow-sm"
        >
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <slot name="filters"></slot>
            </div>
        </div>

        <!-- Main Content (List/Grid) -->
        <main class="relative z-0">
            <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <slot />
            </div>
        </main>

        <!-- Pagination Section -->
        <div v-if="$slots.pagination" class="border-t border-gray-200 bg-white">
            <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <slot name="pagination"></slot>
            </div>
        </div>

        <Footer />
        <BackToTop />
        <WhatsAppButton />
    </div>
</template>

<script setup lang="ts">
// Layout for list/archive pages like all news, all announcements, etc.
</script>
