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
                            <a-modal v-model:visible="modalCreateService" v-bind="layoutFormAddService" width="1000px" title="Đăng ký dịch vụ">
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
                                  
                                  <a-form-item :wrapper-col="{ span: 17, offset: 4 }">
                                      <a-alert style="margin-bottom: 20px;" v-if="alertInfoService" :message="alertInfoService.message"
                                      :type="alertInfoService.type" show-icon />
                                      
                                      <!-- validateInputs là kiểm tra dữ liệu đã được nhập chưa -->
                                      <a-button block type="primary" @click="validateData" style="margin-bottom: 10px;">Xác nhận đăng ký dịch vụ</a-button>
                                      <a-button block @click="exitModalCreateService">Thoát</a-button>  
                                      
                                        <!-- Form Payment được hiển thị sau khi kiểm tra xong -->
                                        <a-modal v-model:visible="modalCreatePayment" title="Xác nhận thanh toán">
                                          <p>Loading....</p>
                                          <a-button block type="success" @click="createOrder" style="margin-bottom: 10px;">Đã thanh toán</a-button>
                                          <a-button block @click="exitModalCreatePayment">Thoát</a-button>
                                          
                                          <template #footer></template>
                                        </a-modal>
                     
                                  </a-form-item>

                              </a-form>
                              <template #footer></template>
                            </a-modal>
                  </div>

                    
            </div>

            <!-- Table -->
            <a-table :columns="columnsOrderService" :data-source="dataOrderService" class="components-table-demo-nested">
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
import Noty from 'noty';
import 'noty/lib/themes/mint.css'
import 'noty/lib/noty.css'
import 'noty/lib/noty.js'

export default defineComponent({
    components:{
        TheMenu,
        DownOutlined,
        ClockCircleOutlined,
        SmileOutlined,  
    },
    setup() {
      onMounted(() => {
        const userId = localStorage.getItem('user_id');
        console.log("User ID: ", userId);
        const serverUrl = `http://localhost:3000/client/dich-vu-ho-tro/getListOrderService/${userId}`;

        axios.get(serverUrl)
          .then((response) => {
            dataOrderService.value = response.data.orders.map((order, index) => ({
              key: index + 1,
              name: order.name,
              phone: order.phone,
              petName: order.petName,
              selectedService: order.service_selected,
              total_price: order.total_price,
              payment: order.payment, 
              createdDate: order.date_created,
            }));
            console.log("bearbear:", response.data.orders);
            console.log("Pandaaaa: ", dataOrderService);
          })
          .catch((error) => {
            console.log("Error: ", error);
          });
      })

        //Khai báo các modal
        const formCreateService = ref({ 
            name: '',
            phone: '',
            petName: '',
            serviceType: '',
        });

        const modalCreatePaymentData = ref({
          selectedServicesName: '',
          selectedServicesPrice: '',
          totalPrice: '',
        });

        const layoutFormCreateService = {
            labelCol: {
                span: 6,
            },
            wrapperCol: {
                span: 16,
            },
        }

        //Khai báo giá trị value của modal
        const modalCreateService = ref(false)
        const modalCreatePayment = ref(false);

        const showModalCreateService = () => {
            modalCreateService.value = true
            getListService();
        }

        const exitModalCreateService = () => {
            modalCreateService.value = false
        }

        const exitModalCreatePayment = () => {
            modalCreatePayment.value = false
        }

        //Khai báo biến
        const totalPrice = ref(0); //tính tổng tiền

        const selectedServicesName = ref([]); //tách thành mảng name
        const selectedServicesPrice = ref([]); //tách thành mảng price

        //Các alert
        const alertTotalPrice = ref({ message: 'Tổng giá trị dịch vụ bạn đã chọn: 0', type: 'warning' }); //alert báo tiền
        const alertInfoService = ref({ message: 'Hãy nhập thông tin của bạn', type: 'info' }); //alert thông tin

        //show dịch vụ để đăng ký
        const getListService = () => {
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
        };
        
        //Check theo từng thay đổi của bảng
        const rowSelection = ref({
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            updateTotalPrice(selectedRows);
            getSelectedServices(selectedRows);
          },
          onSelect: (record, selected, selectedRows) => {
            updateTotalPrice(selectedRows);
            getSelectedServices(selectedRows);
          },
          onSelectAll: (selected, selectedRows, changeRows) => {
            updateTotalPrice(selectedRows);
            getSelectedServices(selectedRows);
          },
        });

        //tính tổng tiền
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

        //Check thông tin trước khi thanh toán
        const validateData = () => {
          const validationResult = validateFormData();
          if (!validationResult.hasError) {
            modalCreatePayment.value = true;
          } else {
            alertInfoService.value.message = 'Thông tin bạn nhập không đúng yêu cầu! Vui lòng nhập lại';
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

        //lấy dữ liệu name và price
        const getSelectedServices = (selectedRows) => {
          selectedServicesName.value = selectedRows.map(row => row.name);
          selectedServicesPrice.value = selectedRows.map(row => row.price);
        };

        //Tạo dịch vụ
        const createOrder = (values) => {
          const dataToSend = {
            userId: localStorage.getItem('user_id'),
            name: formCreateService.value.name,
            phone: formCreateService.value.phone,
            petName: formCreateService.value.petName,
            selected_service_name: selectedServicesName.value,
            selected_service_price: selectedServicesPrice.value,
            totalPrice: totalPrice.value,
          };
          const serverUrl = 'http://localhost:3000/client/dich-vu-ho-tro/createOrderService'
          axios.post(serverUrl, dataToSend)
            .then((response) => {
              console.log('Phản hồi từ server: ', response.data);
              if (response.data.success) {
                new Noty({
                  text: 'Thêm dịch vụ thành công!',
                  type: 'success',
                  layout: 'topRight',
                  theme: 'mint',
                  timeout: 3000,
                  callbacks: {
                    afterShow: function () {
                      setTimeout(() => {
                        window.location.reload();
                      }, 2000);
                    }
                  } 
                }).show();
              } else {
                  console.log(response.data.message)
              }

            })
            .catch((error) => {
                if(error.response && error.response.status === 400){
                    alertInfoService.value = { message: "Lỗi khi đăng kí dịch vụ", type: "warning"}
                } else {
                    alertInfoService.value = { message: "Lỗi kết nối đến server", type: "error" };
                }
                
            })
            console.log('Thông tin đăng ký dịch vụ:', dataToSend);
        }
        
        return {
          //Tên cột và dữ liệu
            columnsProcessService,
            dataProcessService,
            dataOrderService,
            columnsOrderService,
            columnsServices,
            dataServices,

          //modalCreateService
            modalCreateService,
            formCreateService,
            layoutFormCreateService,
            showModalCreateService,
            getListService,        
            exitModalCreateService,
           
          //Các alert
            alertInfoService,
            alertTotalPrice,

          //Tạo dịch vụ
            modalCreatePayment, 
            rowSelection,
            totalPrice,
            modalCreatePaymentData,
            selectedServicesName,
            selectedServicesPrice,
            exitModalCreatePayment,
            getSelectedServices,
            createOrder,
            
          //Check lỗi
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

//Data listService
const dataServices = ref([]);
//Column listService
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

//Data orderService
const dataOrderService = ref([]);
//Column orderService
const columnsOrderService = [{
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
  title: 'Tên dịch vụ - Giá dịch vụ',
  dataIndex: 'selectedService',
  key: 'selectedService',
}, { 
  title: 'Tổng tiền',
  dataIndex: 'total_price',
  key: 'total_price',
}, {
  title: 'Tình trạng thanh toán',
  dataIndex: 'payment',
  key: 'payment',
}, {
  title: 'Thời gian khởi tạo',
  dataIndex: 'createdDate',
  key: 'createdDate',
}];

//Data processService
const dataProcessService = [];
for (let i = 0; i < 3; ++i) {
  dataProcessService.push({
    key: i,
    date: '2014-12-24 23:12:00',
    process: `Đã nhận thú cưng ${i + 1}`,
  });
}
//Column processService
const columnsProcessService = [{
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



</script>


