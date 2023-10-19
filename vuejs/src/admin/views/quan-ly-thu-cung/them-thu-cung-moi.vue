<template>
    <div id="wrapper">
        <TheSider />
        <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
                <div class="container-fluid mt-3">
                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h6 class="h3 mb-0 text-gray-800" style="font-size: 24px;">Thêm thú cưng mới</h6>
                    </div>


                    <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
                        @finish="onFinish">
                        <div class="row">
                            <div class="col-md-8">
                                <a-form-item label="Tên thú cưng" name="name"
                                    :rules="[{ required: true, message: 'Vui lòng nhập tên thú cưng!' }]">
                                    <a-input v-model:value="formState.name" />
                                </a-form-item>
                            </div>
                            <div class="col-md-4">
                                <a-form-item name="classify" label="Phân loại" has-feedback
                                    :rules="[{ required: true, message: 'Vui lòng chọn phân loại!' }]">
                                    <a-select v-model:value="formState.classify" placeholder="Phân loại" @change="handleClassifyChange">
                                        <a-select-option value="Chó cảnh">Chó cảnh</a-select-option>
                                        <a-select-option value="Mèo cảnh">Mèo cảnh</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </div>

                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <a-form-item name="category" label="Giống thú" has-feedback
                                    :rules="[{ required: true, message: 'Vui lòng chọn giống thú cưng!' }]">
                                    <a-select v-model:value="formState.category" placeholder="Chọn giống thú cưng">
                                        <a-select-option v-for="breed in breedList" :key="breed._id" :value="breed._id">{{ breed.name }}</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </div>
                            <div class="col-md-4">
                                <a-form-item name="status" label="Trạng thái" has-feedback
                                    :rules="[{ required: true, message: 'Vui lòng chọn trạng thái!' }]">
                                    <a-select v-model:value="formState.status" placeholder="Chọn trạng thái">
                                        <a-select-option value="Hiện">Hiện</a-select-option>
                                        <a-select-option value="Ẩn">Ẩn</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </div>
                            <div class="col-md-4">
                                <a-form-item name="sex" label="Giới tính" has-feedback
                                    :rules="[{ required: true, message: 'Vui lòng chọn giới tính!' }]">
                                    <a-select v-model:value="formState.sex" placeholder="Chọn giới tính">
                                        <a-select-option value="Đực">Đực</a-select-option>
                                        <a-select-option value="Cái">Cái</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </div>
                            <div class="col-md-4">
                                <a-form-item name="images" label="Hình ảnh" has-feedback
                                    :rules="[{ required: true, message: 'Chọn ít nhất 1 hình, tối đa 5 hình!' }]">
                                    <a-upload v-model:file-list="formState.images" :max-count="5" list-type="picture">
                                        <a-button>
                                            <upload-outlined />
                                            Thêm ảnh
                                        </a-button>
                                    </a-upload>
                                </a-form-item>
                            </div>
                        </div>
                        <br>

                        <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
                            <a-button type="primary" html-type="submit">Thêm thú cưng</a-button>
                        </a-form-item>

                    </a-form>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import TheSider from '../../components/TheSider.vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref, reactive, watch  } from 'vue';
import axios from "axios";
export default defineComponent({
    components: {
        TheSider,
        UploadOutlined,
       

    },
    setup() {
        const formState = reactive({
            classify: ref('Phân loại'), 
            category: ref('Chọn giống thú cưng') 
        })
        const breedList = ref([]);

        const handleClassifyChange = () => {
            if (formState.classify === 'Chó cảnh') {
                callDogAPI();
                console.log('chó');
                formState.category = ref('Chọn giống chó cảnh');
            } else if (formState.classify === 'Mèo cảnh') {
                callCatAPI();
                console.log('mèo');
                formState.category = ref('Chọn giống mèo cảnh');
            }
        };
        const callDogAPI = () => {
            const serverUrlDog = 'http://localhost:3000/admin/them-thu-cung-moi/getCategorytDog';
            axios.get(serverUrlDog)
            .then((response) => {
                breedList.value = response.data;
                console.log(response.data)
            })
            .catch((error) => {
                console.error('Error:', error);
            })
        }
        const callCatAPI = () => {
            const serverUrlCat = 'http://localhost:3000/admin/them-thu-cung-moi/getCategoryCat';
            axios.get(serverUrlCat)
            .then((response) => {
                breedList.value = response.data;
                console.log(response.data)
            })
            .catch((error) => {
                console.error('Error:', error);
            })
        }
        
        
        const fileList = ref([]);
        const layout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 6,
            },
        };
        
        const onFinish = () => {
            const formData = {
                name: formState.name,
                classify: formState.classify,
                category: formState.category,
                status: formState.status,
                sex: formState.sex,
                images: formState.images,

            }
            console.log('Dữ liệu gửi đi:', formData);
            const serverUrl = 'http://localhost:3000/admin/them-thu-cung-moi/createPet';
            axios.post(serverUrl, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
            })
            .then((response) => {
                console.log('Phản hồi từ server:', response.data);
                console.log('Thêm danh mục thành công!');
            })
            .catch((error) => {
                console.error('Không kết nối được đến máy chủ');
            })
        };
        return {
            formState,
            onFinish,
            layout,
            fileList,
            handleClassifyChange,
            breedList

           
        }
    }
})
</script>