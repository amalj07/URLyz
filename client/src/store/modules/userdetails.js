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
                commit('userDetails', response.data)
            })
        }
    },
    
    async updateUser({ commit },{ name, type }) {
        axios.post('http://localhost:5000/api/user_details/updateuser',{
            sid: getCookie("sid"),
            token: getCookie("t"),
            data: name,
            type: type
        }).then(response => {
            commit('updatedUser', response.data)
        }).catch(error => {
            console.log(error)
        })

    }
}

const mutations = {
    userDetails: (state, user) => (state.user = user),
    updatedUser: (state, user) => (state.user = user),
    userUpdate: (state, value) => (state.user.name = value)
}

export default {
    state,
    getters,
    actions,
    mutations
}