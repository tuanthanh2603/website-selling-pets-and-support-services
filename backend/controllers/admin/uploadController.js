import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const originalname = file.originalname;

    // Kiểm tra định dạng tệp
    if (originalname.match(/\.(jpg|jpeg|png)$/i)) {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      const hours = String(currentDate.getHours()).padStart(2, "0");
      const minutes = String(currentDate.getMinutes()).padStart(2, "0");

      const newFileName = `${year}-${month}-${day}-${hours}${minutes}@${originalname}`;
      cb(null, newFileName);
    } else {
      // Định dạng không hợp lệ
      cb(new Error("Invalid file format"));
    }
  },
});
const upload = multer({ storage: storage });
export default upload
