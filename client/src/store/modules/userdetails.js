import axios from 'axios'

let serverURLI = process.env.NODE_ENV == 'production' ? process.env.VUE_APP_PROD_URL : process.env.VUE_APP_DEV_URL

const state = {
    user: {}
}

const getters = {
    user: state => state.user
}

const actions = {
    async fetchUser({ commit }) {
        axios.get(`${serverURLI}/api/user_details/fetchuser`).then(response => {
            commit('userDetails', response.data)
        }).catch(error => {
            if(error.response.data == 'Invalid user') {
                // window.location.href = serverURLI + '/login'
                window.location.href = process.env.VUE_APP_CLIENT_URL
            }
        })
    },

    async updateUser({ commit }, { data, type }) {
        axios.post(`${serverURLI}/api/user_details/updateuser`, {
            data: data,
            type: type
        }).then(response => {
            commit('updatedUser', response.data)
        }).catch(error => {
            if(error.response.data == 'Invalid user') {
                // window.location.href = serverURLI + '/login'
                window.location.href = process.env.VUE_APP_CLIENT_URL
            }
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