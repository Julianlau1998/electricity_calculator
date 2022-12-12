import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Settings from '../views/Settings.vue'
import Help from '../views/Help.vue'
import Plus from '../views/Plus.vue'
import PlusSettings from '../views/PlusSettings.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/plus',
    name: 'Plus',
    component: Plus
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/plusSettings',
    name: 'PlusSettings',
    component: PlusSettings
  },
  {
    path: '/help',
    name: 'Help',
    component: Help
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
