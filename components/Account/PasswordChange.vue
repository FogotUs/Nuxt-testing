<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '~/store/user'
import type { FormError } from '#ui/types'
import { useApp } from '~/store/app'
import type {LoginRequest} from "~/types";

const userStore = useUserStore()
const appStore = useApp()

/**
 * Реактивный объект для хранения пароля.
 *
 * @type {{ current: string; password: string; confirm: string }}
 */
const form = ref({
  current: '',
  password: '',
  confirm: '',
})


/**
 * Реактивный объект для хранения ошибок валидации.
 *
 * @type {{ current: string | null; password: string | null; confirm: string | null }}
 */
const errors = ref<{
  current: string | null
  password: string | null
  confirm: string | null
}>({
  current: null,
  password: null,
  confirm: null,
})

/**
 * Проверяет корректность полей формы.
 * При ошибках добавляет уведомления через appStore.
 *
 * @returns {FormError[]} Список ошибок валидации
 */
const validate = (): FormError[] => {
  errors.value.current = null
  errors.value.password = null
  errors.value.confirm = null

  const validationErrors: FormError[] = []

  if (!form.value.current) {
    errors.value.current = 'Введите текущий пароль'
    validationErrors.push({ name: 'current', message: errors.value.current })
    appStore.createNotification(
        'warning',
        'Не введён текущий пароль',
        'Пожалуйста, укажите ваш текущий пароль'
    )
  }

  if (!form.value.password) {
    errors.value.password = 'Введите новый пароль'
    validationErrors.push({ name: 'password', message: errors.value.password })
    appStore.createNotification(
        'warning',
        'Не введён новый пароль',
        'Пожалуйста, укажите новый пароль'
    )
  }

  if (form.value.password !== form.value.confirm) {
    errors.value.confirm = 'Пароли не совпадают'
    validationErrors.push({ name: 'confirm', message: errors.value.confirm })
    appStore.createNotification(
        'warning',
        'Пароли не совпадают',
        'Пароли в полях «Новый пароль» и «Подтверждение» должны совпадать'
    )
  }

  return validationErrors
}

/**
 * Обрабатывает отправку формы:
 * - Валидация полей
 * - Отправка запроса на смену пароля
 * - Повторная авторизация с новым паролем
 * - Отображение уведомлений
 */
const onSubmit = async () => {
  const validationErrors = validate()
  if (validationErrors.length > 0) {
    return
  }

  try {
    await userStore.changePassword({
      current_password: form.value.current,
      password: form.value.password,
      password_confirmation: form.value.confirm,
    })
    const loginPayload: LoginRequest = {
      login:    userStore.user?.data.login ?? '',
      password: form.value.password,
    }
    userStore.clearAuth()
    await userStore.login(loginPayload)

    appStore.createNotification('success', 'Пароль изменён', '')
    form.value.current = ''
    form.value.password = ''
    form.value.confirm = ''


  } catch (err: any) {
    return
  }
}
</script>

<template>
  <UCard class="max-w-md mt-10">
    <template #header>
      <h2 class="text-xl font-semibold">Смена пароля</h2>
    </template>

    <UForm
        class="flex flex-col gap-6"
        state="form"
        :validate="validate"
        @submit="onSubmit"
    >
      <UFormGroup
          label="Текущий пароль"
          name="current"
          :error="errors.current"
      >
        <UInput
            v-model="form.current"
            type="password"
            autocomplete="current-password"
            required
            class="w-full"
            placeholder="Введите текущий пароль"
        />
      </UFormGroup>

      <UFormGroup
          label="Новый пароль"
          name="password"
          :error="errors.password"
      >
        <UInput
            v-model="form.password"
            type="password"
            autocomplete="new-password"
            minlength="8"
            required
            class="w-full"
            placeholder="Введите новый пароль"
        />
        <p class="mt-1 text-sm text-gray-500">Не менее 8 символов должны быть буквы и цифры </p>
      </UFormGroup>

      <UFormGroup
          label="Подтверждение пароля"
          name="confirm"
          :error="errors.confirm"
      >
        <UInput
            v-model="form.confirm"
            type="password"
            autocomplete="new-password"
            required
            class="w-full"
            placeholder="Повторите новый пароль"
        />
        <p class="mt-1 text-sm text-gray-500">Повторите пароль </p>
      </UFormGroup>

      <UButton type="submit" class="mt-6 w-full">
        Сменить пароль
      </UButton>
    </UForm>
  </UCard>
</template>
