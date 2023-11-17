<template>
    <div class="row">
        <div class="col-md-2">
            <TheSider />
        </div>
        <div class="col-md-10">
            <div class="container-fluid mt-3">
                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                    <h6 class="h3 mb-0 text-gray-800" style="font-size: 24px;">Phụ kiện</h6>
                </div>

                <div class="container">
                    <a-button type="primary" style="margin-right: 10px;" @click="showModalCategoryAccessory">Danh mục</a-button>
                    <a-button type="primary" style="margin-right: 10px;">Danh sách danh mục</a-button>
                    <a-button type="primary" style="margin-right: 10px;">Thêm phụ kiện mới</a-button>
                    <a-table style="margin-top: 10px;" :columns="columnsAccessory" :data-source="dataAccessory">
                        <template #headerCell="{ column }">
                            <template v-if="column.key === 'name'">
                                <span>
                                    Phụ kiện
                                </span>
                            </template>
                        </template>
                        <template #bodyCell="{ column, record }">

                        </template>
                    </a-table>
                </div>
            </div>
        </div>
    </div>
    <a-modal v-model:visible="modalCategoryAccessory" title="Danh mục phụ kiện" :closable="false">
        <template #footer>

        </template>
        <a-form :model="formCategoryAccessory" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }" autocomplete="off"
            @finish="handleSubmit">
            <a-form-item label="Tên danh mục" name="name"
                :rules="[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]">
                <a-input v-model:value="formCategoryAccessory.name" />
            </a-form-item>
            <a-form-item label="Trạng thái" name="status"
                :rules="[{ required: true, message: 'Vui lòng chọn trạng thái!' }]">
                <a-radio-group v-model:value="formCategoryAccessory.status">
                    <a-radio value="Hiện">Hiện</a-radio>
                    <a-radio value="Ẩn">Ẩn</a-radio>
                    
                </a-radio-group>
            </a-form-item>

            <a-form-item :wrapper-col="{ span: 14, offset: 7 }">
                <a-button block v-if="formMode === 'add'" type="primary" html-type="submit" style="margin-bottom: 10px;">Thêm danh mục</a-button>
                <a-button block v-if="formMode === 'update'" type="primary" html-type="submit" style="margin-bottom: 10px;">Cập nhật danh mục</a-button>
                <a-button block @click="exitsModalCategoryAccessory">Thoát</a-button>
            </a-form-item>
        </a-form>
        

    </a-modal>
</template>
<script>  
import TheSider from '../../components/TheSider.vue';
import { defineComponent, ref, reactive } from 'vue';
import axios from 'axios';
import Noty from 'noty';
import 'noty/lib/themes/mint.css'
import 'noty/lib/noty.css'

const columnsAccessory = [
    {
        title: 'STT',
        key: 'stt',
        customRender: (text, record, index) => {
            const stt = text.renderIndex;
            // console.log(stt + 1);
            const STT = stt + 1;
            return STT
        },
    },
    {
        title: 'Tên phụ kiện',
        key: ''
    },
    {
        title: 'Hình ảnh',
        key: '',
    },
    {
        title: 'Giá bán',
        key: '',
    },
    {
        title: 'Phân loại',
        key: '',
    },
    {
        title: 'Số lượng',
        key: '',
    },
    {
        title: 'Tuỳ chỉnh',
        key: '',
    },

]
export default defineComponent({
    components: {
        TheSider,
    },
    setup() {
        const dataAccessory = ref([])
        const modalCategoryAccessory = ref(false)
        const showModalCategoryAccessory = () => {
            modalCategoryAccessory.value = true
        }
        const exitsModalCategoryAccessory = () => {
            modalCategoryAccessory.value = false
        }
        const formCategoryAccessory = reactive({

        })
        const formMode = ref('add');

        const addCategoryAccessory = (values) => {
            console.log(values)
            const serverUrl = "http://localhost:3000/admin/quan-ly-san-pham/addCategoryAccessory";
            axios.post(serverUrl, values)
            .then((response) => {

                if (response.status === 201) {
                    console.log('Thêm danh mục thành công:', response.data);
                    new Noty({
                            text: 'Thêm danh mục thành công!',
                            type: 'success',
                            layout: 'topRight',
                            theme: 'mint',
                            timeout: 3000,
                            // callbacks: {
                            //     afterShow: function () {
                            //         // Reload lại trang sau khi Noty hiện xong
                            //         setTimeout(() => {
                            //             window.location.reload();
                                        
                            //         }, 2000); // Sau 3 giây
                            //     }
                            // }
                        }).show();
                } else {
                    console.log('Có lỗi xảy ra khi thêm danh mục')
                    new Noty({
                            text: "Có lỗi xảy ra khi thêm danh mục",
                            type: 'error',
                            layout: 'topRight',
                            theme: 'mint',
                            timeout: 3000,
                        }).show();
                }
            }).catch((error) => {
                if(error.response.status === 401) {
                    console.log(error.response.data.message)
                    new Noty({
                            text: error.response.data.message,
                            type: 'error',
                            layout: 'topRight',
                            theme: 'mint',
                            timeout: 3000,
                        }).show();
                } else {
                    console.log('Không kết nối được đến máy chủ', error);
                }
                
            })
        }
        const updateCategoryAccessory = (values) => {
            console.log(values)
        }
        const handleSubmit = (values) => {
            if (formMode.value === "add") {
                addCategoryAccessory(values);
            } else if (formMode.value === "edit"){
                updateCategoryAccessory(values);
            }

        }
        const setEditMode = () => {
            formMode.value = 'edit';
            // Here, populate the form fields with existing category data for editing
            // You might receive the category data via props or other means
            // Update formAddCategoryAccessory with the data to be edited
        };

        return {
            columnsAccessory,
            dataAccessory,
            showModalCategoryAccessory,
            modalCategoryAccessory,
            exitsModalCategoryAccessory,
            formCategoryAccessory,
            addCategoryAccessory,
            updateCategoryAccessory,
            handleSubmit,
            formMode,
        }
    }
})
</script>