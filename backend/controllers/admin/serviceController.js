import { ServiceCategory } from "../../models/ServicesModel.js";
import path from "path"

export const addServiceToCategory = async (req, res) => {
    try {
        const serviceData = req.body;

        //Lưu dịch vụ mới
        const newService = await ServiceCategory.create({
            service_name: serviceData.name,
            service_price: serviceData.price, 
        });
        const serviceId = newService._id;
        console.log("Thêm dịch vụ thành công");
        res.status(200).json({ message: "Dữ liệu đã được xử lý thành công"});
    } catch (error) {
        console.error("Lỗi khi xử lý dữ liệu: ", error);
        res.status(500).json({ error: "Có lỗi khi xử lý dữ liệu"});
    }
}

export const deleteService = async (req, res) => {
    const serviceIdToRemove = req.params.id;
    console.log("id: " + itemId);
    try {
        const deleteService = await ServiceCategory.findByIdAndRemove(serviceIdToRemove);
        
        if (deleteService) {
            console.log("Xóa dịch vụ thành công");
            res.status(200).json({ message: "Xóa thành công"});
        } else {
            console.log("Không tìm thấy dịch vụ cần xóa");
            res.status(404).json({ message: "Không tìm thấy dịch vụ cần xóa"});
        }
    } catch (error) {
        console.error("Lỗi khi xóa dịch vụ");
        res.status(500).json({ message: "Xóa dịch vụ thất bại"});
    }
}

export const updateService = async (req, res) => {
    const updateServiceData = req.body;
    const serviceId = req.params.id;
    const { name, price, status } = updateServiceData;
    console.log('Received Data:', updateServiceData);
    console.log('Received id:', serviceId);
    try {
        const existingService = await ServiceCategory.findById(serviceId);
        console.log('Found Service:', existingService);

        if (!existingService) {
            return res.status(404).json({ message: 'Không tìm thấy dịch vụ.' });
        } else {
            existingService.service_name = name;
            existingService.service_price = price;
            existingService.service_status = status;

            await existingService.save();
            console.log(existingService.service_name);
            console.log('Updated Service:', existingService);

            return res.status(200).json({ message: 'Cập nhật dịch vụ thành công.' });
        }
    } catch (error) {
        console.error('Lỗi khi cập nhật dịch vụ:', error);
        return res.status(500).json({ error: 'Có lỗi xảy ra khi cập nhật dịch vụ.' });
    }
};



export const getAllServices = async (req, res) => {
    try {
        //Lấy danh sách tất cả dịch vụ từ db
        const services = await ServiceCategory.find();
        //Gửi danh sách về client
        res.status(200).json(services);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách dịch vụ', error);
        res.status(500).json({ error: 'Có lỗi khi lấy danh sách dịch vụ'});
    }
}
