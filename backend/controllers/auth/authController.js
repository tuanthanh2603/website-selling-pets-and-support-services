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
                classify: 'Khách hàng'
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
    const pass = req.body.password;
    console.log("Pass gửi tới từ client: " + pass);
    const { phone , password } = req.body;
    try{
        const user = await Account.findOne({ phone });
        if(!user){
            res.status(401).json({ error: "Số điện thoại không tồn tại." });
            console.log('Số điện thoại không tồn tại')
            return;
        }

        if (user.pass !== password) {
            res.status(402).json({ error: "Mật khẩu không chính xác." });
            console.log('Mật khẩu không chính xác');
            return;
        }
        res.status(200).json({ id: user.id, name: user.name, classify: user.classify, message: "Đăng nhập thành công." });
        console.log('Đăng nhập thành công')
    } catch {
        console.error("Lỗi khi đăng nhập:", error);
        res.status(500).json({ error: "Có lỗi xảy ra khi đăng nhập." });
    }
};