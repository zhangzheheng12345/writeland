import './global.css'
import 'uno.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHashHistory } from 'vue-router'

import App from '@/App.vue'
import Home from '@/views/Home.vue'
import Editor from '@/views/Editor.vue'
import SignIn from '@/views/SignIn.vue'
import AddDraft from '@/views/AddDraft.vue'

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
    component: SignIn
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/editor/:title',
    name: 'editor',
    component: Editor
  },
  {
    path: '/add-draft',
    name: 'add-draft',
    component: AddDraft
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from) => {
  if (anonKey.value.length === 0) return { path: '/sign-in' }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
