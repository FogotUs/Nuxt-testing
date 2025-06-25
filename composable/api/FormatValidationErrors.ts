/**
 * Форматирует ошибку валидации в удобный вид
 * @param data
 * @return string
 */

export function formatValidationErrors(data: Record<string, string[]>): string {
    const lines: string[] = []
    for (const messages of Object.values(data)) {
        for (const msg of messages) {
            lines.push(msg)
        }
    }
    return lines.join('\n')
}
