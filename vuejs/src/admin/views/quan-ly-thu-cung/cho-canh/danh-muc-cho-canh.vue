<template>
    <div id="wrapper">
        <TheSider />
        <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
                <div class="container-fluid mt-3">
                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h6 class="h3 mb-0 text-gray-800" style="font-size: 24px;">Danh mục chó cảnh</h6>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <a-form :model="formState" v-bind="layout" name="nest-messages"
                                :validate-messages="validateMessages" @finish="onFinish2">
                                <a-form-item :name="['user', 'name']" label="Tên danh mục" :rules="[{ required: true }]">
                                    <a-input v-model:value="formState.user.name" />
                                </a-form-item>
                                <a-form-item :name="['user', 'status']" label="Trạng thái" :rules="[{ required: true }]">
                                    <a-select v-model:value="formState.user.status">
                                        <a-select-option value="Chờ xử lý">Chờ xử lý</a-select-option>
                                        <a-select-option value="Hiện">Hiện</a-select-option>
                                        <a-select-option value="Ẩn">Ẩn</a-select-option>
                                    </a-select>
                                </a-form-item>
                                <a-form-item :name="['user', 'images']" label="Hình ảnh">
                                    <a-upload v-model:file-list="fileList" list-type="picture" :max-count="1">
                                        <a-button>
                                            <upload-outlined />
                                            Chọn ảnh
                                        </a-button>
                                    </a-upload>
                                </a-form-item>
                                <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 10 }">
                                    <a-button type="primary" html-type="submit">Thêm danh mục</a-button>
                                </a-form-item>
                            </a-form>
                        </div>
                        

              
                        <div class="col-md-6">
                            <a-table :columns="columns" :data-source="data">
                                <template #headerCell="{ column }">
                                    <template v-if="column.key === 'name'">
                                        <span>
                                            Danh mục chó cảnh
                                        </span>
                                    </template>
                                </template>
                                <template #bodyCell="{ column, record }">
                                    
                                    <template v-if="column.key === 'name'">
                                        <a>
                                            {{ record.name }}
                                        </a>
                                    </template>
                                    <template v-else-if="column.key === 'status'">
                                        <span>
                                            {{ record.status }}

                                        </span>
                                    </template>
                                    <template v-else-if="column.key === 'setting'">
                                        <span>
                                            <a-button @click="deleteData(record.id)"><delete-two-tone /></a-button>
                                            &nbsp;
                                            <a-button @click="showModal(record.id)"><edit-two-tone /></a-button>
                                            

                                        </span>
                                    </template>
                                    <template v-else-if="column.key === 'images'">
                                        <img :src="`http://localhost:3000/uploads/${record.images}`" alt="Hình ảnh" width="50" height="50" />
                                    </template>
                                    <template v-else-if="column.key === 'stt'">
                                        <span>{{ record.key }}</span>
                                    </template>
                                </template>
                            </a-table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <a-modal v-model:visible="modalVisible" title="Chỉnh sửa thông tin" @ok="handleOk()" @cancel="handleCancel" :closable="false">
        <a-form :model="formState" v-bind="layout2" name="nest-messages"
            :validate-messages="validateMessages" @finish="onFinish2">
            <a-form-item :name="['user', 'editName']" label="Tên danh mục" :rules="[{ required: true }]">
                <a-input v-model:value="formEdit.user.editName" />
            </a-form-item>
            

            <a-form-item :name="['user', 'editStatus']" label="Trạng thái" >
                <a-select v-model:value="formEdit.user.editStatus">
                    <a-select-option value="Chờ xử lý">Chờ xử lý</a-select-option>
                    <a-select-option value="Hiện">Hiện</a-select-option>
                    <a-select-option value="Ẩn">Ẩn</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item :name="['user', 'editImages']" label="Hình ảnh">
                <a-upload v-model:file-list="fileListEdit" list-type="picture" :max-count="1">
                    <a-button>
                        <upload-outlined />
                        Chọn ảnh
                    </a-button>
                </a-upload>
            </a-form-item>
            
        </a-form>
        
    </a-modal>
    
</template>
<script>
import TheSider from '../../../components/TheSider.vue';
import { UploadOutlined, DeleteTwoTone, EditTwoTone } from '@ant-design/icons-vue';
import { defineComponent, ref, onMounted, computed  } from 'vue';


import axios from 'axios';
import Noty from "noty"
import 'noty/lib/themes/mint.css'
import 'noty/lib/noty.css'
import 'noty/lib/noty.js'


const columns = [{
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
},{
    name: 'Danh mục chó cảnh',
    dataIndex: 'name',
    key: 'name',
}, {
    key: 'images',
    dataIndex: 'images',
    title: 'Hình ảnh',
}, {
    title: 'Trạng thái',
    key: 'status',
    dataIndex: 'status',
}, {
    title: 'Tùy chọn',
    key: 'setting',
}];



export default defineComponent({
    components: {
        TheSider,
        UploadOutlined,
        DeleteTwoTone,
        EditTwoTone

    },
    setup() {
        
        const modalVisible = ref(false);

        const showModal = (id) => {
            modalVisible.value = true;
            const itemToEdit = data.value.find(item => item.id === id)
            console.log(itemToEdit)
            if(itemToEdit){
                selectedItem.value = itemToEdit;
                formEdit.value.user.editName = itemToEdit.name;
                formEdit.value.user.editId = itemToEdit.id;
                if(itemToEdit.status === 'Hiện'){
                    formEdit.value.user.editStatus = 'Hiện';
                } else if(itemToEdit.status === 'Ẩn'){
                    formEdit.value.user.editStatus = 'Ẩn';
                } else if(itemToEdit.status === 'Chờ xử lý'){
                    formEdit.value.user.editStatus = 'Chờ xử lý';
                }
                
                // formEdit.value.user.editStatus = itemToEdit.status === 'Hiện' ? '1' : '0';
                formEdit.value.user.editImages = itemToEdit.images;
                fileListEdit.value = [{
                    url: 'http://localhost:3000/uploads/' + itemToEdit.images,
                   
                }];
                

            }
        };

        const fileListEdit = ref([]);
        const handleOk = () => {
            const uploadedImage = fileListEdit.value[0];
            if(uploadedImage){
                const updateImage = fileListEdit.value[0];
                
                
                console.log(uploadedImage);
                const updateCategoryDog = {
                    id: formEdit.value.user.editId,
                    name: formEdit.value.user.editName,
                    status: formEdit.value.user.editStatus,
                    images: updateImage,
                }
                console.log('Dữ liệu gửi đi: ', updateCategoryDog);
                const serverUrl = `http://localhost:3000/admin/danh-muc-cho-canh/updateCategoryDog`;
                axios.put(serverUrl, updateCategoryDog)
                    .then((response) => {
                        console.log('Cập nhật thành công');
                    })
                    .catch((error) => {
                        console.log('Lỗi khi cập nhật:', error);
                    });
            } else {
                console.log('Chưa tải ảnh');
            }
            modalVisible.value = false;
        };

        const handleCancel = () => {
        modalVisible.value = false;
        };
        const formEdit = ref({
            user: {
                editName: '',
                editStatus: '',
                editImages: '',
            },
        });
        const data = ref([]);
        const formState = ref({
            user: {
                name: '',
                status: 'Chờ xử lý',
                images: '',
            },
        });
        const selectedItem = ref(null);
        const fileList = ref([]);
        const images = computed(() => {
            return formState.value.user.images;
        })
        const categoryDogs = ref([]);
        onMounted(() => {
            const serverUrl = 'http://localhost:3000/admin/danh-muc-cho-canh/';
            axios.get(serverUrl)
                .then((response) => {
                    categoryDogs.value = response.data;
                    data.value = response.data.map((item, index) => ({
                        key: index + 1,
                        name: item.name,
                        images: item.images,
                        status: item.status,
                        id:item._id.toString(),
                    }))
                    console.log(response.data)
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        });
        const onFinish2 = () => {
            const uploadedImage = fileList.value[0];
            if (uploadedImage) {
                // const newCategoryData = new FormData();
                // newCategoryData.append('name', formState.value.user.name);
                // newCategoryData.append('status', valueStatus.value);
                // newCategoryData.append('images', uploadedImage)
                const newCategoryData = {
                    name: formState.value.user.name,
                    status: formState.value.user.status,
                    images: uploadedImage,
                };
                console.log('Dữ liệu để gửi đi:', newCategoryData);
                console.log('Tên tệp ảnh:', uploadedImage.name);

                const serverUrl = 'http://localhost:3000/admin/danh-muc-cho-canh/addCategoryDog';
                axios.post(serverUrl, newCategoryData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })

                    .then((response) => {
                        console.log('Phản hồi từ server:', response.data);
                        console.log('Thêm danh mục thành công!');
                        // Đặt lại giá trị trong form và fileList
                        formState.value.user = {
                            name: '',
                            status: '',
                            images: '',
                        };
                        fileList.value = [];
                        new Noty({
                            text: 'Thêm danh mục thành công!',
                            type: 'success',
                            layout: 'topRight',
                            theme: 'mint', 
                            timeout: 3000,
                            callbacks: {
                                afterShow: function() {
                                    // Reload lại trang sau khi Noty hiện xong
                                    setTimeout(() => {
                                        // window.location.reload();
                                    }, 3000); // Sau 3 giây
                                }
                            }
                        }).show();
                    })
                    .catch((error) => {
                        if (error.response) {
                        
                            new Noty({
                            text: error.response.data.message,
                            type: 'error',
                            layout: 'topRight',
                            theme: 'mint', 
                            timeout: 3000,
                        }).show();
                        } else if (error.request) {
                       
                        console.error('Không kết nối được đến máy chủ');
                        } else {
                        
                        console.error('Lỗi thiết lập yêu cầu:', error.message);
                        }
                    });
            } else {
                console.log('Vui lòng chọn một ảnh.');
                new Noty({
                        text: 'Vui lòng chọn một ảnh!',
                        type: 'error',
                        layout: 'topRight',
                        theme: 'mint', 
                        timeout: 3000,
                    }).show();
            }
            
        };

        const deleteData = (id) => {
            console.log(id);
            const serverUrl = `http://localhost:3000/admin/danh-muc-cho-canh/deleteCategoryDog/${id}`;
            axios.delete(serverUrl)
            .then(response => {
                console.log('Xóa dữ liệu thành công!')
                if(response.data.message == "Xóa thành công") {
                    new Noty({
                            text: 'Xóa danh mục thành công!',
                            type: 'success',
                            layout: 'topRight',
                            theme: 'mint', 
                            timeout: 3000,
                            callbacks: {
                                afterShow: function() {
                                    // Reload lại trang sau khi Noty hiện xong
                                    setTimeout(() => {
                                        window.location.reload();
                                    }, 2000); // Sau 3 giây
                                }
                            }
                 }).show();
                } else {
                    console.error("Server trả về thông báo không hợp lệ.");
                }
            })
            .catch((error) => {
                console.error("Lỗi khi xóa dữ liệu:", error)
            });
        };

        



      


        const layout = {
            labelCol: {
                span: 10,
            },
            wrapperCol: {
                span: 16,
            },
        };
        const layout2 = {
            labelCol: {
                span: 7,
            },
            wrapperCol: {
                span: 16,
            },
        };

        const validateMessages = {
            required: 'Vui lòng không để trống ${label}!',
        };

        

        



        return {
            formState,
            onFinish2,
            layout,
            layout2,
            validateMessages,
            fileListEdit,
            fileList,

            data,
            columns,


            categoryDogs,
            deleteData,
            
            modalVisible,
            showModal,
            formEdit,
            handleOk,
            handleCancel,
            
            
           


        };

    },
});
</script>
<style scoped>
  .ant-modal-footer {
    display: none !important;
  }
</style>

