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
                            
                            <template v-else-if="column.key === 'stt'">

                            </template>
                            <template v-else-if="column.key === 'setting'">
                                <a-button type="primary" @click="showModalUpdateUser(record.id)"><setting-outlined /></a-button>
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
                <a-alert style="margin-bottom: 20px;" v-if="alertInfoUser" :message="alertInfoUser.message"
                :type="alertInfoUser.type" show-icon />

                <a-button block type="primary" html-type="submit" style="margin-bottom: 10px;">Thêm nhân viên</a-button>

                <a-button block @click="exitModalAddUser">Thoát</a-button>
            </a-form-item>

        </a-form>
        <template #footer>
            
        </template>
    </a-modal>
    <a-modal v-model:visible="modalUpdateUser" title="Chỉnh sửa thông tin" :closable="false" style="top: 20px;">
        
        <a-form :model="formUpdateUser" v-bind="layoutFormAddUser" name="nest-messages" @finish="updateUser">
            <a-form-item name="name" label="Tên nhân viên" :rules="[{ required: true, message: 'Vui lòng nhập tên nhân viên!' }]">
                <a-input v-model:value="formUpdateUser.name" />
            </a-form-item>
            
            <a-form-item name="phone" label="Số điện thoại" :rules="[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]">
                <a-input v-model:value="formUpdateUser.phone" />
            </a-form-item>
            <a-form-item name="pass" label="Mật khẩu" :rules="[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]">
                <a-input v-model:value="formUpdateUser.pass" />
            </a-form-item>
            <a-form-item name="email" label="Email" >
                <a-input v-model:value="formUpdateUser.email" />
            </a-form-item>
            <a-form-item name="classify" label="Vai trò">
                <a-radio-group v-model:value="formUpdateUser.classify">
                    <a-radio value="Admin">Admin</a-radio>
                    <a-radio value="Nhân viên">Nhân viên</a-radio>
                    <a-radio value="Bác sĩ">Bác sĩ</a-radio>
                </a-radio-group>
            </a-form-item>

            <a-form-item name="sex" label="Giới tính">
                <a-radio-group v-model:value="formUpdateUser.sex">
                    <a-radio value="Nam">Nam</a-radio>
                    <a-radio value="Nữ">Nữ</a-radio>
                    <a-radio value="Khác">Khác</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item name="address" label="Địa chỉ">
                <a-textarea v-model:value="formUpdateUser.address" />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 14, offset: 8 }">
                <a-button block type="primary" html-type="submit" style="margin-bottom: 10px;">Cập nhật thông tin</a-button>
                <a-button danger block @click="deleteUser(formUpdateUser.id)" style="margin-bottom: 10px;">Xoá nhân viên</a-button>
                <a-button block @click="exitModalUpdateUser">Thoát</a-button>
            </a-form-item>
        </a-form>
        <template #footer>
            
        </template>
    </a-modal>
</template>
<script>
import TheSider from '../../components/TheSider.vue';
import { SettingOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref, onMounted,  reactive} from 'vue';
import axios from 'axios';
import Noty from 'noty';
import 'noty/lib/themes/mint.css'
import 'noty/lib/noty.css'
import 'noty/lib/noty.js'

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
    },  {
        title: 'Tuỳ chọn',
        key: 'setting',
    }
]
export default defineComponent({
    components: {
        TheSider,
        SettingOutlined
    },
    setup() {
        const dataUser = ref([])
        onMounted(() => {
            const serverUrl = 'http://localhost:3000/admin/quan-ly-nhan-vien/getListUser';
            axios.get(serverUrl)
                .then((response)=>{
                    dataUser.value = response.data.map((item, index) => ({
                        key: index + 1,
                        name: item.name,
                        phone: item.phone,
                        email: item.email,
                        pass: item.pass,
                        sex: item.sex,
                        classify: item.classify,
                        
                        id: item._id.toString(),

                    }))
                    console.log(response.data)
                })
                .catch((error) => {
                    console.log("Error:", error);
                })
            
        })
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
            classify: '',
            pass: ''
        });
        const alertInfoUser = ref({ message: 'Nhập thông tin nhân viên', type: 'info' });
        const addUser = (values) => {
            const serverUrl = 'http://localhost:3000/admin/quan-ly-nhan-vien/addUser';
            axios.post(serverUrl, values)
            .then((response) => {
                console.log('Phản hồi từ server:', response.data);
                if(response.data.success){
                    new Noty({
                        text: 'Thêm nhân viên thành công!',
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
                } else {
                    console.log(response.data.message)
                }

            })
            .catch((error) => {
                if(error.response && error.response.status === 400){
                    alertInfoUser.value = { message: "Thông tin nhân viên đã tồn tại", type: "warning"}
                } else {
                    alertInfoUser.value = { message: "Lỗi kết nối đến server", type: "error" };
                }
                
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
        const layoutFormAddUser = {
            labelCol: {
                span: 7,
            },
            wrapperCol: {
                span: 16,
            },
        }
        const idToUpdate = ref(null);
        const showModalUpdateUser = (id) => {
            modalUpdateUser.value = true
            console.log(id)
            const selectedUser = dataUser.value.find(item => item.id === id)
            formUpdateUser.name = selectedUser.name
            formUpdateUser.phone = selectedUser.phone
            formUpdateUser.pass = selectedUser.pass
            formUpdateUser.email = selectedUser.email
            formUpdateUser.address = selectedUser.address
            formUpdateUser.id = selectedUser.id
            // console.log(selectedUser)
            formUpdateUser.classify = selectedUser.classify
            formUpdateUser.sex = selectedUser.sex   
            idToUpdate.value = id;
        }
        const modalUpdateUser = ref(false)
        const formUpdateUser = reactive({
           
        })
        const updateUser = (values) => {
            const id = idToUpdate.value
            console.log('ID update:', id)
            console.log('Values:', values)
            const serverUrl = `http://localhost:3000/admin/quan-ly-nhan-vien/updateUser/${id}`
            axios.put(serverUrl, values)
            .then((response) => {
                console.log('Update success');
                new Noty({
                            text: 'Cập nhật thông tin thành công!',
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
            .catch((error) => {
                console.error('Error:', error);
            })

        }
        const exitModalUpdateUser = () => {
            modalUpdateUser.value = false
        }
        const deleteUser = (id) => {
            console.log("Delete ID: ", id)
            const serverUrl = `http://localhost:3000/admin/quan-ly-nhan-vien/deleteUser/${id}`;
            axios.delete(serverUrl)
            .then((response) => {
                if(response.status === 200){
                    console.log('Delete success');
                    new Noty({
                            text: 'Xóa nhân viên thành công!',
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
                } else {
                    console.log("Delete faild")
                }
                
            })
            .catch((error) => {
                console.error('Error:', error);
            })
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
            layoutFormAddUser,
            alertInfoUser,
            showModalUpdateUser,
            modalUpdateUser,
            formUpdateUser,
            updateUser,
            exitModalUpdateUser,
            idToUpdate,
            deleteUser
        }
    }
})
</script>