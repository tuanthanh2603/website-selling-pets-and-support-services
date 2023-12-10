<template>
  <div class="container mt-5">
    <div class="row g-5">
      <div
        v-for="(category, index) in petCategories"
        :key="index"
        class="col-md-3 col-sm-6"
      >
        <div class="product-grid">
          <div class="product-image">
            <a href="" class="image">
              <img
                v-if="category.images && category.images.length > 0"
                :src="
                  'http://localhost:3000/uploads/' + category.images[0].name
                "
                alt="Pet Image"
              />
            </a>

            <ul class="product-links">
              <li>
                <a href="#" @click="onSearch(category.name)">  <search-outlined></search-outlined>   </a>
              </li>
              <li>
                <a href="#"><heart-outlined /></a>
              </li>
              <li>
                <a href="#" @click="onSearchID(category.id)">  <export-outlined></export-outlined>   </a>           
              </li>
            </ul>
            <a
              href="#"
              class="add-to-cart"
              enter-button
              @click="addToCart(category)"
              >Thêm vào giỏ hàng</a
            >
          </div>
          <div class="product-content">
            <h3 class="title">
              <a href="">{{ category.name }}</a>
            </h3>
            <div class="price">{{ category.price }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, onMounted } from "vue";
import { SearchOutlined, MessageTwoTone } from "@ant-design/icons-vue";
import axios from "axios";

export default defineComponent({
  setup() {
    const petCategories = ref([]);
    const searchValue = localStorage.getItem("searchHistory");
    const onSearch = () => {
      const serverURL = `http://localhost:3000/client/tim-kiem-san-pham/searchPetName/${searchValue}`;
      axios
        .post(serverURL)
        .then((response) => {
          console.log("tra du lieu thanh cong", response.data);
          petCategories.value = response.data;
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    };

    const checkIdKhachHang = () => {
      const idkhachHang = localStorage.getItem("user_id");
      if (!idkhachHang) {
        console.log("ID Khach Hang not found in localStorage");
        return false;
        // window.location.href = "/login";
      } else {
        console.log("ID Khach Hang found in localStorage:", idkhachHang);
        return true;
      }
    };


    const addToCart = (product) => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingProduct = cart.find((item) => item.id === product.id);
      if (checkIdKhachHang() == false) {
        alert("Vui long dang nhap truoc khi them");
      } else {
        if (existingProduct) {
          alert("Đã có sản phảm này trong giỏ hàng");
        } else {
          cart.push({
            id: product.id,
          });
          localStorage.setItem("cart", JSON.stringify(cart));
          const retrievedCart = JSON.parse(localStorage.getItem("cart"));
          console.log("Dữ liệu trong local storage:", retrievedCart);
          alert("Sản phẩm đã được thêm vào giỏ hàng");
        }
      }
    };

    onMounted(() => {
      onSearch();
    });

    return {
      petCategories,
      searchValue,
      onSearch,checkIdKhachHang,
      addToCart,
    };
  },
});
</script>

<style scoped>
.ant-carousel :deep(.slick-slide) {
  text-align: center;
  height: 450px;
  line-height: 160px;
  background: #0072bc;
  overflow: hidden;
}

.ant-carousel :deep(.slick-slide h3) {
  color: #fff;
}
</style>

<style scoped>
.search {
  margin-left: 290px;
  margin-bottom: 40px;
}
</style>
