<template>
    <div class="row">
        <div class="col-md-2">
            <TheSider />
        </div>
        <div class="col-md-10">
            <div class="container-fluid mt-3">
                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                    <h6 class="h3 mb-0 text-gray-800" style="font-size: 24px;">Phụ kiện</h6>
                </div>
                
                <div class="container">
                    <a-button type="primary" style="margin-right: 10px;">Thêm danh mục</a-button>
                    <a-button type="primary" style="margin-right: 10px;">Danh sách danh mục</a-button>
                    <a-button type="primary" style="margin-right: 10px;">Thêm phụ kiện mới</a-button>
                    <a-table style="margin-top: 10px;" :columns="columnsAccessory" :data-source="dataAccessory">
                        <template #headerCell="{ column }">
                            <template v-if="column.key === 'name'">
                                <span>
                                    Phụ kiện
                                </span>
                            </template>
                        </template>
                        <template #bodyCell="{ column, record }">
                            
                        </template>
                    </a-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import TheSider from '../../components/TheSider.vue';
import { defineComponent, ref } from 'vue';

const columnsAccessory = [
    {
        title: 'STT',
        key: 'stt',
        customRender: (text, record, index) => {
            const stt = text.renderIndex;
            // console.log(stt + 1);
            const STT = stt + 1;
            return STT
        },
    },
    {
        title: 'Tên phụ kiện',
        key: ''
    },
    {
        title: 'Hình ảnh',
        key: '',
    },
    {
        title: 'Giá bán',
        key: '',
    },
    {
        title: 'Phân loại',
        key: '',
    },
    {
        title: 'Số lượng',
        key: '',
    },
    {
        title: 'Tuỳ chỉnh',
        key: '',
    }, 
    
]
export default defineComponent({
    components: {
        TheSider,
    },
    setup() {
        const dataAccessory = ref([])
        return{
            columnsAccessory, 
            dataAccessory

        }
    }
})
</script>