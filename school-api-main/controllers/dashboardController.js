const db = require('../config/db');

// --- 1. API สำหรับสรุปผลการเข้าเรียนวันนี้ ---
const getAttendanceSummary = async (req, res) => {
    try {
        const { class_id } = req.query;
        const today = new Date().toLocaleDateString('en-CA');

        // --- 1. ดึงจำนวนนักเรียนทั้งหมด ---
        let totalStudentQuery = 'SELECT COUNT(*) as total FROM students';
        if (class_id) {
            totalStudentQuery += ' WHERE class_id = ?';
        }
        const [[totalResult]] = await db.query(totalStudentQuery, class_id ? [class_id] : []);
        const totalStudents = totalResult.total;

        // --- 2. ★★★ Logic ใหม่: นับจำนวนที่เช็คแล้ว และจำนวนที่ขาด ใน Query เดียว ★★★ ---
        let summaryQuery = `
            SELECT
                COUNT(DISTINCT a.student_id) AS total_checked,
                COUNT(DISTINCT CASE WHEN a.status = 'ขาด' THEN a.student_id END) AS absent_count
            FROM attendance a
        `;
        const params = [today];

        if (class_id) {
            summaryQuery += ` JOIN students s ON a.student_id = s.student_id WHERE a.attendance_date = ? AND s.class_id = ?`;
            params.push(class_id);
        } else {
            summaryQuery += ` WHERE a.attendance_date = ?`;
        }

        const [[summaryResult]] = await db.query(summaryQuery, params);

        const totalChecked = Number(summaryResult.total_checked) || 0;
        const absentStudents = Number(summaryResult.absent_count) || 0;


        // --- 3. คำนวณจำนวนมาเรียนจากข้อมูลที่ถูกต้อง ---
        // (นับรวม สาย และ ลา เป็น "มาเรียน")
        const presentStudents = totalChecked - absentStudents;

        // --- 4. ส่งข้อมูลที่ถูกต้องกลับไป ---
        res.status(200).json({
            totalStudents: totalStudents,
            presentStudents: presentStudents,
            absentStudents: absentStudents,
        });

    } catch (error) {
        console.error("Error in getAttendanceSummary:", error);
        res.status(500).json({ message: 'Error fetching attendance summary', error: error.message });
    }
};

// --- 2. API สำหรับดึงรายชื่อนักเรียนที่ต้องติดตาม ---
const getStudentsToWatch = async (req, res) => {
    try {
        const { class_id } = req.query;
        if (!class_id) {
            return res.status(400).json({ message: 'กรุณาระบุ class_id' });
        }

        // ตัวอย่าง: ดึงนักเรียนที่ "ขาดเรียน" ตั้งแต่ 3 ครั้งขึ้นไป
        const sql = `
            SELECT s.title, s.first_name, s.last_name, COUNT(a.attendance_id) as absent_count
            FROM students s
            JOIN attendance a ON s.student_id = a.student_id
            WHERE s.class_id = ? AND a.status = 'ขาด'
            GROUP BY s.student_id
            HAVING absent_count >= 3
            ORDER BY absent_count DESC;
        `;

        const [students] = await db.query(sql, [class_id]);
        res.status(200).json(students);

    } catch (error) {
        res.status(500).json({ message: 'Error fetching students to watch', error: error.message });
    }
};


// --- 3. API สำหรับดึงคะแนนเฉลี่ยของแต่ละวิชา ---
const getSubjectAverages = async (req, res) => {
    try {
        const { class_id } = req.query;
        if (!class_id) {
            return res.status(400).json({ message: 'กรุณาระบุ class_id' });
        }

        // คำนวณคะแนนเฉลี่ยเป็นเปอร์เซ็นต์ของแต่ละวิชา
        const sql = `
            SELECT 
                sub.subject_name, 
                AVG(sc.score_value / ai.max_score * 100) AS average_percentage
            FROM scores sc
            JOIN assessment_items ai ON sc.assessment_id = ai.assessment_id
            JOIN subjects sub ON ai.subject_id = sub.subject_id
            JOIN students s ON sc.student_id = s.student_id
            WHERE s.class_id = ?
            GROUP BY sub.subject_id, sub.subject_name
            ORDER BY sub.subject_name;
        `;
        const [averages] = await db.query(sql, [class_id]);
        res.status(200).json(averages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subject averages', error: error.message });
    }
};

module.exports = {
    getAttendanceSummary,
    getStudentsToWatch,
    getSubjectAverages,
};