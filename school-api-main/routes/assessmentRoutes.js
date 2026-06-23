const express = require('express');
const router = express.Router();
const { createAssessmentItem, updateAssessmentItem, deleteAssessmentItem } = require('../controllers/assessmentController');

router.post('/', createAssessmentItem);
router.put('/:id', updateAssessmentItem); // เพิ่ม
router.delete('/:id', deleteAssessmentItem);

module.exports = router;