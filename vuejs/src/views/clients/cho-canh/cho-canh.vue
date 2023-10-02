<template>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="Chó cảnh" @back="() => $router.go(-1)" />
    <div class="container">
       
        <div style="margin-top: 1em; margin-bottom: 5em;">
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
        </div>
        <div class="row g-5">
            <div class="col-md-3 col-sm-6">
                <div class="product-grid">
                    <div class="product-image">
                        <a href="#" class="image">
                            <img src="https://azpet.com.vn/wp-content/uploads/2021/06/Alaska.jpg">
                        </a>
                        <span class="product-discount-label">Phổ biến</span>
                        <ul class="product-links">
                            <li><a href="#"><search-outlined /></a></li>
                            <li><a href="#"><heart-outlined /></a></li>
                            <li><a href="#"><export-outlined /></a></li>
                        </ul>
                        <!-- <a href="" class="add-to-cart">Xem</a> -->
                    </div>
                    <div class="product-content">
                        <h3 class="title"><a href="#">Alaska</a></h3>
                        <!-- <div class="price">1.800.000đ <span>2.000.000đ</span></div> -->
                    </div>
                </div>
            </div>

            <div class="col-md-3 col-sm-6">
                <div class="product-grid">
                    <div class="product-image">
                        <a href="#" class="image">
                            <img src="https://azpet.com.vn/wp-content/uploads/2021/06/Alaska.jpg">
                        </a>
                        <span class="product-discount-label">-23%</span>
                        <ul class="product-links">
                            <li><a href="#"><i class="fa fa-search"></i></a></li>
                            <li><a href="#"><i class="fa fa-heart"></i></a></li>
                            <li><a href="#"><i class="fa fa-random"></i></a></li>
                        </ul>
                        <a href="" class="add-to-cart">Thêm vào giỏ hàng</a>
                    </div>
                    <div class="product-content">
                        <h3 class="title"><a href="#">Chó</a></h3>
                        <!-- <div class="price">1.800.000đ <span>2.000.000đ</span></div> -->
                    </div>
                </div>
            </div>

            <div class="col-md-3 col-sm-6">
                <div class="product-grid">
                    <div class="product-image">
                        <a href="#" class="image">
                            <img src="https://azpet.com.vn/wp-content/uploads/2021/06/Alaska.jpg">
                        </a>
                        <span class="product-discount-label">-3%</span>
                        <ul class="product-links">
                            <li><a href="#"><i class="fa fa-search"></i></a></li>
                            <li><a href="#"><i class="fa fa-heart"></i></a></li>
                            <li><a href="#"><i class="fa fa-random"></i></a></li>
                        </ul>
                        <a href="" class="add-to-cart">Thêm vào giỏ hàng</a>
                    </div>
                    <div class="product-content">
                        <h3 class="title"><a href="#">Chó</a></h3>
                        <!-- <div class="price">1.800.000đ <span>2.000.000đ</span></div> -->
                    </div>
                </div>
            </div>

            <div class="col-md-3 col-sm-6">
                <div class="product-grid">
                    <div class="product-image">
                        <a href="#" class="image">
                            <img src="https://azpet.com.vn/wp-content/uploads/2021/06/Alaska.jpg">
                        </a>
                        <span class="product-discount-label">-0%</span>
                        <ul class="product-links">
                            <li><a href="#"><i class="fa fa-search"></i></a></li>
                            <li><a href="#"><i class="fa fa-heart"></i></a></li>
                            <li><a href="#"><i class="fa fa-random"></i></a></li>
                        </ul>
                        <a href="" class="add-to-cart">Thêm vào giỏ hàng</a>
                    </div>
                    <div class="product-content">
                        <h3 class="title"><a href="#">Chó</a></h3>
                        <!-- <div class="price">1.800.000đ <span>2.000.000đ</span></div> -->
                    </div>
                </div>
            </div>

            <div class="col-md-3 col-sm-6">
                <div class="product-grid">
                    <div class="product-image">
                        <a href="#" class="image">
                            <img src="https://azpet.com.vn/wp-content/uploads/2021/06/Alaska.jpg">
                        </a>
                        <span class="product-discount-label">-0%</span>
                        <ul class="product-links">
                            <li><a href="#"><i class="fa fa-search"></i></a></li>
                            <li><a href="#"><i class="fa fa-heart"></i></a></li>
                            <li><a href="#"><i class="fa fa-random"></i></a></li>
                        </ul>
                        <a href="" class="add-to-cart">Thêm vào giỏ hàng</a>
                    </div>
                    <div class="product-content">
                        <h3 class="title"><a href="#">Chó</a></h3>
                        <!-- <div class="price">1.800.000đ <span>2.000.000đ</span></div> -->
                    </div>
                </div>
            </div>

            <div class="col-md-3 col-sm-6">
                <div class="product-grid">
                    <div class="product-image">
                        <a href="#" class="image">
                            <img src="https://azpet.com.vn/wp-content/uploads/2021/06/Alaska.jpg">
                        </a>
                        <span class="product-discount-label">-0%</span>
                        <ul class="product-links">
                            <li><a href="#"><i class="fa fa-search"></i></a></li>
                            <li><a href="#"><i class="fa fa-heart"></i></a></li>
                            <li><a href="#"><i class="fa fa-random"></i></a></li>
                        </ul>
                        <a href="" class="add-to-cart">Thêm vào giỏ hàng</a>
                    </div>
                    <div class="product-content">
                        <h3 class="title"><a href="#">Chó</a></h3>
                        <!-- <div class="price">1.800.000đ <span>2.000.000đ</span></div> -->
                    </div>
                </div>
            </div>

            <div class="col-md-3 col-sm-6">
                <div class="product-grid">
                    <div class="product-image">
                        <a href="#" class="image">
                            <img src="https://azpet.com.vn/wp-content/uploads/2021/06/Alaska.jpg">
                        </a>
                        <span class="product-discount-label">-0%</span>
                        <ul class="product-links">
                            <li><a href="#"><i class="fa fa-search"></i></a></li>
                            <li><a href="#"><i class="fa fa-heart"></i></a></li>
                            <li><a href="#"><i class="fa fa-random"></i></a></li>
                        </ul>
                        <a href="" class="add-to-cart">Thêm vào giỏ hàng</a>
                    </div>
                    <div class="product-content">
                        <h3 class="title"><a href="#">Chó</a></h3>
                        <!-- <div class="price">1.800.000đ <span>2.000.000đ</span></div> -->
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
export default defineComponent({
    setup() {
        const options1 = ref([{
            value: 'Dài',
            label: 'Dài',
        }, {
            value: 'Ngắn',
            label: 'Ngắn',
        }]);
        const value = ref([]);
        const handleChange = value => {
            console.log(`selected ${value}`);
        };
        watch(value, () => {
            console.log('value', value.value);
        });
        return {
            options1,
            handleChange,
            value,
        }
    }
    
});
</script>
