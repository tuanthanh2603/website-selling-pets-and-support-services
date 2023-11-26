<template>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="Chó cảnh" @back="() => $router.go(-1)" />
    <div class="container">

        <div style="margin-top: 1em; margin-bottom: 5em;">
            <div
                style="box-shadow: 0 3px 13px rgb(204, 204, 214); padding: 25px 30px; border-radius: 8px; background: #fff;">
                <div class="row g-5">
                    <div class="col-md-4">
                        <a-select ref="select"  style="width: 100%" :options="optionsCategoryPet" placeholder="Chọn giống chó"
                             @change="filterByCategory">
                        </a-select>

                    </div>
                    <div class="col-md-4">
                        <a-select  style="width: 100%" placeholder="Chọn giới tính"
                            @change="filterBySex">
                            <a-select-option value="Đực">Đực</a-select-option>
                            <a-select-option value="Cái">Cái</a-select-option>
                        </a-select>
                    </div>
                    <div class="col-md-4">
                        <a-select  style="width: 100%" placeholder="Xếp theo"
                            @change="filterByPrice">
                            <a-select-option value="1">Giá tăng dần</a-select-option>
                            <a-select-option value="2">Giá giảm dần</a-select-option>
                        </a-select>
                    </div>


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
import { toRaw } from 'vue';

export default defineComponent({
    components: {
        HeartOutlined, ShoppingCartOutlined
    },
    setup() {
        const optionsCategoryPet = ref([]);
        let originalDogsData = [];
        const filteredDogs = ref([]);
        
        const dogsData = ref([]);
        onMounted(() => {
            fetchCategoryPets();
            getPetToDogPage();
            
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
        const getPetToDogPage = () => {
            const serverUrl = "http://localhost:3000/client/dog-page/getPetToDogPage";
            axios.get(serverUrl)
                .then(response => {
                    // dogsData.value = response.data.listDogs;
                    console.log(response.data.listDogs)
                    originalDogsData = response.data.listDogs;
                    dogsData.value = [...originalDogsData];
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        const fetchCategoryPets = () => {
            const serverUrl = "http://localhost:3000/client/dog-page/getCategoryPetToSelectDogPage";
            axios.get(serverUrl)
                .then(response => {
                    console.log(response.data.categoryPets)
                    // options1.value = response.data
                    optionsCategoryPet.value = response.data.categoryPets.map(category => ({
                        value: category._id,
                        label: category.name
                    }));
                
                })
                .catch((error) => {
                    console.log('Error' + error);
                })
        }

        const filterByCategory = id => {
            console.log(`Category: ${id}`)
            if(id) {
                // dogsData.value = dogsData.value.filter(dog => dog.categoryId === value1)
                // console.log(dogsData.value)
                dogsData.value = [...originalDogsData].filter(dog => dog.categoryId === id);
                console.log(dogsData.value); 
            } else {
                dogsData.value = [...originalDogsData];
            }
        }
        const filterBySex = value => {
            console.log(value)
            if(value === 'Đực' || value === 'Cái'){
                dogsData.value = [...originalDogsData].filter(dog => dog.sex === value);
            } else {
                dogsData.value = [...originalDogsData];
            }
        }
        const filterByPrice = value => {
            if(value === '1'){
                dogsData.value = [...originalDogsData].sort((a,b) => a.price - b.price);
            } else if(value === '2'){
                dogsData.value = [...originalDogsData].sort((a,b) => b.price - a.price);
            } else {
                dogsData.value = [...originalDogsData];
            }
        }

        return {
            dogsData,
            addToFavorites,
            optionsCategoryPet,
            filterByCategory,
            filterBySex,
            filterByPrice

            





        }
    }

});
</script>
<!-- note -->
