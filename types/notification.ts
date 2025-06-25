/**
 * Параметры отображения уведомления в приложении.
 *
 * @interface Notification
 * @property {boolean} show      — Флаг показа уведомления.
 * @property {Colors}  color     — Цвет/тип уведомления.
 * @property {string}  title      — Заголовок уведомления.
 * @property {string}  message    — Текст уведомления.
 */
export interface Notification {
    show: boolean
    color: Colors
    title: string
    message: string
}

/**
 * Допустимые цвета/типы уведомлений.
 *
 * @typedef {('error'|'primary'|'secondary'|'success'|'info'|'warning'|'neutral'|undefined)} Colors
 */
export type Colors =
    | 'error'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'neutral'
    | undefined
