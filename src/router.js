import { createWebHistory, createRouter } from 'vue-router'
import Gaminga from './domains/Gaminga/Gaminga.vue'
import Home from './domains/Home/Home.vue'

const routes = [
  { path: '/', redirect: '/Home' }, // Route for the Grasp component
  { path: '/Home', component: Home }, // Route for the Grasp component
  { path: '/Gaminga', component: Gaminga}
  // Add more routes as needed
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


export default router