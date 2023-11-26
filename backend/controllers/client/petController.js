/// client/petController.js
import { Pet } from "../../models/admin/petModel.js";
import { CategoryPet } from "../../models/admin/categoryPetModel.js";
import { ImagesPet } from "../../models/admin/imagesPetModel.js";
export const getPetToDogPage = async (req, res) => {
    try {
        const dogs = await Pet.find({ classify: 'Chó cảnh', status: 'Hiện' }).populate('category').exec();

        if (dogs) {
            const listDogs = await Promise.all(
                dogs.map(async (dog) => {
                    const { id, name, price, sex } = dog;
                    const categoryName = dog.category.name;
                    const categoryId = dog.category.id;
                    const image = await ImagesPet.findOne({ petid: dog.id }).exec();
                    return {
                        id,
                        name,
                        categoryId,
                        categoryName,
                        price,
                        sex,
                        image,
                    };
                })
            );

            res.status(200).json({ listDogs });
        } else {
            res.status(404).json({ msg: 'No data' });
        }
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ msg: 'Error retrieving data from DB' });
    }
};
export const getCategoryPetToSelectDogPage = async (req, res) => {
    try {
        const categoryPets = await CategoryPet.find({
            classify: 'Chó cảnh',
            status: 'Hiện'
        });
        res.status(200).json({ categoryPets })
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ msg: 'Error retrieving data from DB' });
    }
}
