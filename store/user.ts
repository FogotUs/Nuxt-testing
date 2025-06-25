import type {
    AccountResponse,
    ChangePassRequest,
    ChangePassResponse,
    LoginRequest,
    LoginResponse,
    RegisterRequest
} from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getTokenFromStorage, removeTokenFromStorage, saveTokenToStorage, useUserService } from '~/composable'


/**
 * Pinia-стор для управления состоянием пользователя:
 * хранит информацию о текущем пользователе, токен аутентификации,
 * ошибки и предоставляет методы для логина, регистрации и смены пароля.
 *
 * @store user
 */
export const useUserStore = defineStore('user',
    () => {
      /**
       * Данные аккаунта пользователя.
       */
      const user = ref<AccountResponse | null>(null)
      /**
       * Токен аутентификации.
       */
      const token = ref<string | null>(getTokenFromStorage())
      /**
       * Установка токена
       * @param newToken - Новый токен
       */
      const setToken = (newToken: string) => {
        token.value = newToken
        saveTokenToStorage(newToken)
      }

      /**
       * Очистка данных аутентификации
       */
      const clearAuth = () => {
        user.value = null
        token.value = null
        removeTokenFromStorage()
      }

      /**
       * Загружает информацию о пользователе (аккаунте) с сервера.
       *
       * @param {string} login — логин пользователя, для которого запрашивается информация
       * @returns {Promise<void>}
       */
      const fetchUser = async (login: string) => {
        try {
          user.value = await useUserService().getAccountInfo(login)
        } catch (err) {
          clearAuth()
        }
      }

      /**
       * Аутентификация пользователя.
       * Генерирует токен, логинится и загружает данные аккаунта.
       *
       * @param {LoginRequest} credentials — объект с полями { login, password }
       * @returns {Promise<AccountResponse>} — ответ API по логину
       * @throws {Error} — если логин не удался
       */
      const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
        try {

          setToken(useUserService().generateToken(credentials.login, credentials.password))
          const response = await useUserService().login(credentials)
          await fetchUser(credentials.login)
          return response

        } catch (err) {
          if (err instanceof Error) {
            removeTokenFromStorage()
          }
          clearAuth()
          throw err
        }
      }

      /**
       * Регистрация нового пользователя.
       * После успешной регистрации генерирует и сохраняет токен, затем загружает профиль.
       *
       * @param {RegisterRequest} credentials — объект с данными для регистрации
       * @returns {Promise<void>}
       */
      const register = async (credentials: RegisterRequest): Promise<void> => {
        try {
          await useUserService().register(credentials)
          setToken(useUserService().generateToken(credentials.login, credentials.password))
          await fetchUser(credentials.login)
        } catch (err) {
          if (err instanceof Error) {
            clearAuth()
              throw err
          }
          else {
            throw err
          }
        }
      }

      /**
       * Смена пароля пользователя.
       *
       * @param {ChangePassRequest} passwords — объект с полями
       *   { current_password, password, password_confirmation }
       * @returns {Promise<ChangePassResponse | null>} — ответ API или null при ошибке
       */
      const changePassword = async (passwords: ChangePassRequest): Promise<ChangePassResponse | null> => {
        try {
          if (user.value?.data.login) {
            return await useUserService().changePassword(user.value?.data.login, passwords)
          }
          else {
            throw new Error('Login отсутствует')
          }
        } catch (error: any) {
           throw error
        }
      }

      return {
        user,
        token,
        fetchUser,
        login,
        register,
        changePassword,
        setToken,
        clearAuth,
      }
      /** Автоматически сохранять состояние store (token, user и т.п.) в localStorage */
    },{ persist: true }
)
