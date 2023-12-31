import { createRouter, createWebHistory } from "vue-router";
import petInfo from "../client/views/thong-tin-thu-cung.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "client",
      component: () => import("../client/views/trang-chu/trang-chu.vue"),
    },
    {
      path: "/gio-hang",
      component: () => import("../client/views/gio-hang/gio-hang.vue"),
    },
    {
      path: "/tim-kiem",
      component: () => import("../client/views/tim-kiem.vue"),
    },
    {
      path: "/thong-tin-thu-cung/:id",
      name:"pet-information",
      component: petInfo,
      props:true,

    },
    {
      path: "/cho-canh",
      component: () => import("../client/views/cho-canh/cho-canh.vue"),
    },
    {
      path: "/meo-canh",
      component: () => import("../client/views/meo-canh/meo-canh.vue"),
    },
    
    {
      path: "/phu-kien-thu-cung",
      component: () =>
        import("../client/views/phu-kien-thu-cung/phu-kien-thu-cung.vue"),
    },
    {
      path: "/trao-doi",
      component: () =>
        import("../client/views/trao-doi/nhan-tin-trao-doi.vue"),
    },
    {
      path: "/pho-bien-nhat",
      component: () =>
        import("../client/views/pho-bien-nhat/pho-bien-nhat.vue"),
    },
    // Admin
    {
      path: "/dashboard",
      component: () => import("../admin/views/dashboard/dashboard.vue"),
      // meta: {requiresDashboard: true },
    },

    {
      path: "/danh-sach-nhan-vien",
      component: () =>
        import("../admin/views/quan-ly-nhan-vien/danh-sach-nhan-vien.vue"),
    },

    {
      path: "/admin-thu-cung",
      component: () =>
        import("../admin/views/quan-ly-san-pham/thu-cung.vue"),
    },

    {
        path: "/admin-phu-kien",
        component: () =>
          import("../admin/views/quan-ly-san-pham/phu-kien.vue"),
    },
    {
      path: "/danh-sach-khach-hang",
      component: () =>
        import("../admin/views/quan-ly-khach-hang/danh-sach-khach-hang.vue"),
    },

    {
      path: "/don-hang-dich-vu",
      component: () =>
        import("../admin/views/quan-ly-dich-vu/don-hang-dich-vu.vue"),
    },

    {
      path: "/danh-sach-dich-vu",
      component: () =>
        import("../admin/views/quan-ly-dich-vu/danh-sach-dich-vu.vue"),
    },
    /// Khách hàng
    {
      path: "/thong-tin-tai-khoan",
      component: () =>
        import("../client/views/khach-hang/thong-tin-tai-khoan.vue"),
    },
    {
      path: "/so-dia-chi-nhan-hang",
      component: () =>
        import("../client/views/khach-hang/so-dia-chi-nhan-hang.vue"),
    },
    {
      path: "/dang-ky-dich-vu-ho-tro",
      component: () =>
        import("../client/views/khach-hang/dich-vu-ho-tro.vue"),
    },
    {
      path: "/yeu-thich",
      component: () =>
        import("../client/views/khach-hang/yeu-thich.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const localStorageClassify = localStorage.getItem("user_classify");
  if (to.matched.some((record) => record.meta.requiresDashboard)) {
    if (
      localStorageClassify !== "Admin" ||
      localStorageClassify !== "Nhân viên"
    ) {
      alert("Bạn không có quyền truy cập vào trang này.");
      next("/");
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresAdmin)) {
    if (localStorageClassify !== "Admin") {
      alert("Bạn không có quyền truy cập vào trang này.");
      next("/dashboard");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
