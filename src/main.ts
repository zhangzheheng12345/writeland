import './global.css'
import 'uno.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

import App from '@/App.vue'
import Home from '@/views/Home.vue'
import Editor from '@/views/Editor.vue'

import { anonKey } from '@/logics/auth'

const routes = [
  {
    path: '/',
    name: 'entry',
    redirect: () => {
      if (anonKey.value.length === 0) {
        return { path: '/sign-in' }
      }
      return { path: '/home' }
    }
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/draft/:id',
    name: 'editor',
    component: Editor
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
