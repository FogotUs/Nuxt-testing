<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from '#imports'
import { useUserStore } from '~/store/user'
import { useApp } from '~/store/app'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const appStore = useApp()

/**
 * Состояние формы входа.
 * @property {string} login — логин пользователя.
 * @property {string} password — пароль пользователя.
 */
const form = ref<{login: string, password: string}>({
  /** Логин */
  login: '',
  /** Пароль */
  password: '',
})

/**
 * Пытается залогинить пользователя и при успешном входе
 * перенаправляет на `/account`
 *
 * @async
 * @returns {Promise<void>}
 */
const onSubmit = async (): Promise<void> => {
  try {
    await userStore.login(form.value)
    await router.push('/account')
  } catch (err: any) {
      return
  }
}
</script>

<template>
  <UCard class="max-w-md mx-auto mt-10">
    <template #header>
      <h2 class="text-xl font-semibold">Вход</h2>
    </template>

    <UForm :state="form" @submit="onSubmit"
           class="flex
           flex-col
           gap-6"
    >
      <UFormGroup label="Логин" name="login">
        <UInput
            v-model="form.login"
            placeholder="Логин"
            required
            class="w-full"
        />
      </UFormGroup>

      <UFormGroup label="Пароль" name="password">
        <UInput
            v-model="form.password"
            type="password"
            placeholder="Пароль"
            required
            class="w-full"
        />
        <p class="mt-1 text-sm text-gray-500">Не менее 8 символов должны быть буквы и цифры </p>
      </UFormGroup>

      <UButton type="submit" class="mt-6 w-full">
        Войти
      </UButton>
    </UForm>
  </UCard>
</template>
