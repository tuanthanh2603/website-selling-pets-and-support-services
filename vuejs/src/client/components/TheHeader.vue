<template>
  <a-menu mode="horizontal" class="centered-menu" :selected-keys="selectedKeys">
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

    <a-menu-item key="dang-nhap" data-bs-toggle="modal" data-bs-target="#modal-login" v-if="!hasLocalStorageUser">
      <user-outlined />
      <span>Đăng nhập</span>

    </a-menu-item>

    <a-menu-item key="user" v-else>
      <user-outlined />
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent> {{ localStorageUserName }}</a>
        <template #overlay>
          <a-menu>
            <a-menu-item v-if="localStorageClassify === 'Khách hàng'">
              <a href="javascript:;">Thông tin tài khoản</a>
            </a-menu-item>
            <a-menu-item v-if="localStorageClassify === 'Khách hàng'">
              <a href="javascript:;">Yêu thích</a>
            </a-menu-item>
            <a-menu-item v-if="localStorageClassify === 'Khách hàng'">
              <a href="javascript:;">Giỏ hàng</a>
            </a-menu-item>

            <a-menu-item v-if="localStorageClassify === 'Admin'">
              <router-link to="/dashboard" tag="a" class="menu-item">
                <span>Dashboard</span>
              </router-link>
            </a-menu-item>

            <a-menu-item @click="logout">
              <a href="javascript:;">Đăng xuất</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </a-menu-item>

    

  </a-menu>

  <!-- Model Login -->
  <div class="modal fade" id="modal-login" tabindex="-1" role="dialog" aria-labelledby="modal-login" aria-hidden="true">
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
            <a-form-item label="Số điện thoại" name="phone"
              :rules="[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]">
              <a-input v-model:value="formLogin.phone" />
            </a-form-item>
            <a-form-item label="Mật khẩu" name="password"
              :rules="[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]">
              <a-input-password v-model:value="formLogin.password" />
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
              <a-button type="primary" html-type="submit" class="btn">Đăng nhập</a-button>
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
              <a-alert v-if="alertMessageLogin" :message="alertMessageLogin.message" :type="alertMessageLogin.type"
                show-icon />
            </a-form-item>
          </a-form>

          <div class="card-footer text-center pt-0 px-lg-2 px-1">
            Chưa có tài khoản?
            <a href="javascript:;" class="text-info text-gradient " data-bs-toggle="modal"
              data-bs-target="#modal-register">Đăng ký ngay</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- ----- -->
  <!-- Modal Register -->
  <div class="modal fade" id="modal-register" tabindex="-1" role="dialog" aria-labelledby="modal-register">
    <div class="modal-dialog modal- modal-dialog-centered modal-" role="document">
      <div class="modal-content">
        <div class="modal-body p-5">
          <div class="">
            <div class="card-header pb-0 text-center mb-4">
              <h3 class="font-weight-bolder text-info text-gradient">Đăng ký</h3>
            </div>
          </div>
          <a-form ref="formRef" name="custom-validation" :model="formRegister" :rules="rules" :label-col="{ span: 6 }"
            :wrapper-col="{ span: 16 }" @finish="handleFinish" @validate="handleValidate"
            @finishFailed="handleFinishFailed">
            <a-form-item has-feedback label="Số điện thoại" name="phone">
              <a-input v-model:value="formRegister.phone" autocomplete="off" />
            </a-form-item>
            <a-form-item has-feedback label="Mật khẩu" name="pass">
              <a-input-password v-model:value="formRegister.pass" autocomplete="off" />
            </a-form-item>
            <a-form-item has-feedback label="Xác nhận" name="checkPass">
              <a-input-password v-model:value="formRegister.checkPass" autocomplete="off" />
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
              <a-button type="primary" html-type="submit" class="btn">Đăng ký</a-button>

            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
              <a-alert v-if="alertMessageRegister" :message="alertMessageRegister.message"
                :type="alertMessageRegister.type" show-icon />
            </a-form-item>

          </a-form>

          <div class="card-footer text-center pt-0 px-lg-2 px-1">
            Đã có tài khoản?
            <a href="javascript:;" class="text-info text-gradient" data-bs-dismiss="modal" aria-label="Close">Đăng nhập
              ngay</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- ----- -->


  <a-back-top />
  
</template>
<style scoped>
.centered-menu {
  display: flex;
  justify-content: center;
  align-items: center;


}
</style>
<script>
import { defineComponent, ref, reactive, computed } from 'vue';
import { SearchOutlined, UserOutlined, ShoppingOutlined, HeartOutlined } from '@ant-design/icons-vue';

import axios from 'axios';
export default defineComponent({
  components: {
    SearchOutlined,
    UserOutlined,
    ShoppingOutlined,
    HeartOutlined
  },
  setup() {
    const logout = () => {
      localStorage.removeItem('user_id');
      localStorage.removeItem('user_name');
      localStorage.removeItem('user_classify');
      window.location.reload();

    }
    const hasLocalStorageUser = computed(() => {
      return !!localStorage.getItem('user_id');
    });
    const selectedKeys = computed(() => {
      return hasLocalStorageUser.value ? ['user'] : ['dang-nhap'];
    });
    const localStorageUserName = localStorage.getItem('user_name');
    const localStorageClassify = localStorage.getItem('user_classify');



    const alertMessageLogin = ref({ message: 'Nhập thông tin đăng nhập', type: 'info' });
    const alertMessageRegister = ref({ message: 'Nhập thông tin đăng ký', type: 'info' });

    const formLogin = reactive({
      phone: '',
      password: '',
    });

    const onFinish = values => {
      const serverUrl = 'http://localhost:3000/auth/loginUserAccount';
      axios.post(serverUrl, values)
        .then((response) => {
          console.log('Phản hồi từ server:', response.data)
          if (response.status === 200) {
            localStorage.setItem('user_id', response.data.id);
            localStorage.setItem('user_name', response.data.name);
            localStorage.setItem('user_classify', response.data.classify);

            console.log('ID: ' + localStorage.getItem('user_id'));
            console.log('Name: ' + localStorage.getItem('user_name'));
            console.log('Classify: ' + localStorage.getItem('user_classify'));

            alertMessageLogin.value = { message: "Đăng nhập thành công", type: "success" };
          }


          setTimeout(() => {
            window.location.reload();
          }, 3000);
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            alertMessageLogin.value = { message: "Số điện thoại không chính xác", type: "warning" };
          } else if (error.response && error.response.status === 402) {
            alertMessageLogin.value = { message: "Mật khẩu không chính xác", type: "warning" };
          } else {
            alertMessageLogin.value = { message: "Đăng nhập thất bại", type: "error" };
          }
        })
    }
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };
    const formRef = ref();
    const formRegister = reactive({
      phone: '',
      pass: '',
      checkPass: '',

    });
    let validatePhone = async (_rule, value) => {
      if (value === '') {
        return Promise.reject('Vui lòng nhập số điện thoại!');
      } else if (!/^[0-9]{10}$/.test(value)) {
        return Promise.reject('Số điện thoại không chính xác!');
      } else if (value.length != 10) {
        return Promise.reject('Số điện thoại không chính xác!');
      } else {
        return Promise.resolve();
      }
    }
    let validatePass = async (_rule, value) => {
      if (value === '') {
        return Promise.reject('Vui lòng nhập mật khẩu!');
      } else if (value.length < 8) {
        return Promise.reject('Mật khẩu phải có ít nhất 8 ký tự!');
      } else if (/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value)) {
        return Promise.reject('Mật khẩu không được chứa ký tự đặc biệt!');
      } else {
        if (formRegister.checkPass !== '') {
          formRef.value.validateFields('checkPass');
        }
        return Promise.resolve();
      }
    };
    let validatePass2 = async (_rule, value) => {
      if (value === '') {
        return Promise.reject('Vui lòng xác nhận mật khẩu!');
      } else if (value !== formRegister.pass) {
        return Promise.reject("Xác nhận mật khẩu không chính xác!");
      } else {
        return Promise.resolve();
      }
    };
    const rules = {
      phone: [{
        required: true,
        validator: validatePhone,
        trigger: 'change',
      }],
      pass: [{
        required: true,
        validator: validatePass,
        trigger: 'change',
      }],
      checkPass: [{
        validator: validatePass2,
        trigger: 'change',
      }],

    };
    const handleFinish = values => {
      console.log(values, formRegister);

      console.log("Dữ liệu gửi đi: " + values)
      const serverUrl = 'http://localhost:3000/auth/addUserAccount';
      axios.post(serverUrl, values)
        .then((response) => {
          console.log('Phản hồi từ server:', response.data)
          alertMessageRegister.value = { message: "Đăng ký thành công", type: "success" };

        })
        .catch((error) => {
          if (error.response && error.response.status === 400 && error.response.data.message === "Số điện thoại đã tồn tại.") {
            alertMessageRegister.value = { message: "Số điện thoại đã tồn tài", type: "warning" };
          } else {
            alertMessageRegister.value = { message: "Đăng ký thất bại", type: "error" };
          }
        })
    };
    const handleFinishFailed = errors => {
      console.log(errors);
    };

    const handleValidate = (...args) => {

    };


    return {
      formLogin,
      onFinish,
      onFinishFailed,

      formRegister,
      formRef,
      rules,
      handleFinishFailed,
      handleFinish,
      handleValidate,
      alertMessageRegister,
      alertMessageLogin,
      selectedKeys,
      hasLocalStorageUser,
      localStorageUserName,
      logout,
      localStorageClassify


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