import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/admin',
           
            component: () => import('../views/dashboard/dashboard.vue')
        },
      
        
        
       

    ]
})

export default router