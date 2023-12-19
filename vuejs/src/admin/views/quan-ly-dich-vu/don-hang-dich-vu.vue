<template>
    <div class="row">
        <div class="col-md-2">
            <TheSider />
        </div>
        <div class="col-md-10">
            <div class="container-fluid mt-3">
                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                    <h6 class="h3 mb-0 text-gray-800" style="font-size: 24px;">Danh sách dịch vụ</h6>
                </div>
                <div class="container">
                    <div class="row mb-2">
                        <div class="col-md-2">
                            <a-button type="primary" @click="showModalAddService">Thêm dịch vụ mới</a-button>
                        </div>
                    </div>

                    <a-table :columns="columnsOrdersService" :data-source="dataOrdersService">
                        <template #bodyCell="{ column, record }">
                            <template v-if="column.key === 'name'">
                                {{ record.name }}
                            </template>

                            <template v-if="column.key === 'phone'">
                                {{ record.phone }}
                            </template>

                            <template v-if="column.key === 'petName'">
                                {{ record.petName }}
                            </template>

                            <template v-else-if="column.key === 'service_selected'">
                                {{ record.service_selected }}
                            </template>

                            <template v-else-if="column.key === 'total_price'">
                                {{ record.total_price }}
                            </template>

                            <template v-else-if="column.key === 'payment'">
                                {{ record.payment }}
                            </template>

                            <template v-else-if="column.key === 'stt'">
                            </template>

                            <template v-else-if="column.key === 'setting'">
                                <span>
                                    <a-button @click="deleteService(record.id)" style="margin: 5px;"><delete-two-tone /></a-button>
                                    <a-button @click="showModalUpdateService(record.id)"
                                        style="margin: 5px;"><edit-two-tone /></a-button>
                                </span>
                            </template>
                        </template>
                    </a-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TheSider from '../../components/TheSider.vue';
import { SettingOutlined, DeleteTwoTone, EditTwoTone, UploadOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref, onMounted,  reactive} from 'vue';
import axios from 'axios';
import Noty from 'noty';
import 'noty/lib/themes/mint.css'
import 'noty/lib/noty.css'

//Tên cột
const columnsOrdersService = [
    {    
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
        key: 'name',
        dataIndex: 'name',
    }, {
        title: 'Số điện thoại',
        key: 'phone',
        dataIndex: 'phone',
    }, {
        title: 'Tên thú cưng',
        key: 'petName',
        dataIndex: 'petName',
    }, {
        title: 'Dịch vụ đã đăng ký',
        key: 'selectedService',
        dataIndex: 'selectedService',
    }, {
        title: 'Tổng tiền',
        key: 'total_price',
        dataIndex: 'total_price',
    }, {
        title: 'Trạng thái thanh toán',
        key: 'payment',
        dataIndex: 'payment',
    }, {
        title: 'Tuỳ chọn',
        key: 'setting',
    }
]

export default defineComponent({
    components: {
        TheSider,
        SettingOutlined,
        DeleteTwoTone,
        EditTwoTone,
        UploadOutlined
    },
    setup() {
        const dataOrdersService = ref([]);
        onMounted(() => {
            const serverUrl = 'http://localhost:3000/admin/quan-ly-dich-vu/getAllOrdersService';
            axios.get(serverUrl)
                .then((response) => {
                    dataOrdersService.value = response.data.map((item, index) => ({
                        key: index +1,
                        name: item.name,
                        phone: item.phone,
                        petName: item.petName,
                        selectedService: item.service_selected,
                        total_price: item.total_price,
                        payment: item.payment,
                        id: item._id.toString(),
                    }))
                    console.log(response.data);
                    console.log(dataOrdersService.value);
                }) .catch ((error) => {
                    console.log("Error: ", error);
                })
        })

        return {
            dataOrdersService,
            columnsOrdersService,
        }
}
})

</script>