import { getCookie } from '../../getCookie'


const state = {
    isLoggedIn: false
}

const getters = {
    getLoginStatus: state => state.isLoggedIn
}

const actions = {
    async checkLoginStatus({ commit }) {
        let sid = getCookie("sid")
        let token = getCookie("t")
        console.log(sid, token)

        if(sid != '' && token != '') {
            commit('loginStatus', true)
        }else {
            commit('loginStatus', false)
        }
    }
}

const mutations = {
    loginStatus: (state, isLoggedIn) => state.isLoggedIn = isLoggedIn
}

export default {
    state,
    getters,
    actions,
    mutations
}