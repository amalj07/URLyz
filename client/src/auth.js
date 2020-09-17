import axios from 'axios'
import { getCookie } from './getCookie'
import store from './store/index'

export function isAuthenticated(to, from, next) {
    const url = 'http://localhost:5000/api/user/authenticate'
    axios.post(url, {
        sid: getCookie('sid'),
        token: getCookie('t')
    }).then(response => {
        if (response.data.status == 'SUCCESS') {
            next()
        } else {
            // next({ name: 'Login' })
            store.commit("loginStatus", false)
            window.location.href = 'http://localhost:8080/login'
        }
    })
}

