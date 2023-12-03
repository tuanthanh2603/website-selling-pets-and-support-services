<template>
  <div class="container mt-5 mb-5">
    <a-table :data-source="petCategories">
      <a-table-column key="id" title="ID">
        <template #default="{ record }">
          {{ record.id }}
        </template>
      </a-table-column>

      <a-table-column key="images" title="Hình ảnh">
        <template #default="{ record }">
          <img v-if="record.images && record.images.length > 0" :src="'http://localhost:3000/uploads/' + record.images[0].name    " alt="Pet Image" />
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

      <a-table-column key="" title="Số lượng">
          <input type="number">
      </a-table-column>

      <a-table-column key="" title="Tuỳ chọn">
        <template #default ="{ record }">
          <button @click="deleteItemPetInCart(record.id)">Xóa</button>
        </template>
          
      </a-table-column>

    </a-table>
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
    const value = ref("");

    // Move this outside onMounted
    const deleteItem = (record) => {
      // Logic to delete the item, you can use axios to make a delete request to your API
      console.log("Xóa item:", record);
    };

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

      const serverURL = `http://localhost:3000/client/show-cart/showCart/${idArray}`;
      axios
        .get(serverURL)
        .then((response) => {
          petCategories.value = response.data;
          console.log("du lieu tra ve", petCategories.value);
        })
        .catch((error) => {
          console.log("Lỗi:", error);
        });
    });
    const deleteItemPetInCart = (id) => {
      console.log(id);
   
      let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

      // Tìm và xoá item có id trùng với id được truyền vào
      cartItems = cartItems.filter(item => item.id !== id);

      // Cập nhật lại danh sách items trong localStorage
      localStorage.setItem("cart", JSON.stringify(cartItems));
      window.location.reload();
    }


    // Return all the variables/functions you want to use in the template
    return {
      deleteItemPetInCart,
      petCategories,
      value,
      deleteItem,
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
