// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  ui: {
    global: true
  },
  nitro: {
    routeRules: {
      '/api/**': { cors: true }
    }
  }
})
