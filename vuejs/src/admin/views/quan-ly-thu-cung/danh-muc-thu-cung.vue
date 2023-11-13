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
                    <div class="col-md-5">
                        <a-form name="custom-validation" :model="formAddCategory" v-bind="layout" @finish="addCategoryPet">
                            <a-form-item has-feedback label="Tên danh mục" name="name"
                                :rules="[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]">
                                <a-input v-model:value="formAddCategory.name" />
                            </a-form-item>
                            <a-form-item has-feedback label="Phân loại" name="classify"
                                :rules="[{ required: true, message: 'Vui lòng chọn phân loại thú cưng!' }]">
                                <a-select v-model:value="formAddCategory.classify">
                                    <a-select-option value="Chó cảnh">Chó cảnh</a-select-option>
                                    <a-select-option value="Mèo cảnh">Mèo cảnh</a-select-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item has-feedback label="Trạng thái" name="status"
                                :rules="[{ required: true, message: 'Vui lòng chọn trạng thái!' }]">
                                <a-select v-model:value="formAddCategory.status">
                                    <a-select-option value="Hiện">Hiện</a-select-option>
                                    <a-select-option value="Ẩn">Ẩn</a-select-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item has-feedback label="Hình ảnh" name="images"
                                :rules="[{ required: true, message: 'Chọn 1 ảnh danh mục!' }]">
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
                    <div class="col-md-7">
                        <a-table :columns="columns" :data-source="dataCategoryPet">
                            <template #headerCell="{ column }">
                                <template v-if="column.key === 'name'">
                                    <span>
                                        Danh mục
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
                                        <a-button @click="deleteCategoryPet(record.id)"
                                            style="margin: 5px;"><delete-two-tone /></a-button>
                                        <a-button @click="showModalUpdate(record.id)"
                                            style="margin: 5px;"><edit-two-tone /></a-button>
                                    </span>
                                </template>
                                <template v-else-if="column.key === 'images'">
                                    <img :src="`http://localhost:3000/uploads/${record.images}`" alt="Hình ảnh" width="50"
                                        height="50" />
                                </template>
                                <template v-else-if="column.key === 'stt'">
                                    <span>{{ record.key }}</span>
                                </template>
                                <template v-else-if="column.key === 'classify'">
                                    <span>{{ record.classify }}</span>
                                </template>
                            </template>
                        </a-table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <a-modal v-model:visible="modalUpdateCategoryPet" title="Chỉnh sửa thông tin"
        @ok="updateCategoryPet(formUpdateCategoryPet.id)" @cancel="exitModalUpdate" :closable="false">
        <a-form :model="formUpdateCategoryPet" v-bind="layoutModal" name="nest-messages">
            <a-form-item name="name" label="Tên danh mục">
                <a-input v-model:value="formUpdateCategoryPet.name" />
            </a-form-item>
            <a-form-item name="classify" label="Phân loại">
                <a-select v-model:value="formUpdateCategoryPet.classify">
                    <a-select-option value="Chó cảnh">Chó cảnh</a-select-option>
                    <a-select-option value="Mèo cảnh">Mèo cảnh</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item name="status" label="Trạng thái">
                <a-select v-model:value="formUpdateCategoryPet.status">
                    <a-select-option value="Hiện">Hiện</a-select-option>
                    <a-select-option value="Ẩn">Ẩn</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item name="images" label="Hình ảnh">
                <a-upload v-model:file-list="fileImageUpdate" list-type="picture" :max-count="1">
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
import TheSider from '../../components/TheSider.vue';
import { UploadOutlined, DeleteTwoTone, EditTwoTone } from '@ant-design/icons-vue';
import axios from 'axios';
import { defineComponent, reactive, ref, onMounted } from 'vue';

import Noty from 'noty';
import 'noty/lib/themes/mint.css'
import 'noty/lib/noty.css'
import 'noty/lib/noty.js'


const columns = [{
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
}, {
    title: 'Danh mục',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortDirections: ['descend', 'ascend'],
}, {
    title: 'Hình ảnh',
    dataIndex: 'images',
    key: 'images',
}, {
    title: 'Phân loại',
    dataIndex: 'classify',
    key: 'classify',
    filters: [
        {
            text: 'Chó cảnh',
            value: 'Chó cảnh',
        },
        {
            text: 'Mèo cảnh',
            value: 'Mèo cảnh',
        },
    ],
    filterMultiple: false,
    onFilter: (value, record) => record.classify === value,
    sorter: (a, b) => a.classify.localeCompare(b.classify),
    sortDirections: ['descend', 'ascend'],
}, {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    filters: [
        {
            text: 'Hiện',
            value: 'Hiện',
        },
        {
            text: 'Ẩn',
            value: 'Ẩn',
        },
    ],
    filterMultiple: false,
    onFilter: (value, record) => record.status === value,
    sorter: (a, b) => a.status.localeCompare(b.status),
    sortDirections: ['descend', 'ascend'],
}, {
    title: 'Tuỳ chọn',
    key: 'setting',
}]

export default defineComponent({
    components: {
        TheSider,
        UploadOutlined,
        EditTwoTone,
        DeleteTwoTone
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
                }).catch((error) => {
                    console.log('Không kết nối được đến máy chủ', error);
                })

        };
        const dataCategoryPet = ref([]);
        onMounted(() => {
            const serverUrl = 'http://localhost:3000/admin/quan-ly-thu-cung/getCategoryPet';
            axios.get(serverUrl)
                .then((response) => {
                    dataCategoryPet.value = response.data.map((item, index) => ({
                        key: index + 1,
                        name: item.name,
                        images: item.images,
                        status: item.status,
                        classify: item.classify,
                        id: item._id.toString(),
                    }))
                    console.log(response.data)
                })
                .catch((error) => {
                    console.log("Error:", error);
                })
        });

        const deleteCategoryPet = (id) => {
            console.log(id);
            const serverUrl = `http://localhost:3000/admin/quan-ly-thu-cung/deleteCategoryPet/${id}`;
            axios.delete(serverUrl)
                .then(response => {
                    console.log('Xóa dữ liệu thành công!')
                    if (response.data.message == "Xóa thành công") {
                        new Noty({
                            text: 'Xóa danh mục thành công!',
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
                        console.error("Server trả về thông báo không hợp lệ.");
                    }
                })
                .catch((error) => {
                    console.log("Lỗi khi xóa dữ liệu:", error)
                })
        };
        const formUpdateCategoryPet = ref([]);
        const modalUpdateCategoryPet = ref(false);
        const selectedItem = ref(null);
        const showModalUpdate = (id) => {
            modalUpdateCategoryPet.value = true;
            const itemToUpdate = dataCategoryPet.value.find(item => item.id === id)
            console.log(itemToUpdate);
            if (itemToUpdate) {
                selectedItem.value = itemToUpdate;
                formUpdateCategoryPet.value.name = itemToUpdate.name;
                formUpdateCategoryPet.value.id = itemToUpdate.id;
                if (itemToUpdate.status === 'Hiện') {
                    formUpdateCategoryPet.value.status = 'Hiện'
                } else if (itemToUpdate.status === 'Ẩn') {
                    formUpdateCategoryPet.value.status = 'Ẩn'
                }

                if (itemToUpdate.classify === 'Chó cảnh') {
                    formUpdateCategoryPet.value.classify = 'Chó cảnh'
                } else if (itemToUpdate.classify === 'Mèo cảnh') {
                    formUpdateCategoryPet.value.classify = 'Mèo cảnh'
                }

                formUpdateCategoryPet.value.images = itemToUpdate.images;
                fileImageUpdate.value = [{
                    url: 'http://localhost:3000/uploads/' + itemToUpdate.images,
                }]
            }
        }
        const fileImageUpdate = ref([]);
        const updateCategoryPet = () => {
            
            const uploadImage = fileImageUpdate.value[0]
            if (uploadImage) {
                const updateCategoryPet = {
                    id: formUpdateCategoryPet.value.id,
                    name: formUpdateCategoryPet.value.name,
                    status: formUpdateCategoryPet.value.status,
                    classify: formUpdateCategoryPet.value.classify,
                    images: uploadImage
                }
                console.log("Dữ liệu gửi đi: ", updateCategoryPet);
                const serverUrl = `http://localhost:3000/admin/quan-ly-thu-cung/updateCategoryPet`;
                axios.put(serverUrl, updateCategoryPet, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                    .then((response) => {
                        console.log('Cập nhật thành công');
                        new Noty({
                            text: 'Cập nhật thành công!',
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
                        console.log('Lỗi khi cập nhật:', error);
                        new Noty({
                            text: 'Cập nhật thất bại!',
                            type: 'error',
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
                    });
            } else {
                console.log('Vui lòng chọn 1 ảnh')
            }

            // modalUpdateCategoryPet.value = false;
        }
        const exitModalUpdate = () => {
            modalUpdateCategoryPet.value = false;
        }


        const layout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 14,
            },
        };
        const layoutModal = {
            labelCol: {
                span: 7,
            },
            wrapperCol: {
                span: 16,
            },
        }
        return {
            formAddCategory,
            formRef,
            addCategoryPet,
            layout,
            fileList,
            columns,
            dataCategoryPet,
            deleteCategoryPet,
            showModalUpdate,
            updateCategoryPet,
            exitModalUpdate,
            modalUpdateCategoryPet,
            formUpdateCategoryPet,
            layoutModal,
            fileImageUpdate


        };
    },
});
</script>