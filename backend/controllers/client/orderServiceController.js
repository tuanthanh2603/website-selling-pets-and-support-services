import { OrderService } from "../../models/orderServiceModel.js";

export const createOrderService = async (req, res) => {
    try {
        const { name, phone, petName, createdDate } = req.body;
        //tạo order
        const newOrder = new OrderService({
            name,
            phone,
            petName,
            service_selected,
            date_selected: createdDate,
            date_created: Date.now(),
          });
          await newOrder.save();

          res.status(201).json({ message: 'Order submitted successfully' });
        } catch (error) {
          console.error('Error submitting order:', error);
          res.status(500).json({ error: 'Error submitting order' });
        }
    };