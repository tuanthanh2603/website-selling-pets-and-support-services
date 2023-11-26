<template>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="Chó cảnh" @back="() => $router.go(-1)" />
    <div class="container">

        <div style="margin-top: 1em; margin-bottom: 5em;">
            <div
                style="box-shadow: 0 3px 13px rgb(204, 204, 214); padding: 25px 30px; border-radius: 8px; background: #fff;">
                <div class="row g-5">
                    <div class="col-md-4">
                        <a-select v-model:value="value" style="width: 100%" :options="optionsCategoryPet" placeholder="Chọn giống chó">
                            <a-select-option v-for="category in optionsCategoryPet" :key="category._id" :value="category._id">{{ category.name }}</a-select-option>
                        </a-select>
                    
                    </div>
                    <!-- <div class="col-md-4">
                        <a-select v-model:value="value" style="width: 100%" :options="" placeholder="Chọn giới tính"
                            @change="">
                        </a-select>
                    </div>
                    <div class="col-md-4">
                        <a-select v-model:value="value" style="width: 100%" :options="" placeholder="Xếp theo"
                            @change="">
                        </a-select>
                    </div> -->


                </div>
            </div>
        </div>
        <div class="row g-5">

            <div v-for="(dog, index) in dogsData" :key="index" class="col-md-3 col-sm-6">
                <div class="product-grid">
                    <div class="card">
                        <div class="background-dog">
                            <div class="image-dog">
                                <img :src="'http://localhost:3000/uploads/' + dog.image.name" alt="Pet Image">
                            </div>
                            <ul class="list-hidden">
                                <li title="Yêu thích"><a href="#" @click="addToFavorites(dog)"><heart-outlined /></a></li>
                                <li title="Thêm vào giỏ hàng"><a href="#"><shopping-cart-outlined /></a></li>
                            </ul>
                        </div>
                        <div class="info mt-4">
                            <h6>{{ dog.name }}</h6>
                            <p>{{ dog.price }}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.product-grid .card {
    position: relative;
    overflow: hidden;
}

.product-grid .card .background-dog {
    position: relative;
}

.product-grid .card .background-dog ul {
    display: flex;
    padding: 0;
    margin: 10px;
    justify-content: space-around;
    list-style: none;
    text-align: center;

    z-index: 1;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}

.product-grid .card:hover .background-dog ul {
    opacity: 1;
}

.product-grid .card .background-dog ul li {
    padding: 5px 5px;
    border: 1px solid #ccc;
    border-radius: 50%;
    margin-right: 10px;
    height: 50px;
    width: 50px;
    background-color: rgba(255, 255, 255, 0.8);
}

.product-grid .card .background-dog ul li:hover {
    background-color: #f8c5d2;
    transition: opacity 0.3s ease-in-out;
}

.product-grid .card .background-dog ul li a {
    font-size: 20px;
    line-height: 32px;
    transition: all 0.3s;
}


.product-grid .card .background-dog ul li:last-child {
    margin-right: 0;
}

.card {
    width: 100%;
    height: 390px;
    border-radius: 53px;
    background-color: #EE9CB2;
    /* padding: 5px; */
}

.background-dog {
    background-image: url(/images/bg_dog.png);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 82%;
    height: 65%;
    margin: 0 auto;
}

.background-dog .image-dog {
    height: 80%;
    width: 80%;
    margin: auto;
    overflow: hidden;

}

.background-dog .image-dog img {
    width: 65%;
    height: 60%;
    margin: 0 auto;
    object-fit: cover;
    margin-top: 35%;

}
</style>

<script>
import { defineComponent, ref, watch, onMounted, reactive } from 'vue';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons-vue';
import axios from 'axios';
import Noty from 'noty';
import 'noty/lib/themes/mint.css'
import 'noty/lib/noty.css';

export default defineComponent({
    components: {
        HeartOutlined, ShoppingCartOutlined
    },
    setup() {
        const optionsCategoryPet = ref([]);
        const value = ref(null);
        const dogsData = ref([]);
        onMounted(() => {

            fetchCategoryPets();
            const serverUrl = "http://localhost:3000/client/dog-page/getPetToDogPage";
            axios.get(serverUrl)
                .then(response => {
                    dogsData.value = response.data.listDogs;
                    console.log(response.data.listDogs)
                })
                .catch((error) => {
                    console.log(error)
                })
        });

        const addToFavorites = (dog) => {
            const userId = localStorage.getItem('user_id')
            const productId = dog.id
            const petName = dog.name
            console.log('Dog ID: ', productId)
            console.log('User ID: ', userId)


            if (!userId) {
                new Noty({
                    text: 'Vui lòng đăng nhập!',
                    type: 'warning',
                    layout: 'topRight',
                    theme: 'mint',
                    timeout: 3000,
                }).show();
            } else if (userId && productId) {
                const serverUrl = "http://localhost:3000/client/dog-page/addToFavorites";
                const dataToSend = {
                    userId: userId,
                    productId: productId
                };

                axios.post(serverUrl, dataToSend)
                    .then(response => {
                        if (response.status === 200) {
                            new Noty({
                                text: `Thêm ${petName} vào yêu thích thành công`,
                                type: 'success',
                                layout: 'topRight',
                                theme: 'mint',
                                timeout: 3000,
                            }).show();
                        }
                        console.log(response.data)

                    })
                    .catch((error) => {
                        console.log(error.response.status)
                        if (error.response.status === 400) {
                            new Noty({
                                text: 'Sản phẩm đã được thêm vào yêu thích',
                                type: 'info',
                                layout: 'topRight',
                                theme: 'mint',
                                timeout: 3000,
                            }).show();
                        } else {
                            new Noty({
                                text: 'Lỗi ' + error,
                                type: 'error',
                                layout: 'topRight',
                                theme: 'mint',
                                timeout: 3000,
                            }).show();
                        }

                    })

            }
        }
        
        const fetchCategoryPets = () => {
            const serverUrl = "http://localhost:3000/client/dog-page/getCategoryPetToSelectDogPage";
            axios.get(serverUrl)
                .then(response => {
                    console.log(response.data)
                    optionsCategoryPet.value = response.data.categoryPets
                    console.log(optionsCategoryPet.value)
                    
                })
                .catch((error) => {
                    console.log('Error' + error);
                })
        }
        
        const searchByCategory = value => {
            console.log(`Category: ${value}`)
        }

        return {
            dogsData,
            addToFavorites,
            optionsCategoryPet,
            searchByCategory,
            value
           
            
        

        }
    }

});
</script>
<!-- note -->
