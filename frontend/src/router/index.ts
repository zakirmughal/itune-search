import {createRouter, createWebHistory} from 'vue-router'
import ArtistView from '../views/ArtistView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ArtistView
    },
    {
      path: '/albums/:artistId',
      name: 'albums',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AlbumView.vue')
    }
  ]
})

export default router
