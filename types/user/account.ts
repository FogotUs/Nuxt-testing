import type { BaseResponse } from '@/types'

/**
 * Ответ API при запросе информации об аккаунте.
 *
 * @interface AccountResponse
 * @property {ReferralNode} data — корневой узел реферального дерева.
 */
export interface AccountResponse {
  data: ReferralNode
}

/**
 * Узел реферального дерева пользователя.
 *
 * @interface ReferralNode
 * @property {string} id — уникальный идентификатор узла.
 * @property {string} login — логин пользователя.
 * @property {string} referral_code — реферальный код пользователя.
 * @property {ReferralNode[]} children — массив потомков (дочерних узлов).
 */
export interface ReferralNode {
  id: string
  login: string
  referral_code: string
  children: ReferralNode[]
}

/**
 * Параметры запроса на смену пароля.
 *
 * @interface ChangePassRequest
 * @property {string} current_password — текущий пароль.
 * @property {string} password — новый пароль.
 * @property {string} password_confirmation — подтверждение нового пароля.
 */
export interface ChangePassRequest {
  current_password: string
  password: string
  password_confirmation: string
}

/**
 * Ответ API при смене пароля.
 *
 * @interface ChangePassResponse
 * @extends BaseResponse
 */
export interface ChangePassResponse extends BaseResponse {}
