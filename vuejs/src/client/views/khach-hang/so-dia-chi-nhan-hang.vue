<template>
    <div class="container">
        <div class="row">
            <div class="col-md-2 ">
                <TheMenu />
            </div>
            <div class="col-md-10">
                <div class="container mt-3">
                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h6 class="h3 mb-0 text-gray-800" style="font-size: 22px;">Sổ địa chỉ nhận hàng</h6>
                    </div>
                    <div class="container " style="padding: 20px;">
                        <a-list class="demo-loadmore-list" :loading="initLoading" item-layout="horizontal"
                            :data-source="list">
                            <template #loadMore>
                                <div v-if="!initLoading && !loading"
                                    :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
                                    <a-button @click="">Thêm địa chỉ mới</a-button>
                                </div>
                            </template>
                            <template #renderItem="{ item }">
                                <a-list-item>
                                    <template #actions>
                                        <a key="list-loadmore-edit">edit</a>
                                        <a key="list-loadmore-more">more</a>
                                    </template>
                                    <a-skeleton avatar :title="false" :loading="!!item.loading" active>
                                        <a-list-item-meta
                                            description="Ant Design, a design language for background applications, is refined by Ant UED Team">
                                            <template #title>
                                                <a href="https://www.antdv.com/">{{ item.name.last }}</a>
                                            </template>
                                           
                                        </a-list-item-meta>
                                    </a-skeleton>
                                </a-list-item>
                            </template>

                        </a-list>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import TheMenu from './TheMenu.vue';
import { defineComponent, onMounted, ref } from 'vue';
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
export default defineComponent({
    components: {
        TheMenu
    },
    setup() {
        const initLoading = ref(true);
        const loading = ref(false);
        const data = ref([]);
        const list = ref([]);
        onMounted(() => {
      fetch(fakeDataUrl).then(res => res.json()).then(res => {
        initLoading.value = false;
        data.value = res.results;
        list.value = res.results;
      });
    });
        return {
            loading,
            initLoading,
            data,
            list,
        }
    }
})
</script>