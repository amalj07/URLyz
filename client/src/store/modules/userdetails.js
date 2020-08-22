import axios from 'axios'
import { getCookie } from '../../getCookie'


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

        if(sid != '' && token != '') {
            axios.post('http://localhost:5000/api/user/user_details', {
                sid,
                token
            }).then(response => {
                console.log(response.data)
                commit('userDetails', response.data)
            })
        }
    }
}

const mutations = {
    userDetails: (state, user) => (state.user = user)
}

export default {
    state,
    getters,
    actions,
    mutations
}