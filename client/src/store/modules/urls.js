import axios from 'axios'
import { getCookie } from './../../getCookie'


const state = {
    urlsArray: []
}

const getters = {
    urls: state => state.urlsArray
}

const actions = {
    fetchUrls({ commit }) {
        const url = 'http://localhost:5000/api/urls/fetchurl'
        axios.post(url, {
            sid: getCookie("sid"),
            token: getCookie("t")
          }).then(response => {
            commit('setUrls', response.data)
          }).catch(error => {
            console.log(error)
          })
    }
}

const mutations = {
    setUrls: (state, urlsArray) => (state.urlsArray = urlsArray)
}

export default {
    state,
    getters,
    actions,
    mutations
}