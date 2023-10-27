import { Account } from "../../models/account/AccountModel.js";

export const getListClient = async (req, res) => {
    try {
        const listClient = await Account.find({ classify: "Khách hàng" })
        res.status(200).json(listClient)
    } catch {
        console.error("Error retrieving data:", error);
        res.status(500).json({ msg: "Error retrieving data from DB" });
    }
};
export const updateInfoClientController = async(req, res) => {
    try {
        const id = req.body.id;
        const updateData = req.body;
        console.log(updateData)
        console.log(id)
        const updateClient = await Account.findOneAndUpdate({_id:id}, updateData, {new: true});
        if (!updateClient) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.json(updateClient);
    } catch {
        console.error("Error update data:", error);
        res.status(500).json({ msg: "Error update data" });
    }
}