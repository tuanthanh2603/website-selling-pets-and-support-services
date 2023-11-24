<template>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="Mèo cảnh" @back="() => $router.go(-1)" />
        

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
      const severURL='http://localhost:3000/client/xem-trang-meo-canh/showCatData';
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