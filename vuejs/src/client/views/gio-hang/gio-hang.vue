<template>
    <div class="container mt-5 mb-5">
        <div class="d-flex" style="justify-content: space-between">
            <table>
                <thead>
                    <tr>
                        <th>Mã</th>
                        <th>Ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Giống</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <th><img src="/images/collar.png" alt="" /></th>
                        <td>Thành</td>
                        <td>Cái</td>
                        <td><input type="number" name="" id="" /></td>
                        <td>280000</td>
                        <td><button>xóa</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
var cartData = localStorage.getItem('cart');
if (cartData) {
    // Chuyển đổi chuỗi JSON thành mảng đối tượng JavaScript
    var cartArray = JSON.parse(cartData);

    // Khai báo một mảng để lưu trữ các giá trị id
    var idArray = [];

    // Lặp qua mảng cartArray và lấy giá trị id
    cartArray.forEach(item => {
        if (item.id) {
            idArray.push(item.id);
        }
    });

    // Log mảng chứa các giá trị id
    console.log('Mảng idArray:', idArray);
} else {
    console.log('Không có dữ liệu trong cart trong localStorage.');
}
</script>
<style>
table {
    width: 800px;
    font-family: sans-serif;
    font-weight: 100;
    border-collapse: collapse;
    overflow: hidden;
    text-align: center;
    box-shadow: 0 0 20px black;
}

img {
    height: 80px;
    width: 80px;
}

input {
    width: 55px;
}

th,
td {
    background-color: azure;
    padding: 15px;
    color: black;
}

th {
    text-align: left;
}

thead th {
    background-color: aqua;
}
</style>
