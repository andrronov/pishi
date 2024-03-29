// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devServer: {
    port: 3004
  },
  css: ["./assets/main.scss"],
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    'nuxt-icons',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    'nuxt-headlessui',
  ],
  runtimeConfig: {
    
  },
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/recover',
      exclude: ['/done'],
    }
  }
})
