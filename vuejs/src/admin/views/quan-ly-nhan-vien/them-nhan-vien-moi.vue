<template>
    <div id="wrapper">
        <TheSider />
        <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
                <div class="container-fluid mt-3">
                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h6 class="h3 mb-0 text-gray-800" style="font-size: 24px;">Thêm nhân viên mới</h6>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <a-form :model="formState" v-bind="layout" name="nest-messages"
                                :validate-messages="validateMessages" @finish="onFinish">
                                <a-form-item :name="['user', 'name']" label="Tên nhân viên" :rules="[{ required: true }]">
                                    <a-input v-model:value="formState.user.name" />
                                </a-form-item>
                                <a-form-item :name="['user', 'email']" label="Email" :rules="[{ type: 'email', required: true }]">
                                    <a-input v-model:value="formState.user.email" />
                                </a-form-item>
                                <a-form-item :name="['user', 'phone']" label="Số điện thoại" :rules="[{ required: true }]">
                                    <a-input v-model:value="formState.user.phone" />
                                </a-form-item>
                                <a-form-item :name="['user', 'password']" label="Mật khẩu" :rules="[{ required: true }]">
                                    <a-input v-model:value="formState.user.password" />
                                </a-form-item>
                                <a-form-item :name="['user', 'sex']" label="Giới tính" :rules="[{ required: true }]">
                                    <a-radio-group v-model:value="formState.user.sex">
                                        <a-radio value="1">Nam</a-radio>
                                        <a-radio value="2">Nữ</a-radio>
                                        <a-radio value="3">Khác</a-radio>
                                    </a-radio-group>
                                </a-form-item>
                                <a-form-item :name="['user', 'address']" label="Địa chỉ">
                                    <a-textarea v-model:value="formState.user.address" />
                                </a-form-item>
                                <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 10 }">
                                    <a-button type="primary" html-type="submit">Thêm nhân viên</a-button>
                                </a-form-item>

                            </a-form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import TheSider from '../../components/TheSider.vue';
import { defineComponent, ref } from 'vue';
// import axios from 'axios';


export default defineComponent({
    components: {
        TheSider,
    },
    setup() {
        const layout = {
            labelCol: {
                span: 10,
            },
            wrapperCol: {
                span: 16,
            },
        };

        const validateMessages = {
            required: 'Vui lòng không để trống ${label}!',
            types: {
                email: 'Vui lòng nhập đúng định dạng ${label}!',

            },

        };

        const formState = ref({
            user: {
                name: '',      
                email: '',     
                phone: '',     
                password: '',  
                address: '',  
                sex: '',       
            },
        });

        const onFinish = (values) => {
            const newEmployeeData = formState.value.user;
            console.log('Dữ liệu để gửi đi:', newEmployeeData);
            axios.post('/api/add-user', newEmployeeData)
            .then((response) => {
                console.log('Thêm nhân viên thành công!');
                formState.value.user = {};
            })
            .catch((error)=> {
                console.log('Thêm nhân viên thất bại!')
            });
        };

        return {
            formState,
            onFinish,
            layout,
            validateMessages,
        };
    },
});
</script>
