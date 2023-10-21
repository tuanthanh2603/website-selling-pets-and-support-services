import { AccountClient } from "../../models/client/AccountClient.js";

export const addUserAccountController = async (req, res) => {
    console.log('Dữ liệu nhận được từ client:' , req.body)
    const { phone , pass } = req.body
    const checkPhone = await AccountClient.findOne({ phone });
    try {
        if(checkPhone) {
            console.log("Số điện thoại đã tồn tại.");
            res.status(400).json({ message: "Số điện thoại đã tồn tại." });
        } else {
            const newAccountClient = await AccountClient.create({
                name: 'Khách hàng',
                phone: phone,
                pass: pass,
                email: '',
                sex: '',
            });
            console.log(newAccountClient);
            res.status(201).json(newAccountClient);
        }
    } catch {
        console.error("Error inserting data:", error);
        res.status(500).json({ msg: "Error inserting data" });
    }
};