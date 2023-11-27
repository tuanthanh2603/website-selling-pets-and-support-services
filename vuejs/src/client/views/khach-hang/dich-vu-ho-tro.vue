<template>
    <div class="container">
        <div class="row">
            <div class="col-md-2 col-md-offset-2">
                <TheMenu/>
            </div>

            <!-- Body -->
            <div class="col-md-10">
                <div class="container mt-3">
                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h6 class="h3 mb-0 text-gray-800" style="font-size: 22px;">Dịch vụ hỗ trợ</h6>
                    </div>
                </div>

                <div class="container">
                    <div class="row mb-2">
                        <div class="col-md-2">
                            <a-button type="primary" @click="showModal">Thêm dịch vụ</a-button>
                            <a-modal v-model:visible="visible" width="1000px" title="Thêm dịch vụ" @ok="handleOk">
                                
                                <!-- Table Create Service -->
                                <a-table :columns="columnsUser" :data-source="dataUser">
                                    <template #headerCell="{ column }">
                                        <template v-if="column.key === 'name'">
                                            <span>
                                                Họ và tên
                                            </span>
                                        </template>
                                    </template>
                                </a-table>
                            </a-modal>
                        </div>
                    </div>

                    
            </div>

            <!-- Table -->
            <a-table :columns="columns" :data-source="data" class="components-table-demo-nested">
                <template #expandedRowRender>
                    <a-table :columns="innerColumns" :data-source="innerData" :pagination="false">
                        <template #bodyCell="{ column }">
                            <template v-if="column.key === 'state'">
                                <span>
                                    <a-badge status="success" />
                                        Hoàn thành
                                </span>
                            </template>
                        </template>
                    </a-table>
                </template>
            </a-table>
            </div>
        </div>
    </div>
</template>

<script>
import TheMenu from './TheMenu.vue';
import { DownOutlined } from '@ant-design/icons-vue'
import { defineComponent, ref } from 'vue';
export default defineComponent({
    components:{
        TheMenu
    },
    setup() {
        const visible = ref(false);
        const showModal = () => {
            visible.value = true;
        };
        const handleOk = e => {
            console.log(e);
            visible.value = false;
        };
        return {
            data,
            columns,
            innerColumns,
            innerData,
            visible,
            showModal,
            handleOk,
        };
    },
})

//Column Service
const columns = [{
  title: 'Họ và Tên',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Số điện thoại',
  dataIndex: 'phone',
  key: 'phone',
}, {
  title: 'Tên thú cưng',
  dataIndex: 'petName',
  key: 'petName',
}, {
  title: 'Loại dịch vụ',
  dataIndex: 'serviceName',
  key: 'serviceName',
}, {
  title: 'Người tạo',
  dataIndex: 'creator',
  key: 'creator',
}, {
  title: 'Thời gian khởi tạo',
  dataIndex: 'createdAt',
  key: 'createdAt',
}];
const data = [];
for (let i = 0; i < 3; ++i) {
  data.push({
    key: i,
    name: `Peter ${i + 1}`,
    phone: '123123123',
    petName: 'Lucky',
    serviceName: 'Cắt / tỉa lông',
    creator: 'Tên nhân viên / Peter',
    createdAt: '2014-12-24 23:12:00',
  });
}
const innerColumns = [{
  title: 'Thời gian khởi tạo',
  dataIndex: 'date',
  key: 'date',
}, {
  title: 'Quá trình',
  dataIndex: 'process',
  key: 'process',
}, {
  title: 'Tiến độ công việc',
  key: 'state',
}];
const innerData = [];
for (let i = 0; i < 3; ++i) {
  innerData.push({
    key: i,
    date: '2014-12-24 23:12:00',
    process: `Đã nhận thú cưng ${i + 1}`,
    upgradeNum: 'Upgraded: 56',
  });
}

</script>


