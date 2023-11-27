<template>
    <div class="container">
        <div class="row">
            <div class="col-md-2">
                <TheMenu />
            </div>
            <div class="col-md-10">
                <div class="container mt-3">
                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h6 class="h3 mb-0 text-gray-800" style="font-size: 22px;">Yêu thích</h6>
                    </div>
                    <div class="container" style="padding-left: 10%; padding-right: 10%;">
                        <a-list item-layout="horizontal" :data-source="dataFavourite">
                            <template #renderItem="{ item }">
                                <a-list-item>
                                    <template #actions>
                                        <a key="list-loadmore-edit" title="Xoá yêu thích" style="margin-right: 10px;"
                                            @click="deleteFavourite(item.petId)"><delete-outlined /></a>
                                        <a key="list-loadmore-more" title="Thêm vào giỏ hàng"
                                            style="margin-left: 10px;"><shopping-cart-outlined /></a>
                                    </template>
                                    <a-list-item-meta
                                        :description="new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.petPrice)">
                                        <template #title>
                                            <a href="#">{{ item.petName }}</a>
                                        </template>
                                        <template #avatar>
                                            <a-avatar :size="50"
                                                :src="'http://localhost:3000/uploads/' + item.petImages[0]" />
                                        </template>
                                    </a-list-item-meta>
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
import { defineComponent, ref, onMounted } from 'vue';
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons-vue';
import Noty from 'noty';
import 'noty/lib/themes/mint.css'
import 'noty/lib/noty.css'
import axios from 'axios';
const dataFavourite = ref([]);
export default defineComponent({
    components: {
        TheMenu, DeleteOutlined, ShoppingCartOutlined
    },
    setup() {
        onMounted(() => {
            getPetToFavourite();
        })
        const getPetToFavourite = () => {
            const userId = localStorage.getItem('user_id');
            console.log('ID: ' + userId)
            if (userId) {
                const serverUrl = `http://localhost:3000/client/utilities/getPetToFavourite/${userId}`
                axios.get(serverUrl, userId)
                    .then(response => {
                        console.log("Yêu thích:", response.data.result)
                        dataFavourite.value = response.data.result || [];
                    })
                    .catch(error => {
                        console.error('Error fetching favorite products:', error);
                    })
            }
        }
        const deleteFavourite = (id) => {
            console.log(id)
            const serverUrl = `http://localhost:3000/client/utilities/deleteFavourite/${id}`;
            axios.delete(serverUrl)
                .then(response => {
                    new Noty({
                        text: response.data.message,
                        type: 'info',
                        layout: 'topRight',
                        theme: 'mint',
                        timeout: 3000,
                        callbacks: {
                            afterShow: function () {
                                // Reload lại trang sau khi Noty hiện xong
                                setTimeout(() => {
                                    window.location.reload();
                                }, 2000); // Sau 3 giây
                            }
                        }
                    }).show();
                })
                .catch((error) => {
                    console.error('Error deleting favourite product:', error);
                    new Noty({
                        text: 'Xoá thất bại',
                        type: 'error',
                        layout: 'topRight',
                        theme: 'mint',
                        timeout: 3000,

                    }).show();
                })
        }
        return {
            dataFavourite,
            deleteFavourite


        }
    }
})
</script>