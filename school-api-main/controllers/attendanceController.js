const db = require('../config/db');

// @desc    Get attendance sheet for a class, subject, and date
// @route   GET /api/attendance?class_id=1&subject_id=1&date=2025-10-09
const getAttendanceSheet = async (req, res) => {
    try {
        const { class_id, subject_id, session_number } = req.query;

        if (!class_id || !subject_id || !session_number) {
            return res.status(400).json({ message: 'กรุณาระบุ class_id, subject_id, และ session_number' });
        }

        // แก้ไข SQL ให้ JOIN ด้วย session_number แทน date
        const sql = `
      SELECT
        s.student_id, s.student_number, s.title, s.first_name, s.last_name, s.profile_image_url,
        a.status
      FROM students s
      LEFT JOIN
        attendance a ON s.student_id = a.student_id
        AND a.subject_id = ? 
        AND a.session_number = ?
      WHERE s.class_id = ?
      ORDER BY s.student_number;
    `;

        const [sheetData] = await db.query(sql, [subject_id, session_number, class_id]);
        res.status(200).json(sheetData);

    } catch (error) {
        res.status(500).json({ message: 'Error fetching attendance sheet', error: error.message });
    }
};

// @desc    Save attendance data for multiple students
// @route   POST /api/attendance
const saveAttendanceSheet = async (req, res) => {
    try {
        // ตรวจสอบให้แน่ใจว่าดึงค่ามาจาก req.body
        const { subject_id, date, session_number, attendanceData } = req.body;

        if (!subject_id || !date || !session_number || !Array.isArray(attendanceData)) {
            return res.status(400).json({ message: 'Invalid data format provided' });
        }

        const values = attendanceData.map(att => [
            att.student_id,
            subject_id,
            session_number,
            date,
            att.status
        ]);

        if (values.length === 0) {
            return res.status(200).json({ message: 'No attendance data to save' });
        }

        const sql = `
            INSERT INTO attendance (student_id, subject_id, session_number, attendance_date, status)
            VALUES ?
            ON DUPLICATE KEY UPDATE status = VALUES(status), attendance_date = VALUES(attendance_date);
        `;

        await db.query(sql, [values]);

        res.status(200).json({ message: 'Attendance saved successfully' });

    } catch (error) {
        console.error('Error saving attendance sheet:', error);
        res.status(500).json({ message: 'Error saving attendance sheet', error: error.message });
    }
};

const getRecordedSessions = async (req, res) => {
    try {
        const { class_id, subject_id } = req.query;
        if (!class_id || !subject_id) {
            return res.status(400).json({ message: 'กรุณาระบุ class_id และ subject_id' });
        }

        // ดึง "เลขคาบ" ที่ไม่ซ้ำกันทั้งหมดที่มีการบันทึกไว้
        const sql = `
            SELECT DISTINCT a.session_number
            FROM attendance a
            JOIN students s ON a.student_id = s.student_id
            WHERE s.class_id = ? AND a.subject_id = ?
            ORDER BY a.session_number;
        `;
        const [results] = await db.query(sql, [class_id, subject_id]);

        // แปลงผลลัพธ์จาก [{ session_number: 1 }, { session_number: 2 }]
        // ให้เป็น [1, 2] เพื่อให้ Frontend ใช้งานง่าย
        const recordedSessions = results.map(row => row.session_number);

        res.status(200).json(recordedSessions);

    } catch (error) {
        res.status(500).json({ message: 'Error fetching recorded sessions', error: error.message });
    }
};


module.exports = {
    getAttendanceSheet,
    saveAttendanceSheet,
    getRecordedSessions
};