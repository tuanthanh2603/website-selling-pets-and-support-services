<template>
    <div class="container mt-5">
        <div class="row g-5">
            <div v-for="(petCategoriesID, index) in petCategories" :key="index" class="col-md-3 col-sm-6">
                <div class="product-grid">
                    <div class="product-image">
                        <a href="" class="image">
                            <img v-if="petCategoriesID.images && petCategoriesID.images.length > 0" :src="'http://localhost:3000/uploads/' + petCategoriesID.images[0].name" alt="Pet Image" />
                        </a>

                        <ul class="product-links">
                            <li>
                                <a href="#"><heart-outlined /></a>
                            </li>
                        </ul>
                        <a href="#" class="add-to-cart" enter-button @click="addToCart(petCategoriesID)">Thêm vào giỏ
                            hàng</a>
                    </div>
                    <div class="product-content">
                        <h3 class="title">
                            <a href="">{{ petCategoriesID.name }}</a>
                        </h3>
                        <div class="price">{{ petCategoriesID.price }}</div>
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
                .get(serverURL)
                .then((response) => {
                    console.log("tra du lieu thanh cong", response.data);
                    petCategories.value = response.data;
                })
                .catch((error) => {
                    console.log("Error:", error);
                });
        };



        const addToCart = (product) => {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            const existingProduct = cart.find((item) => item.id === product.id);
            if (existingProduct) {
                console.log("Sản phẩm đã được thêm vào giỏ hàng!!!");
            } else {
                cart.push({
                    id: product.id,
                });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            //   console.log("Dữ liệu trong local storage:", cart);
        };

        const getPetIdFromUrl = () => {
            // Get the current URL
            const url = window.location.href;

            // Extract the pet ID from the URL
            const petIdMatch = url.match(/\/thong-tin-thu-cung\/([^/]+)/);

            // Check if a match is found
            if (petIdMatch && petIdMatch[1]) {
                return petIdMatch[1];
            }

            // Return null if no match is found
            return null;
        };

        onMounted(() => {
            const petId = getPetIdFromUrl();
            const serverURL = `http://localhost:3000/client/thong-tin-san-pham/thong-tin-thu-cung/${petId}`;
            axios
                .get(serverURL)
                .then((response) => {
                    console.log("tra du lieu thanh cong", response.data);
                    petCategories.value=response.data;
                })
                .catch((error) => {
                    console.log("Error:", error);
                });
            console.log("show pet id tu url: ", petId)
        });
        return {
            petCategories,
            searchValue,
            onSearch,
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
  