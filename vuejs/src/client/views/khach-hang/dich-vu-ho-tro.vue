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
                                  <a-form-item name="name" label="Tên khách hàng" :rules="[nameRule]">
                                      <a-input v-model:value="formCreateService.name" />
                                  </a-form-item>                      
                                  <a-form-item name="phone" label="Số điện thoại" :rules="[phoneRule]">
                                      <a-input v-model:value="formCreateService.phone" />
                                  </a-form-item>
                                  <a-form-item name="petName" label="Tên thú cưng" :rules="[petNameRule]">
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

                                  <!-- Thông báo tổng tiền -->
                                  <a-alert :message="alertTotalPrice.message" :type="alertTotalPrice.type" show-icon>
                                    <template #icon><smile-outlined /></template>
                                  </a-alert>

                                  <!-- Table các loại dịch vụ -->
                                  <a-table :columns="columnsServices" :data-source="dataServices" :row-selection="rowSelection">
                                    <template #bodyCell="{ column, record }">
                                      <template v-if="column.key === 'name'">
                                          {{ record.name }}
                                      </template>
                                      <template v-if="column.key === 'price'">
                                          {{ record.price }}
                                      </template>
                                      <template v-if="column.key === 'status'">
                                          {{ record.status }}
                                      </template>
                                    </template>
                                  </a-table>

                                  <!-- Table các loại dịch vụ -->
                                  
                                  <a-form-item :wrapper-col="{ span: 17, offset: 4 }">
                                      <a-alert style="margin-bottom: 20px;" v-if="alertInfoService" :message="alertInfoService.message"
                                      :type="alertInfoService.type" show-icon />
                                      
                                      <!-- validateInputs là kiểm tra dữ liệu đã được nhập chưa -->
                                      <a-button block type="primary" @click="validateData" style="margin-bottom: 10px;">Xác nhận đăng ký dịch vụ</a-button>
                                        <a-modal v-model:visible="modalCreatePayment" title="Xác nhận thanh toán">
                                          <p>Some contents...</p>
                                          <p>Some contents...</p>
                                          <p>Some contents...</p>
                                        </a-modal>
                                      
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
import { DownOutlined, SmileOutlined } from '@ant-design/icons-vue'
import { defineComponent, onMounted, ref, watch } from 'vue';
import axios from 'axios';

export default defineComponent({
    components:{
        TheMenu,
        DownOutlined,
        ClockCircleOutlined,
        SmileOutlined,  
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

        const exitModalCreateService = () => {
            modalCreateService.value = false
        }
        const layoutFormCreateService = {
            labelCol: {
                span: 6,
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

        //show dịch vụ để đăng ký
        onMounted(() => {
          const serverUrl = 'http://localhost:3000/admin/quan-ly-dich-vu/getAllService';
          axios.get(serverUrl)
            .then((response) => {
              dataServices.value = response.data.map((item, index) => ({
                key: index + 1,
                name: item.service_name,
                price: item.service_price,
                status: item.service_status,
              }))
              console.log(response.data)
            }) .catch ((error) => {
              console.log("Error: ", error);
            })
        });

        //tính tổng tiền các cột được chọn
        const totalPrice = ref(0);
        const alertTotalPrice = ref({ message: 'Tổng giá trị dịch vụ bạn đã chọn: 0', type: 'warning' });
        const rowSelection = ref({
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            updateTotalPrice(selectedRows);
          },
          onSelect: (record, selected, selectedRows) => {
            updateTotalPrice(selectedRows);
          },
          onSelectAll: (selected, selectedRows, changeRows) => {
            updateTotalPrice(selectedRows);
          },
        });

        const updateTotalPrice = (selectedRows) => {
          totalPrice.value = selectedRows.reduce((total, row) => total + row.price, 0);
          alertTotalPrice.value.message = `Tổng giá trị dịch vụ bạn đã chọn: ${doitien(totalPrice.value)}`;
          alertTotalPrice.value.type = 'success'; // Đổi loại thành công cần thiết
        };

        const doitien = (value) => {
          return value.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          });
        };
        
        //Payment method
        const modalCreatePayment = ref(false);
        const showModalPayment = () => {
          console.log('showModalPayment is called');
          modalCreatePayment = true;
        };

        const alertInfoService = ref({ message: 'Hãy nhập thông tin của bạn', type: 'info' });
        const validateData = () => {
          const valid = validateFormData();
          if (valid) {
            console.log("Hello World")
          } else {
            alertInfoService.value.message = 'Vui lòng nhập thông tin của bạn';
            alertInfoService.value.type = 'error';
          }
        }

        const validateFormData = () => {
          const { name, phone, petName } = formCreateService.value;

          //Kiểm tra độ dài
          const isNameValid = name.length > 0;
          const isPetNameValid = petName.length > 0;

          //Kiểm tra sđt
          const isPhoneValid = /^\d+$/.test(phone);
          const isPhoneLengthValid = phone.length > 0 && phone.length <= 11;

          //Trả kết quả
          errorName.value = isNameValid;
          errorPhone.value = isPhoneValid && isPhoneLengthValid;
          errorPetName.value = isPetNameValid;

          //tiếp tục ktra lỗi
          const hasError = !isNameValid || !(isPhoneValid && isPhoneLengthValid) || !isPetNameValid;
          if (!hasError) {
            console.log("Không có lỗi trong việc kiểm tra.!");
          };
          
          return {
            hasError,
            isNameValid,
            isPetNameValid,
            isPhoneValid,
            isPhoneLengthValid,
          };
        };

        //Check từng trường hợp
        const nameRule = ref({ required: true, message: 'Vui lòng nhập tên khách hàng!', trigger: 'blur' });
        const phoneRule = ref({ required: true, message: 'Vui lòng nhập số điện thoại!', trigger: 'blur' });
        const petNameRule = ref({ required: true, message: 'Vui lòng nhập tên thú cưng!', trigger: 'blur' });
        
        // Biến lưu trữ tình trạng lỗi cho từng trường
        const errorName = ref(false);
        const errorPhone = ref(false);
        const errorPetName = ref(false);
        
        
        
        return {
            data,
            columns,
            innerColumns,
            innerData,
            modalCreateService,
            showModalCreateService,
            formCreateService,
            exitModalCreateService,
            layoutFormCreateService,
            disabledDate,

            alertInfoService,
            alertTotalPrice,

            columnsServices,
            dataServices,
            rowSelection,
            totalPrice,

            showModalPayment,
            modalCreatePayment,

            validateFormData,
            validateData,
            errorName,
            errorPhone,
            errorPetName,
            nameRule,
            phoneRule,
            petNameRule,
        };
    },
});

const data = [];
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
const dataServices = ref([]);

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

//cl services
const columnsServices = [{
  title: 'Tên dịch vụ',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Giá tiền',
  dataIndex: 'price',
  key: 'price',
  width: '15%',
}, {
  title: 'Trạng thái dịch vụ',
  dataIndex: 'status',
  width: '30%',
  key: 'status',
}];


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


