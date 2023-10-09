<template>
  <a-menu v-model:selectedKeys="current" mode="horizontal" class="centered-menu">
    <a-menu-item key="home">
      <router-link to="/" tag="a" class="menu-item">
      <span style="font-weight: 700;">Trang chủ</span>
      </router-link>
    </a-menu-item>

    <a-sub-menu key="pet-category">
      <template #title><span style="font-weight: 700;">Thú cưng</span></template>
      
      <a-sub-menu key="cho-canh" title="Chó cảnh">
        <a-menu-item key="11">Afghan Hound</a-menu-item>
        <a-menu-item key="12">Akita Inu</a-menu-item>
        <a-menu-item key="13">Alabai</a-menu-item>
        <a-menu-item key="14">Alaska</a-menu-item>
        <a-menu-item key="15">American Bully</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="meo-canh" title="Mèo cảnh">
        <a-menu-item key="16">Anh Lông Ngắn</a-menu-item>
        <a-menu-item key="17">Ba Tư</a-menu-item>
        <a-menu-item key="18">Mỹ Lông Ngắn</a-menu-item>
        <a-menu-item key="19">Rừng Na Uy</a-menu-item>
      </a-sub-menu>
      
    </a-sub-menu>
    <a-sub-menu key="service-category">
      <template #title><span style="font-weight: 700;">Dịch vụ</span></template>
      <a-menu-item-group title="Spa & Grooming">
        <a-menu-item key="setting:1">Tắm spa</a-menu-item>
        <a-menu-item key="setting:2">Cắt tỉa lông</a-menu-item>
      </a-menu-item-group>
      <a-menu-item-group title="Y tế">
        <a-menu-item key="setting:3">Cấp cứu 24/7</a-menu-item>
        <a-menu-item key="setting:4">Khám sức khỏe định kỳ cho pet</a-menu-item>
      </a-menu-item-group>
    </a-sub-menu>


    <a-sub-menu key="accessory-category">
      <template #title><span style="font-weight: 700;">Phụ kiện</span></template>
      <a-menu-item-group title="Thức ăn">
        <a-menu-item key="setting:1">Thức ăn khô</a-menu-item>
        <a-menu-item key="setting:2">Thức ăn vặt</a-menu-item>
      </a-menu-item-group>
      <a-menu-item-group title="Phụ kiện">
        <a-menu-item key="setting:3">Dây xích, vòng cổ, rọ mõm...</a-menu-item>
        <a-menu-item key="setting:4">Đồ chơi</a-menu-item>
      </a-menu-item-group>
      <a-menu-item-group title="Khác">
        <a-menu-item key="setting:3">Quần áo</a-menu-item>
        <a-menu-item key="setting:4">Sữa tắm</a-menu-item>
      </a-menu-item-group>
    </a-sub-menu>


    <a-menu-item key="gioithieu">
      <span style="font-weight: 700;">Giới thiệu</span>
    </a-menu-item>


    <a-sub-menu key="support">
      <template #title><span style="font-weight: 700;">Hỗ trợ</span></template>
      <a-menu-item-group title="Hình thức vận chuyển">
        <a-menu-item key="setting:1">Hình thức vận chuyển</a-menu-item>
      </a-menu-item-group>
      <a-menu-item-group title="Chính sách mua hàng">
        <a-menu-item key="setting:3">Bảo hành - Đổi trả</a-menu-item>
        <a-menu-item key="setting:4">Chính Sách Bảo Mật</a-menu-item>
      </a-menu-item-group>
    </a-sub-menu>

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