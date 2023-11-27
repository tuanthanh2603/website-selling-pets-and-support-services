import { ImagesPet } from "../../models/admin/imagesPetModel.js";
import { Pet } from "../../models/admin/petModel.js";
import { Favourite } from "../../models/favouriteModel.js";

export const addToFavorites = async (req, res) => {
    console.log(req.body)
    const { userId, productId } = req.body;
    try{
        const existingFavorite = await Favourite.findOne({ userId, productId })
        if(existingFavorite){
            console.log('Sản phẩm đã được thêm vào yêu thích.')
            return res.status(400).json({ message: 'Sản phẩm đã được thêm vào yêu thích.' });
        }
        const newFavorite = new Favourite({ userId, productId});
        await newFavorite.save();
        console.log('Yêu thích sản phẩm thành công.')
        return res.status(200).json({ message: 'Yêu thích sản phẩm thành công.' });

    } catch(error) {
        console.log(error)
        return res.status(500).json({ message: 'Có lỗi xảy ra khi thêm sản phẩm vào yêu thích.' });
    }
}
export const getPetToFavourite = async (req, res) => {
    const userId = req.params.userId
    console.log(userId)
    try{
        const favouritePets = await Favourite.find({ userId }).distinct('productId');
        // console.log(favouritePets)
        const petInfo = await Pet.find({ _id: {$in: favouritePets }});
        // console.log(petInfo)
        const petImages = await ImagesPet.find({ petid: {$in: favouritePets} });
        // console.log(petImages);
        const result = petInfo.map(pet => {
            const images = petImages.filter(image => image.petid.toString() === pet._id.toString());
            return {
                petId: pet._id,
                petName: pet.name,
                petPrice: pet.price,
                petImages: images.map(image => image.name)
            }
        })
        // console.log(result)
        res.status(200).json({ result })
    } catch (error){
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
export const deleteFavourite = async (req, res) => {
    const id = req.params.id
    console.log(id)
    try{
        await Favourite.findOneAndDelete({ productId: id });
        res.status(200).json({ message: 'Xoá sản phẩm khỏi yêu thích!' });

    } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}