/**
 * Базовая модель авторизационных данных.
 *
 * @interface BaseAuth
 * @property {string} login — Логин пользователя.
 * @property {string} password — Пароль пользователя.
 */
export interface BaseAuth {
  login: string
  password: string
}

/**
 * Базовый ответ API, содержащий идентификатор пользователя.
 *
 * @interface BaseResponse
 * @property {number} user_id — Уникальный идентификатор пользователя.
 */
export interface BaseResponse {
  user_id: number
}

/**
 * Параметры запроса на регистрацию нового пользователя.
 *
 * @interface RegisterRequest
 * @extends BaseAuth
 * @property {string} password_confirmation — Подтверждение пароля.
 * @property {string} [reffer] — Опциональный реферальный код.
 */
export interface RegisterRequest extends BaseAuth {
  password_confirmation: string
  reffer?: string
}

/**
 * Параметры запроса на вход пользователя.
 *
 * @interface LoginRequest
 * @extends BaseAuth
 */
export interface LoginRequest extends BaseAuth {}

/**
 * Ответ API при успешном входе пользователя.
 *
 * @interface LoginResponse
 * @extends BaseResponse
 */
export interface LoginResponse extends BaseResponse {}

/**
 * Ответ API при успешной регистрации пользователя.
 *
 * @interface RegisterResponse
 * @extends BaseResponse
 */
export interface RegisterResponse extends BaseResponse {}
