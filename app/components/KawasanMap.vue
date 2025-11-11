<template>
    <div
        class="relative w-full h-[600px] rounded-xl overflow-hidden shadow-2xl ring-1 ring-slate-900/5"
    >
        <div ref="mapContainer" class="w-full h-full"></div>

        <!-- Sidebar -->
        <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="-translate-x-full opacity-0"
            enter-to-class="translate-x-0 opacity-100"
            leave-active-class="transition-all duration-300 ease-in"
            leave-from-class="translate-x-0 opacity-100"
            leave-to-class="-translate-x-full opacity-0"
        >
            <div
                v-if="selectedKawasan"
                class="absolute left-4 top-4 bottom-4 w-80 bg-white rounded-2xl shadow-2xl ring-1 ring-slate-900/5 overflow-hidden z-1000 flex flex-col"
            >
                <!-- Close Button -->
                <button
                    @click="closePanel"
                    class="absolute top-4 right-4 p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors duration-200 z-10"
                    aria-label="Close"
                >
                    <X class="h-4 w-4 text-slate-700" />
                </button>

                <!-- Content -->
                <div class="flex-1 overflow-y-auto p-6">
                    <!-- Icon -->
                    <div
                        class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/50"
                    >
                        <component
                            :is="selectedKawasan.icon"
                            class="h-7 w-7 text-white"
                        />
                    </div>

                    <!-- Title -->
                    <h3 class="text-2xl font-bold text-slate-900 mb-2">
                        {{ selectedKawasan.name }}
                    </h3>

                    <!-- Type Badge -->
                    <div
                        class="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 mb-4"
                    >
                        <span class="text-sm font-semibold text-emerald-700">
                            {{ selectedKawasan.type }}
                        </span>
                    </div>

                    <!-- Description -->
                    <p class="text-slate-700 leading-relaxed mb-4">
                        {{ selectedKawasan.description }}
                    </p>

                    <!-- Details -->
                    <div class="space-y-3">
                        <div
                            v-if="selectedKawasan.area"
                            class="flex items-start gap-3 p-3 rounded-lg bg-slate-50"
                        >
                            <MapPin
                                class="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5"
                            />
                            <div>
                                <p class="text-sm font-semibold text-slate-900">
                                    Luas Wilayah
                                </p>
                                <p class="text-sm text-slate-600">
                                    {{ selectedKawasan.area }}
                                </p>
                            </div>
                        </div>

                        <div
                            v-if="selectedKawasan.location"
                            class="flex items-start gap-3 p-3 rounded-lg bg-slate-50"
                        >
                            <Navigation
                                class="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5"
                            />
                            <div>
                                <p class="text-sm font-semibold text-slate-900">
                                    Lokasi
                                </p>
                                <p class="text-sm text-slate-600">
                                    {{ selectedKawasan.location }}
                                </p>
                            </div>
                        </div>

                        <div
                            v-if="
                                selectedKawasan.features &&
                                selectedKawasan.features.length > 0
                            "
                            class="flex items-start gap-3 p-3 rounded-lg bg-slate-50"
                        >
                            <TreeDeciduous
                                class="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5"
                            />
                            <div class="flex-1">
                                <p
                                    class="text-sm font-semibold text-slate-900 mb-2"
                                >
                                    Flora & Fauna Unggulan
                                </p>
                                <ul class="text-sm text-slate-600 space-y-1">
                                    <li
                                        v-for="feature in selectedKawasan.features"
                                        :key="feature"
                                    >
                                        • {{ feature }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { MapPin, Navigation, TreeDeciduous, X } from 'lucide-vue-next';
import { onMounted, onUnmounted, ref } from 'vue';

// Dynamic import for Leaflet (client-side only)
let L: any = null;

interface Kawasan {
    id: number;
    name: string;
    type: string;
    lat: number;
    lng: number;
    description: string;
    area?: string;
    location?: string;
    features?: string[];
    icon: any;
}

const mapContainer = ref<HTMLElement | null>(null);
const selectedKawasan = ref<Kawasan | null>(null);
let map: any = null;
let markers: any[] = [];

// Conservation areas data
const kawasanData: Kawasan[] = [
    {
        id: 1,
        name: 'Taman Nasional Sembilang',
        type: 'Taman Nasional',
        lat: -1.8333,
        lng: 104.5,
        description:
            'Kawasan pelestarian alam dengan ekosistem mangrove dan hutan rawa yang luas, menjadi habitat penting bagi berbagai spesies satwa liar.',
        area: '202.896 ha',
        location: 'Kabupaten Banyuasin',
        features: [
            'Buaya Muara',
            'Harimau Sumatera',
            'Gajah Sumatera',
            'Bekantan',
        ],
        icon: 'building',
    },
    {
        id: 2,
        name: 'TWA Danau Ranau',
        type: 'Taman Wisata Alam',
        lat: -4.85,
        lng: 103.92,
        description:
            'Kawasan dengan keindahan alam danau vulkanik untuk rekreasi dan pariwisata alam yang memukau.',
        area: '12.950 ha',
        location: 'Kabupaten OKU Selatan',
        features: ['Ikan Endemik Danau', 'Burung Air', 'Hutan Pegunungan'],
        icon: 'building-2',
    },
    {
        id: 3,
        name: 'TWA Danau Tes',
        type: 'Taman Wisata Alam',
        lat: -3.283,
        lng: 103.683,
        description:
            'Taman wisata alam dengan danau indah yang dikelilingi hutan tropis.',
        area: '700 ha',
        location: 'Kabupaten Lebong',
        features: ['Burung Rangkong', 'Tapir', 'Kijang'],
        icon: 'building-2',
    },
    {
        id: 4,
        name: 'SMS Bentayan',
        type: 'Suaka Margasatwa',
        lat: -2.5,
        lng: 104.5,
        description:
            'Kawasan perlindungan satwa liar dan habitatnya, khususnya untuk spesies terancam punah.',
        area: '20.000 ha',
        location: 'Kabupaten Musi Banyuasin',
        features: ['Harimau Sumatera', 'Gajah Sumatera', 'Siamang'],
        icon: 'navigation',
    },
    {
        id: 5,
        name: 'SMS Dangku',
        type: 'Suaka Margasatwa',
        lat: -3.15,
        lng: 103.45,
        description:
            'Suaka margasatwa yang melindungi habitat alami berbagai spesies endemik Sumatera.',
        area: '15.000 ha',
        location: 'Kabupaten Ogan Komering Ulu',
        features: ['Rangkong', 'Beruk', 'Kuau'],
        icon: 'navigation',
    },
    {
        id: 6,
        name: 'SMS Padang Sugihan',
        type: 'Suaka Margasatwa',
        lat: -2.75,
        lng: 104.75,
        description:
            'Kawasan konservasi lahan basah dengan ekosistem rawa yang kaya akan keanekaragaman hayati.',
        area: '91.215 ha',
        location: 'Kabupaten Ogan Komering Ilir',
        features: ['Burung Air', 'Buaya', 'Ikan Belida'],
        icon: 'navigation',
    },
];

const closePanel = () => {
    selectedKawasan.value = null;
};

const createCustomIcon = (color: string) => {
    return L.divIcon({
        className: 'custom-marker',
        html: `
      <div style="
        background: linear-gradient(135deg, ${color} 0%, #0d9488 100%);
        width: 36px;
        height: 36px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          transform: rotate(45deg);
          color: white;
          font-weight: bold;
          font-size: 18px;
        ">📍</div>
      </div>
    `,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36],
    });
};

const initMap = async () => {
    if (!mapContainer.value) return;

    // Import Leaflet dynamically (client-side only)
    if (!L) {
        L = (await import('leaflet')).default;
        await import('leaflet/dist/leaflet.css');
    }

    // Initialize map centered on South Sumatra
    map = L.map(mapContainer.value, {
        zoomControl: true,
        scrollWheelZoom: false,
    }).setView([-3.0, 104.0], 8);

    // Add CartoDB Light tile layer
    L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        {
            attribution:
                '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
            maxZoom: 20,
            subdomains: 'abcd',
        }
    ).addTo(map);

    // Alternative tile layers you can use:
    // 1. OpenTopoMap
    // L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    //   attribution: 'Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap',
    //   maxZoom: 17,
    // }).addTo(map);

    // 2. Esri World Imagery
    // L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    //   attribution: 'Tiles © Esri',
    // }).addTo(map);

    // Add markers for each conservation area
    kawasanData.forEach((kawasan) => {
        const color = getColorByType(kawasan.type);
        const marker = L.marker([kawasan.lat, kawasan.lng], {
            icon: createCustomIcon(color),
            title: kawasan.name,
        }).addTo(map!);

        // Add click event to show sidebar
        marker.on('click', () => {
            selectedKawasan.value = kawasan;
        });

        markers.push(marker);
    });
};

const getColorByType = (type: string): string => {
    switch (type) {
        case 'Taman Nasional':
            return '#10b981'; // emerald-500
        case 'Taman Wisata Alam':
            return '#14b8a6'; // teal-500
        case 'Suaka Margasatwa':
            return '#059669'; // emerald-600
        default:
            return '#10b981';
    }
};

onMounted(() => {
    // Only initialize map on client-side
    if (process.client) {
        setTimeout(() => {
            initMap();
        }, 100);
    }
});

onUnmounted(() => {
    // Cleanup
    if (map) {
        map.remove();
        map = null;
    }
    markers = [];
});
</script>

<style scoped>
/* Override Leaflet default styles */
:deep(.leaflet-container) {
    font-family: inherit;
}

:deep(.leaflet-control-zoom) {
    border: none !important;
    border-radius: 12px !important;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
}

:deep(.leaflet-control-zoom a) {
    width: 36px !important;
    height: 36px !important;
    line-height: 36px !important;
    color: #059669 !important;
    background: white !important;
    border: none !important;
    font-size: 20px !important;
    font-weight: bold !important;
}

:deep(.leaflet-control-zoom a:hover) {
    background: #f0fdf4 !important;
    color: #047857 !important;
}

:deep(.custom-marker) {
    background: transparent !important;
    border: none !important;
}

/* Scrollbar styling for sidebar */
.overflow-y-auto {
    scrollbar-width: thin;
    scrollbar-color: rgb(203 213 225) transparent;
}

.overflow-y-auto::-webkit-scrollbar {
    width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
    background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    background-color: rgb(203 213 225);
    border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background-color: rgb(148 163 184);
}
</style>
