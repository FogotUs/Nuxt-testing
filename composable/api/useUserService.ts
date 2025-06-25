import type {
    AccountResponse,
    ChangePassRequest,
    ChangePassResponse,
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
} from '~/types'
import { useApp } from '~/store/app'
import { formatValidationErrors, convert, useAuthApi } from '~/composable'

export const useUserService = () => {
    const { authFetch } = useAuthApi()
    const { createNotification } = useApp()

    /**
     * Универсальная обёртка API-запросов:
     * 1) ждёт выполнения cb()
     * 2) в случае ошибки извлекает .data и форматирует
     * 3) показывает нотификацию и пробрасывает ошибку дальше
     */
    async function requestWithNotification<T>(
        cb: () => Promise<T>,
        title: string
    ): Promise<T> {
        try {
            return await cb()
        } catch (err: any) {
            const raw = (err as Error & { data?: Record<string, string[]> }).data
            const description = raw
                ? formatValidationErrors(raw)
                : err.message || 'Неизвестная ошибка'
            createNotification('error', title, description)
            throw err
        }
    }

    return {
        /** Аутентификация пользователя */
        login: (credentials: LoginRequest) =>
            requestWithNotification(
                () =>
                    authFetch<LoginResponse>('account/login', {
                        method: 'POST',
                        body: JSON.stringify(credentials),
                    }),
                'Ошибка авторизации'
            ),

        /** Регистрация нового пользователя */
        register: (credentials: RegisterRequest) =>
            requestWithNotification(
                () =>
                    authFetch<RegisterResponse>('account/register', {
                        method: 'POST',
                        body: JSON.stringify(credentials),
                    }),
                'Ошибка регистрации'
            ),

        /** Получение информации о пользователе */
        getAccountInfo: (login: string) =>
            requestWithNotification(
                () =>
                    authFetch<AccountResponse>(`account/user/${login}`, {
                        method: 'GET',
                    }),
                'Ошибка получения профиля'
            ),

        /** Смена пароля пользователя */
        changePassword: (login: string, passwords: ChangePassRequest) =>
            requestWithNotification(
                () =>
                    authFetch<ChangePassResponse>(
                        `account/user/${login}/changepassword`,
                        {
                            method: 'PATCH',
                            body: JSON.stringify(passwords),
                        }
                    ),
                'Ошибка изменения пароля'
            ),

        /** Генерация токена на основе логина и пароля */
        generateToken: (login: string, password: string): string => {
            return convert(login, password)
        }
    }
}
