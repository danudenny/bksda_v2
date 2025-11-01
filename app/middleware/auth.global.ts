import { useAuthStore } from "@/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  const isAuthenticated = authStore.isAuthenticated;
  const isAdminRoute = to.path.startsWith("/admin");
  const isLoginPage = to.path === "/admin/login";

  if (isAdminRoute && !isLoginPage && !isAuthenticated) {
    return navigateTo("/admin/login");
  }

  if (isLoginPage && isAuthenticated) {
    return navigateTo("/admin/dashboard");
  }
});
