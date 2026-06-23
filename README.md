# School Management System

ระบบจัดการข้อมูลโรงเรียน (School Management System) แบบ Full-stack ที่แบ่งการทำงานออกเป็น 2 ส่วนหลักคือ Backend API (Node.js) และ Frontend (HTML/Tailwind CSS) พร้อมกับฐานข้อมูล MySQL

## 🚀 โครงสร้างโปรเจกต์ (Project Structure)

โปรเจกต์นี้ประกอบด้วยโฟลเดอร์และไฟล์หลักดังนี้:

1. **`school-api-main/` (Backend API)**
   - พัฒนาด้วย Node.js และ Express.js
   - เชื่อมต่อฐานข้อมูล MySQL (`mysql2`)
   - ระบบรักษาความปลอดภัย: ยืนยันตัวตนด้วย JWT (`jsonwebtoken`) และเข้ารหัสรหัสผ่านด้วย `bcryptjs`
   - ระบบจัดการไฟล์: รองรับการอัปโหลดไฟล์ด้วย `multer` และจัดการไฟล์/นำออก Excel ด้วย `exceljs`
2. **`school-frontend-main/` (Frontend)**
   - พัฒนาด้วยหน้าเว็บแบบ Static (HTML, CSS, JavaScript)
   - ใช้ Tailwind CSS v4 สำหรับจัดการสไตล์และดีไซน์
3. **`student_managemant-final10-10-25.sql` (Database)**
   - ไฟล์ Export โครงสร้างและข้อมูลตั้งต้น (SQL Dump) สำหรับฐานข้อมูล MySQL

---

## ⚙️ วิธีการติดตั้งและเปิดใช้งาน (Setup & Installation)

### 1. การตั้งค่าฐานข้อมูล (Database Setup)
1. สร้างฐานข้อมูลใหม่ใน MySQL ของคุณ (ตามค่าเริ่มต้นคือ `school_db`)
2. นำเข้า (Import) ไฟล์ `student_managemant-final10-10-25.sql` ลงในฐานข้อมูลที่สร้างไว้ ผ่านทางโปรแกรมอย่าง phpMyAdmin, DBeaver หรือ MySQL Workbench

### 2. การตั้งค่า Backend (API)
1. เปิด Terminal และเข้าไปที่โฟลเดอร์ API:
   ```bash
   cd school-api-main
   ```
2. ติดตั้งแพ็กเกจ (Dependencies):
   ```bash
   npm install
   ```
3. ตรวจสอบและแก้ไขไฟล์ `.env` ให้ตรงกับการตั้งค่าฐานข้อมูลของคุณ (หากไม่มีให้สร้างไฟล์ `.env` ขึ้นมา):
   ```env
   DB_HOST=localhost
   DB_USER=aukit          # Username ของ MySQL คุณ (เช่น root)
   DB_PASSWORD=4545650    # รหัสผ่าน MySQL ของคุณ
   DB_DATABASE=school_db
   PORT=3000
   JWT_SECRET=xsdc12345678
   ```
4. เริ่มเปิดการทำงานของเซิร์ฟเวอร์ (โหมดพัฒนา):
   ```bash
   npm run dev
   # เซิร์ฟเวอร์จะรันที่พอร์ต http://localhost:3000
   ```

### 3. การตั้งค่า Frontend
1. เปิด Terminal ใหม่ และเข้าไปที่โฟลเดอร์ Frontend:
   ```bash
   cd school-frontend-main
   ```
2. ติดตั้งแพ็กเกจสำหรับ Tailwind CSS:
   ```bash
   npm install
   ```
3. รันคำสั่งคอมไพล์ไฟล์ CSS อัตโนมัติ (Watch mode):
   ```bash
   npm run dev
   ```
4. ใช้โปรแกรมแก้ไขโค้ด (เช่น VS Code) เปิดโฟลเดอร์ `school-frontend-main`
5. ติดตั้ง Extension **Live Server** ใน VS Code 
6. คลิกขวาที่ไฟล์ `login.html` (หรือหน้าแรกของระบบ) แล้วเลือก **Open with Live Server** เพื่อเริ่มใช้งานเว็บไซต์

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

**Frontend:**
- HTML5 / Vanilla JavaScript
- Tailwind CSS (v4)

**Backend:**
- Node.js / Express.js
- MySQL (mysql2)
- JWT (JSON Web Tokens)
- Bcrypt.js (Password Hashing)
- Multer (File Uploads)
- ExcelJS (Excel Generation)
