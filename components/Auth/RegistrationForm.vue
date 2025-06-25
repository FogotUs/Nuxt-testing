<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '~/store/user'
import { useRouter } from '#imports'
import type { FormError } from '#ui/types'
import { useApp } from '~/store/app'

/**
 *
 * @property {string} [reffer] — реферальный код, если есть.
 */
const props = defineProps<{ reffer?: string }>()

const router = useRouter()
const userStore = useUserStore()
const appStore = useApp()

/**
 * Состояние полей формы регистрации.
 * @property form
 */
const form = ref<{
  login: string,
  password: string,
  confirm: string,
}>({
  /** Логин нового пользователя */
  login: '',
  /** Пароль */
  password: '',
  /** Подтверждение пароля */
  confirm: '',
})

/**
 * Объект для хранения сообщений об ошибках валидации.
 */
const errors = ref<{
  login: string | null,
  password: string | null,
  confirm: string | null,
}>({
  /** Ошибка логина */
  login: null as string | null,
  /** Ошибка пароля */
  password: null as string | null,
  /** Ошибка подтверждения пароля */
  confirm: null as string | null,
})

/**
 * Валидирует поля формы.
 * При возникновении ошибки добавляет уведомление через appStore.
 *
 * @returns {FormError[]} — массив ошибок валидации.
 */
const validate = (): FormError[] => {
  const validationErrors: FormError[] = []

  if (!form.value.login) {
    errors.value.login = 'Введите логин'
    validationErrors.push({ name: 'login', message: errors.value.login })
    appStore.createNotification(
        'warning',
        'Вы не ввели логин',
        'Введите логин'
    )
  } else {
    errors.value.login = null
  }

  if (!form.value.password) {
    errors.value.password = 'Введите пароль'
    validationErrors.push({ name: 'password', message: errors.value.password })
    appStore.createNotification(
        'warning',
        'Вы не ввели пароль',
        'Введите пароль'
    )
  } else {
    errors.value.password = null
  }

  if (form.value.password !== form.value.confirm) {
    errors.value.confirm = 'Пароли не совпадают'
    validationErrors.push({ name: 'confirm', message: errors.value.confirm })
    appStore.createNotification(
        'warning',
        'Пароли не совпадают',
        'Введите верные пароли в оба поля'
    )
  } else {
    errors.value.confirm = null
  }

  return validationErrors
}

/**
 * Обработчик отправки формы регистрации.
 * Если валидация прошла, вызывает метод userStore.register и
 * при успехе показывает уведомление и перенаправляет на /account.
 *
 * @async
 * @returns {Promise<void>}
 */
const onSubmit = async (): Promise<void> => {
  const validationErrors = validate()
  if (validationErrors.length > 0) return

  try {
    await userStore.register({
      login: form.value.login,
      password: form.value.password,
      password_confirmation: form.value.confirm,
      reffer: props.reffer,
    })
    appStore.createNotification('success', 'Аккаунт успешно создан', '')
    await router.push('/account')
  } catch (err: any) {
      return
  }
}
</script>

<template>
  <UCard class="max-w-md mx-auto mt-10">
    <template #header>
      <h2 class="text-xl font-semibold">Регистрация</h2>
    </template>

    <UForm
        class="flex flex-col gap-6"
        state="form"
        :validate="validate"
        @submit="onSubmit"
    >
      <UFormGroup label="Логин" name="login" :error="errors.login">
        <UInput
            v-model="form.login"
            placeholder="Логин"
            required
            class="w-full"
        />
      </UFormGroup>

      <UFormGroup
          label="Пароль"
          name="password"
          :error="errors.password"
      >
        <UInput
            v-model="form.password"
            type="password"
            placeholder="Пароль"
            required
            class="w-full"
        />
        <p class="mt-1 text-sm text-gray-500">Не менее 8 символов должны быть буквы и цифры </p>
      </UFormGroup>

      <UFormGroup
          label="Повторите пароль"
          name="confirm"
          :error="errors.confirm"
      >
        <UInput
            v-model="form.confirm"
            type="password"
            placeholder="Подтверждение"
            required
            class="w-full"
        />
        <p class="mt-1 text-sm text-gray-500">Повторите пароль </p>
      </UFormGroup>

      <UButton type="submit" class="mt-6 w-full">
        Зарегистрироваться
      </UButton>
    </UForm>
  </UCard>
</template>
