import { createWebHistory, createRouter } from 'vue-router'
import CreateOrJoin from './domains/Gaminga/CreateOrJoin.vue'
import Home from './domains/Home/Home.vue'
import Login from './domains/Profile/Login.vue'
import Signup from './domains/Profile/Signup.vue'
import Profile from './domains/Profile/Profile.vue'

//MINIMOIS Routes
const routes = [
  { path: '/', redirect: '/Home' },
  { path: '/Home', component: Home },
  { path: '/CreateOrJoin', component: CreateOrJoin, meta: { requiresAuth: true } },
  { path: '/Profile', component: Profile, meta: { requiresAuth: true } },
  { path: '/Login', component: Login },
  { path: '/Signup', component: Signup },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


export default router