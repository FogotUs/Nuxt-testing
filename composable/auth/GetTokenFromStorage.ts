/**
 * Возвращает токен авторизации из localStorage
 */
export const getTokenFromStorage = (): string | null => {
  return localStorage.getItem('accessToken')
}
