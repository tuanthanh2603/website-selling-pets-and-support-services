<template>
  <div class="row" style="margin-top: 20px; margin-bottom: 20px;">
    <div class="col-md-4" style="display: flex;justify-content: center; align-items: center;">
      <h1 class="display-4 font-italic">Best Place <br><span style="font-size: 40px;">for</span><br> Pet Lover</h1>
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
  <br>
  <br>

  <div class="container">
    <div class="row row-cols-2 g-3">

      <div class="col-md-3 " style="align-items: center; justify-content: center; ">

        <a href="/cho-canh">
          <figure class="bd-placeholder-img rounded-circle"
            style="height: 100px; width: 100px; background-color: #c94b4b; margin: auto ; cursor: pointer;">
            <img src="/images/dog.png" alt="" width="100%" style="padding: 20px;">
          </figure>
          <h5 class="mt-2" style="text-align: center;  font-size: 18px; font-weight: 700;">Chó cảnh</h5>
        </a>
      </div>
      <div class="col-md-3 ">
        <a href="/meo-canh">
          <figure class="bd-placeholder-img rounded-circle"
            style="height: 100px; width: 100px; background-color: #fc4a1a; margin: auto; cursor: pointer;">
            <img src="/images/cat.png" alt="" width="100%" style="padding: 20px;">
          </figure>
          <h5 class="mt-2" style="text-align: center;  font-size: 18px; font-weight: 700;">Mèo cảnh</h5>
        </a>
      </div>
      <div class="col-md-3 ">
        <a href="/phu-kien-thu-cung">
          <figure class="bd-placeholder-img rounded-circle"
            style="height: 100px; width: 100px; background-color: #009fff; margin: auto; cursor: pointer;">
            <img src="/images/collar.png" alt="" width="100%" style="padding: 20px;">
          </figure>
          <h5 class="mt-2" style="text-align: center;  font-size: 18px; font-weight: 700;">Phụ kiện thú cưng</h5>
        </a>
      </div>
      <div class="col-md-3 ">
        <a href="/dich-vu-ho-tro">
          <figure class="bd-placeholder-img rounded-circle"
            style="height: 100px; width: 100px; background-color: #cb356b; margin: auto; cursor: pointer;">
            <img src="/images/pet-grooming.png" alt="" width="100%" style="padding: 20px;">
          </figure>
          <h5 class="mt-2" style="text-align: center; font-size: 18px; font-weight: 700;">Dịch vụ hỗ trợ</h5>
        </a>
      </div>
    </div>
  </div>
  <br>
  <br>




  <div class="container">
    <div class="row" style="justify-content: space-between;">
      <h2 class="col-md-6" style="text-align: left;">Phổ biến nhất</h2>
      <div class="col-md-6" style="text-align: right;"><a-button type="primary" danger><router-link
            to="/pho-bien-nhat">Xem thêm >></router-link></a-button></div>
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

    </div>
  </div>

  <div class="container mt-5">
    <div class="d-flex" style="justify-content: space-between;">
      <h2 style="text-align: right;">Mới nhất</h2>
      <div style="text-align: left;"><a-button type="primary" danger>Xem thêm >></a-button></div>
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


   
        <div v-for="(category, index) in petCategories" :key="index" class="col-md-3 col-sm-6">
          <div class="product-grid">
            <div class="product-image"> 
              <a href="" class="image">
                <img v-if="category.images && category.images.length > 0" :src="'http://localhost:3000/uploads/' + category.images[0].name" alt="Pet Image" />
              </a>
              <span class="product-discount-label">-0%</span>
              <ul class="product-links">
                <li><a href="#"><search-outlined /></a></li>
                <li><a href="#"><heart-outlined /></a></li>
                <li><a href="#"><export-outlined /></a></li>
              </ul>
              <a href="" class="add-to-cart">Thêm vào giỏ hàng</a>
            </div>
            <div class="product-content">
              <h3 class="title"><a href="">{{ category.name }}</a></h3>
              <div class="price">{{ category.price }}<span>2.000.000đ</span></div>
            </div>
        </div> 
      </div>


    </div>
  </div>



  <a-affix :offset-bottom="bottom">
    <a-button type="primary" @click="bottom"
      style="margin-left: 20px; margin-bottom: 50px; border-radius: 50%; width: 50px; height: 50px; background-color: transparent;  border: none; position: relative; padding: 7px;">
      <message-two-tone style=" font-size: 30px; width: 100%; height: 100%;" />
    </a-button>
  </a-affix>
  
</template>

<script>
import { defineComponent, ref ,onMounted} from 'vue';
import { HeartOutlined, SearchOutlined, ExportOutlined, MessageTwoTone } from '@ant-design/icons-vue';
import axios from 'axios';

export default defineComponent({
  components: {
    HeartOutlined, SearchOutlined, ExportOutlined, MessageTwoTone
  },
  setup() {
    const bottom = ref(10);
    const petCategories = ref([]);
    onMounted(()=>{
      const severURL='http://localhost:3000/client/xem-trang-chu/showPetData';
      axios.get(severURL)
           .then((response)=>{
            petCategories.value = response.data;
              console.log(response.data)    
           }).catch((error)=>{
            console.log('Error:',error)        
           })
    })
    return {
      petCategories,
      bottom
    }
  }

})
</script>
    
    
    
<style scoped >
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