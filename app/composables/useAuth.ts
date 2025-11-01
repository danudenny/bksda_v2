import { useAuthStore } from '@/stores/auth';
import { toast } from 'vue-sonner';
import { useApi } from '@/composables/useApi';

export const useAuth = () => {
  const authStore = useAuthStore();
  const router = useRouter();
  const { login: apiLogin, logout: apiLogout } = useApi();

  const login = async (credentials: { email: string; password: string }) => {
    const response = await apiLogin(credentials.email, credentials.password);

    if (response.success && response.data) {
      authStore.setUser(response.data.user);
      authStore.setToken(response.data.accessToken);
      toast.success('Login Successful', {
        description: 'You will be redirected to the dashboard shortly.',
      });
      await router.push('/admin/dashboard');
      return { success: true };
    } else {
      const errorMessage = response.message || 'An unknown error occurred.';
      toast.error('Login Failed', {
        description: errorMessage,
      });
      return { error: errorMessage };
    }
  };

  const logout = async () => {
    await apiLogout();
    authStore.clear();
    toast.info('You have been logged out.');
    await router.push('/admin/login');
  };

  return {
    login,
    logout,
    isAuthenticated: authStore.isAuthenticated,
    user: authStore.user,
  };
};
