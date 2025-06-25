import { getTokenFromStorage } from '~/composable'
import { useApp } from '~/store/app'
import { useRuntimeConfig } from '#imports'

/**
 * Composable для выполнения авторизованных запросов к API с автоматическим
 * показом состояния загрузки и уведомлений об ошибках.
 *
 * @returns {{
 *   /**
 *    * Выполняет запрос к эндпоинту API.
 *    * @template T
 *    * @param {string} endpoint — путь до метода без префикса `/api/`
 *    * @param {RequestInit} [options] — дополнительные опции fetch (метод, тело, заголовки и т.д.)
 *    * @returns {Promise<T>} — результат парсинга JSON в тип T
 *    * @throws {Error} — при сетевой ошибке или если response.ok === false
 *    *\/
 *   authFetch: <T>(endpoint: string, options?: RequestInit) => Promise<T>
 * }}
 */
export const useAuthApi = () => {
    const appStore = useApp()
    const config = useRuntimeConfig()
    const { startLoading, stopLoading } = appStore

    /**
     * Выполняет HTTP-запрос к защищённому API, автоматически добавляя заголовок
     * Authorization, управляя спиннером загрузки и показывая уведомления об ошибках.
     *
     * @template T
     * @param {string} endpoint часть URL после `/api/`
     * @param {RequestInit} [options={}] любые опции для fetch (headers, method, body и т.п.)
     * @returns {Promise<T>} JSON ответ сервера
     * @throws {Error} если сеть недоступна или сервер вернул не-2xx статус
     */
    const authFetch = async <T>(
        endpoint: string,
        options: RequestInit = {},
    ): Promise<T> => {
        startLoading()

        // Формируем заголовки, сохраняя Content-Type и добавляя Authorization, если есть токен
        const headers = new Headers({
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        })

        const token = getTokenFromStorage()
        if (token) {
            headers.append('Authorization', `Basic ${token}`)
        }

        try {
            const response = await fetch(`${config.public.api_host}/api/${endpoint}`, {
                ...options,
                headers,
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                const err = new Error(`API: ${response.status}`) as Error & { data?: Record<string, string[]> }
                err.data = errorData
                throw err
            }

            // Успешно: возвращаем JSON
            return (await response.json()) as T
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Auth API Error:', error)
            }
            throw error
        } finally {
            stopLoading()
        }
    }

    return { authFetch }
}
