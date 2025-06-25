<script setup lang="ts">
import { useRouter } from '#imports'
import { useUserStore } from '~/store/user'

const router = useRouter()
const userStore = useUserStore()

/**
 * Пункты меню пользователя в выпадающем списке.
 *
 * @type {Array<Array<{
 *   label: string;
 *   icon: string;
 *   onSelect: () => void;
 * }>>}
 */
const userMenuItems = [
  [
    {
      label: 'Выйти',
      icon: 'i-heroicons-arrow-left-on-rectangle',
      onSelect: (): void => {
        userStore.clearAuth()
        router.push('/login')
      }
    },
    {
      label: 'В лк',
      icon: 'i-heroicons-user-circle',
      onSelect: (): void => {
        router.push('/account')
      }
    }
  ]
]
</script>

<template>
  <UContainer class="py-4">
    <div
        class="flex
        justify-between
        items-center"
    >
      <NuxtLink to="/account" class="font-semibold text-lg">
        MyApp
      </NuxtLink>

      <div>
        <template v-if="userStore.user?.data.login">
          <UDropdownMenu :items="userMenuItems" placement="bottom-end">
            <UButton
                class="justify-center z-20 w-30 bg-blue-200"
                color="neutral"
                variant="ghost"
            >
              {{ userStore.user.data.login }}
            </UButton>
          </UDropdownMenu>
        </template>

        <template v-else>
          <UButtonGroup class="gap-x-2">
            <UButton to="/login">Войти</UButton>
            <UButton to="/registration" color="primary">Регистрация</UButton>
          </UButtonGroup>
        </template>
      </div>
    </div>
  </UContainer>
</template>
