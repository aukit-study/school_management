const express = require('express');
const router = express.Router();
const upload = require('../config/upload'); // <-- 1. นำเข้า multer ที่ตั้งค่าแล้ว
const {
    getAllStudents,
    createStudent,
    updateStudent,
    deleteStudent,
} = require('../controllers/studentController');

// Route for getting all students OR filtering by class
router.get('/', getAllStudents);

// Route for creating a new student
// 2. เพิ่ม middleware "upload.single('profile_image')" เข้าไป
// 'profile_image' คือชื่อ field ของไฟล์ที่เราจะส่งมาจาก Frontend
router.post('/', upload.single('profile_image'), createStudent);

// Routes for updating and deleting a specific student
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

module.exports = router;