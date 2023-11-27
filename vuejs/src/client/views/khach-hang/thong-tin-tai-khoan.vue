<template>
    <div class="container">
        <div class="row">
            <div class="col-md-2 col-md-offset-2">
                <TheMenu />
            </div>
            <div class="col-md-10">
                <div class="container mt-3">
                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h6 class="h3 mb-0 text-gray-800" style="font-size: 22px;">Thông tin tài khoản</h6>
                    </div>
                    <div class="container">
                        <a-form :model="formInfoClient" v-bind="layout" name="nest-messages" @finish="updateInfoClient">
                            <a-form-item name="name" label="Họ và tên"
                                :rules="[{ required: true, message: 'Vui lòng không để trống họ và tên.' }]">
                                <a-input v-model:value="formInfoClient.name" />
                            </a-form-item>
                            <a-form-item name="sex" label="Giới tính">
                                <a-radio-group v-model:value="formInfoClient.sex">
                                    <a-radio value="Nam">Nam</a-radio>
                                    <a-radio value="Nữ">Nữ</a-radio>
                                    <a-radio value="Khác">Khác</a-radio>
                                </a-radio-group>
                            </a-form-item>
                            <a-form-item name="email" label="Email">
                                <a-input v-model:value="formInfoClient.email" />
                            </a-form-item>
                            <a-form-item name="phone" label="Số điện thoại"
                                :rules="[{ required: true, message: 'Vui lòng không để trống số điện thoại.' }]">
                                <a-input v-model:value="formInfoClient.phone" />
                            </a-form-item>

                            <a-form-item name="pass" label="Mật khẩu"
                                :rules="[{ required: true, message: 'Vui lòng không để trống mật khẩu.' }]">
                                <a-input-password v-model:value="formInfoClient.pass" />
                            </a-form-item>
                            <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 7 }">
                                <a-button type="primary" html-type="submit">Lưu thông tin</a-button>
                            </a-form-item>
                        </a-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import TheMenu from './TheMenu.vue';
import { defineComponent, ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import Noty from 'noty';
import 'noty/lib/themes/mint.css'
import 'noty/lib/noty.css'
export default defineComponent({
    components: {
        TheMenu

    },
    setup() {
        onMounted(() => {
            getInfoClient();
        })
        const formInfoClient = ref({
            name: '', sex: '', email: '', phone: '', pass: '',
        });
        const getInfoClient = () => {
            const userId = localStorage.getItem('user_id')
            console.log(userId)
            const serverUrl = `http://localhost:3000/client/utilities/getInfoClient/${userId}`;
            axios.get(serverUrl)
                .then(response => {
                    console.log(response.data.info)
                    formInfoClient.value = {
                        name: response.data.info.name,
                        sex: response.data.info.sex,
                        email: response.data.info.email,
                        phone: response.data.info.phone,
                        pass: response.data.info.pass,
                    }
                })
                .catch(error => {
                    alert(error)
                })
        }
        const layout = {
            labelCol: {
                span: 4,
            },
            wrapperCol: {
                span: 10,
            },
        }
        
        const updateInfoClient = values => {
            const userId = localStorage.getItem('user_id')
            console.log(values)
            const serverUrl = `http://localhost:3000/client/utilities/updateInfoClient/${userId}`;
            axios.put(serverUrl, values)
            .then(response => {
                console.log(response.data)
                new Noty({
                    text: 'Lưu thông tin thành công!',
                    type: 'success',
                    layout: 'topRight',
                    theme: 'mint',
                    timeout: 3000,
                    callbacks: {
                        afterShow: function () {
                            // Reload lại trang sau khi Noty hiện xong
                            setTimeout(() => {
                                window.location.reload();
                            }, 2000); // Sau 3 giây
                        }
                    }
                }).show();
            })
            .catch(error => {
                alert(error)
            })
        }
        return {
            layout,
            formInfoClient, updateInfoClient, getInfoClient,

        }
    }
})
</script>