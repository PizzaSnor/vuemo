import { createWebHistory, createRouter } from 'vue-router'
import CreateOrJoin from './domains/Gaminga/CreateOrJoin.vue'
import Home from './domains/Home/Home.vue'

const routes = [
  { path: '/', redirect: '/Home' }, // Route for the Grasp component
  { path: '/Home', component: Home }, // Route for the Grasp component
  { path: '/CreateOrJoin', component: CreateOrJoin}
  // Add more routes as needed
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


export default router