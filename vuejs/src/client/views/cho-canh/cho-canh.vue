<template>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="Chó cảnh" @back="() => $router.go(-1)" />
    <div class="container">
       
        <!-- <div style="margin-top: 1em; margin-bottom: 5em;">
            <div style="box-shadow: 0 3px 13px rgb(204, 204, 214); padding: 25px 30px; border-radius: 8px; background: #fff;">
                <div class="row g-5">
                    <div class="col-md-4">
                        <a-select
                            v-model:value="value"
                            style="width: 100%"
                            :options="options1"
                            placeholder="Chọn kiểu lông"
                            @change="handleChange"
                            >
                        </a-select>
                    </div>
                    <div class="col-md-4">
                        <a-select
                            v-model:value="value"
                            style="width: 100%"
                            :options="options2"
                            placeholder="Chọn kích thước"
                            @change="handleChange"
                            >
                        </a-select>
                    </div>
                    <div class="col-md-4">
                        <a-select
                            v-model:value="value"
                            style="width: 100%"
                            :options="options3"
                            placeholder="Chọn mục đích nuôi"
                            @change="handleChange"
                            >
                        </a-select>
                    </div>
                    <div class="col-md-4">
                        <a-select
                            v-model:value="value"
                            style="width: 100%"
                            :options="options2"
                            placeholder="Chọn mức phổ biến"
                            @change="handleChange"
                            >
                        </a-select>
                    </div>
                    <div class="col-md-4">
                        <a-select
                            v-model:value="value"
                            style="width: 100%"
                            :options="options2"
                            placeholder="Chọn nhu cầu vận động"
                            @change="handleChange"
                            >
                        </a-select>
                    </div>
                    <div class="col-md-4">
                        <a-select
                            v-model:value="value"
                            style="width: 100%"
                            :options="options2"
                            placeholder="Chọn nhóm chó"
                            @change="handleChange"
                            >
                        </a-select>
                    </div>
                </div>
            </div>
        </div> -->
        <div class="row g-5">

            <div v-for="(dog, index) in dogsData" :key="index" class="col-md-3 col-sm-6" >
                <div class="product-grid">
                    <div class="card">
                        <div class="background-dog">
                            <div class="image-dog">
                                <img :src="'http://localhost:3000/uploads/' + dog.image.name" alt="Pet Image">
                            </div>
                            <ul class="list-hidden">
                            <li><a href="#"><heart-outlined size="24"/></a></li>
                            <li><a href="#"><shopping-cart-outlined /></a></li>
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

.product-grid .card .background-dog ul li:hover{
    background-color: #f8c5d2;
    transition: opacity 0.3s ease-in-out;
}
.product-grid .card .background-dog ul li a{
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
.background-dog{
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
export default defineComponent({
    components: {
        HeartOutlined, ShoppingCartOutlined
    },
    setup() {
        const dogsData = ref([]);
        onMounted(() => {
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
        
        return {
            dogsData
            
        }
    }
    
});
</script>
<!-- note -->
