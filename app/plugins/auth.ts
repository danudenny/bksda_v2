import { useAuthStore } from "@/stores/auth";

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    const authStore = useAuthStore();

    if (authStore.isAuthenticated) {
      return;
    }

    const storedUser = localStorage.getItem("auth_user");
    const storedToken = localStorage.getItem("auth_token");

    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        authStore.hydrateState(parsedUser, storedToken);
      } catch (error) {
        console.error("[Auth Plugin] Gagal memulihkan state:", error);
        authStore.clear();
      }
    }
  }
});
