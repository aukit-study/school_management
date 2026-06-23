const db = require('../config/db');

const getAllSubjects = async (req, res) => {
    try {
        const [subjects] = await db.query('SELECT * FROM subjects ORDER BY subject_name');
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subjects', error: error.message });
    }
};

module.exports = {
    getAllSubjects,
};