<template>
    <div class="min-h-screen bg-gray-50">
        <Navbar />

        <!-- Hero/Header Section for Detail Pages -->
        <div
            class="relative bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-900 text-white py-16 sm:py-20 lg:py-24"
        >
            <div
                class="absolute inset-0 bg-[url('/hero-background.avif')] bg-cover bg-center opacity-10"
            ></div>
            <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
            ></div>

            <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="mx-auto max-w-4xl">
                    <!-- Breadcrumb -->
                    <nav class="mb-6 flex items-center gap-2 text-sm">
                        <NuxtLink
                            to="/"
                            class="text-emerald-200 transition-colors hover:text-white"
                        >
                            Beranda
                        </NuxtLink>
                        <span class="text-emerald-400">/</span>
                        <slot name="breadcrumb">
                            <span class="text-white">Detail</span>
                        </slot>
                    </nav>

                    <!-- Page Title -->
                    <slot name="header">
                        <h1 class="text-3xl font-bold sm:text-4xl lg:text-5xl">
                            Detail Content
                        </h1>
                    </slot>

                    <!-- Meta Information -->
                    <slot name="meta"></slot>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <main class="relative z-0">
            <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div class="mx-auto max-w-4xl">
                    <slot />
                </div>
            </div>
        </main>

        <Footer />
        <BackToTop />
        <WhatsAppButton />
    </div>
</template>

<script setup lang="ts">
// Layout for single content pages like news detail, announcement detail, etc.
</script>
