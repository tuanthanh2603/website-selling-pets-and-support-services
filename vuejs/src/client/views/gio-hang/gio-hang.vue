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
    <h2 class="col-md-6" style="text-align: left">Thành tiền: {{ totalPrice }}</h2>
  </div>


  <div class="container mt-5">
    <a-table :data-source="customerCate" style="width: 500px;">
      <a-table-column key="name" title="Tên khách hàng">
        <template #default="{ text }">
          {{ text.name }}
        </template>
      </a-table-column>

      <a-table-column key="sdt" title="Số điện thoại khách hàng">
        <template #default="{ text }">
          {{ text.sdt }}
        </template>
      </a-table-column>
    </a-table>
  </div>

  <!-- Add this button in your template -->
<button @click="completePayment">Hoàn thành thanh toán</button>

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


    const showKhachHang = () => {
      var idkhachHang = localStorage.getItem("user_id");
      console.log("id cua khach hang", idkhachHang)
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

    const completePayment = async () => {
  try {
    const idkhachHang = localStorage.getItem("user_id");
    const serverURL = "http://localhost:3000/client/thanh-toan/thanhtoan";
    
    // Check if there's at least one customer in the array
    if (customerCate.value.length > 0) {
      const paymentData = {
        userId: idkhachHang,
        ten: customerCate.value[0].name,
        sdt: customerCate.value[0].sdt,
        thanhTien: totalPrice.value,
        trangThai: "Đã thanh toán",
      };

      const response = await axios.post(serverURL, paymentData);
      if (response.status === 200) {
        console.log("Payment successful", response.data);
        
        // Show a success notification
        alert("Thanh toán thành công! Cảm ơn bạn.");
      } else {
        console.error("Unexpected response from server:");
      }
    } else {
      console.error("No customer information available.");
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

          // console.log("Dữ liệu trả về", petCategories.value);
          console.log("Tổng giá trị", totalPrice.value);
        })
        .catch((error) => {
          console.log("Lỗi:", error);
        });
    });

    const deleteItemPetInCart = (id) => {
      let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      // Tìm và xoá item có id trùng với id được truyền vào
      cartItems = cartItems.filter(item => item.id !== id);
      // Cập nhật lại danh sách items trong localStorage
      localStorage.setItem("cart", JSON.stringify(cartItems));
      window.location.reload();
    }

    return {
      deleteItemPetInCart, showKhachHang,completePayment,
      petCategories, totalPrice, customerCate,
      value,
    };
  },
});
</script>

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
