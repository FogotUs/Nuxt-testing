<script setup lang="ts">
import type { NuxtError } from "#app";
import { useRouter } from "vue-router";

import Header from "~/components/Header.vue";

defineProps<{
  error: NuxtError;
}>();

const router = useRouter();
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <Header />

    <main class="flex-grow flex items-center justify-center px-4 py-16">
      <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 class="text-6xl font-extrabold text-red-600">
          {{ error.statusCode }}
        </h1>

        <div
            v-if="error.statusCode === 404"
            class="mt-6 space-y-2"
        >
          <p class="text-xl font-medium text-gray-800">
            Страница не найдена…
          </p>
          <p class="text-sm text-gray-500">
            Неправильно набран адрес или такой страницы не существует
          </p>
        </div>

        <div
            v-else-if="error.statusCode === 500"
            class="mt-6 space-y-2"
        >
          <p class="text-xl font-medium text-gray-800">
            Ошибка сервера
          </p>
          <p class="text-sm text-gray-500">
            {{ error.data }}
          </p>
          <p class="text-sm text-gray-500">
            {{ error.cause }}
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="mt-8 flex justify-center space-x-4">
          <NuxtLink
              to="/"
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            ВЕРНУТЬСЯ НА ГЛАВНУЮ
          </NuxtLink>
          <button
              @click="router.back()"
              class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
          >
            НАЗАД
          </button>
        </div>
      </div>
    </main>
  </div>
</template>
