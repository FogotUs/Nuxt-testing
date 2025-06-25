/**
 * Удаляет токен авторизации из localStorage
 */
export const removeTokenFromStorage = (): void => {
  localStorage.removeItem('accessToken')
}
