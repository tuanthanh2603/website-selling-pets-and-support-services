<template>
    <div class="row">
        <div class="col-md-2">
            <TheSider />
        </div>
        <div class="col-md-10">
            <div class="container-fluid mt-3">
                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                    <h6 class="h3 mb-0 text-gray-800" style="font-size: 24px;">Danh sách nhân viên</h6>
                </div>


                <div class="container">
                    <div class="row mb-2">
                        <div class="col-md-2">
                            <a-button type="primary" @click="showModalAddUser">Thêm nhân viên mới</a-button>
                        </div>
                    </div>

                    <a-table :columns="columnsUser" :data-source="dataUser">
                        <template #headerCell="{ column }">
                            <template v-if="column.key === 'name'">
                                <span>
                                    Họ và tên
                                </span>
                            </template>
                        </template>
                        <template #bodyCell="{ column, record }">
                            <template v-if="column.key === 'name'">
                                {{ record.name }}
                            </template>
                            <template v-else-if="column.key === 'phone'">
                                {{ record.phone }}
                            </template>
                            <template v-else-if="column.key === 'classify'">
                                {{ record.classify }}
                            </template>
                            <template v-else-if="column.key === 'email'">
                                {{ record.email }}
                            </template>
                            <template v-else-if="column.key === 'sex'">
                                {{ record.sex }}
                            </template>
                            <template v-else-if="column.key === 'status'">
                                {{ record.status }}
                            </template>
                            <template v-else-if="column.key === 'stt'">

                            </template>
                            <template v-else-if="column.key === 'setting'">

                            </template>
                        </template>
                    </a-table>
                </div>
            </div>
        </div>
    </div>
    <a-modal v-model:visible="modalAddUser" title="Thêm nhân viên mới" :closable="false" style="top: 20px;">
        
        <a-form :model="formAddUser" v-bind="layoutFormAddUser" name="nest-messages" @finish="addUser">
            <a-form-item name="name" label="Tên nhân viên" :rules="[{ required: true, message: 'Vui lòng nhập tên nhân viên!' }]">
                <a-input v-model:value="formAddUser.name" />
            </a-form-item>
            
            <a-form-item name="phone" label="Số điện thoại" :rules="[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]">
                <a-input v-model:value="formAddUser.phone" />
            </a-form-item>
            <a-form-item name="pass" label="Mật khẩu" :rules="[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]">
                <a-input v-model:value="formAddUser.pass" />
            </a-form-item>
            <a-form-item name="email" label="Email" >
                <a-input v-model:value="formAddUser.email" />
            </a-form-item>
            <a-form-item name="classify" label="Vai trò">
                <a-radio-group v-model:value="formAddUser.classify">
                    <a-radio value="Admin">Admin</a-radio>
                    <a-radio value="Nhân viên">Nhân viên</a-radio>
                    <a-radio value="Bác sĩ">Bác sĩ</a-radio>
                </a-radio-group>
            </a-form-item>

            <a-form-item name="sex" label="Giới tính">
                <a-radio-group v-model:value="formAddUser.sex">
                    <a-radio value="Nam">Nam</a-radio>
                    <a-radio value="Nữ">Nữ</a-radio>
                    <a-radio value="Khác">Khác</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item name="address" label="Địa chỉ">
                <a-textarea v-model:value="formAddUser.address" />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 14, offset: 8 }">
                <div class="row">
                    <div class="col-md-4">
                        <a-button type="back" @click="exitModalAddUser">Thoát</a-button>
                    </div>
                    <div class="col-md-6">
                        <a-button type="primary" html-type="submit">Thêm nhân viên</a-button>
                    </div>
                </div>
                
                

            </a-form-item>

        </a-form>
        <template #footer>
            
        </template>
    </a-modal>
</template>
<script>
import TheSider from '../../components/TheSider.vue';
import { defineComponent, ref } from 'vue';
import axios from 'axios';

const columnsUser = [
    {
        title: 'STT',
        key: 'stt',
        customRender: (text, record, index) => {
            const stt = text.renderIndex;
            // console.log(stt + 1);
            const STT = stt + 1;
            return STT
        },
    }, {
        title: 'Họ và tên',
        key: 'name',
        dataIndex: 'name',
    }, {
        title: 'Số điện thoại',
        key: 'phone',
        dataIndex: 'phone',
    }, {
        title: 'Email',
        key: 'email',
        dataIndex: 'email',
    }, {
        title: 'Giới tính',
        key: 'sex',
        dataIndex: 'sex',
    }, {
        title: 'Vai trò',
        key: 'classify',
        dataIndex: 'classify',
    }, {
        title: 'Trạng thái',
        key: 'status',
        dataIndex: 'status',
    }, {
        title: 'Tuỳ chọn',
        key: 'setting',
    }
]
export default defineComponent({
    components: {
        TheSider,
    },
    setup() {
        const modalAddUser = ref(false)
        const loading = ref(false)
        const showModalAddUser = () => {
            modalAddUser.value = true
        }
        const formAddUser = ref({
            name: '',
            phone: '',
            email: '',
            sex: '',
            classify: ''
        });
        const addUser = (values) => {
            const serverUrl = 'http://localhost:3000/admin/quan-ly-nhan-vien/addUser';
            axios.post(serverUrl, values)
            .then((response) => {
                console.log('Phản hồi từ server:', response.data);
            })
            .catch((error) => {
                console.log('Không kết nối được đến máy chủ', error);
            })
            console.log('Thông tin người dùng:', values);
            // setTimeout(() => {
            //     loading.value = false;
            //     modalAddUser.value = false;
            // }, 2000)
        }
        const exitModalAddUser = () => {
            modalAddUser.value = false
        }
        const dataUser = ref([])
        
        const layoutFormAddUser = {
            labelCol: {
                span: 7,
            },
            wrapperCol: {
                span: 16,
            },
        }
        return {
            columnsUser,
            dataUser,
            modalAddUser,
            loading,
            showModalAddUser,
            addUser,
            exitModalAddUser,
            formAddUser,
            layoutFormAddUser
        }
    }
})
</script>