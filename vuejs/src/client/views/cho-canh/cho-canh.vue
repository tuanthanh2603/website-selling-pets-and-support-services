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
            <div class="col-md-3 col-sm-6">
                <div class="product-grid">
                    <div class="card">
                        <div class="background-dog">
                            <div class="image-dog">
                                <img src="https://azpet.com.vn/wp-content/uploads/2021/06/Alaska.jpg" >
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-3 col-sm-6">
                <div class="product-grid">
                    <div class="card">
                        <div class="background-dog">
                            <div class="image-dog">
                                <img src="https://azpet.com.vn/wp-content/uploads/2021/06/Alaska.jpg" >
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-3 col-sm-6">
                <div class="product-grid">
                    <div class="card">
                        <div class="background-dog">
                            <div class="image-dog">
                                <img src="https://azpet.com.vn/wp-content/uploads/2021/06/Alaska.jpg" >
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-3 col-sm-6">
                <div class="product-grid">
                    <div class="card">
                        <div class="background-dog">
                            <div class="image-dog">
                                <img src="https://azpet.com.vn/wp-content/uploads/2021/06/Alaska.jpg" >
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<style scoped>
.card {
    width: 300px;
    height: 400px;
    border-radius: 53px;
    background-color: #EE9CB2;
}
.background-dog{
    background-image: url(../../../../public/images/bg_dog.png);  
    background-size: cover; 
    background-position: center; 
    background-repeat: no-repeat; 
    width: 89%;
    height: 70%;
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
import { defineComponent, ref, watch } from 'vue';
export default defineComponent({
    setup() {
        
        return {
            
        }
    }
    
});
</script>
<!-- note -->
