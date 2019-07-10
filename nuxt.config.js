
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'WD Block',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'My cooll web development blog' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: "https://fonts.googleapis.com/css?family=Open+Sans&display=swap" }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff', height: '4px', duration: 2000 },
  /*
  ** Global CSS
  */
  css: [
    '~assets/styles/main.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/core-components.js',
    '~plugins/date-filter.js'
  ],
  /*
  ** Nuxt.js modules
  */
<<<<<<< HEAD
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    baseURL: process.env.BASE_URL || 'https://nuxt-blog-dc733.firebaseio.com',
    credentials: false,
  },
=======
 modules: [
  '@nuxtjs/axios',
],
axios: {
  baseURL: process.env.BASE_URL || 'https://nuxt-blog.firebaseio.com',
  credentials: false
},
>>>>>>> 7cbf473fe6b0f93ff6d24771b355820fcf0849d0
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },
  env:{
    baseUrl: process.env.BASE_URL || 'https://nuxt-blog-dc733.firebaseio.com',
<<<<<<< HEAD
    fbAPIKey:'AIzaSyCTu27Haz8J9lvj0qsxaulvYE_nB9gcT0k'
=======
    fbAPIKey: 'AIzaSyCTu27Haz8J9lvj0qsxaulvYE_nB9gcT0k'
  },
  transition: {
    name: 'fade',
    mode: 'out-in',
>>>>>>> 7cbf473fe6b0f93ff6d24771b355820fcf0849d0
  },
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '*',
        component:resolve(__dirname, 'pages/index.vue')
      })
    }
  }
}
