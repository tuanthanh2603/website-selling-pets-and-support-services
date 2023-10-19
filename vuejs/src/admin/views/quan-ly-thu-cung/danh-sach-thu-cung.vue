<template>
    <div id="wrapper">
        <TheSider />
        <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
                <div class="container-fluid mt-3">
                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h6 class="h3 mb-0 text-gray-800" style="font-size: 24px;">Danh sách thú cưng</h6>
                    </div>

                    <div class="container">
                        <a-tabs v-model:activeKey="activeKey">
                            <a-tab-pane key="1" tab="Danh sách chó cảnh" @click="loadTabContentDog('1')">
                                <a-table :columns="columnsDog" :data-source="dataDog" @change="onChange" >
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
                                            
                                                22
                                            
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
                                            <img :src="`http://localhost:3000/uploads/${record.images[0].name}`" :alt="`${record.images[0]._id}`" height="80" width="80">
                                            <!-- {{ record.images[0].name }} -->
                                        </template>
                                        <template v-else-if="column.key === 'stt'">
                                            
                                        </template>
                                        <template v-else-if="column.key === 'setting'">
                                            <span>
                                                <a-button @click="deleteData(record.id)"><delete-two-tone /></a-button>
                                                &nbsp;
                                                <a-button ><edit-two-tone /></a-button>
                                            </span>
                                            
                                           
                                        </template>
                                    </template>
                                </a-table>
                            </a-tab-pane>
                            <a-tab-pane key="2" tab="Danh sách mèo cảnh" @click="loadTabContentCat('2')">
                                <a-table :columns="columnsCat" :data-source="dataCat" @change="onChange" >
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
                                            
                                                22
                                            
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
                                            <img :src="`http://localhost:3000/uploads/${record.images[0].name}`" :alt="`${record.images[0]._id}`" height="80" width="80">
                                            <!-- {{ record.images[0].name }} -->
                                        </template>
                                        <template v-else-if="column.key === 'stt'">
                                            
                                        </template>
                                        <template v-else-if="column.key === 'setting'">
                                            <span>
                                                <a-button @click="deleteData(record.id)"><delete-two-tone /></a-button>
                                                &nbsp;
                                                <a-button ><edit-two-tone /></a-button>
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
    </div>
</template>
<script>
import TheSider from '../../components/TheSider.vue';
import { defineComponent, ref, onMounted } from 'vue';
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons-vue';
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
        dataIndex: '',
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
        dataIndex: '',
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


const dataDog = ref([]);

const dataCat = ref([]);

export default defineComponent({
    components: {
        TheSider,
        DeleteTwoTone,
        EditTwoTone
    },
    setup() {
        const deleteData = (id) => {
            console.log("Xóa: " + id);
            const serverUrl = `http://localhost:3000/admin/danh-sach-thu-cung/deletePet/${id}`;
            axios.delete(serverUrl)
            .then(response => {
                console.log('Xóa dữ liệu thành công!')
                if(response.data.message == "Xóa thành công") {
                    new Noty({
                            text: 'Xóa thú cưng thành công!',
                            type: 'success',
                            layout: 'topRight',
                            theme: 'mint', 
                            timeout: 3000,
                            callbacks: {
                                afterShow: function() {
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
        
        
        const getDogAPI = () => {
            const serverUrl = 'http://localhost:3000/admin/danh-sach-thu-cung/getDog';
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
            const serverUrl = 'http://localhost:3000/admin/danh-sach-thu-cung/getCat';
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
            console.log(activeKey.value)
        })

        const onChange = (pagination, filters, sorter) => {
            console.log('params', pagination, filters, sorter);
        };
        const activeKey = ref('1');
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
            deleteData,
            
            
        }
    }
})
</script>