<template>
    <div class="container">
        <div class="row">
            <div class="col-md-2">
                <TheMenu />
            </div>
            <div class="col-md-10">
                <div class="container mt-3">
                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h6 class="h3 mb-0 text-gray-800" style="font-size: 22px;">Thông tin tài khoản</h6>
                    </div>
                    <div class="container">
                        2
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import TheMenu from './TheMenu.vue';
import { defineComponent, ref } from 'vue';
export default defineComponent ({
    components: {
        TheMenu

    },
    setup(){
        return{

        }
    }
})
</script>