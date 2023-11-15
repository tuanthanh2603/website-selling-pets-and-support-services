<template>
    <div class="row">
        <div class="col-md-2">
            <TheSider />
        </div>
        <div class="col-md-10">
            <div class="container-fluid mt-3">
                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                    <h6 class="h3 mb-0 text-gray-800" style="font-size: 24px;">Danh sách khách hàng</h6>
                </div>
                <div class="container">
                    <!-- <a-table :columns="columnsClient" :data-source="dataClient" @change="onChange" >
                        <template #headerCell="{ column }">
                            <template v-if="column.key === 'name'">
                                <span>
                                    Tên khách hàng
                                </span>
                            </template>
                        </template>
                        <template #bodyCell="{ column, record }">
                            <template v-if="column.key === 'name'">
                                
                                    {{ record.name }}
                                
                            </template>
                            <template v-else-if="column.key === 'phone'">
                                
                                {{ record.phone }}
                                
                            </template>
                            <template v-else-if="column.key === 'email'">
                                
                                {{ record.email }}
                                
                            </template>
                            <template v-else-if="column.key === 'sex'">
                                
                                    {{ record.sex }}
                                
                            </template>
                           
                            
                            <template v-else-if="column.key === 'stt'">
                                
                            </template>
                            <template v-else-if="column.key === 'setting'">
                                <span>
                                    {{ record.id }}
                                </span>
                                
                                
                            </template>
                        </template>
                    </a-table> -->
                    <a-table :data-source="data" :columns="columns">
                        <template #headerCell="{ column }">
                            <template v-if="column.key === 'setting'">
                                <span style="color: #1890ff">Tùy chọn</span>
                            </template>

                        </template>
                        <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
                            <div style="padding: 8px">
                                <a-input ref="searchInput" :placeholder="`Search ${column.dataIndex}`"
                                    :value="selectedKeys[0]" style="width: 188px; margin-bottom: 8px; display: block"
                                    @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                                    @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)" />
                                <a-button type="primary" size="small" style="width: 90px; margin-right: 8px"
                                    @click="handleSearch(selectedKeys, confirm, column.dataIndex)">
                                    <template #icon>
                                        <SearchOutlined />
                                    </template>
                                    Search
                                </a-button>
                                <a-button size="small" style="width: 90px" @click="handleReset(clearFilters)">
                                    Reset
                                </a-button>
                            </div>
                        </template>
                        <template #customFilterIcon="{ filtered }">
                            <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
                        </template>
                        <template #bodyCell="{ text, column, record }">
                            <span v-if="searchText && searchedColumn === column.dataIndex">
                                <template v-for="(fragment, i) in text
                                    .toString()
                                    .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))">
                                    <mark v-if="fragment.toLowerCase() === searchText.toLowerCase()" :key="i"
                                        class="highlight">
                                        {{ fragment }}
                                    </mark>
                                    <template v-else>{{ fragment }}</template>
                                </template>

                            </span>
                            <a v-if="column.key === 'setting'">
                                <a-button @click="selectItem(record.id)" data-bs-toggle="modal"
                                    data-bs-target="#modal-info"><setting-outlined /></a-button>
                            </a>
                        </template>


                    </a-table>

                    <div class="modal fade" id="modal-info" tabindex="-1" role="dialog" aria-labelledby="modal-info"
                        aria-hidden="true">
                        <div class="modal-dialog " role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h6 class="modal-title" id="modal-title-default">Thông tin khách hàng</h6>

                                </div>
                                <div class="modal-body">
                                    <a-tabs v-model:activeKey="activeKey">
                                        <a-tab-pane key="1">
                                            <template #tab>
                                                <span>
                                                    <user-outlined />
                                                    Thông tin
                                                </span>
                                            </template>
                                           
                                            <a-form :model="formInfo" name="basic" :label-col="{ span: 7 }"
                                                :wrapper-col="{ span: 16 }" autocomplete="off" @finish="updateInfoClient"
                                                @finishFailed="onFinishFailed">
                                                <a-form-item label="ID" name="id" >
                                                    <a-input v-model:value="formInfo.id" />
                                                </a-form-item>
                                                <a-form-item label="Tên khách hàng" name="name"
                                                    :rules="[{ required: true, message: 'Không để trống tên!' }]">
                                                    <a-input v-model:value="formInfo.name" />
                                                </a-form-item>
                                                <a-form-item label="Số điện thoại" name="phone" >
                                                    <a-input v-model:value="formInfo.phone" />
                                                </a-form-item>
                                                <a-form-item label="Email" name="email" >
                                                    <a-input v-model:value="formInfo.email" />
                                                </a-form-item>
                                                <a-form-item label="Mật khẩu" name="pass" >
                                                    <a-input v-model:value="formInfo.pass" />
                                                </a-form-item>
                                                <a-form-item label="Giới tính" name="sex" >
                                                    <a-radio-group v-model:value="formInfo.sex">
                                                        <a-radio value="Nam">Nam</a-radio>
                                                        <a-radio value="Nữ">Nữ</a-radio>
                                                        <a-radio value="Khác">Khác</a-radio>
                                                    </a-radio-group>
                                                </a-form-item>
                                                <a-form-item :wrapper-col="{ offset: 7, span: 16 }">
                                                    <a-button type="primary" html-type="submit">Lưu thông tin</a-button>
                                                </a-form-item>
                                            </a-form>
                                        </a-tab-pane>
                                        <a-tab-pane key="2">
                                            <template #tab>
                                                <span>
                                                    <profile-outlined />
                                                    Đơn hàng
                                                </span>
                                            </template>
                                            Tab 2
                                        </a-tab-pane>
                                    </a-tabs>
                                </div>

                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>
</template>

<script>

import TheSider from '../../components/TheSider.vue';
import { SearchOutlined, SettingOutlined, UserOutlined, ProfileOutlined } from '@ant-design/icons-vue';
import axios from 'axios';
import { defineComponent, ref, onMounted, reactive, toRefs } from 'vue';


const data = ref([]);



export default defineComponent({
    components: {
        TheSider, SearchOutlined, SettingOutlined, UserOutlined, ProfileOutlined
    },
    setup() {

        onMounted(() => {
            const serverUrl = 'http://localhost:3000/admin/quan-ly-khach-hang/';
            axios.get(serverUrl)
                .then((response) => {

                    data.value = response.data.map((item, index) => ({

                        name: item.name,
                        phone: item.phone,
                        email: item.email,
                        sex: item.sex,
                        pass: item.pass,
                        id: item._id.toString(),


                    }))
                    console.log(response.data)
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
        });
        const onChange = (pagination, filters, sorter) => {
            console.log('params', pagination, filters, sorter);
        };
        const columns = [{
            title: 'STT',
            key: 'stt',
            customRender: (text, record, index) => {
                const stt = text.renderIndex;
                // console.log(stt + 1);
                const STT = stt + 1;
                return STT
            },
        }, {
            title: 'Tên khách hàng',
            dataIndex: 'name',
            key: 'name',
            customFilterDropdown: true,
            onFilter: (value, record) => record.name.toString().toLowerCase().includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: visible => {
                if (visible) {
                    setTimeout(() => {
                        searchInput.value.focus();
                    }, 100);
                }
            },
        }, {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            customFilterDropdown: true,
            onFilter: (value, record) => record.phone.toString().toLowerCase().includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: visible => {
                if (visible) {
                    setTimeout(() => {
                        searchInput.value.focus();
                    }, 100);
                }
            },
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Giới tính',
            dataIndex: 'sex',
            key: 'sex',
        },
        {
            title: 'Tùy chọn',
            dataIndex: 'id',
            key: 'setting',

        },];

        const handleSearch = (selectedKeys, confirm, dataIndex) => {
            confirm();
            state.searchText = selectedKeys[0];
            state.searchedColumn = dataIndex;
        };
        const handleReset = clearFilters => {
            clearFilters({
                confirm: true,
            });
            state.searchText = '';
        };
        const searchInput = ref();
        const state = reactive({
            searchText: '',
            searchedColumn: '',
        });


        const recordId = ref(null);
        
        const selectItem = (id) => {
            try {
                recordId.value = id;
                const selectedCustomer = data.value.find(item => item.id === id)
                formInfo.id = selectedCustomer.id
                formInfo.name = selectedCustomer.name
                formInfo.phone = selectedCustomer.phone
                formInfo.email = selectedCustomer.email
                formInfo.pass = selectedCustomer.pass
                formInfo.sex = selectedCustomer.sex
            } catch (error) {
                console.error("Lỗi xử lý sự kiện: " + error.message);
            }

        };
        const formInfo = reactive({
            
        })
        const updateInfoClient = values => {
            console.log('Success:', values);
            const serverUrl = 'http://localhost:3000/admin/quan-ly-khach-hang/updateInfoClient'
            axios.put(serverUrl, values)
            .then((response) => {
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
                console.error('Error:', error);
            })
        };
        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };

        return {
            selectItem,
            recordId,
            onChange,
            data,
            columns,
            handleSearch,
            handleReset,
            searchInput,
            ...toRefs(state),
            activeKey: ref('1'),
            formInfo,
            updateInfoClient,
            onFinishFailed, 





        }
    }
})
</script>