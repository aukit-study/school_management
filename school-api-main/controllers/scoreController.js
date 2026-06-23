const db = require('../config/db');

// @desc    Get scoresheet for a class and subject
// @route   GET /api/scores?class_id=1&subject_id=1
const getScoresheet = async (req, res) => {
    try {
        const { class_id, subject_id } = req.query;
        if (!class_id || !subject_id) {
            return res.status(400).json({ message: 'กรุณาระบุ class_id และ subject_id' });
        }

        // --- 1. ดึง "ช่องคะแนน" ทั้งหมดของวิชานี้ (เพื่อสร้างหัวตาราง) ---
        const [assessmentItems] = await db.query(
            'SELECT assessment_id, assessment_name, max_score FROM assessment_items WHERE subject_id = ? ORDER BY assessment_id',
            [subject_id]
        );

        // --- 2. ดึง "รายชื่อนักเรียน" และ "คะแนน" ที่มีทั้งหมด ---
        const assessmentIds = assessmentItems.map(item => item.assessment_id);

        let studentScores = [];
        if (assessmentIds.length > 0) {
            const sql = `
            SELECT
                s.student_id, s.title, s.student_number, s.first_name, s.last_name,
                sc.assessment_id,
                sc.score_value
            FROM students s
            LEFT JOIN scores sc ON s.student_id = sc.student_id AND sc.assessment_id IN (?)
            WHERE s.class_id = ?
            ORDER BY s.student_number, sc.assessment_id;
        `;
            [studentScores] = await db.query(sql, [assessmentIds, class_id]);
        } else {
            // กรณีที่วิชานั้นยังไม่มีช่องคะแนนเลย ให้ดึงแค่รายชื่อนักเรียนมา
            const sql = `SELECT student_id, title, student_number, first_name, last_name FROM students WHERE class_id = ? ORDER BY student_number`;
            [studentScores] = await db.query(sql, [class_id]);
        }

        // --- 3. จัดระเบียบข้อมูลใหม่ (Restructure Data) ---
        // เพื่อให้ง่ายต่อการใช้งานใน Frontend
        const studentsMap = new Map();

        studentScores.forEach(row => {
            // ถ้ายังไม่เคยเจอนักเรียนคนนี้ใน Map ให้เพิ่มข้อมูลพื้นฐานเข้าไป
            if (!studentsMap.has(row.student_id)) {
                studentsMap.set(row.student_id, {
                    title: row.title,
                    student_id: row.student_id,
                    student_number: row.student_number,
                    first_name: row.first_name,
                    last_name: row.last_name,
                    scores: {} // สร้าง object ว่างๆ ไว้เก็บคะแนน
                });
            }

            // เพิ่มคะแนนเข้าไปใน object scores โดยใช้ assessment_id เป็น key
            if (row.assessment_id && row.score_value !== null) {
                studentsMap.get(row.student_id).scores[row.assessment_id] = row.score_value;
            }
        });

        // แปลง Map ให้เป็น Array
        const students = Array.from(studentsMap.values());

        // ส่งข้อมูลทั้งหมดกลับไป
        res.status(200).json({ assessmentItems, students });

    } catch (error) {
        res.status(500).json({ message: 'Error fetching scoresheet', error: error.message });
    }
};


// @desc    Save scores
// @route   POST /api/scores
const saveScoresheet = async (req, res) => {
    try {
        const { scoresData } = req.body; // [{ student_id, assessment_id, score_value }, ...]

        if (!Array.isArray(scoresData) || scoresData.length === 0) {
            return res.status(400).json({ message: 'Invalid data format provided' });
        }

        const values = scoresData.map(score => [
            score.student_id,
            score.assessment_id,
            // ถ้า score_value เป็นค่าว่าง (null or undefined) ให้ใช้ NULL ใน SQL
            score.score_value === null || score.score_value === undefined ? null : score.score_value
        ]);

        const sql = `
            INSERT INTO scores (student_id, assessment_id, score_value)
            VALUES ?
            ON DUPLICATE KEY UPDATE score_value = VALUES(score_value);
        `;

        await db.query(sql, [values]);

        res.status(200).json({ message: 'Scores saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving scores', error: error.message });
    }
};

module.exports = {
    getScoresheet,
    saveScoresheet,
};