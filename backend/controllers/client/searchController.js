import { Pet } from "../../models/admin/petModel.js";
import { ImagesPet } from "../../models/admin/imagesPetModel.js";

export const searchPetData = async (req, res) => {
    const name=req.params.searchValue
    console.log(name)
    try {

        // Lấy từ khóa tìm kiếm từ query string của yêu cầu
      
        // Lấy tất cả dữ liệu về thú cưng từ mô hình Pet dựa trên từ khóa tìm kiếm
        const pets = await Pet.find({ name: { $regex: name, $options: 'i' } });

        // Lấy tên danh mục từ bảng Category
        const petCategoryNames = await Promise.all(pets.map(async (pet) => {
            // Tìm kiếm các hình ảnh liên quan đến thú cưng
            const images = await ImagesPet.find({ petid: pet.id }).exec();
            return {
                id: pet.id,
                name: pet.name,
                status: pet.status,
                price: pet.price,
                images, // Include images associated with the pet
            };
        }));
        console.log(petCategoryNames);
        res.json(petCategoryNames);
    } catch (error) {
        console.error('Lỗi lấy dữ liệu:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi tải dữ liệu' });
    }
};
