const db = require('../config/db');

const createAssessmentItem = async (req, res) => {
    try {
        const { subject_id, assessment_name, max_score } = req.body;

        if (!subject_id || !assessment_name || !max_score) {
            return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
        }
        if (isNaN(max_score) || max_score <= 0) {
            return res.status(400).json({ message: 'คะแนนเต็มต้องเป็นตัวเลขที่มากกว่า 0' });
        }

        const [result] = await db.query(
            'INSERT INTO assessment_items (subject_id, assessment_name, max_score) VALUES (?, ?, ?)',
            [subject_id, assessment_name, max_score]
        );

        res.status(201).json({
            assessment_id: result.insertId,
            message: 'เพิ่มช่องคะแนนสำเร็จ'
        });

    } catch (error) {
        console.error('Error creating assessment item:', error);
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการสร้างช่องคะแนน' });
    }
};

const updateAssessmentItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { assessment_name, max_score } = req.body;

        if (!assessment_name || !max_score) {
            return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
        }
        if (isNaN(max_score) || max_score <= 0) {
            return res.status(400).json({ message: 'คะแนนเต็มต้องเป็นตัวเลขที่มากกว่า 0' });
        }

        const [result] = await db.query(
            'UPDATE assessment_items SET assessment_name = ?, max_score = ? WHERE assessment_id = ?',
            [assessment_name, max_score, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'ไม่พบรายการที่ต้องการแก้ไข' });
        }
        res.status(200).json({ message: 'อัปเดตช่องคะแนนสำเร็จ' });

    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการอัปเดต' });
    }
};

const deleteAssessmentItem = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query('DELETE FROM assessment_items WHERE assessment_id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'ไม่พบรายการที่ต้องการลบ' });
        }
        res.status(200).json({ message: 'ลบช่องคะแนนสำเร็จ' });
    } catch (error) {
        // Handle foreign key constraint error if scores exist for this item
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            return res.status(400).json({ message: 'ไม่สามารถลบได้ เนื่องจากมีการให้คะแนนในช่องนี้แล้ว' });
        }
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการลบ' });
    }
};

module.exports = {
    createAssessmentItem,
    updateAssessmentItem, // เพิ่ม
    deleteAssessmentItem,
};