export default defineNuxtRouteMiddleware((to) => {
    if (!import.meta.client) return

    const cfg = useRuntimeConfig().public.authRules
    const token = localStorage.getItem('accessToken') || ''

    function matchPath(pattern: string, path: string) {
        if (pattern.endsWith('/**')) {
            return path.startsWith(pattern.slice(0, -3))
        }
        if (pattern.endsWith('*')) {
            return path.startsWith(pattern.slice(0, -1))
        }
        return path === pattern
    }

    for (const pat of cfg.guestOnly) {
        if (token && matchPath(pat, to.path)) {
            return navigateTo(cfg.postLoginRedirect)
        }
    }

    for (const pat of cfg.protected) {
        if (!token && matchPath(pat, to.path)) {
            return navigateTo(cfg.loginRoute)
        }
    }
})
