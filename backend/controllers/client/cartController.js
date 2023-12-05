import { Pet } from "../../models/admin/petModel.js";
import { ImagesPet } from "../../models/admin/imagesPetModel.js"; 
import { Account }from '../../models/account/AccountModel.js'; 

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
  