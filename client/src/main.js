import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import router from './router'
import Axios from 'axios'

Vue.prototype.$http = Axios
Vue.prototype.$serverURLI = "http://localhost:5000";

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
