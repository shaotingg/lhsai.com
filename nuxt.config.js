import bodyParser from 'body-parser'
import session from 'express-session'
export default {
  /*
  ** Headers of the page
  */
  head: {
    title: 'lhsai.com',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'nuxt templete' }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ],
    script: [

    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  modules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/axios'
  ],
  plugins: [
    { src: '~/plugins/vue-cookies', ssr: false },
    { src: '~/plugins/vue-mavonEditor', ssr: false }
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
   extractCSS: true,
    extend (config, { isDev, isClient }) {
      if (isDev) {
        config.devtool = 'eval-source-map'
      }
    }
  },
  serverMiddleware: [
    // body-parser middleware
    bodyParser.json(),
    // session middleware
    session({
      secret: 'lhsai-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60*60000 }
    }),
    // Api middleware
    // We add /api/login & /api/logout routes
    '~/api'
  ]
}

