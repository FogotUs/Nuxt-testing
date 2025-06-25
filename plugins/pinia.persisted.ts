import { defineNuxtPlugin } from '#app'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import type { Pinia } from 'pinia'

/**
 * Регистрация персиста для упаковки данных стора в localStorage для избегания лишних запросов
 */
export default defineNuxtPlugin(({ $pinia }) => {
    ($pinia as Pinia).use(piniaPluginPersistedstate)
})
