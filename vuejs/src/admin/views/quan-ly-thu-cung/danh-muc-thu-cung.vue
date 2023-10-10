<template>
    <div id="wrapper">
        <TheSider />
        <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
                <div class="container-fluid mt-3">
                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h6 class="h3 mb-0 text-gray-800" style="font-size: 24px;">Danh mục thú cưng</h6>
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
                                        <a-select-option value="0">Ẩn</a-select-option>
                                    </a-select>
                                </a-form-item>
                                <a-form-item :name="['user', 'image']" label="Hình ảnh">
                                    <a-upload v-model:file-list="fileList" list-type="picture" :max-count="1">
                                        <a-button>
                                            <upload-outlined />
                                            Thêm ảnh
                                        </a-button>
                                    </a-upload>
                                </a-form-item>



                                <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 10 }">
                                    <a-button type="primary" html-type="submit">Thêm danh mục</a-button>
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
import { UploadOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
import axios from 'axios';


export default defineComponent({
    components: {
        TheSider,
        UploadOutlined
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
        };

        const formState = ref({
            user: {
                name: '',
                status: '',
                image: '',
            },
        });

        const valueStatus = ref('1'); // Giá trị mặc định
        const fileList = ref([]);

        const onFinish2 = () => {
            // Lấy giá trị fileList từ form
            const uploadedImage = fileList.value[0];

            // Kiểm tra xem có ảnh nào được chọn không
            if (uploadedImage) {
                const newCategoryData = {
                    name: formState.value.user.name,
                    status: valueStatus.value,
                    image: uploadedImage.name, // Lấy tên của ảnh đã tải lên từ fileList
                };
                console.log('Dữ liệu để gửi đi:', newCategoryData);

                const serverUrl = 'http://localhost:3000/addCategory';

                axios.post(serverUrl, newCategoryData)
                    .then((_response) => {
                        console.log('Thêm danh mục thành công!');
                        // Đặt lại giá trị trong form và fileList
                        formState.value.user = {
                            name: '',
                            status: '',
                            image: '',
                        };
                        fileList.value = [];
                    })
                    .catch((error) => {
                        console.log('Thêm danh mục thất bại!', error);
                    });
            } else {
                console.log('Vui lòng chọn một ảnh.');
            }
        };

        return {
            formState,
            onFinish2,
            layout,
            validateMessages,
            valueStatus,
            fileList
        };
    },
});
</script>
