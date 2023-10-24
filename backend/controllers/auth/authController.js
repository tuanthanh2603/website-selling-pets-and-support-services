import { Account } from "../../models/account/AccountModel.js";

export const addUserAccountController = async (req, res) => {
    console.log('Dữ liệu nhận được từ client:' , req.body)
    const { phone , pass } = req.body
    const checkPhone = await Account.findOne({ phone });
    try {
        if(checkPhone) {
            console.log("Số điện thoại đã tồn tại.");
            res.status(400).json({ message: "Số điện thoại đã tồn tại." });
        } else {
            const newAccount = await Account.create({
                name: 'Khách hàng',
                phone: phone,
                pass: pass,
                email: '',
                sex: '',
                classify: 'Client'
            });
            console.log(newAccount);
            res.status(201).json(newAccount);
        }
    } catch {
        console.error("Error inserting data:", error);
        res.status(500).json({ msg: "Error inserting data" });
    }
};
export const loginUserAccountController = async (req, res) => {

};