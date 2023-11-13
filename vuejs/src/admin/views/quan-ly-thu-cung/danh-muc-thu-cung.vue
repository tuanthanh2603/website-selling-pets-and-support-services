<template>
    <div class="row">
        <div class="col-md-2">
            <TheSider />
        </div>
        <div class="col-md-10">
            <div class="container-fluid mt-3">
                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                    <h6 class="h3 mb-0 text-gray-800" style="font-size: 24px;">Danh mục thú cưng</h6>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <a-form  name="custom-validation" :model="formAddCategory"  v-bind="layout"
                            @finish="addCategoryPet"  >
                            <a-form-item has-feedback label="Tên danh mục" name="name" :rules="[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]">
                                <a-input v-model:value="formAddCategory.name" />
                            </a-form-item>
                            <a-form-item has-feedback label="Phân loại" name="classify" :rules="[{ required: true, message: 'Vui lòng chọn phân loại thú cưng!' }]">
                                <a-select v-model:value="formAddCategory.classify">
                                    <a-select-option value="Chó cảnh">Chó cảnh</a-select-option>
                                    <a-select-option value="Mèo cảnh">Mèo cảnh</a-select-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item has-feedback label="Trạng thái" name="status" :rules="[{ required: true, message: 'Vui lòng chọn trạng thái!' }]">
                                <a-select v-model:value="formAddCategory.status">
                                    <a-select-option value="Hiện">Hiện</a-select-option>
                                    <a-select-option value="Ẩn">Ẩn</a-select-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item has-feedback label="Hình ảnh" name="images" :rules="[{ required: true, message: 'Chọn 1 ảnh danh mục!' }]">
                                <a-upload v-model:file-list="formAddCategory.images" list-type="picture" :max-count="1">
                                    <a-button>
                                        <upload-outlined />
                                        Chọn ảnh
                                    </a-button>
                                </a-upload>
                            </a-form-item>
                            <a-form-item :wrapper-col="{ span: 14, offset: 8 }">
                                <a-button type="primary" html-type="submit">Thêm danh mục</a-button>
                               
                            </a-form-item>
                        </a-form>
                    </div>
                    <div class="col-md-6">

                    </div>
                </div>
            </div>
        </div>


    </div>
</template>
<script>
import TheSider from '../../components/TheSider.vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import axios from 'axios';
import { defineComponent, reactive, ref } from 'vue';




export default defineComponent({
    components: {
        TheSider,
        UploadOutlined,
    },
    setup() {
        const fileList = ref([]);
        const formRef = ref();
        const formAddCategory = reactive({
            name: '',
            classify: '',
            status: '',
            
        });
       
        
        const addCategoryPet = () => {
            const newCategoryData = {
                name: formAddCategory.name,
                classify: formAddCategory.classify,
                status: formAddCategory.status,
                images: formAddCategory.images,
            }
            console.log("Dữ liệu gửi đi: ", newCategoryData);
            const serverUrl = 'http://localhost:3000/admin/quan-ly-thu-cung/addCategoryPet';
            axios.post(serverUrl, newCategoryData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log('Phản hồi từ server:', response.data);
            }).catch((error) =>{
                console.log('Không kết nối được đến máy chủ', error);
            })
            
        };
        const layout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 14,
            },
        };
        return {
            formAddCategory,
            formRef,
            addCategoryPet,
            layout,
            fileList
        };
    },
});
</script>