import { createWebHistory, createRouter } from 'vue-router'

import DemoPage from './pages/DemoPage.vue'
import MatchPage from './pages/MatchPage.vue'
import ModifyPage from './pages/ModifyPage.vue'

const routes = [
  { path: '/', component: DemoPage },
  { path: '/match', component: MatchPage },
  { path: '/modify', component: ModifyPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;