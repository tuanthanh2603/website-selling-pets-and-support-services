<template>
    <div class="container">
        <div class="row">
            <div class="col-md-2 col-md-offset-2">
                <TheMenu/>
            </div>

            <!-- Body -->
            <div class="col-md-10">
                <div class="container-fluid mt-3">
                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h6 class="h3 mb-0 text-gray-800" style="font-size: 22px;">Dịch vụ hỗ trợ</h6>
                    </div>
                </div>

                <div class="container">
                    <div class="row mb-2">
                        <div class="col-md-2">
                            <a-button type="primary" @click="showModalCreateService">Đăng kí dịch vụ</a-button>
                        </div>
                            <a-modal v-model:visible="modalCreateService" v-bind="layoutFormAddService" width="1000px" title="Đăng ký dịch vụ" @finish="createService">
                                <!-- Create Service Form -->
                                <a-form :model="formCreateService" v-bind="layoutFormCreateService" name="nest-messages" @finish="createService">
                                  <!-- Form điền thông tin -->
                                  <a-form-item name="name" label="Tên khách hàng" :rules="[{ required: true, message: 'Vui lòng nhập tên khách hàng!' }]">
                                      <a-input v-model:value="formCreateService.name" />
                                  </a-form-item>                      
                                  <a-form-item name="phone" label="Số điện thoại" :rules="[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]">
                                      <a-input v-model:value="formCreateService.phone" />
                                  </a-form-item>
                                  <a-form-item name="petName" label="Tên thú cưng" :rules="[{ required: true, message: 'Vui lòng nhập tên thú cưng!' }]">
                                      <a-input v-model:value="formCreateService.petName" />
                                  </a-form-item>
                                  <a-form-item name="createdDate" label="Ngày khởi tạo" >
                                    <a-date-picker
                                      v-model:value="value1"
                                      format="YYYY-MM-DD"
                                      :disabled-date="disabledDate"
                                    />
                                  </a-form-item>
                                  <!-- Form điền thông tin !-->

                                  <!-- Table các loại dịch vụ -->

                                  <!-- Table các loại dịch vụ -->
               
                                  <a-form-item :wrapper-col="{ span: 14, offset: 8 }">
                                      <a-alert style="margin-bottom: 20px;" v-if="alertInfoService" :message="alertInfoService.message"
                                      :type="alertInfoService.type" show-icon />

                                      <a-button block type="primary" html-type="submit" style="margin-bottom: 10px;">Đăng kí dịch vụ</a-button>

                                      <a-button block @click="exitModalCreateService">Thoát</a-button>
                                  </a-form-item>

                              </a-form>
                              <template #footer>
                                  
                              </template>
                            </a-modal>
                  </div>

                    
            </div>

            <!-- Table -->
            <a-table :columns="columns" :data-source="data" class="components-table-demo-nested">
                <template #expandedRowRender>
                  <a-timeline>
                    <a-timeline-item>Tạo dịch vụ thành công. (4:00 AM - 28/11/2023)  </a-timeline-item>
                    <a-timeline-item color="green">Xác nhận dịch vụ thành công. (4:10 AM - 28/11/2023)</a-timeline-item>
                    <a-timeline-item>
                      <template #dot><ClockCircleOutlined style="font-size: 16px" /></template>
                      Chờ nhận thú cưng.
                    </a-timeline-item>
                    <a-timeline-item color="red">Nhận thú cưng thất bại. (5:00 PM - 30/11/2023)</a-timeline-item>
                    <a-timeline-item color="red">Dịch vụ bị hủy. (5:00 PM - 30/11/2023)</a-timeline-item>

                  </a-timeline>
                </template>
            </a-table>
            <!-- Table -->
            </div>
        </div>
    </div>
</template>

<script>
import TheMenu from './TheMenu.vue';
import dayjs from 'dayjs';
import { ClockCircleOutlined } from '@ant-design/icons-vue';
import { DownOutlined } from '@ant-design/icons-vue'
import { defineComponent, ref } from 'vue';
export default defineComponent({
    components:{
        TheMenu,
        DownOutlined,
        ClockCircleOutlined,
    },
    setup() {
        //Thêm thông tin dịch vụ
        const modalCreateService = ref(false)
        const showModalCreateService = () => {
            modalCreateService.value = true
        }
        const formCreateService = ref({
            name: '',
            phone: '',
            petName: '',
            serviceType: '',
            time: '',
        });
        const alertInfoService = ref({ message: 'Vui lòng nhập thông tin dịch vụ', type: 'info' });
        const exitModalCreateService = () => {
            modalCreateService.value = false
        }
        const layoutFormCreateService = {
            labelCol: {
                span: 7,
            },
            wrapperCol: {
                span: 16,
            },
        }
        //time
        const disabledDate = current => {
          // Can not select days before today and today
          return current && current < dayjs().endOf('day');
        };
        return {
            data,
            columns,
            innerColumns,
            innerData,
            modalCreateService,
            showModalCreateService,
            formCreateService,
            alertInfoService,
            exitModalCreateService,
            layoutFormCreateService,
            disabledDate,
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
  });
}

</script>


