const express = require('express');
const router = express.Router();
const {
    getScoresheet,
    saveScoresheet,
} = require('../controllers/scoreController');

// Route สำหรับดึงข้อมูลหน้ากรอกคะแนน
router.get('/', getScoresheet);

// Route สำหรับบันทึกคะแนน
router.post('/', saveScoresheet);

module.exports = router;