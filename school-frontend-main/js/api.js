const BASE_URL = 'http://127.0.0.1:3000/api'; // เปลี่ยนเป็น URL ของ API ที่ถูกต้อง

// --- API Calls for Classes ---
async function getClasses() {
    const response = await fetch(`${BASE_URL}/classes`);
    if (!response.ok) throw new Error('Failed to fetch classes');
    return await response.json();
}

// --- API Calls for Students ---
async function getStudentsByClassId(classId) {
    const response = await fetch(`${BASE_URL}/students?class_id=${classId}`);
    if (!response.ok) throw new Error('Failed to fetch students');
    return await response.json();
}

async function createStudent(formData) {
    const response = await fetch(`${BASE_URL}/students`, {
        method: 'POST',
        body: formData, // ส่ง FormData ไปตรงๆ (ไม่ต้องใช้ JSON.stringify)
    });
    // ไม่ต้องใส่ 'Content-Type' header, เบราว์เซอร์จะจัดการให้เอง

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Failed to create student');
    }
    return data;
}

async function updateStudent(studentId, studentData) {
    const response = await fetch(`${BASE_URL}/students/${studentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
    });
    if (!response.ok) throw new Error('Failed to update student');
    return await response.json();
}

async function deleteStudent(studentId) {
    const response = await fetch(`${BASE_URL}/students/${studentId}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete student');
    return await response.json();
}

async function getSubjects() {
    const response = await fetch(`${BASE_URL}/subjects`);
    if (!response.ok) throw new Error('Failed to fetch subjects');
    return await response.json();
}

// --- API Calls for Attendance ---
// แก้ไขฟังก์ชัน getAttendanceSheet ให้รับ sessionNumber
async function getAttendanceSheet(classId, subjectId, sessionNumber) {
    const response = await fetch(`${BASE_URL}/attendance?class_id=${classId}&subject_id=${subjectId}&session_number=${sessionNumber}`);
    if (!response.ok) throw new Error('Failed to fetch attendance sheet');
    return await response.json();
}

async function saveAttendanceSheet(data) {
    const response = await fetch(`${BASE_URL}/attendance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to save attendance');
    return await response.json();
}

// --- API Calls for Scores ---
async function getScoresheet(classId, subjectId) {
    const response = await fetch(`${BASE_URL}/scores?class_id=${classId}&subject_id=${subjectId}`);
    if (!response.ok) throw new Error('Failed to fetch scoresheet');
    return await response.json();
}

async function saveScoresheet(scoresData) {
    const response = await fetch(`${BASE_URL}/scores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scoresData })
    });
    if (!response.ok) throw new Error('Failed to save scores');
    return await response.json();
}

async function createAssessmentItem(data) {
    const response = await fetch(`${BASE_URL}/assessments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create assessment item');
    }
    return await response.json();
}

async function updateAssessmentItem(id, data) {
    const response = await fetch(`${BASE_URL}/assessments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update assessment item');
    return await response.json();
}

async function deleteAssessmentItem(id) {
    const response = await fetch(`${BASE_URL}/assessments/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete assessment item');
    }
    return await response.json();
}

// --- API Calls for Dashboard ---
async function getDashboardAttendance(classId) {
    let url = `${BASE_URL}/dashboard/attendance-summary`;
    if (classId) url += `?class_id=${classId}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch attendance summary');
    return await response.json();
}

async function getDashboardStudentsToWatch(classId) {
    const response = await fetch(`${BASE_URL}/dashboard/students-to-watch?class_id=${classId}`);
    if (!response.ok) throw new Error('Failed to fetch students to watch');
    return await response.json();
}

async function getDashboardSubjectAverages(classId) {
    const response = await fetch(`${BASE_URL}/dashboard/subject-averages?class_id=${classId}`);
    if (!response.ok) throw new Error('Failed to fetch subject averages');
    return await response.json();
}

async function loginUser(credentials) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Login failed');
    }
    return data;
}

async function getRecordedSessions(classId, subjectId) {
    const response = await fetch(`${BASE_URL}/attendance/recorded-sessions?class_id=${classId}&subject_id=${subjectId}`);
    if (!response.ok) throw new Error('Failed to fetch recorded sessions');
    return await response.json();
}