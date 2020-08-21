import Vue from 'vue'
import Vuex from 'vuex'
import loginstatus from './modules/loginstatus'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        loginstatus
    }
})