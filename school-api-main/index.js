const express = require('express');
require('dotenv').config(); // ต้องเรียกใช้ก่อนการ import อื่นๆ ที่ใช้ .env
const db = require('./config/db'); // Import connection pool
const cors = require('cors');

// --- นำเข้าไฟล์ Route ---
const classRoutes = require('./routes/classRoutes'); // เพิ่มเข้ามาใหม่
const studentRoutes = require('./routes/studentRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const scoreRoutes = require('./routes/scoreRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const assessmentRoutes = require('./routes/assessmentRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Middleware สำหรับอ่าน JSON body


app.use('/public', express.static('public'));
// Route พื้นฐานสำหรับทดสอบว่าเซิร์ฟเวอร์ทำงาน
app.get('/', (req, res) => {
    res.send('Welcome to School API! 🏫');
});

// --- บอกให้ Express ใช้งาน Route ---
app.use('/api/classes', classRoutes);     // เพิ่มเข้ามาใหม่
app.use('/api/students', studentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/scores', scoreRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});