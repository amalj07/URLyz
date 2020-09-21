import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register'
import Login from '../views/Login'
import Dashboard from '../views/Dashboard'
import Profile from '../views/Profile'
import ForgotPassword from '../views/ForgotPassword'
import NotFoundPage from '../views/NotFoundPage'
import { isAuthenticated } from '../auth'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },{
    path: '/register',
    name: 'Reister',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: isAuthenticated
  },
  {
    path: '/myprofile',
    name: 'Profile',
    component: Profile,
    beforeEnter: isAuthenticated
  },
  {
    path: '/recoverpasswrod',
    name: 'ForgotPassword',
    component: ForgotPassword,
  },
  {
    path: '*',
    component: NotFoundPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
