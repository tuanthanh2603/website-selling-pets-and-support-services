<template>
  
    <TheHeader/>
    <router-view></router-view>
  
</template>
<script>
import TheHeader from './components/clients/TheHeader.vue';


export default {
    components: {
        TheHeader
    }
   
}
</script>
