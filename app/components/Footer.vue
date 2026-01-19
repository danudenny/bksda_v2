<template>
    <footer class="bg-slate-900 text-gray-400" aria-labelledby="footer-heading">
        <h2 id="footer-heading" class="sr-only">Footer</h2>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 xl:gap-16"
            >
                <div class="md:col-span-2 lg:col-span-5">
                    <div class="flex items-center gap-3">
                        <NuxtImg
                            src="https://res.cloudinary.com/dopp3opre/image/upload/v1763652646/logo1_o93q0x.avif"
                            alt="Kementerian LHK Logo"
                            provider="cloudinary"
                            format="webp"
                            quality="80"
                            width="80"
                            height="80"
                            fit="contain"
                            class="h-8 w-auto sm:h-10 object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                        <NuxtImg
                            src="https://res.cloudinary.com/dopp3opre/image/upload/v1763652647/logo2_l76b4h.png"
                            alt="BKSDA Logo"
                            provider="cloudinary"
                            format="webp"
                            quality="80"
                            width="80"
                            height="80"
                            fit="contain"
                            class="h-8 w-auto sm:h-10 object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                        <div>
                            <p class="text-base font-semibold text-white">
                                BALAI KONSERVASI SUMBER DAYA ALAM
                            </p>
                            <p class="text-xs font-medium text-emerald-400">
                                Sumatera Selatan
                            </p>
                        </div>
                    </div>

                    <div class="mt-6 space-y-2 text-xs">
                        <p class="font-semibold text-gray-300">
                            KEMENTERIAN KEHUTANAN
                        </p>
                        <p>
                            DIREKTORAT JENDERAL KONSERVASI SUMBER DAYA ALAM DAN
                            EKOSISTEM
                        </p>
                        <p>
                            BALAI KONSERVASI SUMBER DAYA ALAM SUMATERA SELATAN
                        </p>
                    </div>

                    <address class="mt-6 space-y-3 text-sm not-italic">
                        <div class="flex items-start gap-3">
                            <MapPin
                                class="h-5 w-5 flex-shrink-0 text-emerald-400"
                                aria-hidden="true"
                            />
                            <span
                                >Jl. Kol. H . Burlian / Punti Kayu Km 6 No 79.
                                Palembang</span
                            >
                        </div>

                        <div class="flex items-start gap-3">
                            <Phone
                                class="h-5 w-5 flex-shrink-0 text-emerald-400"
                                aria-hidden="true"
                            />
                            <a
                                href="tel:0711410948"
                                class="transition-colors duration-300 hover:text-emerald-300"
                                >(0711) 410948</a
                            >
                        </div>

                        <div class="flex items-start gap-3">
                            <Smartphone
                                class="h-5 w-5 flex-shrink-0 text-emerald-400"
                                aria-hidden="true"
                            />
                            <div>
                                <a
                                    href="https://wa.me/6281271412141"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="transition-colors duration-300 hover:text-emerald-300"
                                >
                                    +62 812-7141-2141
                                </a>
                                <span
                                    class="mt-0.5 block text-xs text-gray-400/80"
                                    >Call Center</span
                                >
                            </div>
                        </div>
                        <div class="flex items-start gap-3">
                            <Mail
                                class="h-5 w-5 flex-shrink-0 text-emerald-400"
                                aria-hidden="true"
                            />
                            <a
                                href="mailto:bksdasumsel@yahoo.co.id"
                                class="transition-colors duration-300 hover:text-emerald-300"
                                >bksdasumsel@yahoo.co.id</a
                            >
                        </div>
                    </address>

                    <div class="mt-8 flex space-x-4">
                        <a
                            v-for="item in socialLinks"
                            :key="item.name"
                            :href="item.href"
                            target="_blank"
                            rel="noopener noreferrer"
                            :aria-label="item.name"
                            class="rounded-full p-2 transition-colors duration-300 hover:bg-white/10 hover:text-emerald-300"
                        >
                            <svg
                                role="img"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="h-5 w-5"
                                aria-hidden="true"
                            >
                                <path :d="item.icon.path" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div
                    class="grid grid-cols-2 md:grid-cols-3 gap-8 lg:col-span-7 md:col-span-2"
                >
                    <div>
                        <h3
                            class="text-sm font-semibold uppercase tracking-wider text-white"
                        >
                            Profil
                        </h3>
                        <ul role="list" class="mt-4 space-y-3">
                            <li
                                v-for="item in footerNavigation.profil"
                                :key="item.name"
                            >
                                <NuxtLink
                                    :to="item.href"
                                    class="text-sm transition-colors duration-300 hover:text-emerald-300"
                                    >{{ item.name }}</NuxtLink
                                >
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3
                            class="text-sm font-semibold uppercase tracking-wider text-white"
                        >
                            Kawasan
                        </h3>
                        <ul role="list" class="mt-4 space-y-3">
                            <li
                                v-for="item in footerNavigation.kawasan"
                                :key="item.name"
                            >
                                <NuxtLink
                                    :to="item.href"
                                    class="text-sm transition-colors duration-300 hover:text-emerald-300"
                                    >{{ item.name }}</NuxtLink
                                >
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3
                            class="text-sm font-semibold uppercase tracking-wider text-white"
                        >
                            Tautan
                        </h3>
                        <ul role="list" class="mt-4 space-y-3">
                            <li
                                v-for="item in footerNavigation.tautan"
                                :key="item.name"
                            >
                                <NuxtLink
                                    :to="item.href"
                                    class="text-sm transition-colors duration-300 hover:text-emerald-300"
                                    >{{ item.name }}</NuxtLink
                                >
                            </li>
                            <li>
                                <NuxtLink
                                    to="/admin/login"
                                    class="text-sm transition-colors duration-300 hover:text-emerald-300"
                                    >Admin</NuxtLink
                                >
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Visitor Counter -->
            <div class="mt-12 sm:mt-16">
                <VisitorCounter />
            </div>

            <div class="mt-12 border-t border-white/10 pt-8">
                <p class="text-center text-xs leading-5">
                    &copy; {{ new Date().getFullYear() }} Balai Konservasi
                    Sumber Daya Alam Sumatera Selatan. Seluruh hak cipta
                    dilindungi.
                </p>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import {
    Mail,
    MapPin,
    Phone,
    Smartphone,
} from 'lucide-vue-next';
import {
    siFacebook,
    siInstagram,
    siX,
    siYoutube,
    siThreads,
} from 'simple-icons/icons';

const socialLinks = [
    {
        name: 'Facebook',
        href: 'https://www.facebook.com/bksda.s.selatan',
        icon: siFacebook,
    },
    {
        name: 'X (Twitter)',
        href: 'https://x.com/bksda_sumsel',
        icon: siX,
    },
    {
        name: 'Threads',
        href: 'https://www.threads.com/@bksda_sumsel',
        icon: siThreads,
    },
    {
        name: 'Instagram',
        href: 'https://www.instagram.com/bksda_sumsel',
        icon: siInstagram,
    },
    {
        name: 'YouTube',
        href: 'https://www.youtube.com/channel/UC3mTRUNscHxFBZndT64-_Kg',
        icon: siYoutube,
    },
];

const footerNavigation = {
    profil: [
        { name: 'Tentang Kami', href: '/profil/tentang-kami' },
        { name: 'Visi & Misi', href: '/profil/visi-misi' },
        { name: 'Organisasi', href: '/profil/organisasi' },
        { name: 'Wilayah Kerja', href: '/profil/wilayah-kerja' },
    ],
    kawasan: [
        { name: 'Suaka Margasatwa', href: '/kawasan/suaka-margasatwa' },
        { name: 'Taman Wisata Alam', href: '/kawasan/taman-wisata-alam' },
        { name: 'Taman Nasional', href: '/kawasan/taman-nasional' },
    ],
    tautan: [
        { name: 'Berita & Kegiatan', href: '/berita' },
        { name: 'Galeri', href: '/galeri' },
        { name: 'Layanan SIMAKSI', href: '/layanan/simaksi' },
        { name: 'Regulasi', href: '/regulasi' },
    ],
};
</script>
