<template>
  <div class="container mt-5 mb-5">
    <a-table :data-source="petCategories">
      <!-- <a-table-column key="id" title="ID">
        <template #default="{ record }">
          {{ record.id }}
        </template>
      </a-table-column> -->

      <a-table-column key="images" title="Hình ảnh">
        <template #default="{ record }">
          <img v-if="record.images && record.images.length > 0"
            :src="'http://localhost:3000/uploads/' + record.images[0].name" alt="Pet Image" />
        </template>
      </a-table-column>

      <a-table-column key="name" title="Tên">
        <template #default="{ record }">
          {{ record.name }}
        </template>
      </a-table-column>

      <a-table-column key="sex" title="Giới tính">
        <template #default="{ record }">
          {{ record.sex }}
        </template>
      </a-table-column>

      <a-table-column key="price" title="Giá">
        <template #default="{ record }">
          {{ record.price }}
        </template>
      </a-table-column>

      <a-table-column key="" title="">
        <template #default="{ record }">
          <button @click="deleteItemPetInCart(record.id)">Xóa</button>
        </template>
      </a-table-column>
    </a-table>

  </div>

  <div class="container mt-5">
    <table style="width: 500px">
      <thead>
        <tr>
          <th>Tên khách hàng</th>
          <th>Số điện thoại khách hàng</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(customer, index) in customerCate" :key="index">
          <td>
            <input v-model="customer.name" style="width: 200px; height: 30px;" />
          </td>
          <td>
            <input v-model="customer.sdt" style="width: 200px; height: 30px;" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2 class="" style="display: flex; justify-content: flex-end;margin-right: 130px;">Thành tiền: {{ totalPrice }}</h2>
  <div style="display: flex; justify-content: flex-end; margin-right: 130px;">
    <button @click="showPaymentForm" :class="{ active: selectedPaymentOption === 'online' }">Thanh toán online</button>
    <button @click="completePayment" :class="{ active: selectedPaymentOption === 'offline' }"
      style="margin-left: 60px;">Thanh toán offline</button>
  </div>




  <a-modal v-model:visible="modalVisible" title="QR Code">
    <a-form name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }" autocomplete="off">
      <img class="larger-image" src="/images/qrcode.png" alt="QR Code" />
      <button @click="completePayment">Hoàn thành thanh toán</button>
    </a-form>
    <template #footer></template>
  </a-modal>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import {
  HeartOutlined,
  SearchOutlined,
  ExportOutlined,
  MessageTwoTone,
} from "@ant-design/icons-vue";
import axios from "axios";

export default defineComponent({
  components: {
    HeartOutlined,
    SearchOutlined,
    ExportOutlined,
    MessageTwoTone,
  },
  setup() {
    const petCategories = ref([]);
    const customerCate = ref([]);
    const totalPrice = ref(0);
    const value = ref("");
    const modalVisible = ref(false);

    const showKhachHang = () => {
      var idkhachHang = localStorage.getItem("user_id");
      console.log("id cua khach hang", idkhachHang);
      const serverURL = `http://localhost:3000/client/show-khach-hang/showKhachHang/${idkhachHang}`;
      axios
        .get(serverURL)
        .then((response) => {
          console.log("tra du lieu thanh cong", response.data);
          customerCate.value = response.data;
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    };

    const showPaymentForm = () => {
      const cartItems = JSON.parse(localStorage.getItem("cart"));
      if (cartItems && cartItems.length > 0) {
        modalVisible.value = true;
        setTimeout(() => {
          console.log("Xoa sau 5 giay");
          modalVisible.value = false;
        }, 5000);
      } else {
        alert("Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.");
      }
    };

    const completePayment = async () => {
      try {
        const idkhachHang = localStorage.getItem("user_id");
        const serverURL = "http://localhost:3000/client/thanh-toan/thanhtoan";
        if (petCategories.value.length > 0) {
          const customerInfo = customerCate.value[0];
          if (customerInfo.name && customerInfo.sdt) {
            const paymentData = {
              userId: idkhachHang,
              ten: customerInfo.name,
              sdt: customerInfo.sdt,
              thanhTien: totalPrice.value,
              trangThai: "Đã thanh toán",
            };
            const response = await axios.post(serverURL, paymentData);
            if (response.status === 200) {
              alert("Thanh toán thành công! Cảm ơn bạn.");
              localStorage.removeItem("cart");
              petCategories.value = [];
              totalPrice.value = 0;
              modalVisible.value = false;
            } else {
              console.error("loi server:", response.status);
              alert("Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.");
            }
          } else {
            alert("Vui lòng điền đầy đủ thông tin.");
            modalVisible.value = false;
          }
        } else {
          alert("Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.");
        }
      } catch (error) {
        console.error("Error during payment:", error);
      }
    };


    onMounted(() => {
      showKhachHang();
      var cartData = localStorage.getItem("cart");
      if (cartData) {
        var cartArray = JSON.parse(cartData);
        var idArray = [];
        cartArray.forEach((item) => {
          if (item.id) {
            idArray.push(item.id);
          }
        });
      } else {
        console.log("Không có dữ liệu trong cart trong localStorage.");
      }

      const serverURL = `http://localhost:3000/client/show-cart/showCart/${idArray}`;
      axios
        .get(serverURL)
        .then((response) => {
          petCategories.value = response.data;
          totalPrice.value = response.data.reduce((acc, item) => {
            return acc + item.price;
          }, 0);
          console.log("Tổng giá trị", totalPrice.value);
        })
        .catch((error) => {
          console.log("Lỗi:", error);
        });
    });

    const deleteItemPetInCart = (id) => {
      let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      cartItems = cartItems.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      window.location.reload();
    };

    return {
      deleteItemPetInCart,
      showKhachHang,
      completePayment,
      petCategories,
      totalPrice,
      customerCate,
      value,
      showPaymentForm,
      modalVisible, setTimeout,
    };
  },
});
</script>

<style scoped>
/* Add scoped styles for the component */
.larger-image {
  width: 100%;
  /* Set the image width to 100% */
  max-width: 400px;
  /* Set a maximum width to control the size */
  height: 400px;
  display: block;
  margin: 0 auto;
  /* Center the image horizontally */
}
</style>
<style>
table {
  width: 800px;
  font-family: sans-serif;
  font-weight: 100;
  border-collapse: collapse;
  overflow: hidden;
  text-align: center;
  box-shadow: 0 0 20px black;
}

img {
  height: 80px;
  width: 80px;
}

input {
  width: 55px;
}

th,
td {
  background-color: azure;
  padding: 15px;
  color: black;
}

th {
  text-align: left;
}

thead th {
  background-color: aqua;
}
</style>
