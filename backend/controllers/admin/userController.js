import { Account } from "../../models/account/AccountModel.js";

export const addUser = async (req, res) => {
    const { phone } = req.body;
    try {
        const existingUser = await Account.findOne({ phone });
        if(existingUser){
            console.log("Người dùng đã tồn tại.");
            return res.status(400).json({ message: "Người dùng đã tồn tại." });
        }
        const newUser = await Account.create(req.body);
        console.log("Người dùng đã được thêm mới:", newUser);
        res.status(201).json({ success: true });
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const getListUser = async (req, res) => {
    try{
        const users = await Account.find();
        res.status(200).send(users);
    } catch(error){
        console.error('Lỗi lấy dữ liệu:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi tải dữ liệu' });
    }
}