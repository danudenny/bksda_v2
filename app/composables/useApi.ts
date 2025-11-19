import { ref } from "vue";
import api from "@/utils/axios";
import type { AxiosRequestConfig } from "axios";

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

interface UseApiOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
}

export const useApi = () => {
  const loading = ref(false);
  const error = ref<string | null>(null);

  const request = async <T = any>(
    endpoint: string,
    options: AxiosRequestConfig = {},
  ): Promise<ApiResponse<T>> => {
    loading.value = true;
    error.value = null;

    try {
      const response = await api<ApiResponse<T>>(endpoint, options);
      return response.data;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "An error occurred";
      error.value = errorMessage;
      return {
        success: false,
        message: errorMessage,
        errors: err.response?.data?.errors || err,
      };
    } finally {
      loading.value = false;
    }
  };

  // Auth endpoints
  const register = (email: string, name: string, password: string) =>
    request("/auth/register", {
      method: "POST",
      data: { email, name, password },
    });

  const login = (email: string, password: string) =>
    request("/auth/login", {
      method: "POST",
      data: { email, password },
    });

  const logout = () =>
    request("/auth/logout", {
      method: "POST",
    });

  const refreshToken = () =>
    request("/auth/refresh", {
      method: "POST",
    });

  // Posts endpoints
  const getPosts = (page = 1, limit = 10, published?: boolean) =>
    request("/posts", {
      params: {
        page,
        limit,
        ...(published !== undefined && { published }),
      },
    });

  const getPost = (id: string) => request(`/posts/${id}`);

  const createPost = (data: any) =>
    request("/posts", {
      method: "POST",
      data: data,
    });

  const updatePost = (id: string, data: any) =>
    request(`/posts/${id}`, {
      method: "PUT",
      data: data,
    });

  const deletePost = (id: string) =>
    request(`/posts/${id}`, {
      method: "DELETE",
    });

  // Categories endpoints
  const getCategories = (page = 1, limit = 10) =>
    request("/categories", {
      params: { page, limit },
    });

  const getCategory = (id: string) => request(`/categories/${id}`);

  const createCategory = (data: any) =>
    request("/categories", {
      method: "POST",
      data: data,
    });

  const updateCategory = (id: string, data: any) =>
    request(`/categories/${id}`, {
      method: "PUT",
      data: data,
    });

  const deleteCategory = (id: string) =>
    request(`/categories/${id}`, {
      method: "DELETE",
    });

  // Announcements endpoints
  const getAnnouncements = (page = 1, limit = 10) =>
    request("/announcements", {
      params: { page, limit },
    });

  const getAnnouncement = (id: string) => request(`/announcements/${id}`);

  const createAnnouncement = (data: any) =>
    request("/announcements", {
      method: "POST",
      data: data,
    });

  const updateAnnouncement = (id: string, data: any) =>
    request(`/announcements/${id}`, {
      method: "PUT",
      data: data,
    });

  const deleteAnnouncement = (id: string) =>
    request(`/announcements/${id}`, {
      method: "DELETE",
    });

  // Fokus Konservasi endpoints
  const getSpecies = (page = 1, limit = 10) =>
    request("/fokus-konservasi", {
      params: { page, limit },
    });

  const getSpeciesById = (id: string) => request(`/fokus-konservasi/${id}`);

  const createSpecies = (data: any) =>
    request("/fokus-konservasi", {
      method: "POST",
      data: data,
    });

  const updateSpecies = (id: string, data: any) =>
    request(`/fokus-konservasi/${id}`, {
      method: "PUT",
      data: data,
    });

  const deleteSpecies = (id: string) =>
    request(`/fokus-konservasi/${id}`, {
      method: "DELETE",
    });

  // Kawasan endpoints
  const getKawasanCategories = (page = 1, limit = 10) =>
    request("/kawasan/categories", {
      params: { page, limit },
    });

  const getKawasanCategory = (id: string) =>
    request(`/kawasan/categories/${id}`);

  const createKawasanCategory = (data: any) =>
    request("/kawasan/categories", {
      method: "POST",
      data: data,
    });

  const updateKawasanCategory = (id: string, data: any) =>
    request(`/kawasan/categories/${id}`, {
      method: "PUT",
      data: data,
    });

  const deleteKawasanCategory = (id: string) =>
    request(`/kawasan/categories/${id}`, {
      method: "DELETE",
    });

  const createKawasanLocation = (data: any) =>
    request("/kawasan/locations", {
      method: "POST",
      data: data,
    });

  const getKawasanLocation = (id: string) =>
    request(`/kawasan/locations/${id}`);

  const updateKawasanLocation = (id: string, data: any) =>
    request(`/kawasan/locations/${id}`, {
      method: "PUT",
      data: data,
    });

  const deleteKawasanLocation = (id: string) =>
    request(`/kawasan/locations/${id}`, {
      method: "DELETE",
    });

  // Gallery endpoints
  const getGalleryImages = (row?: string) =>
    request("/gallery", {
      params: { ...(row && { row }) },
    });

  const getGalleryImage = (id: string) => request(`/gallery/${id}`);

  const createGalleryImage = (data: any) =>
    request("/gallery", {
      method: "POST",
      data: data,
    });

  const updateGalleryImage = (id: string, data: any) =>
    request(`/gallery/${id}`, {
      method: "PUT",
      data: data,
    });

  const deleteGalleryImage = (id: string) =>
    request(`/gallery/${id}`, {
      method: "DELETE",
    });

  // External Links endpoints
  const getExternalLinks = (page = 1, limit = 10) =>
    request("/external-links", {
      params: { page, limit },
    });

  const getExternalLink = (id: string) => request(`/external-links/${id}`);

  const createExternalLink = (data: any) =>
    request("/external-links", {
      method: "POST",
      data: data,
    });

  const updateExternalLink = (id: string, data: any) =>
    request(`/external-links/${id}`, {
      method: "PUT",
      data: data,
    });

  const deleteExternalLink = (id: string) =>
    request(`/external-links/${id}`, {
      method: "DELETE",
    });

  // Settings endpoints
  const getSettings = () => request("/settings");

  const updateSettings = (data: any) =>
    request("/settings", {
      method: "PUT",
      data: data,
    });

  return {
    loading,
    error,
    request,
    // Auth
    register,
    login,
    logout,
    refreshToken,
    // Posts
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    // Categories
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    // Announcements
    getAnnouncements,
    getAnnouncement,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,

    // Announcement Categories
    getAnnouncementCategories: () => request('/announcement-categories'),
    createAnnouncementCategory: (data: any) => request('/announcement-categories', { method: 'POST', data }),
    updateAnnouncementCategory: (id: string, data: any) => request(`/announcement-categories/${id}`, { method: 'PUT', data }),
    deleteAnnouncementCategory: (id: string) => request(`/announcement-categories/${id}`, { method: 'DELETE' }),

    // Species
    getSpecies,
    getSpeciesById,
    createSpecies,
    updateSpecies,
    deleteSpecies,
    // Kawasan
    getKawasanCategories,
    getKawasanCategory,
    createKawasanCategory,
    updateKawasanCategory,
    deleteKawasanCategory,
    createKawasanLocation,
    getKawasanLocation,
    updateKawasanLocation,
    deleteKawasanLocation,
    // Gallery
    getGalleryImages,
    getGalleryImage,
    createGalleryImage,
    updateGalleryImage,
    deleteGalleryImage,
    // External Links
    getExternalLinks,
    getExternalLink,
    createExternalLink,
    updateExternalLink,
    deleteExternalLink,
    // Settings
    getSettings,
    updateSettings,
  };
};
