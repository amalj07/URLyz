import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import router from './router'
import Axios from 'axios'
import VueClipboard from 'vue-clipboard2'
import VueCookies from 'vue-cookies'
import VueCryptojs from 'vue-cryptojs'
import store from './store/index'

// Copy to clipboard
Vue.use(VueClipboard)

// Cookie handling
Vue.use(VueCookies)
Vue.$cookies.config('7d')

Vue.use(VueCryptojs)

Vue.prototype.$http = Axios
Vue.prototype.$serverURLI = process.env.NODE_ENV == 'production' ? process.env.VUE_APP_PROD_URL : process.env.VUE_APP_DEV_URL

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
