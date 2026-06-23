const express = require('express');
const router = express.Router();
const {
    getAttendanceSheet,
    saveAttendanceSheet,
    getRecordedSessions
} = require('../controllers/attendanceController');

// Route สำหรับดึงข้อมูลหน้าเช็คชื่อ
router.get('/', getAttendanceSheet);

// Route สำหรับบันทึกข้อมูลการเช็คชื่อ
router.post('/', saveAttendanceSheet);

router.get('/recorded-sessions', getRecordedSessions);

module.exports = router;