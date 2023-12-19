import { OrderService } from "../../models/orderServiceModel.js"

export const getAllOrdersService = async (req, res) => {
    try {
        //Lấy danh sách tất cả dịch vụ từ db
        const ordersService = await OrderService.find();
        //Gửi danh sách về client
        res.status(200).json(ordersService);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách dịch vụ', error);
        res.status(500).json({ error: 'Có lỗi khi lấy danh sách dịch vụ'});
    }
}
