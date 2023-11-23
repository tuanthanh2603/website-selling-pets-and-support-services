<template>
    <div class="row">
        <div class="col-md-2">
            <TheSider />
        </div>
        <div class="col-md-10">
            <div class="container-fluid mt-3">
                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                    <h6 class="h3 mb-0 text-gray-800" style="font-size: 24px;">Thú cưng</h6>
                </div>
                <div class="container">
                    <a-button type="primary" style="margin-right: 10px;" @click="showModalAddCateogryPet">Thêm danh
                        mục</a-button>
                    <a-button type="primary" style="margin-right: 10px;" @click="showModalListCategoryPet">Danh sách danh
                        mục</a-button>
                    <a-button type="primary" style="margin-right: 10px;" @click="showModalAddPet">Thêm thú cưng</a-button>
                    <a-tabs v-model:activeKey="activeKey">
                        <a-tab-pane key="1" tab="Danh sách chó cảnh" @click="loadTabContentDog('1')">
                            <a-table :columns="columnsDog" :data-source="dataDog" @change="onChange">
                                <template #headerCell="{ column }">
                                    <template v-if="column.key === 'name'">
                                        <span>
                                            Tên chó
                                        </span>
                                    </template>
                                </template>
                                <template #bodyCell="{ column, record }">
                                    <template v-if="column.key === 'name'">

                                        {{ record.name }}

                                    </template>
                                    <template v-else-if="column.key === 'price'">

                                        {{ record.price }}

                                    </template>
                                    <template v-else-if="column.key === 'category'">

                                        {{ record.category }}

                                    </template>
                                    <template v-else-if="column.key === 'sex'">

                                        {{ record.sex }}

                                    </template>
                                    <template v-else-if="column.key === 'status'">

                                        {{ record.status }}

                                    </template>
                                    <template v-else-if="column.key === 'images'">
                                        <img :src="`http://localhost:3000/uploads/${record.images[0].name}`"
                                            :alt="`${record.images[0]._id}`" height="80" width="80">
                                        <!-- {{ record.images[0].name }} -->
                                    </template>
                                    <template v-else-if="column.key === 'stt'">

                                    </template>
                                    <template v-else-if="column.key === 'setting'">
                                        <span>
                                            <a-button @click="deleteData(record.id)"><delete-two-tone /></a-button>
                                            &nbsp;
                                            <a-button><edit-two-tone /></a-button>
                                        </span>


                                    </template>
                                </template>
                            </a-table>
                        </a-tab-pane>
                        <a-tab-pane key="2" tab="Danh sách mèo cảnh" @click="loadTabContentCat('2')">
                            <a-table :columns="columnsCat" :data-source="dataCat" @change="onChange">
                                <template #headerCell="{ column }">
                                    <template v-if="column.key === 'name'">
                                        <span>
                                            Tên mèo
                                        </span>
                                    </template>
                                </template>
                                <template #bodyCell="{ column, record }">
                                    <template v-if="column.key === 'name'">

                                        {{ record.name }}

                                    </template>
                                    <template v-else-if="column.key === 'price'">

                                        {{ record.price }}

                                    </template>
                                    <template v-else-if="column.key === 'category'">

                                        {{ record.category }}

                                    </template>
                                    <template v-else-if="column.key === 'sex'">

                                        {{ record.sex }}

                                    </template>
                                    <template v-else-if="column.key === 'status'">

                                        {{ record.status }}

                                    </template>
                                    <template v-else-if="column.key === 'images'">
                                        <img :src="`http://localhost:3000/uploads/${record.images[0].name}`"
                                            :alt="`${record.images[0]._id}`" height="80" width="80">
                                        <!-- {{ record.images[0].name }} -->
                                    </template>
                                    <template v-else-if="column.key === 'stt'">

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
                        </a-tab-pane>

                    </a-tabs>
                </div>
            </div>
        </div>
    </div>
    <a-modal v-model:visible="modalAddCategoryPet" title="Thêm danh mục" :closable="false">
        <template #footer>

        </template>
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
    </a-modal>

    <a-modal v-model:visible="modalListCategoryPet" width="1000px" title="Danh sách danh mục" :closable="false"
        style="top: 20px;">
        <template #footer>

        </template>
        <a-table :columns="columnsCategory" :data-source="dataCategoryPet">
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
                        <a-button @click="deleteCategoryPet(record.id)" style="margin: 5px;"><delete-two-tone /></a-button>
                        <a-button @click="showModalUpdateCategoryPet(record.id)"
                            style="margin: 5px;"><edit-two-tone /></a-button>
                    </span>
                </template>
                <template v-else-if="column.key === 'images'">
                    <img :src="`http://localhost:3000/uploads/${record.images}`" alt="Hình ảnh" width="50" height="50" />
                </template>
                <template v-else-if="column.key === 'stt'">
                    <span>{{ record.key }}</span>
                </template>
                <template v-else-if="column.key === 'classify'">
                    <span>{{ record.classify }}</span>
                </template>
            </template>
        </a-table>
    </a-modal>

    <a-modal v-model:visible="modalUpdateCategoryPet" title="Chỉnh sửa thông tin"
        @ok="updateCategoryPet(formUpdateCategoryPet.id)" @cancel="exitModalUpdateCategoryPet" :closable="false">
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

    <a-modal v-model:visible="modalAddPet" width="1000px" title="Thêm thú cưng" :closable="false">
        <template #footer>

        </template>

        <a-form :model="formAddPet" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 18 }" @finish="addPet">
            <div class="row">
                <div class="col-md-4">
                    <a-form-item label="Tên thú cưng" name="name"
                        :rules="[{ required: true, message: 'Vui lòng nhập tên thú cưng!' }]">
                        <a-input v-model:value="formAddPet.name" />
                    </a-form-item>
                </div>
                <div class="col-md-4">
                    <a-form-item name="classify" label="Phân loại" has-feedback
                        :rules="[{ required: true, message: 'Vui lòng chọn phân loại!' }]">
                        <a-select v-model:value="formAddPet.classify" placeholder="Phân loại"
                            @change="handleClassifyChange">
                            <a-select-option value="Chó cảnh">Chó cảnh</a-select-option>
                            <a-select-option value="Mèo cảnh">Mèo cảnh</a-select-option>
                        </a-select>
                    </a-form-item>
                </div>

                <div class="col-md-4">
                    <a-form-item name="category" label="Giống thú" has-feedback
                        :rules="[{ required: true, message: 'Vui lòng chọn giống thú cưng!' }]">
                        <a-select v-model:value="formAddPet.category" placeholder="Chọn giống thú cưng">
                            <a-select-option v-for="breed in breedList" :key="breed._id" :value="breed._id">{{ breed.name
                            }}</a-select-option>
                        </a-select>
                    </a-form-item>
                </div>

            </div>
            <div class="row">
                <div class="col-md-4">
                    <a-form-item name="price" label="Giá" has-feedback
                        :rules="[{ required: true, message: 'Vui lòng nhập giá!' }]">
                        <a-input v-model:value="formAddPet.price" />
                    </a-form-item>
                </div>
                <div class="col-md-4">
                    <a-form-item name="status" label="Trạng thái" has-feedback
                        :rules="[{ required: true, message: 'Vui lòng chọn trạng thái!' }]">
                        <a-select v-model:value="formAddPet.status" placeholder="Chọn trạng thái">
                            <a-select-option value="Hiện">Hiện</a-select-option>
                            <a-select-option value="Ẩn">Ẩn</a-select-option>
                        </a-select>
                    </a-form-item>
                </div>
                <div class="col-md-4">
                    <a-form-item name="sex" label="Giới tính" has-feedback
                        :rules="[{ required: true, message: 'Vui lòng chọn giới tính!' }]">
                        <a-select v-model:value="formAddPet.sex" placeholder="Chọn giới tính">
                            <a-select-option value="Đực">Đực</a-select-option>
                            <a-select-option value="Cái">Cái</a-select-option>
                        </a-select>
                    </a-form-item>
                </div>
                <div class="col-md-4">
                    <a-form-item name="images" label="Hình ảnh" has-feedback
                        :rules="[{ required: true, message: 'Chọn ít nhất 1 hình, tối đa 5 hình!' }]">
                        <a-upload v-model:file-list="formAddPet.images" :max-count="5" list-type="picture">
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
    </a-modal>
</template>
<script>
import TheSider from '../../components/TheSider.vue';
import { defineComponent, ref, onMounted, reactive } from 'vue';
import { DeleteTwoTone, EditTwoTone, UploadOutlined } from '@ant-design/icons-vue';
import Noty from 'noty';
import 'noty/lib/themes/mint.css'
import 'noty/lib/noty.css'

let categoryFilters = ref([]);
const columnsDog = [
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
        key: 'images',
        dataIndex: '',
        title: 'Hình ảnh',
        // customRender: (text, record, index) => {
        //     const firstImageName = text.text.images[0].name;
        //     // const imageSrc = `http://localhost:3000/uploads/${firstImageName}`;
        //     return firstImageName;
        // },

    },
    {
        key: 'name',
        title: 'Tên chó',
        dataIndex: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
        sortDirections: ['descend', 'ascend'],
    },
    {
        key: 'price',
        title: 'Giá',
        dataIndex: 'price',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.age - b.age,
    },
    {
        key: 'category',
        title: 'Giống chó',
        dataIndex: 'category',
        filters: [],
        filterMultiple: false,
        onFilter: (value, record) => record.category === value,

    },
    {
        key: 'sex',
        title: 'Giới tính',
        dataIndex: 'sex',
        filters: [
            {
                text: 'Đực',
                value: 'Đực',
            },
            {
                text: 'Cái',
                value: 'Cái',
            },
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.sex === value,
        sorter: (a, b) => a.sex.localeCompare(b.sex),
        sortDirections: ['descend', 'ascend'],
    },

    {
        key: 'status',
        title: 'Trạng thái',
        dataIndex: 'status',
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
    },
    {
        key: 'setting',
        title: 'Tùy chọn',

    }
];
const columnsCat = [
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
        key: 'images',
        dataIndex: '',
        title: 'Hình ảnh',
        // customRender: (text, record, index) => {
        //     const firstImageName = text.text.images[0].name;
        //     // const imageSrc = `http://localhost:3000/uploads/${firstImageName}`;
        //     return firstImageName;
        // },

    },
    {
        key: 'name',
        title: 'Tên mèo',
        dataIndex: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
        sortDirections: ['descend', 'ascend'],
    },
    {
        key: 'price',
        title: 'Giá',
        dataIndex: 'price',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.age - b.age,
    },
    {
        key: 'category',
        title: 'Giống mèo',
        dataIndex: 'category',
        filters: [],
        filterMultiple: false,
        onFilter: (value, record) => record.category === value,

    },
    {
        key: 'sex',
        title: 'Giới tính',
        dataIndex: 'sex',
        filters: [
            {
                text: 'Đực',
                value: 'Đực',
            },
            {
                text: 'Cái',
                value: 'Cái',
            },
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.sex === value,
        sorter: (a, b) => a.sex.localeCompare(b.sex),
        sortDirections: ['descend', 'ascend'],
    },

    {
        key: 'status',
        title: 'Trạng thái',
        dataIndex: 'status',
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
    },
    {
        key: 'setting',
        title: 'Tùy chọn',

    }
];
const columnsCategory = [{
    title: 'STT',
    key: 'stt',
    customRender: (text, record, index) => {
        const stt = text.renderIndex;
        // console.log(stt + 1);
        const STT = stt + 1;
        return STT
    },
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
const dataDog = ref([]);
const dataCat = ref([]);

export default defineComponent({
    components: {
        TheSider,
        DeleteTwoTone,
        EditTwoTone,
        UploadOutlined
    },
    setup() {
        const getDogAPI = () => {
            const serverUrl = 'http://localhost:3000/admin/quan-ly-san-pham/getAllDog';
            axios.get(serverUrl)
                .then((response) => {
                    const dataWithSTT = response.data.map((item, index) => ({
                        ...item,

                        stt: index + 1,
                        originalIndex: index
                    }));
                    dataDog.value = dataWithSTT;
                    console.log(dataWithSTT);

                    const uniqueCategories = [...new Set(dataWithSTT.map(item => item.category))];
                    categoryFilters.value = uniqueCategories.map(category => ({
                        text: category,
                        value: category,
                    }));
                    const categoryColumn = columnsDog.find(col => col.dataIndex === 'category');
                    // console.log(categoryColumn);
                    if (categoryColumn) {
                        categoryColumn.filters = categoryFilters.value;
                    }
                    dataWithSTT.forEach(item => {
                        console.log(`Thông tin hình ảnh chó ${item.id}:`);
                        item.images.forEach(image => {
                            console.log('Tên ảnh:', image.name);
                            console.log('petid:', image.petid);
                        });
                    });
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
        }
        const getCatAPI = () => {
            const serverUrl = 'http://localhost:3000/admin/quan-ly-san-pham/getAllCat';
            axios.get(serverUrl)
                .then((response) => {
                    const dataWithSTT = response.data.map((item, index) => ({
                        ...item,

                        stt: index + 1,
                        originalIndex: index
                    }));
                    dataCat.value = dataWithSTT;
                    console.log(dataWithSTT);

                    const uniqueCategories = [...new Set(dataWithSTT.map(item => item.category))];
                    categoryFilters.value = uniqueCategories.map(category => ({
                        text: category,
                        value: category,
                    }));
                    const categoryColumn = columnsCat.find(col => col.dataIndex === 'category');
                    // console.log(categoryColumn);
                    if (categoryColumn) {
                        categoryColumn.filters = categoryFilters.value;
                    }
                    dataWithSTT.forEach(item => {
                        console.log(`Thông tin hình ảnh mèo ${item.id}:`);
                        item.images.forEach(image => {
                            console.log('Tên ảnh:', image.name);
                            console.log('petid:', image.petid);
                        });
                    });
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
        }
        const loadTabContentDog = () => {
            console.log('chó')
            getDogAPI();
        }
        const loadTabContentCat = () => {
            console.log('mèo')
            getCatAPI();
        }
        onMounted(() => {
            loadTabContentDog();
            loadTabContentCat();
        })
        const onChange = (pagination, filters, sorter) => {
            console.log('params', pagination, filters, sorter);
        };
        const activeKey = ref('1');
        const deletePet = (id) => {
            console.log("Xóa: " + id);
            const serverUrl = `http://localhost:3000/admin/quan-ly-san-pham/deletePet/${id}`;
            axios.delete(serverUrl)
                .then(response => {
                    console.log('Xóa dữ liệu thành công!')
                    if (response.data.message == "Xóa thành công") {
                        new Noty({
                            text: 'Xóa thú cưng thành công!',
                            type: 'success',
                            layout: 'topRight',
                            theme: 'mint',
                            timeout: 3000,
                            callbacks: {
                                afterShow: function () {
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
        const modalAddCategoryPet = ref(false)
        const showModalAddCateogryPet = () => {
            modalAddCategoryPet.value = true
        }
        const layout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 14,
            },
        };
        const formAddCategory = reactive({
            name: '',
            classify: '',
            status: '',

        });
        const layoutModal = {
            labelCol: {
                span: 7,
            },
            wrapperCol: {
                span: 16,
            },
        }
        const fileList = ref([]);
        const addCategoryPet = () => {
            const newCategoryData = {
                name: formAddCategory.name,
                classify: formAddCategory.classify,
                status: formAddCategory.status,
                images: formAddCategory.images,
            }
            console.log("Dữ liệu gửi đi: ", newCategoryData);
            const serverUrl = 'http://localhost:3000/admin/quan-ly-san-pham/addCategoryPet';
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
            const serverUrl = 'http://localhost:3000/admin/quan-ly-san-pham/getCategoryPet';
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
            const serverUrl = `http://localhost:3000/admin/quan-ly-san-pham/deleteCategoryPet/${id}`;
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
        const modalListCategoryPet = ref(false)
        const showModalListCategoryPet = () => {
            modalListCategoryPet.value = true;
        }

        const formUpdateCategoryPet = ref([]);
        const selectedItem = ref(null);
        const modalUpdateCategoryPet = ref(false)
        const fileImageUpdate = ref([]);
        const showModalUpdateCategoryPet = (id) => {
            modalUpdateCategoryPet.value = true
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
                const serverUrl = `http://localhost:3000/admin/quan-ly-san-pham/updateCategoryPet`;
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


        const exitModalUpdateCategoryPet = () => {
            modalUpdateCategoryPet.value = false;
        }

        const modalAddPet = ref(false)
        const showModalAddPet = () => {
            modalAddPet.value = true
        }

        /// add pet 
        const formAddPet = reactive({
            classify: ref('Phân loại'), 
            category: ref('Chọn giống thú cưng') 
        })
        const breedList = ref([]);
        const handleClassifyChange = () => {
            if (formAddPet.classify === 'Chó cảnh') {
                callDogAPI();
                console.log('chó');
                formAddPet.category = ref('Chọn giống chó cảnh');
            } else if (formAddPet.classify === 'Mèo cảnh') {
                callCatAPI();
                console.log('mèo');
                formAddPet.category = ref('Chọn giống mèo cảnh');
            }
        };
        const callDogAPI = () => {
            const serverUrlDog = 'http://localhost:3000/admin/quan-ly-san-pham/getCategoryDogToSelect';
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
            const serverUrlCat = 'http://localhost:3000/admin/quan-ly-san-pham/getCategoryCatToSelect';
            axios.get(serverUrlCat)
            .then((response) => {
                breedList.value = response.data;
                console.log(response.data)
            })
            .catch((error) => {
                console.error('Error:', error);
            })
        }
        const addPet = () => {
            const formData = {
                name: formAddPet.name,
                classify: formAddPet.classify,
                category: formAddPet.category,
                status: formAddPet.status,
                sex: formAddPet.sex,
                price: formAddPet.price,
                images: formAddPet.images,

            }
            console.log('Dữ liệu gửi đi:', formData);
            const serverUrl = 'http://localhost:3000/admin/quan-ly-san-pham/addPet';
            axios.post(serverUrl, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
            })
            .then((response) => {
                console.log('Phản hồi từ server:', response.data);
                console.log('Thêm thú cưng thành công!');
                new Noty({
                            text: 'Thêm thú cưng thành công!',
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
                console.error('Không kết nối được đến máy chủ');
            })
        };



        return {
            activeKey,
            dataDog,
            dataCat,
            columnsDog,
            columnsCat,
            onChange,
            loadTabContentDog,
            loadTabContentCat,
            categoryFilters,
            deletePet,
            showModalAddCateogryPet,
            modalAddCategoryPet,
            layout,
            formAddCategory,
            dataCategoryPet,
            addCategoryPet,
            deleteCategoryPet,
            showModalListCategoryPet,
            modalListCategoryPet,
            columnsCategory,
            showModalUpdateCategoryPet,
            modalUpdateCategoryPet,
            formUpdateCategoryPet,
            layoutModal,
            exitModalUpdateCategoryPet,
            fileList,
            fileImageUpdate,
            updateCategoryPet,
            showModalAddPet,
            modalAddPet,
            formAddPet,
            addPet,
            handleClassifyChange,
            breedList


        }
    }
})

</script>