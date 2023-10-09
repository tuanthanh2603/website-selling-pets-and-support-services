import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'client',
            component: () => import('../views/trang-chu/trang-chu.vue')
        },
      
        {
            path: '/cho-canh',
            component: () => import('../views/cho-canh/cho-canh.vue')
        },
        {
            path: '/meo-canh',
            component: () => import('../views/meo-canh/meo-canh.vue')
        },
        {
            path: '/phu-kien-thu-cung',
            component: () => import('../views/phu-kien-thu-cung/phu-kien-thu-cung.vue')
        },
        {
            path: '/dich-vu-ho-tro',
            component: () => import('../views/dich-vu-ho-tro/dich-vu-ho-tro.vue')
        },
        {
            path: '/pho-bien-nhat',
            component: () => import('../views/pho-bien-nhat/pho-bien-nhat.vue')
        },
        
       

    ]
})

export default router