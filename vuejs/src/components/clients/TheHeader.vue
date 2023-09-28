<template>

    
      <a-menu v-model:selectedKeys="current" mode="horizontal" class="centered-menu">
        <a-menu-item key="mail">
          Trang chủ
        </a-menu-item>
  
        <a-sub-menu key="sub1">
          <template #title>Thú cưng</template>
          <a-menu-item-group title="Item 1">
            <a-menu-item key="setting:1">Option 1</a-menu-item>
            <a-menu-item key="setting:2">Option 2</a-menu-item>
          </a-menu-item-group>
          <a-menu-item-group title="Item 2">
            <a-menu-item key="setting:3">Option 3</a-menu-item>
            <a-menu-item key="setting:4">Option 4</a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #title>Dịch vụ</template>
          <a-menu-item-group title="Item 1">
            <a-menu-item key="setting:1">Option 1</a-menu-item>
            <a-menu-item key="setting:2">Option 2</a-menu-item>
          </a-menu-item-group>
          <a-menu-item-group title="Item 2">
            <a-menu-item key="setting:3">Option 3</a-menu-item>
            <a-menu-item key="setting:4">Option 4</a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
        <a-sub-menu key="sub3">
          <template #title>Phụ kiện</template>
          <a-menu-item-group title="Item 1">
            <a-menu-item key="setting:1">Option 1</a-menu-item>
            <a-menu-item key="setting:2">Option 2</a-menu-item>
          </a-menu-item-group>
          <a-menu-item-group title="Item 2">
            <a-menu-item key="setting:3">Option 3</a-menu-item>
            <a-menu-item key="setting:4">Option 4</a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
        <a-menu-item key="alipay">
          Giới thiệu
        </a-menu-item>

        <a-menu-item >
            <search-outlined />
        </a-menu-item>
        <a-menu-item >
            <shopping-outlined />
        </a-menu-item>
        <a-menu-item >
            <user-outlined />
        </a-menu-item>
        
        
        
        
        
      </a-menu>
   


      
           
   
  </template>
  <style scoped>

  .centered-menu {
    display: flex;
    justify-content: center;
    align-items: center;
    
    
  }
  
  
  </style>
<script>
import { defineComponent, ref } from 'vue';
import { SearchOutlined, UserOutlined, ShoppingOutlined } from '@ant-design/icons-vue';
export default defineComponent({
    components: {
        SearchOutlined,
        UserOutlined,
        ShoppingOutlined
    },
    setup() {
        const current = ref(['mail']);
        return {
            current,
        };
    },
});
</script>