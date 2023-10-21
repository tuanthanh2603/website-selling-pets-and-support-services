<template>
    <div class="row">
        <div class="col-md-2">
            <TheSider />
        </div>
        <div class="col-md-10">
            <div class="container-fluid mt-3">
                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                    <h6 class="h3 mb-0 text-gray-800">Dashboard</h6>
                </div>
            </div>
        </div>


    </div>
</template>
<script>
import TheSider from '../../components/TheSider.vue';
export default {
    components: {
        TheSider
    }
}
</script>