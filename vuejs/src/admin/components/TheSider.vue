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
                        <user-outlined />
                        
                        <span>Quản lý thú cưng</span>
                    </span>
                </template>
                <a-menu-item key="7">
                        <router-link to="danh-muc-cho-canh">
                            <span>Danh mục chó cảnh</span>
                        </router-link>
                </a-menu-item>
                <a-menu-item key="8">
                        <router-link to="danh-muc-meo-canh">
                            <span>Danh mục mèo cảnh</span>
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
            
            <a-menu-item key="11">
                <file-outlined />
                <span>File</span>
            </a-menu-item>
        </a-menu>

    </ul>
</template>
<script>
import { PieChartOutlined, DesktopOutlined, UserOutlined, TeamOutlined, FileOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  components: {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
  },
  data() {
    return {
      collapsed: ref(false),
      selectedKeys: ref(['1']),
    };
  },
});
</script>