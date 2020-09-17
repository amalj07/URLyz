import axios from 'axios'
import { getCookie } from '../../getCookie'


const state = {
    isLoggedIn: false
}

const getters = {
    getLoginStatus: state => state.isLoggedIn
}

const actions = {
    async checkLoginStatus({ commit }) {

        const url = 'http://localhost:5000/api/user/authenticate'
        axios.post(url, {
            sid: getCookie('sid'),
            token: getCookie('t')
        }).then(response => {
            if (response.data.status == 'SUCCESS') {
                commit('loginStatus', true)
            } else {
                commit('loginStatus', false)
            }
        })
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