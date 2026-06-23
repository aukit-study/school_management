const express = require('express');
const router = express.Router();
const {
    getAttendanceSummary,
    getStudentsToWatch,
    getSubjectAverages
} = require('../controllers/dashboardController');

router.get('/attendance-summary', getAttendanceSummary);
router.get('/students-to-watch', getStudentsToWatch);
router.get('/subject-averages', getSubjectAverages);

module.exports = router;