<script setup lang="ts">
import { ref } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useAuth } from "@/composables/useAuth";

// Define layout for this page
definePageMeta({
  layout: "auth",
});

const { login } = useAuth();
const isLoading = ref(false);
const serverError = ref<string | null>(null);

const formSchema = toTypedSchema(
  z.object({
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .min(1, "Password is required"),
  }),
);

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: formSchema,
});

const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;
  serverError.value = null;
  const result = await login(values);
  isLoading.value = false;

  if (result?.error) {
    serverError.value = result.error;
  }
});
</script>

<template>
  <div class="grid lg:grid-cols-2 min-h-screen">
    <div
      class="hidden lg:flex items-center justify-center bg-gray-50 border-r dark:bg-gray-900"
    >
      <img
        src="/logo.avif"
        alt="BKSDA Sumatera Selatan Logo"
        class="w-32 h-32 mb-4"
      />
      <div class="text-center p-8">
        <h2 class="text-4xl font-extrabold text-green-700 dark:text-green-400">
          BKSDA
        </h2>
        <p class="text-xl mt-2 text-gray-600 dark:text-gray-400">
          Sumatera Selatan
        </p>
      </div>
    </div>

    <div class="flex items-center justify-center p-4 sm:p-8 lg:p-12">
      <div class="w-full max-w-md">
        <div class="flex flex-col space-y-4 text-left">
          <div class="lg:hidden text-center mb-6">
            <h2 class="text-3xl font-bold text-green-700 dark:text-green-400">
              BKSDA
            </h2>
            <p class="text-sm font-light text-muted-foreground">
              Sumatera Selatan
            </p>
          </div>

          <h1 class="text-3xl font-bold tracking-tight">Masuk Admin Panel</h1>
          <p class="text-sm text-muted-foreground">
            Gunakan akun resmi Anda untuk masuk.
          </p>
        </div>

        <form @submit="onSubmit" class="mt-6">
          <div class="grid gap-4">
            <div class="grid gap-1">
              <Label for="email">Email</Label>
              <Input
                id="email"
                v-model="email"
                v-bind="emailAttrs"
                placeholder="nama.pegawai@bksda.go.id"
                type="email"
                auto-capitalize="none"
                auto-complete="email"
                auto-correct="off"
                :disabled="isLoading"
                class="h-10"
              />
              <p v-if="errors.email" class="text-xs text-red-500 mt-1">
                {{ errors.email }}
              </p>
            </div>

            <div class="grid gap-1">
              <div class="flex justify-between items-center">
                <Label for="password">Password</Label>
                <a
                  href="#"
                  class="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline"
                  >Lupa Password?</a
                >
              </div>
              <Input
                id="password"
                v-model="password"
                v-bind="passwordAttrs"
                placeholder="••••••••"
                type="password"
                auto-capitalize="none"
                auto-complete="current-password"
                auto-correct="off"
                :disabled="isLoading"
                class="h-10"
              />
              <p v-if="errors.password" class="text-xs text-red-500 mt-1">
                {{ errors.password }}
              </p>
            </div>

            <div
              v-if="serverError"
              class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong class="font-bold">Login Failed!</strong>
              <span class="block sm:inline">{{ serverError }}</span>
            </div>

            <Button class="mt-4 h-10" :disabled="isLoading">
              <span v-if="isLoading">
                <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sedang Memuat...
              </span>
              <span v-else>Masuk</span>
            </Button>
          </div>
        </form>

        <p class="mt-10 text-center text-xs text-gray-500">
          Akses Terbatas & Dilindungi.
        </p>
        <p class="text-center text-xs text-muted-foreground mt-1">
          © {{ new Date().getFullYear() }} BKSDA Sumatera Selatan.
        </p>
      </div>
    </div>
  </div>
</template>
