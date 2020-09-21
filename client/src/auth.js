import axios from 'axios'
import { getCookie } from './getCookie'
import store from './store/index'

export function isAuthenticated(to, from, next) {
    let serverURLI = process.env.NODE_ENV == 'production' ? process.env.VUE_APP_PROD_URL : process.env.VUE_APP_DEV_URL
    const url = `${serverURLI}/user/authenticate`
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

