import {
  LayoutDashboard,
  FileText,
  Users,
  Megaphone,
  Leaf,
  MapPin,
  Image,
  Link,
  Settings,
  Tag,
} from "lucide-vue-next";

export interface MenuItem {
  name: string;
  icon: any;
  href: string;
  badge?: string;
  children?: MenuItem[];
}

export const adminMenuItems: MenuItem[] = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
  },
  {
    name: "Konten",
    icon: FileText,
    href: "#",
    children: [
      {
        name: "Hero Section",
        icon: Image,
        href: "/admin/hero",
      },
      {
        name: "Berita",
        icon: FileText,
        href: "/admin/posts",
      },
      {
        name: "Kategori Berita",
        icon: Tag,
        href: "/admin/categories",
      },
      {
        name: "Pengumuman",
        icon: Megaphone,
        href: "/admin/announcements",
      },
      {
        name: "Kategori Pengumuman",
        icon: Tag,
        href: "/admin/announcement-categories",
      },
      {
        name: "Galeri",
        icon: Image,
        href: "/admin/gallery",
      },
    ],
  },
  {
    name: "Konservasi",
    icon: Leaf,
    href: "#",
    children: [
      {
        name: "Spesies Fokus",
        icon: Leaf,
        href: "/admin/fokus-konservasi",
      },
      {
        name: "Kawasan Konservasi",
        icon: MapPin,
        href: "/admin/kawasan",
      },
    ],
  },
  {
    name: "Link Eksternal",
    icon: Link,
    href: "/admin/external-links",
  },
  {
    name: "Pengguna",
    icon: Users,
    href: "/admin/users",
  },
  {
    name: "Pengaturan",
    icon: Settings,
    href: "/admin/settings",
  },
];
