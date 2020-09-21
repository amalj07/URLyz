import axios from 'axios'
import { getCookie } from '../../getCookie'

let serverURLI = process.env.NODE_ENV == 'production' ? process.env.VUE_APP_PROD_URL : process.env.VUE_APP_DEV_URL

const state = {
    user: {}
}

const getters = {
    user: state => state.user
}

const actions = {
    async fetchUser({ commit }) {
        let sid = getCookie("sid")
        let token = getCookie("t")

        if (sid != '' && token != '') {
            axios.post(`${serverURLI}/user/user_details`, {
                sid,
                token
            }).then(response => {
                commit('userDetails', response.data)
            })
        }
    },

    async updateUser({ commit }, { data, type }) {
        axios.post(`${serverURLI}/user_details/updateuser`, {
            sid: getCookie("sid"),
            token: getCookie("t"),
            data: data,
            type: type
        }).then(response => {
            commit('updatedUser', response.data)
        })

    }
}

const mutations = {
    userDetails: (state, user) => (state.user = user),
    updatedUser: (state, user) => (state.user = user),
    userUpdateName: (state, value) => (state.user.name = value),
    userUpdateEmail: (state, value) => (state.user.email = value)
}

export default {
    state,
    getters,
    actions,
    mutations
}