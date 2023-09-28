import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
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

    ]
})

export default router