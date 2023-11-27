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
                                    <a-button @click="showModalNewAddress">Thêm địa chỉ mới</a-button>
                                </div>
                            </template>
                            <template #renderItem="{ item }">
                                <a-list-item>
                                    <template #actions>
                                        <a key="list-loadmore-edit">Xoá</a>
                                        <a key="list-loadmore-more">Chỉnh sửa</a>
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
    <a-modal v-model:visible="modalNewAddress" title="Thêm địa chỉ mới" @ok="handleOk" :closable="false">
        <template #footer>

        </template>
        <a-form :model="formNewAddress" v-bind="layout" name="nest-messages" @finish="newAddress">
            <a-form-item name="name" label="Tên người nhận" :rules="[{ required: true , message: 'Vui lòng nhập thông tin.'}]">
                <a-input v-model:value="formNewAddress.name" placeholder="Nhập tên của người nhận"/>
            </a-form-item>
            <a-form-item name="phone" label="Số điện thoại" :rules="[{ required: true , message: 'Vui lòng nhập thông tin.'}]">
                <a-input v-model:value="formNewAddress.phone" placeholder="Nhập số điện thoại người nhận"/>
            </a-form-item>
            <a-form-item name="city" label="Tỉnh/Thành Phố" :rules="[{ required: true , message: 'Vui lòng chọn thông tin.'}]">
                <a-input v-model:value="formNewAddress.city" placeholder="Vui lòng chọn"/>
            </a-form-item>
            
            <a-form-item name="address" label="Địa chỉ người nhận" :rules="[{ required: true , message: 'Vui lòng nhập thông tin.'}]">
                <a-input v-model:value="formNewAddress.address" placeholder="Ví dụ: Số nhà/tên đường cụ thể..."/>
            </a-form-item>
            <a-form-item name="email" label="Email">
                <a-input v-model:value="formNewAddress.email" placeholder="Nhập địa chỉ email"/>
            </a-form-item>
            <a-form-item name="note" label="Ghi chú">
                <a-textarea v-model:value="formNewAddress.note" placeholder="Nếu bạn có lời nhắn thêm, vui lòng cho biết" />
            </a-form-item>
            <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
                <a-button type="primary" html-type="submit">Thêm địa chỉ mới</a-button>
            </a-form-item>
        
        </a-form>

    </a-modal>
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
        const modalNewAddress = ref(false)
        const showModalNewAddress = () => {
            modalNewAddress.value = true
        }
        const layout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 16,
            },
        };
        const formNewAddress = ref([]);
        const newAddress = values => {
            console.log('Values: ', values);
        }

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
            modalNewAddress, showModalNewAddress, layout, formNewAddress, newAddress
        }
    }
})
</script>