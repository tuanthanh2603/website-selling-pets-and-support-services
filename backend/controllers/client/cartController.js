import { Pet } from "../../models/admin/petModel.js";
import { ImagesPet } from "../../models/admin/imagesPetModel.js"; 
import { Account }from '../../models/account/AccountModel.js'; 
import { Cart } from "../../models/cartModel.js";

export const cartController = async (req, res) => {
    try {
      const arrayId = req.params.searchValue.split(',');
      console.log(arrayId);
  
      // Tìm pet có id trùng khớp với mảng arrayId
      const pets = await Pet.find({ _id: { $in: arrayId } });
  
      // Kết hợp thông tin pet và ảnh để hiển thị
      const result = await Promise.all(pets.map(async pet => {
        const images = await ImagesPet.find({ petid: pet.id }).exec();
        return {
          id: pet.id,
          images,
          name: pet.name,
          sex:pet.sex,
          price: pet.price,
        };
      }));
  
      res.status(200).json(result);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  const calculateTotalPrice = (cartItems) => {
    return cartItems.reduce((acc, item) => acc + item.price, 0);
  };
  
  // Controller function for processing payments
  export const thanhtoan = async (req, res) => {
    try {
      // Extract necessary data from the request body
      const { userId, ten, sdt } = req.body;
      const cartItems = req.body.cartItems; // Assuming you send the cart items for the payment
  
      // Calculate the total price
      const thanhTien = calculateTotalPrice(cartItems);
  
      // Create a new payment record
      const payment = new Cart({
        userId,
        ten,
        sdt,
        thanhTien,
        trangThai: "Đã thanh toán", // You can adjust this based on your requirements
      });
  
      // Save the payment record to the database
      const savedPayment = await payment.save();
  
      // Send a success response
      res.status(201).json(savedPayment);
    } catch (error) {
      // Handle errors
      console.error("Error processing payment:", error);
      res.status(500).send("Internal Server Error");
    }
  };

  

export const khachHangController = async (req, res) => {
  try {
    const idkhachHang = req.params.idkhachHang.split(',');
    console.log(idkhachHang);
    // Tìm khách hàng có id trùng khớp với mảng arrayId
    const customers = await Account.find({ _id: { $in: idkhachHang } } );
    const result = await Promise.all(customers.map(async cus => {
      return{
        id:cus.id,
        name: cus.name,
        sdt:cus.phone,
      }
    }))

    res.status(200).json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
  