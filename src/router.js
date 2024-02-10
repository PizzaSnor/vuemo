import { createWebHistory, createRouter } from 'vue-router'
import CreateOrJoin from './domains/Gaminga/CreateOrJoin.vue'
import Home from './domains/Home/Home.vue'
import Login from './domains/Profile/Login.vue'
import Signup from './domains/Profile/Signup.vue'
import Profile from './domains/Profile/Profile.vue'
import CreateLobby from './domains/Gaminga/CreateLobby.vue'
import JoinLobby from './domains/Gaminga/JoinLobby.vue'
import Lobby from './domains/Gaminga/Lobby.vue'
import Gaminga from './domains/Gaminga/Gaminga.vue'
import Stories from './domains/Gaminga/Stories.vue'

//MINIMOIS Routes
const routes = [
  { path: '/', redirect: '/Home' },
  { path: '/Home', component: Home },
  { path: '/CreateOrJoin', component: CreateOrJoin, meta: { requiresAuth: true } },
  { path: '/CreateGaminga', component: CreateLobby, meta: { requiresAuth: true } },
  { path: '/JoinGaminga', component: JoinLobby, meta: { requiresAuth: true } },
  { path: '/Profile', component: Profile, meta: { requiresAuth: true } },
  { path: '/Login', component: Login },
  { path: '/Signup', component: Signup },
  { path: '/Lobby/:id', component: Lobby, meta: { requiresAuth: true } },
  { path: '/Gaminga/:id', component: Gaminga, meta: { requiresAuth: true } },
  { path: '/Stories/:id', component: Stories, meta: { requiresAuth: true} }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


export default router