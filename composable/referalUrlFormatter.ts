import { useRuntimeConfig } from "#imports";

/**
 * Форматирует URL из referrerCode-а и base_url из .env
 * @param referrerCode
 */
export const referralUrlFormatter = (referrerCode: string): string => {
    const config = useRuntimeConfig()

    return `${config.public.base_url}/registration?reffer=${referrerCode}`
}
