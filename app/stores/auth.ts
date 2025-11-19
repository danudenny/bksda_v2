import { defineStore } from "pinia";
import { jwtDecode } from 'jwt-decode';

export const useAuthStore = defineStore("auth", () => {
  const user = ref<any>(null);
  const token = ref<string | null>(null);

  const isAuthenticated = computed(() => !!user.value && !!token.value);

  const isTokenExpired = computed(() => {
    if (!token.value) return true;
    try {
      const decoded = jwtDecode(token.value);
      const now = Date.now() / 1000;
      return decoded.exp < now;
    } catch (e) {
      return true;
    }
  });

  // --- FUNGSI BARU ---
  // Fungsi ini HANYA untuk dipanggil oleh plugin
  // untuk memulihkan state tanpa menulis kembali ke localStorage.
  function hydrateState(hydratedUser: any, hydratedToken: string) {
    user.value = hydratedUser;
    token.value = hydratedToken;
  }
  // -------------------

  function setUser(newUser: any) {
    user.value = newUser;
    if (import.meta.client) {
      localStorage.setItem("auth_user", JSON.stringify(newUser));
    }
  }

  function setToken(newToken: string) {
    token.value = newToken;
    if (import.meta.client) {
      localStorage.setItem("auth_token", newToken);
    }
  }

    function checkTokenAndLogout() {
    if (isTokenExpired.value) {
      clear();
      // Optional: Redirect from here if needed, though layout is better.
      return true; // Indicates user was logged out
    }
    return false; // Token is still valid
  }

  function clear() {
    user.value = null;
    token.value = null;
    if (import.meta.client) {
      localStorage.removeItem("auth_user");
      localStorage.removeItem("auth_token");
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    setUser,
    setToken,
    clear,
    hydrateState,
    isTokenExpired,
    checkTokenAndLogout,
  };
});
