<template>
    <NuxtLayout name="detail">
        <template #breadcrumb>
            <span class="text-white">Jasa Lingkungan & Wisata Alam</span>
        </template>

        <template #header>
            <div class="mb-4">
                <span
                    class="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 text-sm font-semibold text-white"
                >
                    <component
                        :is="Trees"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                    />
                    Layanan
                </span>
            </div>
            <h1 class="text-3xl font-bold sm:text-4xl lg:text-5xl">
                Perizinan Jasa Lingkungan & Wisata Alam
            </h1>
        </template>

        <template #meta>
            <p class="mt-4 text-lg text-emerald-100 sm:text-xl">
                Tata cara perizinan dan pemanfaatan jasa lingkungan di berbagai
                kawasan konservasi, termasuk Taman Nasional, Taman Hutan Raya,
                dan Taman Wisata Alam diatur dalam Peraturan Menteri Kehutanan
                Nomor 27 Tahun 2025.
            </p>
        </template>

        <!-- Main Content -->
        <div class="space-y-8">
            <!-- Overview Section -->
            <section
                class="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5 sm:p-8"
            >
                <h2
                    class="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900"
                >
                    <div
                        class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600"
                    >
                        <Scale class="h-6 w-6 text-white" />
                    </div>
                    Dasar Hukum & Ketentuan
                </h2>
                <div class="prose prose-emerald max-w-none text-gray-700">
                    <p class="leading-relaxed text-lg">
                        Aturan tersebut mencakup berbagai jenis kegiatan usaha,
                        mulai dari pemanfaatan energi terbarukan seperti panas
                        bumi, air, angin, dan surya, hingga layanan wisata alam
                        dan perdagangan karbon.
                    </p>
                    <p class="mt-4 leading-relaxed">
                        Para pelaku usaha diwajibkan memenuhi aspek legalitas
                        seperti:
                    </p>
                    <ul class="mt-2 list-disc pl-5 space-y-1">
                        <li>Nomor Induk Berusaha (NIB)</li>
                        <li>Dokumen rencana karya</li>
                        <li>Izin masuk kawasan yang ketat</li>
                    </ul>
                    <div
                        class="mt-6 border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg"
                    >
                        <p class="text-red-700 font-medium">
                            Pelanggaran terhadap ketentuan teknis atau
                            lingkungan dalam dokumen ini dapat mengakibatkan
                            sanksi tegas berupa teguran tertulis hingga
                            pencabutan izin usaha.
                        </p>
                    </div>
                </div>
            </section>

            <!-- Jenis Jasa Lingkungan Section -->
            <section
                class="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5 sm:p-8"
            >
                <h2
                    class="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900"
                >
                    <div
                        class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600"
                    >
                        <Sprout class="h-6 w-6 text-white" />
                    </div>
                    Jenis Jasa Lingkungan
                </h2>

                <p class="mb-8 text-lg leading-relaxed text-gray-700">
                    Pemanfaatan jasa lingkungan adalah upaya memanfaatkan
                    potensi ekosistem, iklim, fenomena alam, kekhasan jenis, dan
                    peninggalan budaya secara lestari.
                </p>

                <div
                    class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                >
                    <div
                        v-for="item in serviceTypes"
                        :key="item.title"
                        class="group relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 p-6 shadow-md ring-1 ring-emerald-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                        <div
                            class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-emerald-200 transition-transform duration-300 group-hover:scale-110"
                        >
                            <component
                                :is="item.icon"
                                class="h-6 w-6 text-emerald-600"
                            />
                        </div>
                        <h4 class="font-bold text-gray-900 text-lg mb-2">
                            {{ item.title }}
                        </h4>
                        <p class="text-sm text-gray-600 leading-relaxed">
                            {{ item.description }}
                        </p>
                    </div>
                </div>
            </section>

             <!-- Jangka Waktu Section -->
             <section
                class="rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 p-6 shadow-lg ring-1 ring-emerald-100 sm:p-8"
            >
                <h2
                    class="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900"
                >
                    <div
                        class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600"
                    >
                        <Clock class="h-6 w-6 text-white" />
                    </div>
                    Jangka Waktu Perizinan
                </h2>

                 <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div v-for="(duration, idx) in licenseDurations" :key="idx" class="bg-white rounded-lg p-4 shadow-sm border border-emerald-100 flex flex-col">
                        <span class="font-bold text-emerald-800 mb-1">{{ duration.type }}</span>
                        <span class="text-gray-700">{{ duration.time }}</span>
                        <span class="text-xs text-gray-500 mt-2 italic">{{ duration.note }}</span>
                    </div>
                 </div>
            </section>

             <!-- Larangan Section -->
             <section
                class="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-red-100 sm:p-8 border-l-4 border-red-500"
            >
                 <h2
                    class="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900"
                >
                    <div
                        class="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600"
                    >
                        <AlertTriangle class="h-6 w-6 text-white" />
                    </div>
                    Larangan Pemegang Perizinan
                </h2>
                <div class="grid gap-4 sm:grid-cols-2">
                    <div v-for="(ban, idx) in prohibitions" :key="idx" class="flex items-start gap-3 p-3 rounded-lg bg-red-50">
                        <XCircle class="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                        <span class="text-red-800 font-medium">{{ ban }}</span>
                    </div>
                </div>
            </section>


             <!-- Pengawasan Section -->
             <section
                class="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5 sm:p-8"
            >
                <h2
                    class="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900"
                >
                    <div
                        class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600"
                    >
                        <ShieldCheck class="h-6 w-6 text-white" />
                    </div>
                    Pengawasan & Sanksi
                </h2>
                 <p class="mb-6 text-lg text-gray-700">
                    Pemerintah melakukan pengawasan melalui pembinaan, pemantauan, dan evaluasi secara berkala. Pelanggaran terhadap ketentuan dikenakan sanksi administratif berupa:
                </p>

                <div class="space-y-3">
                    <div v-for="(sanction, idx) in sanctions" :key="idx" class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                         <div class="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 shrink-0">
                            {{ idx + 1 }}
                         </div>
                         <span class="text-gray-700 font-medium">{{ sanction }}</span>
                    </div>
                </div>
            </section>

             <!-- Consultation Button -->
             <section>
                <ConsultationButton
                    message="Halo, saya ingin bertanya mengenai prosedur perizinan Jasa Lingkungan & Wisata Alam."
                />
            </section>
        </div>
    </NuxtLayout>
</template>

<script setup>
import {
    Trees,
    Zap,
    Droplets,
    Mountain,
    Crosshair,
    Sun,
    Leaf,
    Scale,
    Clock,
    AlertTriangle,
    ShieldCheck,
    XCircle,
} from 'lucide-vue-next';

useSeoMeta({
    title: 'Perizinan Jasa Lingkungan & Wisata Alam',
    description: 'Informasi lengkap mengenai tata cara perizinan dan pemanfaatan jasa lingkungan di kawasan konservasi.',
});

const serviceTypes = [
    {
        title: 'Panas Bumi (PJL-PB)',
        description: 'Untuk kebutuhan listrik dengan sistem siklus tertutup (close loop) di TN, Tahura, dan TWA.',
        icon: Zap,
    },
    {
        title: 'Air & Energi Air',
        description: 'Pemanfaatan massa air dan aliran air untuk tujuan komersial maupun nonkomersial.',
        icon: Droplets,
    },
    {
        title: 'Wisata Alam',
        description: 'Kegiatan perjalanan untuk menikmati keunikan dan keindahan alam di SM, TN, Tahura, dan TWA.',
        icon: Mountain,
    },
    {
        title: 'Taman Buru (TB)',
        description: 'Pengusahaan sarana dan pelayanan untuk wisata berburu.',
        icon: Crosshair,
    },
    {
        title: 'Angin & Matahari',
        description: 'Pemanfaatan energi angin dan matahari untuk pembangkit listrik.',
        icon: Sun,
    },
    {
        title: 'Karbon (PJL Karbon)',
        description: 'Penyerapan dan penyimpanan karbon melalui mekanisme perdagangan karbon.',
        icon: Leaf,
    },
];

const prohibitions = [
    'Menjadikan areal usaha sebagai hak kepemilikan tanah.',
    'Mengalihkan izin kepada pihak lain tanpa persetujuan.',
    'Menjadikan izin sebagai jaminan atau agunan bank.',
    'Membangun sarana di luar areal yang telah ditentukan.',
];

const licenseDurations = [
    { type: 'Wisata Alam (Jasa)', time: '5 Tahun', note: 'Tidak dapat diperpanjang' },
    { type: 'Wisata Alam (Sarana)', time: '35 Tahun', note: 'Dapat diperpanjang' },
    { type: 'Air', time: '10 Tahun (PJLA) / 20 Tahun (PJLEA)', note: 'Dapat diperpanjang' },
    { type: 'Energi (Panas Bumi/Angin/Surya)', time: 'Eksplorasi 5 Thn / Pemanfaatan 30 Thn', note: 'Sesuai tahapan' },
    { type: 'Karbon', time: 'Maks. 40 Tahun', note: 'Tidak dapat diperpanjang' },
];

const sanctions = [
    'Teguran tertulis (maksimal 3 kali)',
    'Paksaan pemerintah (penyegelan, pembongkaran, dll)',
    'Denda administratif',
    'Pembekuan perizinan berusaha',
    'Pencabutan perizinan berusaha',
];
</script>
