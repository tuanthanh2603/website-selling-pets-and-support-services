import { Account } from "../../models/account/AccountModel.js";

export const addUser = async (req, res) => {
    const { phone } = req.body;
    try {
        const existingUser = await Account.findOne({ phone });f
        if(existingUser){
            console.log("nhân viên đã tồn tại.");
            return res.status(400).json({ message: "nhân viên đã tồn tại." });
        }
        const newUser = await Account.create(req.body);
        console.log("nhân viên đã được thêm mới:", newUser);
        res.status(201).json({ success: true });
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const getListUser = async (req, res) => {
    try{
        
        const users = await Account.find({ classify: { $ne: "Khách hàng" }});
        res.status(200).send(users);
    } catch(error){
        console.error('Lỗi lấy dữ liệu:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi tải dữ liệu' });
    }
};

export const updateUser = async (req, res) => {
    const userId = req.params.id;
    console.log(userId)
    try{
        const { name, phone, pass, email, address, classify, sex } = req.body;
        const updateUser = await Account.findByIdAndUpdate(
            userId, {
                name, 
                phone, 
                pass, 
                email, 
                address, 
                classify, 
                sex
            }, {
                new: true // Trả về document mới sau khi cập nhật
            }
        );
        if(!updateUser) { 
            return res.status(404).json({ error: 'Không tìm thấy nhân viên để cập nhật' });
        }
        res.status(200).json({ message: 'Cập nhật thông tin nhân viên thành công' });
    } catch(error){
        console.error('Lỗi cập nhật nhân viên:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật nhân viên' });
    }
};

export const deleteUser = async (req, res) => {
    const userId = req.params.id;
    console.log(userId)
    try{
        const user = await Account.findById(userId);
        if(!user) {
            return res.status(404).json({ error: 'Không tìm nhân viên để xoá' });
        }
        await Account.findByIdAndDelete(userId)
        res.status(200).json({ message: 'Xóa nhân viên thành công' });
    } catch(error){
        console.error('Lỗi xoá nhân viên:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xoá nhân viên' });
    }
}