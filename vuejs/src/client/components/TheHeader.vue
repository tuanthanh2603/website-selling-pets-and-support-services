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
    <a-menu-item key="dang-nhap" data-bs-toggle="modal" data-bs-target="#modal-login">
      <user-outlined />
      <span>Đăng nhập</span>
      
    </a-menu-item>
  </a-menu>

<!-- Model Login -->
  <div class="modal fade" id="modal-login" tabindex="-1" role="dialog" aria-labelledby="modal-login"
    aria-hidden="true" >
    <div class="modal-dialog modal- modal-dialog-centered modal-" role="document">
      <div class="modal-content">
        <div class="modal-body p-5">
          <div class="">
            <div class="card-header pb-0 text-center mb-4">
              <h3 class="font-weight-bolder text-info text-gradient">Đăng nhập</h3>
            </div>
          </div>
          <a-form :model="formLogin" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }" autocomplete="off"
            @finish="onFinish" @finishFailed="onFinishFailed">
            <a-form-item label="Số điện thoại" name="phoneLogin"
              :rules="[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]">
              <a-input v-model:value="formLogin.phoneLogin" />
            </a-form-item>
            <a-form-item label="Mật khẩu" name="passwordLogin"
              :rules="[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]">
              <a-input-password v-model:value="formLogin.passwordLogin" />
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
              <a-button type="primary" html-type="submit" class="btn">Đăng nhập</a-button>
            </a-form-item>
          </a-form>

          <div class="card-footer text-center pt-0 px-lg-2 px-1">
              Chưa có tài khoản?
              <a href="javascript:;" class="text-info text-gradient "  data-bs-toggle="modal" data-bs-target="#modal-register" >Đăng ký ngay</a>
          </div>
        </div>
      </div>
    </div>
  </div>
<!-- ----- -->
<!-- Modal Register -->
  <div class="modal fade" id="modal-register" tabindex="-1" role="dialog" aria-labelledby="modal-register"
     >
    <div class="modal-dialog modal- modal-dialog-centered modal-" role="document">
      <div class="modal-content">
        <div class="modal-body p-5">
          <div class="">
            <div class="card-header pb-0 text-center mb-4">
              <h3 class="font-weight-bolder text-info text-gradient">Đăng ký</h3>
            </div>
          </div>
          <a-form :model="formRegister" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }" autocomplete="off"
            @finish="onFinish" @finishFailed="onFinishFailed">
            <a-form-item label="Số điện thoại" name="phone"
              :rules="[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]">
              <a-input v-model:value="formRegister.phoneRegister" />
            </a-form-item>
            <a-form-item label="Mật khẩu" name="password"
              :rules="[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]">
              <a-input-password v-model:value="formRegister.passwordRegister" />
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
              <a-button type="primary" html-type="submit" class="btn">Đăng ký</a-button>
            </a-form-item>
          </a-form>

          <div class="card-footer text-center pt-0 px-lg-2 px-1">
              Đã có tài khoản?
              <a href="javascript:;" class="text-info text-gradient" data-bs-dismiss="modal" aria-label="Close">Đăng nhập ngay</a>
          </div>
        </div>
      </div>
    </div>
  </div>
<!-- ----- -->
</template>
<style scoped>
.centered-menu {
  display: flex;
  justify-content: center;
  align-items: center;


}
</style>
<script>
import { defineComponent, ref, reactive } from 'vue';
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

    const formLogin = reactive({
      phoneLogin: '',
      passwordLogin: '',
    });
    const formRegister = reactive({
      phoneRegister: '',
      passwordRegister: '',
    })
    const onFinish = values => {
      console.log('Success:', values);
    }
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };
  
    


    return {
      current,
      modalText,
      visible,
      confirmLoading,
      formLogin,
      onFinish,
      onFinishFailed,
      formRegister,
      
      
      




    };
  },
});
</script>
<style scoped>
.btn {
  width: 100%;
  margin-top: 15px;
  border-radius: 1.875rem;
  box-shadow: 0 4px 7px -1px rgba(0, 0, 0, .11), 0 2px 4px -1px rgba(0, 0, 0, .07);
  background-size: 150%;
  background-position-x: 25%;
  background-image: linear-gradient(310deg, #2152ff, #21d4fd);
  text-align: center;
  font-weight: 600;
  line-height: 1.4;
  padding: 0.6rem 2rem;
  height: 100%;
}
</style>