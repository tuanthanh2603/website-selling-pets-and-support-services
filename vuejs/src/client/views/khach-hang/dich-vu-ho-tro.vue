<template>
    <div class="container">
        <div class="row">
            <div class="col-md-2">
                <TheMenu/>
            </div>
            <div class="col-md-10">
                gagasga
            </div>
        </div>
    </div>
</template>

<script>
import TheMenu from './TheMenu.vue';
import { defineComponent } from 'vue';
export default defineComponent({
    components:{
        TheMenu
    },
    setup(){
        return {

        }
    }
})



</script>