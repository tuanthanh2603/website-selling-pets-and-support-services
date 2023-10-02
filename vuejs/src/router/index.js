import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../views/clients/HomePage.vue'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: HomePage
        },
        {
            path: '/about',
            component: () => import('../views/About.vue')
        },
        {
            path: '/cho-canh',
            component: () => import('../views/clients/cho-canh/cho-canh.vue')
        },
        {
            path: '/meo-canh',
            component: () => import('../views/clients/meo-canh/meo-canh.vue')
        },
        {
            path: '/phu-kien-thu-cung',
            component: () => import('../views/clients/phu-kien-thu-cung/phu-kien-thu-cung.vue')
        },
        {
            path: '/dich-vu-ho-tro',
            component: () => import('../views/clients/dich-vu-ho-tro/dich-vu-ho-tro.vue')
        },

    ]
})

export default router