/**
 * Сохраняет токен в localStorage
 * @param token
 */
export const saveTokenToStorage = function (token: string): void {
  localStorage.setItem('accessToken', token)
}
