export default defineNuxtPlugin(() => {
    if (process.client) {
        // Defer non-critical scripts
        const deferScripts = () => {
            // Remove unused scripts or defer them
            // This is a placeholder for any third-party scripts you might add later
        };

        // Run after page is fully loaded
        if (document.readyState === 'complete') {
            setTimeout(deferScripts, 1000);
        } else {
            window.addEventListener('load', () => {
                setTimeout(deferScripts, 1000);
            });
        }

        // Prefetch critical routes on idle for faster navigation
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                const criticalRoutes = ['/berita', '/layanan/simaksi'];

                criticalRoutes.forEach((route) => {
                    const link = document.createElement('link');
                    link.rel = 'prefetch';
                    link.href = route;
                    document.head.appendChild(link);
                });
            });
        }
    }
});
