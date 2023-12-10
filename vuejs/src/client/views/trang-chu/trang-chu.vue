<template>
  <div class="row" style="margin-top: 20px; margin-bottom: 20px">
    <div class="col-md-4" style="display: flex; justify-content: center; align-items: center">
      <h1 class="display-4 font-italic">
        Best Place <br /><span style="font-size: 40px">for</span><br />
        Pet Lover
      </h1>
    </div>
    <div class="col-md-8">
      <a-carousel autoplay>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
      </a-carousel>
    </div>
  </div>
  <br />
  <br />

  <div class="container">
    <div class="row row-cols-5 g-3">
      <div class="col" style="align-items: center; justify-content: center">
        <a href="/cho-canh">
          <figure class="bd-placeholder-img rounded-circle" style="
              height: 100px;
              width: 100px;
              background-color: #c94b4b;
              margin: auto;
              cursor: pointer;
            ">
            <img src="/images/dog.png" alt="" width="100%" style="padding: 20px" />
          </figure>
          <h5 class="mt-2" style="text-align: center; font-size: 18px; font-weight: 700">
            Chó cảnh
          </h5>
        </a>
      </div>

      <div class="col">
        <a href="/meo-canh">
          <figure class="bd-placeholder-img rounded-circle" style="
              height: 100px;
              width: 100px;
              background-color: #fc4a1a;
              margin: auto;
              cursor: pointer;
            ">
            <img src="/images/cat.png" alt="" width="100%" style="padding: 20px" />
          </figure>
          <h5 class="mt-2" style="text-align: center; font-size: 18px; font-weight: 700">
            Mèo cảnh
          </h5>
        </a>
      </div>

      <div class="col">
        <a href="/trao-doi">
          <figure class="bd-placeholder-img rounded-circle" style="
              height: 100px;
              width: 100px;
              background-color: #fc4a1a;
              margin: auto;
              cursor: pointer;
            ">
            <img src="/images/trade.png" alt="" width="100%" style="padding: 20px" />
          </figure>
          <h5 class="mt-2" style="text-align: center; font-size: 18px; font-weight: 700">
            Trao đổi
          </h5>
        </a>
      </div>

      <div class="col">
        <a href="/phu-kien-thu-cung">
          <figure class="bd-placeholder-img rounded-circle" style="
              height: 100px;
              width: 100px;
              background-color: #009fff;
              margin: auto;
              cursor: pointer;
            ">
            <img src="/images/collar.png" alt="" width="100%" style="padding: 20px" />
          </figure>
          <h5 class="mt-2" style="text-align: center; font-size: 18px; font-weight: 700">
            Phụ kiện thú cưng
          </h5>
        </a>
      </div>

      <div class="col-md-2">
        <a href="/dich-vu-ho-tro">
          <figure class="bd-placeholder-img rounded-circle" style="
              height: 100px;
              width: 100px;
              background-color: #cb356b;
              margin: auto;
              cursor: pointer;
            ">
            <img src="/images/pet-grooming.png" alt="" width="100%" style="padding: 20px" />
          </figure>
          <h5 class="mt-2" style="text-align: center; font-size: 18px; font-weight: 700">
            Dịch vụ hỗ trợ
          </h5>
        </a>
      </div>
    </div>
  </div>
  <br />
  <br />

  <div class="search">
    <div class="col-md-3">
      <a-input-search v-model:value="value" placeholder="Tìm kiếm..." enter-button @search="onSearch" />
    </div>
  </div>

  <!-- <div class="container">
    <div class="row" style="justify-content: space-between">
      <h2 class="col-md-6" style="text-align: left">Phổ biến nhất</h2>
      <div class="col-md-6" style="text-align: right">
        <a-button type="primary" danger><router-link to="/pho-bien-nhat">Xem thêm >></router-link></a-button>
      </div>
    </div>
  </div> -->

  <div class="container mt-5">
    <div class="d-flex" style="justify-content: space-between">
      <h2 style="text-align: right">Mới nhất</h2>
      <div style="text-align: left">
        <a-button type="primary" danger>Xem thêm >></a-button>
      </div>
    </div>
    <div class="row g-5">
      <div v-for="(category, index) in petCategories" :key="index" class="col-md-3 col-sm-6">
        <div class="product-grid">
          <div class="product-image">
            <a href="" class="image">
              <img v-if="category.images && category.images.length > 0"
                :src="'http://localhost:3000/uploads/' + category.images[0].name" alt="Pet Image" />
            </a>

            <ul class="product-links">
              <li>
                <a href="#" @click="onSearch(category.name)">  <search-outlined></search-outlined>   </a>
              </li>
              <li>
                <a href="#"><heart-outlined /></a>
              </li>
              <li>
                <a :href="`/thong-tin-thu-cung/${category.id}`" @click="goToDetail(category.id)">  <export-outlined></export-outlined>   </a>           
              </li>
            </ul>
            <a href="#" class="add-to-cart" enter-button @click="addToCart(category)">Thêm vào giỏ hàng</a>
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
  <!-- <button @click="clearLocalStorage">Clear History</button> -->
  <a-affix :offset-bottom="bottom">
    <a-button type="primary" @click="bottom" style="
        margin-left: 20px;
        margin-bottom: 50px;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        background-color: transparent;
        border: none;
        position: relative;
        padding: 7px;
      ">
      <message-two-tone style="font-size: 30px; width: 100%; height: 100%" />
    </a-button>
  </a-affix>
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

    const bottom = ref(10);
    const petCategories = ref([]);
    onMounted(() => {
      const severURL = "http://localhost:3000/client/xem-trang-chu/showPetData";
      axios
        .get(severURL)
        .then((response) => {
          petCategories.value = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    });

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

    const value = ref("");

    const onSearch = (searchValue) => {
      const severURL = `http://localhost:3000/client/tim-kiem-san-pham/searchPetName/${searchValue}`;
      axios
        .post(severURL)
        .then((response) => {
          console.log("tra du lieu thanh cong", response.data);
          // Lưu giá trị mới vào localStorage
          localStorage.setItem("searchHistory", JSON.stringify([searchValue]));
          // Hiển thị dữ liệu trong console
          const data = JSON.parse(localStorage.getItem("searchHistory"));
          console.log("Dữ liệu trong searchHistory:", data);
          // Chuyển hướng đến trang tìm kiếm
          window.location.href = "/tim-kiem";
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    };

    const goToDetail=(id)=>{
        console.log(id);
        this.$router.push({ name: 'pet-information', params: { searchID: id } });
    }

    const onSearchID = (searchID) => {
      const severURL = `http://localhost:3000/client/tim-kiem-san-pham/searchPetID/${searchID}`;
      console.log(searchID)
      axios
        .post(severURL)
        .then((response) => {
          console.log("tra du lieu thanh cong", response.data);

          // Lưu giá trị mới vào localStorage
          localStorage.setItem("searchHistoryID", JSON.stringify([searchID]));

          // Hiển thị dữ liệu trong console
          const data = JSON.parse(localStorage.getItem("searchHistoryID"));
          console.log("Dữ liệu trong searchHistoryID:", data);
          // Chuyển hướng đến trang tìm kiếm
          window.location.href = `/thong-tin-thu-cung`;
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    };

    const clearLocalStorage = () => {
      localStorage.removeItem("searchHistoryID");
      console.log("Dữ liệu trong local storage đã được xóa.");
    };

    return {
      checkIdKhachHang,
      petCategories,
      onSearch,onSearchID,
      value,
      addToCart,
      clearLocalStorage,
      bottom,goToDetail
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
