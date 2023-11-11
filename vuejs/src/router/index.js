import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'client',
            component: () => import('../client/views/trang-chu/trang-chu.vue')
        },
        
      
        {
            path: '/cho-canh',
            component: () => import('../client/views/cho-canh/cho-canh.vue')
        },
        {
            path: '/meo-canh',
            component: () => import('../client/views/meo-canh/meo-canh.vue')
        },
        {
            path: '/phu-kien-thu-cung',
            component: () => import('../client/views/phu-kien-thu-cung/phu-kien-thu-cung.vue')
        },
        {
            path: '/dich-vu-ho-tro',
            component: () => import('../client/views/dich-vu-ho-tro/dich-vu-ho-tro.vue')
        },
        {
            path: '/pho-bien-nhat',
            component: () => import('../client/views/pho-bien-nhat/pho-bien-nhat.vue')
        },
        // Admin
        {
            path: '/dashboard',
            component: () => import('../admin/views/dashboard/dashboard.vue'),
            // meta: {requiresDashboard: true },
        },
        {
            path: '/them-nhan-vien-moi',
            component: () => import('../admin/views/quan-ly-nhan-vien/them-nhan-vien-moi.vue'),
            // meta: {requiresDashboard: true },
        },
        {
            path: '/danh-sach-nhan-vien',
            component: () => import('../admin/views/quan-ly-nhan-vien/danh-sach-nhan-vien.vue')
        },
        {
            path: '/danh-muc-thu-cung',
            component: () => import('../admin/views/quan-ly-thu-cung/danh-muc-thu-cung.vue')
        },
        {
            path: '/danh-muc-cho-canh',
            component: () => import('../admin/views/quan-ly-thu-cung/cho-canh/danh-muc-cho-canh.vue')
        },
        {
            path: '/danh-muc-meo-canh',
            component: () => import('../admin/views/quan-ly-thu-cung/meo-canh/danh-muc-meo-canh.vue')
        },
        {
            path: '/them-thu-cung-moi',
            component: () => import('../admin/views/quan-ly-thu-cung/them-thu-cung-moi.vue')
        },
        {
            path: '/danh-sach-thu-cung',
            component: () => import('../admin/views/quan-ly-thu-cung/danh-sach-thu-cung.vue')
        },
        {
            path: '/danh-sach-khach-hang',
            component: () => import('../admin/views/quan-ly-khach-hang/danh-sach-khach-hang.vue')
        },
        
    ]
});
router.beforeEach((to, from, next) => {
    const localStorageClassify = localStorage.getItem('user_classify');
    if(to.matched.some((record) => record.meta.requiresDashboard)) {
        if(localStorageClassify !== 'Admin' || localStorageClassify !== 'Nhân viên') {
            alert('Bạn không có quyền truy cập vào trang này.');
            next('/');
        } else {
            next();
        }
    } else if(to.matched.some((record) => record.meta.requiresAdmin)) {
        if(localStorageClassify !== 'Admin') {
            alert('Bạn không có quyền truy cập vào trang này.');
            next('/dashboard');
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router