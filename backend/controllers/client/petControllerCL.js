import { Pet } from "../../models/admin/petModel.js";

export const showPet = async(req,res) =>{
    try {
        const pets = await Pet.find();
        res.json(pets);
    } catch (error) {
        console.log("Loi khi lay du lieu",error)
    }
}