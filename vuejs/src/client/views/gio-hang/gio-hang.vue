<template>
  <div class="container mt-5 mb-5">
    <div class="d-flex" style="justify-content: space-between">
      <table>
        <thead>
          <tr>
            <th>Mã</th>
            <th>Ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Giống</th>
            <th>Số lượng</th>
            <th>Giá</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(category, index) in petCategories" :key="index">
            <td>{{ category.id }}</td>
            <td><a href="" class="image">
              <img v-if="category.images && category.images.length > 0" :src="'http://localhost:3000/uploads/' + category.images[0].name    " alt="Pet Image" />
            </a></td>
            <td>{{ category.name }}</td>
            <td>{{ category.breed }}</td>
            <td><input type="number"/></td>
            <td>{{ category.price }}</td>
            <td><button >Xóa</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>



  
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
    onMounted(() => {
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
      const value = ref("");
      const serverURL = `http://localhost:3000/client/show-cart/showCart/${idArray}`;
      axios
        .post(serverURL)
        .then((response) => {
          console.log("tra du lieu thanh cong", response.data);
         
          petCategories.value = response.data;
        })
        .catch((error) => {
          console.log("Lỗi:", error);
        });
      return {
        petCategories,
        value
      };
    });
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
 