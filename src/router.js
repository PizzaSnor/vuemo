import { createWebHistory, createRouter } from 'vue-router'
// import Grasp from './components/Grasp.vue'

const routes = [
  { path: '/', redirect: '/Home' }, // Route for the Grasp component
  // Add more routes as needed
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


export default router