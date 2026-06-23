const db = require('../config/db');

// @desc    Get all students (optionally filter by class)
// @route   GET /api/students OR /api/students?class_id=1
const getAllStudents = async (req, res) => {
    try {
        // แก้ไข ORDER BY เป็น s.student_number
        let query = 'SELECT s.*, c.class_name FROM students s JOIN classes c ON s.class_id = c.class_id';
        const { class_id } = req.query;

        if (class_id) {
            query += ' WHERE s.class_id = ?';
        }

        query += ' ORDER BY s.student_number ASC'; // เพิ่มการเรียงลำดับตามเลขที่

        const [students] = await db.query(query, [class_id]);
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching students', error: error.message });
    }
};
// @desc    Create a new student
// @route   POST /api/students
const createStudent = async (req, res) => {
    try {
        // ข้อมูล text จะอยู่ใน req.body
        const { title, student_number, first_name, last_name, class_id, parent_name, parent_phone } = req.body;

        // ข้อมูลไฟล์จะอยู่ใน req.file
        // เราจะสร้าง URL ที่ถูกต้องเพื่อเก็บลงฐานข้อมูล
        const imageUrl = req.file ? `/public/images/students/${req.file.filename}` : null;

        if (!title || !first_name || !last_name || !class_id) {
            return res.status(400).json({ message: 'Please provide required fields' });
        }

        const [result] = await db.query(
            // เพิ่ม profile_image_url เข้าไปในคำสั่ง INSERT
            'INSERT INTO students (title, student_number, first_name, last_name, class_id, parent_name, parent_phone, profile_image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [title, student_number, first_name, last_name, class_id, parent_name, parent_phone, imageUrl]
        );

        res.status(201).json({ student_id: result.insertId, message: 'Student created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating student', error: error.message });
    }
};

// @desc    Update a student
// @route   PUT /api/students/:id
const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, student_number, first_name, last_name, class_id, parent_name, parent_phone } = req.body;
        if (!title || !first_name || !last_name || !class_id) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        const [result] = await db.query(
            'UPDATE students SET title = ?, student_number = ?, first_name = ?, last_name = ?, class_id = ?, parent_name = ?, parent_phone = ? WHERE student_id = ?',
            [title, student_number, first_name, last_name, class_id, parent_name, parent_phone, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating student', error: error.message });
    }
};

// @desc    Delete a student
// @route   DELETE /api/students/:id
const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query('DELETE FROM students WHERE student_id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting student', error: error.message });
    }
};

module.exports = {
    getAllStudents,
    createStudent,
    updateStudent,
    deleteStudent,
};