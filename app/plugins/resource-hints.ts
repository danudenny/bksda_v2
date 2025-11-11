export default defineNuxtPlugin(() => {
    // Preload critical hero images for LCP optimization
    if (process.client) {
        const heroImages = [
            '/kws_konservasi/dangku.avif',
            '/kws_konservasi/gnmaras.avif',
            '/kws_konservasi/punti.avif',
        ];

        // Only preload the first image for immediate display
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = heroImages[0]!;
        link.type = 'image/avif';
        document.head.appendChild(link);
    }
});
