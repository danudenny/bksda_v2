import { onMounted, onUnmounted } from 'vue';

export const useScrollAnimation = () => {
    let observer: IntersectionObserver | null = null;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const el = entry.target as HTMLElement;

                // Baca data attributes kustom. Jika tidak ada, gunakan default.
                const duration = el.dataset.aosDuration || '1000ms'; // Durasi default lebih lama
                const delay = el.dataset.aosDelay || '0ms'; // Default tanpa delay

                // Ini adalah kunci 'smooth'. Ease-out-cubic.
                const easing =
                    el.dataset.aosEasing ||
                    'cubic-bezier(0.215, 0.61, 0.355, 1)';

                // Terapkan style transisi kustom SEBELUM menambah class
                el.style.transitionDuration = duration;
                el.style.transitionDelay = delay;
                el.style.transitionTimingFunction = easing;

                // Tambah class untuk memicu animasi
                el.classList.add('aos-animate');

                // Opsional: Berhenti mengamati setelah animasi berjalan
                // Ini sangat baik untuk performa. Hapus komentar jika mau.
                // observer?.unobserve(el);
            }
        });
    };

    onMounted(() => {
        if (process.client) {
            observer = new IntersectionObserver(observerCallback, {
                threshold: 0.1, // Animasi mulai saat 10% terlihat
                rootMargin: '0px 0px -50px 0px', // Trigger sedikit lebih awal
            });

            // Amati semua elemen dengan [data-aos]
            const elementsToAnimate = document.querySelectorAll('[data-aos]');
            elementsToAnimate.forEach((el) => {
                observer?.observe(el as HTMLElement);
            });
        }
    });

    onUnmounted(() => {
        // Selalu bersih-bersih saat komponen unmount
        observer?.disconnect();
    });
};
