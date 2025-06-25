/**
 * Конвертирует логин и пароль в base64
 * @param login
 * @param password
 */

export const convert = (login: string, password: string): string => {
  return btoa(`${login}:${password}`)
}
