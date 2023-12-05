import { Pet } from "../../models/admin/petModel.js";
import { ImagesPet } from "../../models/admin/imagesPetModel.js";

export const searchPetData = async (req, res) => {
    const name = req.params.searchValue;
    console.log(name);
    try {
        const pets = await Pet.find({ name: { $regex: name, $options: 'i' } });
        const petCategoryNames = await Promise.all(pets.map(async (pet) => {
            const images = await ImagesPet.find({ petid: pet.id }).exec();
            return {
                id: pet.id,
                name: pet.name,
                status: pet.status,
                price: pet.price,
                images, 
            };
        }));

        console.log(petCategoryNames);
        res.json(petCategoryNames);
    } catch (error) {
        console.error('Lỗi lấy dữ liệu:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi tải dữ liệu' });
    }
};

export const showInfo = async (req, res) => {
    const ids = req.params.petId; 
    console.log("id pet"+ids);
    try {
        const pets = await Pet.find({ _id: { $in: ids } });
        const petCategoryNames = await Promise.all(pets.map(async (pet) => {
            const images = await ImagesPet.find({ petid: pet.id }).exec();
            return {
                id: pet.id,
                name: pet.name,
                status: pet.status,
                price: pet.price,
                images, 
            };
        }));
        console.log(petCategoryNames);
        res.json(petCategoryNames);
    } catch (error) {
        console.error('Lỗi lấy dữ liệu:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi tải dữ liệu' });
    }
};

