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
    name: "Content Management",
    icon: FileText,
    href: "#",
    children: [
      {
        name: "Posts & News",
        icon: FileText,
        href: "/admin/posts",
      },
      {
        name: "Categories",
        icon: Tag,
        href: "/admin/categories",
      },
      {
        name: "Announcements",
        icon: Megaphone,
        href: "/admin/announcements",
      },
      {
        name: "Gallery",
        icon: Image,
        href: "/admin/gallery",
      },
    ],
  },
  {
    name: "Conservation",
    icon: Leaf,
    href: "#",
    children: [
      {
        name: "Focus Species",
        icon: Leaf,
        href: "/admin/fokus-konservasi",
      },
      {
        name: "Conservation Areas",
        icon: MapPin,
        href: "/admin/kawasan",
      },
    ],
  },
  {
    name: "External Links",
    icon: Link,
    href: "/admin/external-links",
  },
  {
    name: "Users",
    icon: Users,
    href: "/admin/users",
  },
  {
    name: "Settings",
    icon: Settings,
    href: "/admin/settings",
  },
];
