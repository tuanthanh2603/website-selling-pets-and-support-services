<template>
    <ul class="navbar-nav  sidebar sidebar-dark accordion" style="min-height: 5vh;">

        <a-menu theme="" mode="inline">
            <a-menu-item key="1">
                <pie-chart-outlined />
                <span>Dashboard</span>
            </a-menu-item>

           

            <a-sub-menu key="sub1">
                <template #title>
                    <span>
                        <user-outlined />
                        
                        <span>Quản lý nhân viên</span>
                    </span>
                </template>
                <router-link to="them-nhan-vien-moi">
                    <a-menu-item key="3">Thêm nhân viên mới</a-menu-item>
                </router-link>
                
                <a-menu-item key="4">Danh sách nhân viên</a-menu-item>
                
            </a-sub-menu>
            
            <a-menu-item key="9">
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