import Vue from 'vue'
import Vuex from 'vuex'
import urls from './modules/urls'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        urls
    }
})