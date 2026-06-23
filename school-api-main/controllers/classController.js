const db = require('../config/db');

// @desc    Get all classes
// @route   GET /api/classes
const getAllClasses = async (req, res) => {
    try {
        const [classes] = await db.query('SELECT * FROM classes ORDER BY class_name');
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching classes', error: error.message });
    }
};

module.exports = {
    getAllClasses,
};