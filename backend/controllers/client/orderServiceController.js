import { OrderService } from "../../models/orderServiceModel.js";
import moment from 'moment-timezone';

export const createOrderService = async (req, res) => {
  try {
      const { userId, name, phone, petName, selected_service_name, selected_service_price, totalPrice } = req.body;
      //console.log("Panda: ", userId, name, phone, petName, selected_service_name, selected_service_price, totalPrice)
      // Gộp thành mảng duy nhất
      const selectedServices = selected_service_name.map((name, index) => `${name} - ${selected_service_price[index]}`);
      const serviceInfoString = selectedServices.join(', ');
      const formattedDate = moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss');
      console.log("BEAR HOUR: ", formattedDate)
      // Tạo order
      const newOrder = new OrderService({
          userId,
          name,
          phone,
          petName,
          service_selected: serviceInfoString,
          total_price: totalPrice,
          date_created: formattedDate,
          payment: 'Đã thanh toán',
      });

      // Lưu order vào database
      await newOrder.save();

      res.status(201).json({ success: true });
  } catch (error) {
      console.error('Error submitting order:', error);
      res.status(500).json({ error: 'Lỗi xác nhận tạo dịch vụ', details: error.message });
  }
};

export const getListOrderService = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await OrderService.find({ userId: userId });

    res.status(200).json({ orders: orders });
  } catch (error) {
    console.error('Lỗi lấy đơn dịch vụ:', error);
    res.status(500).json({ error: 'Lỗi nhận đơn dịch vụ', details: error.message });
  }
};