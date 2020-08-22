import Vue from 'vue'
import Vuex from 'vuex'
import loginstatus from './modules/loginstatus'
import userdetails from './modules/userdetails'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        loginstatus,
        userdetails
    }
})