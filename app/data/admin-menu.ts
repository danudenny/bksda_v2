import {
    FileText,
    Image,
    LayoutDashboard,
    Link,
    MapPin,
    Megaphone,
    Menu,
    PawPrint,
    Settings,
    Tag,
    Users,
} from 'lucide-vue-next';

export interface MenuItem {
    name: string;
    icon: any;
    href: string;
    badge?: string;
}

export interface MenuGroup {
    title?: string;
    items: MenuItem[];
}

export const adminMenuGroups: MenuGroup[] = [
    {
        items: [
            {
                name: 'Dashboard',
                icon: LayoutDashboard,
                href: '/admin/dashboard',
            },
        ],
    },
    {
        title: 'KONTEN',
        items: [
            {
                name: 'Hero Section',
                icon: Image,
                href: '/admin/hero',
            },
            {
                name: 'Berita',
                icon: FileText,
                href: '/admin/posts',
            },
            {
                name: 'Kategori Berita',
                icon: Tag,
                href: '/admin/categories',
            },
            {
                name: 'Pengumuman',
                icon: Megaphone,
                href: '/admin/announcements',
            },
            {
                name: 'Kategori Pengumuman',
                icon: Tag,
                href: '/admin/announcement-categories',
            },
            {
                name: 'Galeri',
                icon: Image,
                href: '/admin/gallery',
            },
        ],
    },
    {
        title: 'KONSERVASI',
        items: [
            {
                name: 'Fokus Konservasi',
                icon: PawPrint,
                href: '/admin/fokus-konservasi',
            },
            {
                name: 'Kawasan Konservasi',
                icon: MapPin,
                href: '/admin/kawasan',
            },
        ],
    },
    {
        title: 'SYSTEM',
        items: [
            {
                name: 'Link Eksternal',
                icon: Link,
                href: '/admin/external-links',
            },
            {
                name: 'Manajemen Menu',
                icon: Menu,
                href: '/admin/menus',
            },
            {
                name: 'Halaman Statis',
                icon: FileText,
                href: '/admin/pages',
            },
            {
                name: 'Pengguna',
                icon: Users,
                href: '/admin/users',
            },
            {
                name: 'Pengaturan',
                icon: Settings,
                href: '/admin/settings',
            },
        ],
    },
];
