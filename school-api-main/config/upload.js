const multer = require('multer');
const path = require('path');

// ตั้งค่าที่จัดเก็บไฟล์
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // กำหนดให้บันทึกไฟล์ในโฟลเดอร์ public/images/students
        cb(null, 'public/images/students/');
    },
    filename: function (req, file, cb) {
        // ตั้งชื่อไฟล์ใหม่เพื่อป้องกันชื่อซ้ำ: วันที่ปัจจุบัน + ชื่อไฟล์เดิม
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

module.exports = upload;