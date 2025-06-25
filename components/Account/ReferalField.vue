<script setup lang="ts">
import { computed } from 'vue'
import { useClipboard } from '@vueuse/core'
import { useApp } from '~/store/app'
import { useUserStore } from '~/store/user'
import { referralUrlFormatter } from '~/composable/referalUrlFormatter'

const appStore  = useApp()
const userStore = useUserStore()

const referralUrl = ref<string>('');

/**
 * Код реферала из стора пользователя.
 * @type {string}
 */
const rawCode = userStore?.user?.data.referral_code ?? ''


/**
 * Хук для копирования в буфер обмена.
 * Источник данных — referralUrl.
 */
const { copy, copied } = useClipboard({ source: referralUrl })

/**
 * Копирует `referralUrl` в буфер обмена и показывает уведомление.
 *
 * @returns {Promise<void>}
 */
async function handleCopy(): Promise<void> {
  await copy()
  if (copied.value) {
    appStore.createNotification('success', 'Скопировано', referralUrl.value)
  } else {
    appStore.createNotification('error', 'Не удалось скопировать', '')
  }
}

onMounted(() => {
  referralUrl.value = referralUrlFormatter(rawCode)
})

</script>

<template>
  <UFormGroup label="Ваша реферальная ссылка" class="w-full">
    <UInput
        :value="referralUrl"
        readonly
        class="w-full"
        :ui="{ trailing: 'pr-0.5' }"
    >
      <template #trailing>
        <UTooltip text="Скопировать в буфер" :content="{ side: 'right' }">
          <UButton
              size="sm"
              variant="link"
              :color="copied ? 'success' : 'neutral'"
              :icon="copied ? 'i-lucide-copy-check' : 'i-lucide-copy'"
              aria-label="Copy to clipboard"
              @click="handleCopy"
          />
        </UTooltip>
      </template>
    </UInput>
  </UFormGroup>
</template>
