<template>
    <div class="overflow-hidden">
        <SocialMdiaFloating />
        <BackToTop />
        <WhatsAppButton />
        <SurveyButton />
        <HeroSection />

        <div data-aos="fade-up" data-aos-duration="900ms">
            <Announcement />
        </div>

        <div data-aos="fade-left" data-aos-delay="200ms">
            <NewsSection />
        </div>

        <!-- <div data-aos="fade-right" data-aos-delay="200ms">
            <AboutSection />
        </div> -->

        <div data-aos="zoom-in" data-aos-duration="800ms">
            <KawasanKonservasi />
        </div>

        <div data-aos="fade-up" data-aos-delay="200ms">
            <FocusConservation />
        </div>

        <div
            data-aos="zoom-in-up"
            data-aos-duration="900ms"
            data-aos-delay="200ms"
        >
            <Gallery />
        </div>

        <div data-aos="fade-down" data-aos-duration="800ms">
            <CTA />
        </div>

        <div data-aos="fade-up" data-aos-delay="200ms">
            <Belida />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation';

// Initialize scroll animations (tetap sama)
useScrollAnimation();
</script>

<style scoped>
/* AOS Base Styles */
[data-aos] {
    opacity: 0;
    transition-property: opacity, transform;

    /* PENTING: Durasi & easing function dihapus dari sini.
      Composable kita yang baru akan mengaturnya via style inline,
      memberi kita kontrol per-elemen.
    */

    /* Hint untuk browser agar transisi lebih smooth */
    will-change: transform, opacity;
}

[data-aos].aos-animate {
    opacity: 1;
}

/* --- Variasi Animasi --- */
/* Saya menambah jaraknya sedikit (dari 50px ke 60px) agar lebih terlihat */

[data-aos='fade-up'] {
    transform: translateY(60px);
}
[data-aos='fade-up'].aos-animate {
    transform: translateY(0);
}

[data-aos='fade-down'] {
    transform: translateY(-60px);
}
[data-aos='fade-down'].aos-animate {
    transform: translateY(0);
}

[data-aos='fade-left'] {
    transform: translateX(-60px);
}
[data-aos='fade-left'].aos-animate {
    transform: translateX(0);
}

[data-aos='fade-right'] {
    transform: translateX(60px);
}
[data-aos='fade-right'].aos-animate {
    transform: translateX(0);
}

/* Saya membuat zoom-in lebih kentara (dari 0.9 ke 0.85) */
[data-aos='zoom-in'] {
    transform: scale(0.85);
}
[data-aos='zoom-in'].aos-animate {
    transform: scale(1);
}

[data-aos='zoom-out'] {
    transform: scale(1.15); /* Sedikit lebih jauh */
}
[data-aos='zoom-out'].aos-animate {
    transform: scale(1);
}

/* --- ANIMASI BARU (COMBO) --- */
/* Ini yang saya pakai untuk Gallery */

[data-aos='zoom-in-up'] {
    opacity: 0;
    transform: scale(0.8) translateY(50px);
}
[data-aos='zoom-in-up'].aos-animate {
    opacity: 1;
    transform: scale(1) translateY(0);
}
</style>
