import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Colors, Notification } from '~/types/notification'

/**
 * Глобальный стор приложения для управления состоянием загрузки
 * и отображения уведомлений.
 *
 * @store app
 * @returns {{
 *   loading: import('vue').Ref<boolean>,
 *   notification: import('vue').Ref<Notification>,
 *   startLoading: () => void,
 *   stopLoading: () => void,
 *   createNotification: (color: Colors, title: string, message: string) => void,
 *   removeNotification: () => void
 * }}
 */
export const useApp = defineStore('app', () => {
  /**
   * Флаг отображения глобального индикатора загрузки.
   */
  const loading = ref<boolean>(false)

  /**
   * Текущее уведомление, отображаемое в приложении.
   */
  const notification = ref<Notification>({
    show: false,
    color: 'success',
    title: '',
    message: '',
  })

  /**
   * Включает индикатор загрузки.
   */
  function startLoading(): void {
    loading.value = true
  }

  /**
   * Выключает индикатор загрузки.
   */
  function stopLoading(): void {
    loading.value = false
  }

  /**
   * Создаёт и отображает уведомление.
   *
   * @param {Colors} color — цвет/тип уведомления ('success', 'warning', 'error', и т.д.)
   * @param {string} title — заголовок уведомления
   * @param {string} message — текст уведомления
   */
  function createNotification(color: Colors, title: string, message: string): void {
    notification.value.show = true
    notification.value.color = color
    notification.value.title = title
    notification.value.message = message
  }

  /**
   * Скрывает текущее уведомление и сбрасывает его содержимое.
   */
  function removeNotification(): void {
    notification.value.show = false
    notification.value.color = 'success'
    notification.value.title = ''
    notification.value.message = ''
  }

  return {
    loading,
    notification,
    startLoading,
    stopLoading,
    createNotification,
    removeNotification,
  }
})
