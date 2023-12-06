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
                            <template v-if="column.key === 'name'">
                                {{ record.name }}
                            </template>

                            <template v-else-if="column.key === 'price'">
                                {{ record.price }}
                            </template>

                            <template v-else-if="column.key === 'status'">
                                {{ record.status }}
                            </template>

                            <template v-else-if="column.key === 'stt'">
                            </template>

                            <template v-else-if="column.key === 'setting'">
                                <span>
                                    <a-button @click="deleteService(record.id)" style="margin: 5px;"><delete-two-tone /></a-button>
                                    <a-button @click="showModalUpdateService(record.id)"
                                        style="margin: 5px;"><edit-two-tone /></a-button>
                                </span>
                            </template>
                        </template>
                    </a-table>
                </div>
            </div>
        </div>
    </div>

    <a-modal v-model:visible="modalAddService" title="Thêm dịch vụ mới" :closable="false" style="top: 20px;">   
        <a-form :model="formAddService" v-bind="layoutFormAddService" name="nest-messages" @finish="addService">
            <a-form-item name="name" label="Tên dịch vụ" :rules="[{ required: true, message: 'Vui lòng nhập tên dịch vụ!' }]">
                <a-input v-model:value="formAddService.name" />
            </a-form-item>
            
            <a-form-item name="price" label="Giá dịch vụ" :rules="[{ required: true, message: 'Vui lòng nhập giá dịch vụ!' }]">
                <a-input v-model:value="formAddService.price" />
            </a-form-item>

            <a-form-item name="status" label="Trạng thái dịch vụ">
                <a-radio-group v-model:value="formAddService.status">
                    <a-radio value="true">Đang hoạt động</a-radio>
                    <a-radio value="false">Dừng hoạt động</a-radio>
                </a-radio-group>
            </a-form-item>
            
            <a-form-item :wrapper-col="{ span: 14, offset: 8 }">
                <a-alert style="margin-bottom: 20px;" v-if="alertInfoService" :message="alertInfoService.message"
                :type="alertInfoService.type" show-icon />

                <a-button block type="primary" html-type="submit" style="margin-bottom: 10px;">Thêm dịch vụ</a-button>

                <a-button block @click="exitModalAddService">Thoát</a-button>
            </a-form-item>

        </a-form>
        <template #footer>
            
        </template>
    </a-modal>

    <a-modal v-model:visible="modalUpdateService" title="Chỉnh sửa dịch vụ" :closable="false" style="top: 20px;">
        
        <a-form :model="formUpdateService" v-bind="layoutFormAddService" name="nest-messages" @finish="updateService">
            <a-form-item name="name" label="Tên dịch vụ" :rules="[{ required: true, message: 'Vui lòng nhập tên dịch vụ!' }]">
                <a-input v-model:value="formUpdateService.name" />
            </a-form-item>

            <a-form-item name="price" label="Giá dịch vụ" :rules="[{ required: true, message: 'Vui lòng nhập giá dịch vụ!' }]">
                <a-input v-model:value="formUpdateService.price" />
            </a-form-item>

            <a-form-item name="status" label="Trạng thái dịch vụ">
                <a-radio-group v-model:value="formAddService.status">
                    <a-radio value="true">Đang hoạt động</a-radio>
                    <a-radio value="false">Dừng hoạt động</a-radio>
                </a-radio-group>
            </a-form-item>

            <a-form-item :wrapper-col="{ span: 14, offset: 8 }">
                <a-button block type="primary" html-type="submit" style="margin-bottom: 10px;">Cập nhật dịch vụ</a-button>
                <a-button danger block @click="deleteService(formUpdateService.id)" style="margin-bottom: 10px;">Xoá dịch vụ</a-button>
                <a-button block @click="exitModalUpdateService">Thoát</a-button>
            </a-form-item>
        </a-form>
        <template #footer></template>
    </a-modal>
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
    customRender: (text, record, index) => {
        const stt = text.renderIndex;
        // console.log(stt + 1);
        const STT = stt + 1;
        return STT
        }, 
    }, {
        title: 'Tên dịch vụ',
        key: 'name',
        dataIndex: 'name',
    }, {
        title: 'Giá tiền',
        key: 'price',
        dataIndex: 'price',
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
                        name: item.service_name,
                        price: item.service_price,
                        status: item.service_status,
                        id: item._id.toString(),
                    }))
                    console.log(response.data);
                    console.log(dataService.value);
                }) .catch ((error) => {
                    console.log("Error: ", error);
                })
        })
        const modalAddService = ref(false)
        const loading = ref(false)
        const showModalAddService = () => {
            modalAddService.value = true
        }

        const exitModalAddService = () => {
            modalAddService.value = false
        }

        const formAddService = ref({
            name: '',
            price: '',
            status: '',
        });

        const layoutFormAddService = {
            labelCol: {
                span: 7,
            },
            wrapperCol: {
                span: 16,
            },
        }

        const alertInfoService = ref({ message: 'Nhập thông tin dịch vụ', type: 'info' });
        //Thêm dịch vụ
        const addService = (values) => {
            const serverUrl = 'http://localhost:3000/admin/quan-ly-dich-vu/addService';
            axios.post(serverUrl, values)
            .then((response) => {
                console.log('Phản hồi từ server:', response.data);
                if(response.data.success){
                    new Noty({
                        text: 'Thêm dịch vụ thành công!',
                        type: 'success',
                        layout: 'topRight',
                        theme: 'mint',
                        timeout: 3000,
                        callbacks: {
                            afterShow: function () {
                            // Sử dụng Promise để đảm bảo rằng làm mới chỉ xảy ra sau khi phản hồi đã được xử lý
                            return new Promise((resolve) => {
                                setTimeout(() => {
                                window.location.reload();
                                resolve();
                                }, 2000); // Sau 3 giây
                            });
                            }
                        }
                    }).show();
                } else {
                    console.log(response.data.message)
                }

            })
            .catch((error) => {
                if(error.response && error.response.status === 400){
                    alertInfoService.value = { message: "Thông tin dịch vụ đã tồn tại", type: "warning"}
                } else {
                    alertInfoService.value = { message: "Lỗi kết nối đến server", type: "error" };
                }
                
            })
            console.log('Thông tin dịch vụ:', values);
        }
        //Update dịch vụ
        //Show bảng update
        const idToUpdate = ref(null);
        const showModalUpdateService = (id) => {
            modalUpdateService.value = true
            console.log(id)
            const selectedService = dataService.value.find(item => item.id === id)
            formUpdateService.name = selectedService.name
            formUpdateService.price = selectedService.price
 
            formUpdateService.id = selectedService.id
            // console.log(selectedUser)
            formUpdateService.status = selectedService.status
            idToUpdate.value = id;
        }
        const modalUpdateService = ref(false)
        const formUpdateService = reactive({
        })

        //Update dịch vụ
        const updateService = (values) => {
            const id = idToUpdate.value
            console.log('ID update:', id)
            console.log('Values:', values)
            const serverUrl = `http://localhost:3000/admin/quan-ly-dich-vu/updateService/${id}`
            
            axios.put(serverUrl, values)
                .then((response) => {
                console.log('Update success', response.data);
                new Noty({
                            text: 'Cập nhật thông tin thành công!',
                            type: 'success',
                            layout: 'topRight',
                            theme: 'mint',
                            timeout: 3000,
                            callbacks: {
                                afterShow: function () {
                                // Sử dụng Promise để đảm bảo rằng làm mới chỉ xảy ra sau khi phản hồi đã được xử lý
                                return new Promise((resolve) => {
                                    setTimeout(() => {
                                    window.location.reload();
                                    resolve();
                                    }, 2000); // Sau 3 giây
                                });
                                }
                            }
                        }).show();
            })
            .catch((error) => {
                console.error('Error:', error);
            })

        }
        const exitModalUpdateService = () => {
            modalUpdateService.value = false
        }

        //Delete Service
        const deleteService = (id) => {
            console.log("Delete ID: ", id)
            const serverUrl = `http://localhost:3000/admin/quan-ly-dich-vu/deleteService/${id}`;
            axios.delete(serverUrl)
            .then((response) => {
                if(response.status === 200){
                    console.log('Delete success');
                    new Noty({
                            text: 'Xóa dịch vụ thành công!',
                            type: 'success',
                            layout: 'topRight',
                            theme: 'mint',
                            timeout: 3000,
                            callbacks: {
                                afterShow: function () {
                                // Sử dụng Promise để đảm bảo rằng làm mới chỉ xảy ra sau khi phản hồi đã được xử lý
                                return new Promise((resolve) => {
                                    setTimeout(() => {
                                    window.location.reload();
                                    resolve();
                                    }, 2000); // Sau 3 giây
                                });
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
            columnsService,
            dataService,
            loading,
            //Form Add Service
            showModalAddService,
            formAddService,
            exitModalAddService,
            layoutFormAddService,
            modalAddService,
            //Missing Info
            alertInfoService,
            //Add Service
            addService,
            //Update Service
            modalUpdateService,
            formUpdateService,
            showModalUpdateService,
            updateService,
            exitModalUpdateService,
            idToUpdate,
            //Delete Service
            deleteService,
        }
}
})

</script>