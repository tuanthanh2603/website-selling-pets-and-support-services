import { Pet } from "../../models/admin/petModel.js";
import { ImagesPet } from "../../models/admin/imagesPetModel.js"; // Thay thế bằng tên thực tế của mô hình ImagePet

export const showCatData = async (req, res) => {
    try {
        // Find all pets with classify equal to 'Mèo cảnh'
        const pets = await Pet.find({ classify: 'Mèo cảnh' });

        // Lấy tên danh mục từ bảng Category
        const petCategoryNames = await Promise.all(pets.map(async (pet) => {
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