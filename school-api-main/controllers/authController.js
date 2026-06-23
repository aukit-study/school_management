const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' });
        }

        // 1. หา user จาก username
        const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (users.length === 0) {
            return res.status(401).json({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
        }
        const user = users[0];

        // 2. เปรียบเทียบรหัสผ่านที่ส่งมากับ hash ในฐานข้อมูล
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
        }

        // 3. ถ้าถูกต้อง, สร้าง JWT Token
        const payload = { userId: user.user_id, username: user.username, name: user.name };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });

        res.status(200).json({ message: 'ล็อกอินสำเร็จ', token });

    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในระบบ' });
    }
};

module.exports = { login };