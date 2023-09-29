<template>
  <a-menu v-model:selectedKeys="current" mode="horizontal" class="centered-menu">
    <a-menu-item key="home">
      <span style="font-weight: 700;">Trang chủ</span>
    </a-menu-item>

    <a-sub-menu key="sub1">
      <template #title><span style="font-weight: 700;">Sản phẩm</span></template>
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
      <template #title><span style="font-weight: 700;">Dịch vụ</span></template>
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
      <template #title><span style="font-weight: 700;">Phụ kiện</span></template>
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
      <span style="font-weight: 700;">Giới thiệu</span>
    </a-menu-item>

    <a-menu-item key="tim-kiem">
      <search-outlined />
      Tìm kiếm
    </a-menu-item>
    <a-menu-item key="gio-hang">
      <shopping-outlined />
      Giỏ hàng
    </a-menu-item>
    <a-menu-item key="yeu-thich">
      <heart-outlined />
      Yêu thích
    </a-menu-item>
    <a-menu-item key="dang-nhap" @click="showModal">
      <user-outlined />
      Đăng nhập
    </a-menu-item>





  </a-menu>


  <a-modal v-model:visible="visible" title="Đăng nhập" :confirm-loading="confirmLoading" @ok="handleOk">
    <p>{{ modalText }}</p>
  </a-modal>

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
import { SearchOutlined, UserOutlined, ShoppingOutlined, HeartOutlined } from '@ant-design/icons-vue';
export default defineComponent({
  components: {
    SearchOutlined,
    UserOutlined,
    ShoppingOutlined,
    HeartOutlined
  },
  setup() {
    const current = ref(['mail']);
    const modalText = ref('Connect');
    const visible = ref(false);
    const confirmLoading = ref(false);
    const showModal = () => {
      visible.value = true;
    };
    const handleOk = () => {
      modalText.value = 'The modal will';
      confirmLoading.value = true;
      setTimeout(() => {
        visible.value = false;
        confirmLoading.value = false;
      }, 2000);
    };
    return {
      current,
      modalText,
      visible,
      confirmLoading,
      showModal,
      handleOk
    };
  },
});
</script>