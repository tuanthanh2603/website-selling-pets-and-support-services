<template>
    <div class="row">
        <div class="col-md-2">
            <TheSider />
        </div>
        <div class="col-md-10">
            <div class="container-fluid mt-3">
                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                    <h6 class="h3 mb-0 text-gray-800" style="font-size: 24px;">Danh sách dịch vụ</h6>
                </div>
                <div class="container">
                    <div class="row mb-2">
                        <div class="col-md-2">
                            <a-button type="primary" @click="showModalAddService">Thêm dịch vụ mới</a-button>
                        </div>
                    </div>

                    <a-table :columns="columnsService" :data-source="dataService">
                        <template #bodyCell="{ column, record }">
                            <template v-if="column.key === 'server_name'">
                                {{ record.service_name }}
                            </template>

                            <template v-else-if="column.key === 'service_price'">
                                {{ record.service_price }}
                            </template>

                            <template v-else-if="column.key === 'service_status'">
                                {{ record.service_status }}
                            </template>

                            <template v-else-if="column.key === 'stt'">
                                {{ record.stt}}
                            </template>

                            <template v-else-if="column.key === 'setting'">
                                <span>
                                    <a-button @click="deletePet(record.id)"><delete-two-tone /></a-button>
                                    &nbsp;
                                    <a-button><edit-two-tone /></a-button>
                                </span>
                            </template>
                        </template>
                    </a-table>
                </div>
            </div>
        </div>
    </div>
    <!-- <a-modal v-model:visible="modalAddUser" title="Thêm nhân viên mới" :closable="false" style="top: 20px;">   
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
    </a-modal> -->
    <!-- <a-modal v-model:visible="modalUpdateUser" title="Chỉnh sửa thông tin" :closable="false" style="top: 20px;">
        
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
        <template #footer></template>
    </a-modal> -->
</template>

<script>
import TheSider from '../../components/TheSider.vue';
import { SettingOutlined, DeleteTwoTone, EditTwoTone, UploadOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref, onMounted,  reactive} from 'vue';
import axios from 'axios';
import Noty from 'noty';
import 'noty/lib/themes/mint.css'
import 'noty/lib/noty.css'

//Tên cột
const columnsService = [
    {
        title: 'STT',
        key: 'stt',
    }, {
        title: 'Tên dịch vụ',
        key: 'service_name',
        dataIndex: 'name',
    }, {
        title: 'Giá tiền',
        key: 'service_price',
        dataIndex: 'price',
    }, {
        title: 'Trạng thái',
        key: 'service_status',
        dataIndex: 'status',
    }, {
        title: 'Tuỳ chọn',
        key: 'setting',
    }
]

export default defineComponent({
    components: {
        TheSider,
        SettingOutlined,
        DeleteTwoTone,
        EditTwoTone,
        UploadOutlined
    },
    setup() {
        const dataService = ref([])
        onMounted(() => {
            const serverUrl = 'http://localhost:3000/admin/quan-ly-dich-vu/getAllService';
            axios.get(serverUrl)
                .then((response) => {
                    dataService.value = response.data.map((item, index) => ({
                        key: index +1,
                        name: item.name,
                        price: item.price,
                        status: item.status,
                        id: item._id.toString(),
                    }))
                    console.log(response.data);
                    console.log(name);
                }) .catch ((error) => {
                    console.log("Error: ", error);
                })
        })
        return {
            columnsService,
            dataService,
        }
}
})

</script>