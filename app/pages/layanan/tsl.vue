<template>
    <NuxtLayout name="detail">
        <template #breadcrumb>
            <span class="text-white">Perizinan Tumbuhan dan Satwa Liar</span>
        </template>

        <template #header>
            <div class="mb-4">
                <span
                    class="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 text-sm font-semibold text-white"
                >
                    <component
                        :is="Sprout"
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
                Perizinan Tumbuhan dan Satwa Liar (TSL)
            </h1>
        </template>

        <template #meta>
            <p class="mt-4 text-lg text-emerald-100 sm:text-xl">
                Prosedur perizinan pemanfaatan jenis tumbuhan dan satwa liar, termasuk penangkaran, pemeliharaan, perdagangan, dan peragaan sesuai dengan Permen LHK Nomor 18 Tahun 2024.
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
                    Dasar Hukum & Tujuan
                </h2>
                <div class="prose prose-emerald max-w-none text-gray-700">
                    <p class="leading-relaxed text-lg">
                        Diatur dalam <strong>Peraturan Menteri Lingkungan Hidup dan Kehutanan (Permen LHK) Nomor 18 Tahun 2024</strong> tentang Pemanfaatan Jenis Tumbuhan dan Satwa Liar (TSL). Penangkaran TSL diarahkan sebagai instrumen konservasi <em>ex situ</em> yang berperan dalam pengembangan populasi dan pemanfaatan berkelanjutan.
                    </p>
                    
                    <h4 class="mt-6 mb-2 font-bold text-gray-900">Tujuan Peraturan:</h4>
                    <ul class="grid gap-2 sm:grid-cols-2">
                        <li v-for="(goal, idx) in goals" :key="idx" class="flex items-start gap-2">
                            <CheckCircle class="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{{ goal }}</span>
                        </li>
                    </ul>
                </div>
            </section>

            <!-- Bentuk Pemanfaatan Section -->
            <section
                class="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5 sm:p-8"
            >
                <h2
                    class="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900"
                >
                    <div
                        class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600"
                    >
                        <Component :is="Leaf" class="h-6 w-6 text-white" />
                    </div>
                    Bentuk Pemanfaatan TSL
                </h2>

                <p class="mb-8 text-lg leading-relaxed text-gray-700">
                    Pemanfaatan TSL dapat dilakukan untuk jenis dilindungi maupun tidak dilindungi (dengan ketentuan berbeda) dalam bentuk:
                </p>

                <div class="space-y-6">
                    <div
                        v-for="item in utilizationTypes"
                        :key="item.title"
                        class="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md"
                    >
                        <div class="border-b border-gray-100 bg-emerald-50/50 p-4 sm:px-6 flex items-center gap-3">
                            <div class="p-2 bg-white rounded-lg shadow-sm text-emerald-600">
                                <component :is="item.icon" class="h-6 w-6" />
                            </div>
                            <h3 class="text-xl font-bold text-emerald-900">{{ item.title }}</h3>
                        </div>
                        <div class="p-4 sm:p-6">
                            <ul class="space-y-2">
                                <li v-for="(detail, index) in item.details" :key="index" class="flex items-start gap-2.5 text-gray-600 leading-relaxed">
                                    <div class="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></div>
                                    <span>{{ detail }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

             <!-- Perizinan & Dokumen Section -->
             <section
                class="rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 p-6 shadow-lg ring-1 ring-emerald-100 sm:p-8"
            >
                <h2
                    class="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900"
                >
                    <div
                        class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600"
                    >
                        <FileText class="h-6 w-6 text-white" />
                    </div>
                    Perizinan & Dokumen
                </h2>
                <div class="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                        Setiap bentuk pemanfaatan TSL <strong>wajib melalui mekanisme perizinan resmi</strong>. Dokumen menjadi bukti legalitas asal-usul dan peredaran TSL. Sistem perizinan kini terintegrasi dengan kebijakan perizinan berusaha nasional.
                    </p>
                    <div class="flex items-start gap-4 p-4 bg-white rounded-lg border border-emerald-100 shadow-sm">
                        <Info class="h-6 w-6 text-emerald-500 shrink-0" />
                        <p class="text-sm text-gray-600">
                            Pastikan Anda memiliki dokumen yang sah (seperti SATS-DN atau dokumen lain sesuai ketentuan) sebelum melakukan kegiatan pemanfaatan.
                        </p>
                    </div>
                </div>
            </section>

             <!-- Pengawasan & Peran Masyarakat Section (Grid) -->
             <div class="grid gap-8 lg:grid-cols-2">
                <!-- Pengawasan -->
                <section
                    class="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5"
                >
                    <h2 class="mb-4 flex items-center gap-3 text-xl font-bold text-gray-900">
                        <ShieldCheck class="h-6 w-6 text-emerald-600" />
                        Pengawasan & Sanksi
                    </h2>
                    <p class="mb-4 text-gray-600 text-sm leading-relaxed">
                        Pemerintah pusat dan daerah melakukan pengawasan rutin dan insidentil.
                    </p>
                     <div
                        class="mt-4 border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg"
                    >
                        <p class="text-red-700 text-sm font-medium leading-relaxed">
                            Pelanggaran terhadap ketentuan peraturan ini dapat dikenakan <strong>sanksi administratif</strong>, tanpa mengesampingkan <strong>sanksi pidana</strong> sesuai peraturan perundang-undangan.
                        </p>
                    </div>
                </section>

                <!-- Peran Masyarakat -->
                 <section
                    class="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5"
                >
                    <h2 class="mb-4 flex items-center gap-3 text-xl font-bold text-gray-900">
                        <Users class="h-6 w-6 text-emerald-600" />
                        Peran Masyarakat
                    </h2>
                    <p class="text-gray-600 leading-relaxed text-sm mb-4">
                        Masyarakat diharapkan berperan aktif dalam perlindungan dan pelaporan terhadap penyalahgunaan TSL. Partisipasi publik adalah bagian penting dalam upaya konservasi keanekaragaman hayati.
                    </p>
                    <div class="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                        <p class="text-emerald-800 font-medium text-sm text-center">
                            "Lestarikan Alam, Lestarikan Kehidupan."
                        </p>
                    </div>
                </section>
             </div>

            <!-- Consultation Button -->
            <section>
                <ConsultationButton
                    message="Halo, saya ingin bertanya mengenai prosedur perizinan Tumbuhan dan Satwa Liar (TSL)."
                />
            </section>
        </div>
    </NuxtLayout>
</template>

<script setup>
import {
    Sprout,
    Scale,
    ShieldCheck,
    FileText,
    Users,
    Heart,
    Store,
    Eye,
    Leaf,
    CheckCircle,
    Info,
    AlertTriangle,
} from 'lucide-vue-next';

useSeoMeta({
    title: 'Perizinan Tumbuhan dan Satwa Liar',
    description: 'Informasi lengkap mengenai prosedur perizinan pemanfaatan Tumbuhan dan Satwa Liar (TSL) sesuai Permen LHK No. 18 Tahun 2024.',
});

const goals = [
    'Menjamin kelestarian jenis tumbuhan dan satwa liar.',
    'Mengatur pemanfaatan TSL agar legal, terkendali, dan berkelanjutan.',
    'Mencegah perdagangan ilegal dan penyalahgunaan TSL.',
    'Memberikan kepastian hukum bagi masyarakat dan pelaku usaha.',
];

const utilizationTypes = [
    {
        title: 'Penangkaran TSL',
        icon: Sprout,
        details: [
            'Dilakukan untuk konservasi, pengembangan populasi, dan pemanfaatan berkelanjutan.',
            'Wajib memiliki perizinan berusaha atau persetujuan pemerintah sesuai ketentuan.',
            'Hasil penangkaran dapat dimanfaatkan (diperdagangkan, dipelihara, atau diperagakan) setelah memenuhi persyaratan legalitas.',
            'Penangkaran harus memenuhi standar kesejahteraan satwa dan kaidah teknis konservasi.'
        ]
    },
    {
        title: 'Pemeliharaan untuk Kesenangan',
        icon: Heart,
        details: [
            'Pemeliharaan TSL untuk hobi hanya diperbolehkan untuk jenis tertentu dan asal-usul yang sah.',
            'Wajib memiliki dokumen legal (misalnya SATS-DN atau dokumen lain sesuai ketentuan).',
            'Dilarang memelihara jenis dilindungi yang tidak berasal dari penangkaran resmi.',
            'Pemilik bertanggung jawab atas kesehatan, keselamatan, dan kesejahteraan satwa.'
        ]
    },
    {
        title: 'Perdagangan TSL',
        icon: Store,
        details: [
            'Perdagangan hanya dapat dilakukan terhadap TSL yang berasal dari sumber legal, terutama hasil penangkaran.',
            'Setiap kegiatan perdagangan wajib dilengkapi dokumen peredaran.',
            'Perdagangan lintas daerah dan/atau lintas negara mengikuti ketentuan nasional dan internasional (termasuk CITES).',
            'Pemerintah melakukan pengawasan dan pengendalian kuota bila diperlukan.'
        ]
    },
    {
        title: 'Peragaan (Lembaga Konservasi)',
        icon: Eye,
        details: [
            'Peragaan TSL ditujukan untuk pendidikan, penelitian, dan peningkatan kesadaran konservasi (misalnya kebun binatang).',
            'Lembaga peragaan wajib memenuhi standar kandang, perawatan, dan kesejahteraan satwa.',
            'Dilarang memperagakan TSL dengan cara yang menyiksa, mengeksploitasi, atau merendahkan nilai konservasi.'
        ]
    }
];
</script>
