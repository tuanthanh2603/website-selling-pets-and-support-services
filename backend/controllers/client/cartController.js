import { Pet } from "../../models/admin/petModel.js";
import { ImagesPet } from "../../models/admin/imagesPetModel.js"; 

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
  