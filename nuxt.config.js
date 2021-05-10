const head = {
  title: '💪 RatioGang 📈 - The ETH / BTC Ratio Tracker',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { hid: 'description', name: 'description', content: 'Ratio Gang assemble! Monitor the progress of Ethereum (ETH) in overtaking Bitcoin (BTC) by market cap.' },
    { hid: 'twitter:image', name: 'twitter:image', content: 'https://ratiogang.com/og.png' }
  ]
}

export default {
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head,

  env: {
    head
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/scss/main.scss'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/vue-select',
    { src: '~/plugins/observe', mode: 'client' },
    { src: '~/plugins/touch', mode: 'client' },
    { src: '~/plugins/vue-confetti', mode: 'client' }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'cookie-universal-nuxt',
    '@nuxtjs/google-gtag',
    'cookie-universal-nuxt'
  ],

  colorMode: {
    classSuffix: ''
  },

  // PWA config
  pwa: {
    meta: {
      ogSiteName: '💪 RatioGang 📈 - The ETH / BTC Ratio Tracker',
      ogTitle: '💪 RatioGang 📈 - The ETH / BTC Ratio Tracker',
      ogDescription: 'Ratio Gang assemble! Monitor the progress of Ethereum (ETH) in overtaking Bitcoin (BTC) by market cap.',
      ogHost: 'https://ratiogang.com',
      ogImage: '/og.png',
      twitterCard: 'summary_large_image'
    }
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  'google-gtag': {
    id: 'G-VN8P1W31CL'
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
