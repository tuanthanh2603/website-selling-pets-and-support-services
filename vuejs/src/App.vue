<!-- Client -->  
<template>
  <a-layout class="layout">
    <a-layout-header style="padding-inline: 0px;" >
      <TheHeader/>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <!-- Hiển thị các trang con -->
        <router-view></router-view>
      <!--  -->
    </a-layout-content>
    <a-layout-footer style="text-align: center">
    </a-layout-footer>
  </a-layout>
    
    
  
</template>
<script>
import TheHeader from './client/components/TheHeader.vue';


export default {
    components: {
        TheHeader
    }
   
}
</script>
