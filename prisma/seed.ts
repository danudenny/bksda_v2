import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Create admin user
    const adminPassword = await bcrypt.hash('Admin123456', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@bksda.id' },
        update: {},
        create: {
            email: 'admin@bksda.id',
            name: 'Admin BKSDA',
            password: adminPassword,
            role: 'ADMIN',
            isActive: true,
        },
    });
    console.log('✅ Admin user created:', admin.email);

    // Create author user
    const authorPassword = await bcrypt.hash('Author123456', 10);
    const author = await prisma.user.upsert({
        where: { email: 'author@bksda.id' },
        update: {},
        create: {
            email: 'author@bksda.id',
            name: 'Author BKSDA',
            password: authorPassword,
            role: 'AUTHOR',
            isActive: true,
        },
    });
    console.log('✅ Author user created:', author.email);

    // Create categories
    const categories = await Promise.all([
        prisma.category.upsert({
            where: { slug: 'berita-terbaru' },
            update: {},
            create: {
                name: 'Berita Terbaru',
                slug: 'berita-terbaru',
                description: 'Berita dan update terkini dari BKSDA',
            },
        }),
        prisma.category.upsert({
            where: { slug: 'pengumuman' },
            update: {},
            create: {
                name: 'Pengumuman',
                slug: 'pengumuman',
                description: 'Pengumuman penting dari BKSDA',
            },
        }),
        prisma.category.upsert({
            where: { slug: 'edukasi' },
            update: {},
            create: {
                name: 'Edukasi',
                slug: 'edukasi',
                description: 'Konten edukasi tentang konservasi',
            },
        }),
    ]);
    console.log('✅ Categories created:', categories.length);

    // Create sample post
    await prisma.post.upsert({
        where: { slug: 'selamat-datang-di-cms-bksda' },
        update: {},
        create: {
            title: 'Selamat Datang di CMS BKSDA',
            slug: 'selamat-datang-di-cms-bksda',
            content:
                'Ini adalah post pertama di CMS BKSDA. Anda dapat mengelola semua konten website dari sini.',
            excerpt: 'Post pertama di CMS BKSDA',
            imageUrl:
                'https://images.unsplash.com/photo-1470114716159-e389f8712fda?w=800',
            published: true,
            publishedAt: new Date(),
            authorId: author.id,
            categoryId: categories[0].id,
        },
    });
    console.log('✅ Sample post created');

    // Create announcements
    const announcements = await Promise.all([
        prisma.announcement.upsert({
            where: { id: 'ann-1' },
            update: {},
            create: {
                id: 'ann-1',
                title: 'Penutupan Jalur Pendakian Gunung Dempo',
                date: '30 Okt 2025',
                category: 'Peringatan',
                href: '/berita/1',
                order: 1,
                isActive: true,
            },
        }),
        prisma.announcement.upsert({
            where: { id: 'ann-2' },
            update: {},
            create: {
                id: 'ann-2',
                title: 'Program Relawan Konservasi 2026 Dibuka',
                date: '28 Okt 2025',
                category: 'Pendaftaran',
                href: '/berita/2',
                order: 2,
                isActive: true,
            },
        }),
    ]);
    console.log('✅ Announcements created:', announcements.length);

    // Create fokus konservasi
    const species = await Promise.all([
        prisma.fokusKonservasi.upsert({
            where: { slug: 'harimau-sumatera' },
            update: {},
            create: {
                name: 'Harimau Sumatera',
                latinName: 'Panthera tigris sumatrae',
                slug: 'harimau-sumatera',
                imageUrl:
                    'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800',
                description:
                    'Harimau Sumatera adalah subspesies harimau yang paling terancam punah.',
                order: 1,
                isActive: true,
            },
        }),
        prisma.fokusKonservasi.upsert({
            where: { slug: 'gajah-sumatera' },
            update: {},
            create: {
                name: 'Gajah Sumatera',
                latinName: 'Elephas maximus sumatranus',
                slug: 'gajah-sumatera',
                imageUrl:
                    'https://images.unsplash.com/photo-1564349332856-e8e1b3c3f8d8?w=800',
                description: 'Gajah Sumatera adalah gajah terkecil di dunia.',
                order: 2,
                isActive: true,
            },
        }),
        prisma.fokusKonservasi.upsert({
            where: { slug: 'burung-rangkong' },
            update: {},
            create: {
                name: 'Burung Rangkong',
                latinName: 'Buceros rhinoceros',
                slug: 'burung-rangkong',
                imageUrl:
                    'https://images.unsplash.com/photo-1444464666175-1642a4d30d60?w=800',
                description: 'Burung Rangkong adalah burung ikonik Sumatera.',
                order: 3,
                isActive: true,
            },
        }),
    ]);
    console.log('✅ Species created:', species.length);

    // Create kawasan categories
    const kawasanCategories = await Promise.all([
        prisma.kawasanCategory.upsert({
            where: { slug: 'suaka-margasatwa' },
            update: {},
            create: {
                name: 'Suaka Margasatwa',
                slug: 'suaka-margasatwa',
                description:
                    'Kawasan suaka alam yang melindungi satwa liar khas, sebagai tempat perlindungan, perkembangbiakan, dan habitat penting.',
                imageUrl:
                    'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=800',
                order: 1,
                isActive: true,
            },
        }),
        prisma.kawasanCategory.upsert({
            where: { slug: 'taman-wisata-alam' },
            update: {},
            create: {
                name: 'Taman Wisata Alam',
                slug: 'taman-wisata-alam',
                description:
                    'Kawasan pelestarian alam yang dimanfaatkan untuk rekreasi, pariwisata alam, dan edukasi lingkungan secara berkelanjutan.',
                imageUrl:
                    'https://images.unsplash.com/photo-1501675423372-9bfa95849e62?w=800',
                order: 2,
                isActive: true,
            },
        }),
    ]);
    console.log('✅ Kawasan categories created:', kawasanCategories.length);

    // Create kawasan locations
    await Promise.all([
        prisma.kawasanLocation.upsert({
            where: {
                categoryId_slug: {
                    categoryId: kawasanCategories[0].id,
                    slug: 'dangku',
                },
            },
            update: {},
            create: {
                name: 'Dangku',
                slug: 'dangku',
                categoryId: kawasanCategories[0].id,
                order: 1,
                isActive: true,
            },
        }),
        prisma.kawasanLocation.upsert({
            where: {
                categoryId_slug: {
                    categoryId: kawasanCategories[0].id,
                    slug: 'bentayan',
                },
            },
            update: {},
            create: {
                name: 'Bentayan',
                slug: 'bentayan',
                categoryId: kawasanCategories[0].id,
                order: 2,
                isActive: true,
            },
        }),
        prisma.kawasanLocation.upsert({
            where: {
                categoryId_slug: {
                    categoryId: kawasanCategories[1].id,
                    slug: 'punti-kayu',
                },
            },
            update: {},
            create: {
                name: 'Punti Kayu',
                slug: 'punti-kayu',
                categoryId: kawasanCategories[1].id,
                order: 1,
                isActive: true,
            },
        }),
    ]);
    console.log('✅ Kawasan locations created');

    // Create gallery images
    const galleryImages = await Promise.all([
        prisma.galleryImage.upsert({
            where: { id: 'gal-1' },
            update: {},
            create: {
                id: 'gal-1',
                imageUrl:
                    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
                altText: 'Harimau Sumatera',
                row: 'ROW_1',
                order: 1,
                isActive: true,
            },
        }),
        prisma.galleryImage.upsert({
            where: { id: 'gal-2' },
            update: {},
            create: {
                id: 'gal-2',
                imageUrl:
                    'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800',
                altText: 'Hutan Hujan Tropis',
                row: 'ROW_2',
                order: 1,
                isActive: true,
            },
        }),
        prisma.galleryImage.upsert({
            where: { id: 'gal-3' },
            update: {},
            create: {
                id: 'gal-3',
                imageUrl:
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
                altText: 'Tim BKSDA Patroli',
                row: 'ROW_3',
                order: 1,
                isActive: true,
            },
        }),
    ]);
    console.log('✅ Gallery images created:', galleryImages.length);

    // Create external links
    const externalLinks = await Promise.all([
        prisma.externalLink.upsert({
            where: { id: 'link-1' },
            update: {},
            create: {
                id: 'link-1',
                title: 'SIDAK KSDAE',
                subtitle: 'Kementerian LHK',
                url: 'https://sidak.ksdae.id/',
                status: 'ACTIVE',
                order: 1,
                isActive: true,
            },
        }),
        prisma.externalLink.upsert({
            where: { id: 'link-2' },
            update: {},
            create: {
                id: 'link-2',
                title: 'Kementerian LHK',
                subtitle: 'Website Resmi MenLHK',
                url: 'https://www.menlhk.go.id/',
                status: 'ACTIVE',
                order: 2,
                isActive: true,
            },
        }),
    ]);
    console.log('✅ External links created:', externalLinks.length);

    // Create site settings
    await prisma.siteSettings.upsert({
        where: { id: 'global' },
        update: {},
        create: {
            id: 'global',
            footerAddress:
                'Jl. Pendidikan No. 123, Palembang, Sumatera Selatan 30139',
            footerPhone: '+62 711 123456',
            footerEmail: 'info@bksda.id',
            socialFacebook: 'https://facebook.com/bksda',
            socialTwitter: 'https://twitter.com/bksda',
            socialInstagram: 'https://instagram.com/bksda',
            socialYoutube: 'https://youtube.com/@bksda',
            aboutDescription:
                'BKSDA Sumatera Selatan adalah lembaga pemerintah yang bertanggung jawab atas konservasi keanekaragaman hayati di Sumatera Selatan.',
            heroTitle: 'Melindungi Kekayaan Alam Sumatera Selatan',
            heroSubtitle:
                'Bersama menjaga kelestarian satwa liar dan ekosistem',
            ctaTitle: 'Bergabunglah dengan Kami',
            ctaDescription: 'Jadilah bagian dari gerakan konservasi kami',
            ctaButtonText: 'Daftar Sekarang',
            ctaButtonUrl: '/daftar',
        },
    });
    console.log('✅ Site settings created');

    console.log('✨ Database seeding completed!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
