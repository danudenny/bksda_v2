import { ref, computed } from "vue";

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  imageUrl: string;
  published: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  category: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export const usePosts = () => {
  const posts = ref<Post[]>([]);
  const categories = ref<Category[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Fetch all posts
  const fetchPosts = async (options?: { page?: number; limit?: number; published?: boolean }) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch("/api/posts", {
        query: {
          page: options?.page || 1,
          limit: options?.limit || 100,
          ...(options?.published !== undefined && { published: options.published }),
        },
      });

      if (response.success) {
        posts.value = response.data;
        return response;
      }
    } catch (err: any) {
      error.value = err.message || "Failed to fetch posts";
      console.error("Fetch posts error:", err);
    } finally {
      loading.value = false;
    }
  };

  // Fetch single post
  const fetchPost = async (id: string) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch(`/api/posts/${id}`);

      if (response.success) {
        return response.data;
      }
    } catch (err: any) {
      error.value = err.message || "Failed to fetch post";
      console.error("Fetch post error:", err);
    } finally {
      loading.value = false;
    }
  };

  // Create post
  const createPost = async (data: Partial<Post>) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch("/api/posts", {
        method: "POST",
        body: data,
      });

      if (response.success) {
        posts.value.unshift(response.data);
        return response.data;
      }
    } catch (err: any) {
      error.value = err.message || "Failed to create post";
      console.error("Create post error:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Update post
  const updatePost = async (id: string, data: Partial<Post>) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch(`/api/posts/${id}`, {
        method: "PUT",
        body: data,
      });

      if (response.success) {
        const index = posts.value.findIndex((p) => p.id === id);
        if (index !== -1) {
          posts.value[index] = response.data;
        }
        return response.data;
      }
    } catch (err: any) {
      error.value = err.message || "Failed to update post";
      console.error("Update post error:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Delete post
  const deletePost = async (id: string) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });

      if (response.success) {
        posts.value = posts.value.filter((p) => p.id !== id);
        return response;
      }
    } catch (err: any) {
      error.value = err.message || "Failed to delete post";
      console.error("Delete post error:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await $fetch("/api/categories", {
        query: { limit: 100 },
      });

      if (response.success) {
        categories.value = response.data;
        return response.data;
      }
    } catch (err: any) {
      error.value = err.message || "Failed to fetch categories";
      console.error("Fetch categories error:", err);
    }
  };

  // Computed
  const publishedCount = computed(() => posts.value.filter((p) => p.published).length);
  const draftCount = computed(() => posts.value.filter((p) => !p.published).length);

  return {
    // State
    posts,
    categories,
    loading,
    error,

    // Methods
    fetchPosts,
    fetchPost,
    createPost,
    updatePost,
    deletePost,
    fetchCategories,

    // Computed
    publishedCount,
    draftCount,
  };
};
