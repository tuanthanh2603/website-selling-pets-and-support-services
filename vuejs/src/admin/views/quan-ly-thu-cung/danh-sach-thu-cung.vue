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
                            <a-tab-pane key="1" tab="Danh sách chó cảnh" @click="loadTabContent('1')">
                                <a-table :columns="columns" :data-source="data1" @change="onChange" />
                            </a-tab-pane>
                            <a-tab-pane key="2" tab="Danh sách mèo cảnh" force-render @click="loadTabContent('2')">
                                <a-table :columns="columns" :data-source="data2" @change="onChange" />
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
let categoryFilters = ref([]); 
let sttCounter = 1;
const columns = [
    {
        title: 'STT',
        customRender: (text, record, index) => {
            const stt = text.renderIndex;
            console.log(stt + 1);
            const STT = stt + 1;
            return STT
        },
    },
    {
        title: 'Hình ảnh',
        dataIndex: 'age',

    },
    {
        title: 'Tên chó',
        dataIndex: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name), // Sắp xếp dựa trên tên chó
        sortDirections: ['descend', 'ascend'],
        

    },
    {
        title: 'Giá',
        dataIndex: 'age',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.age - b.age,
    },
    {
        title: 'Giống chó',
        dataIndex: 'category',
        filters: [], 
        filterMultiple: false,
        onFilter: (value, record) => record.category === value,
        
    },
    {
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
    }
];


const data1 = ref([]);

const data2 = [];

export default defineComponent({
    components: {
        TheSider
    },
    setup() {
        
        const getDogAPI = () => {
            const serverUrl = 'http://localhost:3000/admin/danh-sach-thu-cung/getDog';
            axios.get(serverUrl)
                .then((response) => {
                    
                    const dataWithSTT = response.data.map((item, index) => ({
                        ...item,
                        
                        stt: index + 1,
                        originalIndex: index
                    }));
                    
                    

                    data1.value = dataWithSTT;
                    console.log(dataWithSTT);

                    const uniqueCategories = [...new Set(dataWithSTT.map(item => item.category))];
                    categoryFilters.value = uniqueCategories.map(category => ({
                        text: category,
                        value: category,
                    }));

                    const categoryColumn = columns.find(col => col.dataIndex === 'category');
                    console.log(categoryColumn);
                    if (categoryColumn) {
                        categoryColumn.filters = categoryFilters.value;
                    }
                    
                    
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
        }
        
        const getCatAPI = () => {
            const serverUrl = 'http://localhost:3000/admin/danh-sach-thu-cung/getCat';
            axios.get(serverUrl)
                .then((response) => {
                    breedList.value = response.data;
                    console.log(response.data)
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
        }
        const loadTabContent = (activeKey) => {
            if (activeKey === "1") {
                getDogAPI();
            } else if (activeKey === "2") {
                getCatAPI();
            }
        }
        onMounted(() => {
            loadTabContent(activeKey.value);
        })

        const onChange = (pagination, filters, sorter) => {
            console.log('params', pagination, filters, sorter);
        };
        const activeKey = ref('1');
        return {
            activeKey,
            data1,
            data2,
            columns,
            onChange,
            loadTabContent,
            categoryFilters
            
        }
    }
})
</script>