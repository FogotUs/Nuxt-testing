import * as dotenv from "dotenv";

dotenv.config();

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxt/ui",
  ],
  css: [
    '~/assets/css/main.css',
    '~/assets/css/global.css'
  ],
  runtimeConfig: {
    public: {
      api_host: process.env.API_URL,
      base_url: process.env.BASE_URL,
      authRules: {
        loginRoute: '/login',
        registerRoute: '/registration',
        postLoginRedirect: '/account',

        guestOnly: [
          '/login',
          '/registration'
        ],

        protected: [
          '/account',
          '/account/**',
          '/dashboard/**'
        ]
      }
    }
  },
  ssr: false,
  routeRules: {
    '/': { redirect: '/registration' },
  }
})
