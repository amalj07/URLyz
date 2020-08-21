import axios from 'axios'
import { getCookie } from './../../getCookie'


const state = {
    urlsArray: [],
}

const getters = {
    urls: state => state.urlsArray
}

const actions = {
    // Fetch urls of a user
    fetchUrls({ commit }) {
        axios.post('http://localhost:5000/api/urls/fetchurl', {
            sid: getCookie("sid"),
            token: getCookie("t")
          }).then(response => {
            commit('setUrls', response.data)
          }).catch(error => {
            console.log(error)
          })
    },

    // Update the status of the link(ENABLE/DISABLE)
    updateLink({ commit }, url) {
        axios.post('http://localhost:5000/api/urls/disable', {
            url
        }).then(response => {
            commit('linkStatus', response.data)
        }).catch(error => {
            console.log(error)
        })
    },
}

const mutations = {
    setUrls: (state, urlsArray) => (state.urlsArray = urlsArray),
    linkStatus: (state, updatedUrl) => {
        const index = state.urlsArray.findIndex(urlsArray => urlsArray.urlCode === updatedUrl.urlCode)
        if(index !== 1) {
            state.urlsArray.splice(index, 1, updatedUrl)
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}