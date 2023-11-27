<template>
    <a-menu style="width: 100%" mode="vertical">
        <a-menu-item key="1">
            <router-link to="/thong-tin-tai-khoan" tag="a" class="menu-item">
                <template #icon>

                </template>
            
                Thông tin tài khoản
            </router-link>
        </a-menu-item>
        <a-menu-item key="2">
            <router-link to="/yeu-thich" tag="a" class="menu-item">
                <template #icon>

                </template>
            
                Yêu thích
            </router-link>
        </a-menu-item>
        <a-menu-item key="3">
            <template #icon>

            </template>
            Giỏ hàng
        </a-menu-item>
        <a-menu-item key="4">
            <template #icon>

            </template>
            Nhật ký thú cưng
        </a-menu-item>
        <a-menu-item key="6">
            <template #icon>

            </template>
            Trò chuyện
        </a-menu-item>
        <a-menu-item key="7">
            <template #icon>

            </template>
            Lịch sử đơn hàng
        </a-menu-item>
        <a-menu-item key="8">
            <router-link to="/so-dia-chi-nhan-hang" tag="a" class="menu-item">
                <template #icon>

                </template>
                Sổ địa chỉ nhận hàng
            </router-link>
        </a-menu-item>
        <a-menu-item key="9">
            <router-link to="/dang-ky-dich-vu-ho-tro" tag="a" class="menu-item">
                <template #icon>

                </template>
                Dịch vụ hỗ trợ
            </router-link>
        </a-menu-item>

    </a-menu>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
    components: {

    },
    setup() {

    }
})
</script>