import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'notion',
      component: () => import('@/views/notion-page/notion-page.vue')
    },
    {
      path: '/rich-text',
      name: 'richText',
      component: () => import('@/views/rich-text-page/rich-text-page.vue')
    }
  ]
})

export default router
