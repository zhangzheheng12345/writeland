import './global.css'
import 'uno.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHashHistory } from 'vue-router'

import { anonKey } from '@/logics/auth'

const routes = [
  {
    path: '/',
    name: 'entry',
    redirect: () => {
      if (anonKey.value.length === 0) return { path: '/sign-in' }
      return { path: '/home' }
    }
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: () => import('@/views/SignIn.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/editor/:title',
    name: 'editor',
    component: () => import('@/views/Editor.vue')
  },
  {
    path: '/add-draft',
    name: 'add-draft',
    component: () => import('@/views/AddDraft.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from) => {
  if (anonKey.value.length === 0 && to.name !== 'sign-in')
    return { path: '/sign-in' }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
