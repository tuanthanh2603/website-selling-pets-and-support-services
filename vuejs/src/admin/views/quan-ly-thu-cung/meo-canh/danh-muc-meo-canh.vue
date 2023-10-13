<template>
    <div id="wrapper">
        <TheSider />
        <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
                <div class="container-fluid mt-3">
                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h6 class="h3 mb-0 text-gray-800" style="font-size: 24px;">Danh mục mèo cảnh</h6>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <a-form :model="formState" v-bind="layout" name="nest-messages"
                                :validate-messages="validateMessages" @finish="onFinish2">
                                <a-form-item :name="['user', 'name']" label="Tên danh mục" :rules="[{ required: true }]">
                                    <a-input v-model:value="formState.user.name" />
                                </a-form-item>
                                <a-form-item :name="['user', 'status']" label="Trạng thái">
                                    <a-select v-model:value="valueStatus">
                                        <a-select-option value="1">Hiện</a-select-option>
                                        <a-select-option value="2">Ẩn</a-select-option>
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
                                            Danh mục mèo cảnh
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
                                            {{ record.status === 1 ? 'Hiện' : record.status === 2 ? 'Ẩn' : '' }}
                                        </span>
                                    </template>
                                    <template v-else-if="column.key === 'setting'">
                                        <span>
                                            <a-button @click="deleteData(record.id)"><delete-two-tone /></a-button>
                                            &nbsp;
                                            <a-button @click="updateItem(record.id)"><edit-two-tone /></a-button>

                                        </span>
                                    </template>
                                    <template v-else-if="column.key === 'images'">
                                        <img :src="record.images" alt="Hình ảnh" width="50" height="50" />
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
</template>
<script>
import TheSider from '../../../components/TheSider.vue';
import { UploadOutlined, DeleteTwoTone, EditTwoTone } from '@ant-design/icons-vue';
import { defineComponent, ref, onMounted } from 'vue';
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
    name: 'Danh mục mèo cảnh',
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
        const categoryCats = ref([]);
        const data = ref([]);
        onMounted(() => {
            const serverUrl = 'http://localhost:3000/admin/danh-muc-meo-canh/';
            axios.get(serverUrl)
                .then((response) => {
                    categoryCats.value = response.data;
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

        const valueStatus = ref('1'); // Giá trị mặc định
        const fileList = ref([]);
        const onFinish2 = () => {
            const uploadedImage = fileList.value[0];
            if (uploadedImage) {
                // const newCategoryData = new FormData();
                // newCategoryData.append('name', formState.value.user.name);
                // newCategoryData.append('status', valueStatus.value);
                // newCategoryData.append('images', uploadedImage)
                const newCategoryData = {
                    name: formState.value.user.name,
                    status: valueStatus.value,
                    images: uploadedImage,
                };
                console.log('Dữ liệu để gửi đi:', newCategoryData);
                console.log('Tên tệp ảnh:', uploadedImage.name);

                const serverUrl = 'http://localhost:3000/admin/danh-muc-meo-canh/addCategoryCat';
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
                                        window.location.reload();
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
            const serverUrl = `http://localhost:3000/admin/danh-muc-meo-canh/deleteCategoryCat/${id}`;
            axios.delete(serverUrl)
            .then(_response => {
                console.log('Xóa dữ liệu thành công!')
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
                
            })
            .catch((error) => {
                console.error("Lỗi khi xóa dữ liệu:", error)
            });
        };

        const updateItem = (id) => {
            console.log(id)
            console.log('Đã nhấn vào nút chỉnh sửa');
        }



      


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
        };

        const formState = ref({
            user: {
                name: '',
                status: '',
                images: '',
            },
        });

        



        return {
            formState,
            onFinish2,
            layout,
            validateMessages,
            valueStatus,
            fileList,

            data,
            columns,


            categoryCats,
            deleteData,
            updateItem
           


        };

    },
});
</script>

