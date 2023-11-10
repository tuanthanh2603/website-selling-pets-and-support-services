<template>
    <ul class="navbar-nav  sidebar sidebar-dark accordion" style="min-height: 5vh;">

        <a-menu theme="" mode="inline">
            <a-menu-item key="1">
                <router-link to="/dashboard">
                    <pie-chart-outlined />
                    <span>Dashboard</span>
                </router-link>
            </a-menu-item>
            <a-sub-menu key="sub1">
                <template #title>
                    <span>
                        <user-outlined />
                        <span>Quản lý nhân viên</span>
                    </span>
                </template>
                    <a-menu-item key="3">
                        <router-link to="them-nhan-vien-moi">
                            <span>Thêm nhân viên mới</span>
                        </router-link>
                    </a-menu-item>
                    <a-menu-item key="4">
                        <router-link to="danh-sach-nhan-vien">
                            <span>Danh sách nhân viên</span>
                        </router-link>
                    </a-menu-item>    
            </a-sub-menu>
            <a-sub-menu key="sub2">
                <template #title>
                    <span>
                        <github-outlined />  
                        <span>Quản lý thú cưng</span>
                    </span>
                </template>
                <a-menu-item key="7">
                        <router-link to="danh-muc-thu-cung">
                            <span>Danh mục thú cưng</span>
                        </router-link>
                </a-menu-item>
                
                <a-menu-item key="9">
                        <router-link to="them-thu-cung-moi">
                            <span>Thêm thú cưng mới</span>
                        </router-link>
                </a-menu-item>
                <a-menu-item key="10">
                        <router-link to="danh-sach-thu-cung">
                            <span>Danh sách thú cưng</span>
                        </router-link>
                </a-menu-item>  
            </a-sub-menu>
            <a-sub-menu key="sub3">
                <template #title>
                    <span>
                        <team-outlined />  
                        <span>Quản lý khách hàng</span>
                    </span>
                </template>
                <a-menu-item key="11">
                        <router-link to="danh-sach-khach-hang">
                            <span>Danh sách khách hàng</span>
                        </router-link>
                </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub4">
                <template #title>
                    <span>
                        <profile-outlined />
                        <span>Quản lý đơn hàng</span>
                    </span>
                </template>
                <a-menu-item key="12">
                    <router-link to="">
                        <span>Tạo đơn hàng mới</span>
                    </router-link>
                </a-menu-item>
                <a-menu-item key="13">
                    <router-link to="">
                        <span>Danh sách đơn hàng</span>
                    </router-link>
                </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub5">
                <template #title>
                    <span>
                        <code-sandbox-outlined />
                        <span>Quản lý dịch vụ</span>
                    </span>
                </template>
                <a-menu-item key="14">
                    <router-link to="">
                        <span>Tạo dịch vụ mới</span>
                    </router-link>
                </a-menu-item>
                <a-menu-item key="15">
                    <router-link to="">
                        <span>Danh sách dịch vụ</span>
                    </router-link>
                </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub6">
                <template #title>
                    <span>
                        <book-outlined />
                        <span>Quản lý chính sách</span>
                    </span>
                </template>
                <a-menu-item key="14">
                    <router-link to="">
                        <span>Tạo chính sách mới</span>
                    </router-link>
                </a-menu-item>
                <a-menu-item key="15">
                    <router-link to="">
                        <span>Danh sách chính sách</span>
                    </router-link>
                </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub7">
                <template #title>
                    <span>
                        <notification-outlined />
                        <span>Quản lý tin tức</span>
                    </span>
                </template>
                <a-menu-item key="14">
                    <router-link to="">
                        <span>Tạo tin tức mới</span>
                    </router-link>
                </a-menu-item>
                <a-menu-item key="15">
                    <router-link to="">
                        <span>Danh sách tin tức</span>
                    </router-link>
                </a-menu-item>
            </a-sub-menu>
            
            <!-- <a-menu-item key="11">
                <file-outlined />
                <span>File</span>
            </a-menu-item> -->
        </a-menu>

    </ul>
</template>
<script>
import { PieChartOutlined, DesktopOutlined, UserOutlined, TeamOutlined, FileOutlined, GithubOutlined, ProfileOutlined, CodeSandboxOutlined, BookOutlined, NotificationOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  components: {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
    GithubOutlined,
    ProfileOutlined,
    CodeSandboxOutlined,
    BookOutlined,
    NotificationOutlined
  },
  data() {
    return {
      collapsed: ref(false),
      selectedKeys: ref(['1']),
    };
  },
});
</script>