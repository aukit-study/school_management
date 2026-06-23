// --- DOM Elements ---
const classSelect = document.getElementById('class-select');
const subjectSelect = document.getElementById('subject-select')
const sessionSelect = document.getElementById('session-select');
const dateSelect = document.getElementById('record-date-select');
const summaryDashboard = document.getElementById('summary-dashboard');
const cardsContainer = document.getElementById('student-cards-container');
const initialMessage = document.getElementById('initial-message');
const saveBtn = document.getElementById('save-attendance-btn');
let subjectsData = [];

const statusConfig = {
    'มาเรียน': { button: 'bg-green-500 text-white', card: 'border-green-500' },
    'ขาด': { button: 'bg-red-500 text-white', card: 'border-red-500' },
    'สาย': { button: 'bg-yellow-500 text-white', card: 'border-yellow-500' },
    'ลา': { button: 'bg-blue-500 text-white', card: 'border-blue-500' }
};
const statuses = Object.keys(statusConfig);

// --- Functions ---

/** Initialize dropdowns and date input */
async function initializePage() {
    // Set date to today
    const today = new Date().toLocaleDateString('en-CA'); // Format YYYY-MM-DD
    dateSelect.value = today;

    // Populate class and subject dropdowns
    try {
        const [classes, subjects] = await Promise.all([getClasses(), getSubjects()]);
        subjectsData = subjects;

        classes.forEach(cls => {
            const option = document.createElement('option');
            option.value = cls.class_id;
            option.textContent = `ประถมศึกษาปีที่ ${cls.class_name}`;
            classSelect.appendChild(option);
        });

        subjects.forEach(sub => {
            const option = document.createElement('option');
            option.value = sub.subject_id;
            option.textContent = sub.subject_name;
            subjectSelect.appendChild(option);
        })

    } catch (error) {
        console.error('Initialization failed:', error);
        initialMessage.textContent = 'ไม่สามารถโหลดข้อมูลเริ่มต้นได้';
    }
}

async function populateSessionDropdown() {
    const classId = classSelect.value
    const subjectId = subjectSelect.value;
    sessionSelect.innerHTML = ''; // Clear old options

    if (!classId || !subjectId) {
        sessionSelect.innerHTML = '<option value="">-- เลือกวิชาก่อน --</option>';
        sessionSelect.disabled = true;
        return;
    }

    try {
        // 1. ดึงข้อมูลคาบที่บันทึกแล้วมาก่อน
        const recordedSessions = await getRecordedSessions(classId, subjectId);

        const selectedSubject = subjectsData.find(s => s.subject_id == subjectId);
        if (selectedSubject && selectedSubject.total_sessions > 0) {
            for (let i = 1; i <= selectedSubject.total_sessions; i++) {
                const option = document.createElement('option');
                option.value = i;

                // 2. ตรวจสอบว่าคาบนี้ถูกบันทึกแล้วหรือยัง
                if (recordedSessions.includes(i)) {
                    // ถ้าบันทึกแล้ว, เพิ่มเครื่องหมาย ✅
                    option.textContent = `✅ คาบที่ ${i}`;
                } else {
                    option.textContent = `คาบที่ ${i}`;
                }
                sessionSelect.appendChild(option);
            }
            sessionSelect.disabled = false;
        } else {
            sessionSelect.innerHTML = '<option value="">ไม่มีคาบเรียน</option>';
            sessionSelect.disabled = true;
        }
    } catch (error) {
        console.error("Failed to populate sessions:", error);
        sessionSelect.innerHTML = '<option value="">Error!</option>';
        sessionSelect.disabled = true;
    }
}

/** Fetch and display attendance data */
async function fetchAndRenderAttendanceSheet() {
    const classId = classSelect.value;
    const subjectId = subjectSelect.value;
    const sessionNumber = sessionSelect.value;

    console.log('Sending to API:', { classId, subjectId, sessionNumber });

    if (!classId || !subjectId || !sessionNumber) {
        cardsContainer.innerHTML = '';
        initialMessage.classList.remove('hidden');
        summaryDashboard.classList.add('hidden');
        saveBtn.classList.add('hidden');
        return;
    }

    initialMessage.classList.add('hidden');
    cardsContainer.innerHTML = `<div class="col-span-full text-center text-gray-500 py-10">Loading...</div>`;

    try {
        const students = await getAttendanceSheet(classId, subjectId, sessionNumber);
        cardsContainer.innerHTML = ''; // Clear loading

        if (students.length === 0) {
            cardsContainer.innerHTML = `<div class="col-span-full text-center text-gray-500 py-10">ไม่พบข้อมูลนักเรียนในชั้นเรียนนี้</div>`;
            summaryDashboard.classList.add('hidden');
            saveBtn.classList.add('hidden');
            return;
        }

        students.forEach(student => {
            // "Marking by Exception": Default status to 'มาเรียน' if null
            const currentStatus = student.status || 'มาเรียน';

            const card = document.createElement('div');
            card.className = `bg-white rounded-lg shadow p-3 border-l-4 transition-colors ${statusConfig[currentStatus].card}`;
            card.dataset.studentId = student.student_id;
            card.dataset.currentStatus = currentStatus;

            const apiBaseUrl = BASE_URL.replace('/api', '');
            const imageUrl = student.profile_image_url
                ? `${apiBaseUrl}${student.profile_image_url}`
                : `https://avatar.iran.liara.run/public/31`;


            // Create buttons for each status
            const buttonsHTML = statuses.map(status => `
                <button 
                    class="status-btn text-xs px-2 py-1 rounded cursor-pointer ${status === currentStatus ? statusConfig[status].button : 'bg-gray-200'}"
                    data-status="${status}">
                    ${status}
                </button>
            `).join('');

            card.innerHTML = `
                <img src="${imageUrl}" alt="Profile" class="w-20 h-20 mx-auto rounded-full object-cover mb-2">
                <div class="font-semibold text-gray-800 text-sm text-center">${student.title}. ${student.first_name} ${student.last_name}</div>
                <div class="text-xs text-gray-500 mb-2 text-center mt-1"> เลขที่ ${student.student_number}</div>
                <div class="flex space-x-1 justify-center mt-1">
                    ${buttonsHTML}
                </div>
            `;
            cardsContainer.appendChild(card);
        });

        updateSummary();
        summaryDashboard.classList.remove('hidden');
        saveBtn.classList.remove('hidden');
        saveBtn.disabled = false;

    } catch (error) {
        console.error('Failed to fetch attendance sheet:', error);
        cardsContainer.innerHTML = `<div class="col-span-full text-center text-red-500 py-10">เกิดข้อผิดพลาดในการดึงข้อมูล</div>`;
    }
}

/** Update the summary dashboard based on current card statuses */
function updateSummary() {
    const counts = { 'มาเรียน': 0, 'ขาด': 0, 'สาย': 0, 'ลา': 0 };
    const cards = cardsContainer.querySelectorAll('[data-student-id]');
    cards.forEach(card => {
        counts[card.dataset.currentStatus]++;
    });

    document.getElementById('present-count').textContent = counts['มาเรียน'];
    document.getElementById('absent-count').textContent = counts['ขาด'];
    document.getElementById('late-count').textContent = counts['สาย'];
    document.getElementById('leave-count').textContent = counts['ลา'];
}

/** Handle status button clicks on cards */
function handleCardClick(event) {
    const target = event.target.closest('.status-btn');
    if (!target) return;

    const card = target.closest('[data-student-id]');
    const newStatus = target.dataset.status;

    // Update card data and appearance
    card.dataset.currentStatus = newStatus;
    card.className = `bg-white rounded-lg shadow p-3 border-l-4 transition-colors ${statusConfig[newStatus].card}`;

    // Update buttons on the card
    card.querySelectorAll('.status-btn').forEach(btn => {
        if (btn.dataset.status === newStatus) {
            btn.className = `status-btn text-xs px-2 py-1 rounded ${statusConfig[newStatus].button}`;
        } else {
            btn.className = 'status-btn text-xs px-2 py-1 rounded bg-gray-200';
        }
    });

    // Update the live summary
    updateSummary();
}

/** Save all attendance data */
async function handleSave() {
    saveBtn.disabled = true;
    saveBtn.textContent = 'กำลังบันทึก...';

    const attendanceData = [];
    const cards = cardsContainer.querySelectorAll('[data-student-id]');
    cards.forEach(card => {
        attendanceData.push({
            student_id: card.dataset.studentId,
            status: card.dataset.currentStatus,
        });
    });

    const dataToSend = {
        subject_id: subjectSelect.value,
        date: dateSelect.value,
        session_number: sessionSelect.value,
        attendanceData: attendanceData
    };

    console.log('Data being sent to backend:', dataToSend);

    try {
        await saveAttendanceSheet({
            subject_id: subjectSelect.value,
            date: dateSelect.value,
            session_number: sessionSelect.value,
            attendanceData: attendanceData
        });
        Swal.fire('บันทึกสำเร็จ!', 'ข้อมูลการเช็คชื่อถูกบันทึกแล้ว', 'success');
    } catch (error) {
        Swal.fire('เกิดข้อผิดพลาด!', 'ไม่สามารถบันทึกข้อมูลได้', 'error');
    } finally {
        saveBtn.disabled = false;
        saveBtn.textContent = 'บันทึกการเช็คชื่อ';
    }
}


// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', initializePage);
classSelect.addEventListener('change', fetchAndRenderAttendanceSheet);
subjectSelect.addEventListener('change', async () => {
    await populateSessionDropdown(); // รอให้สร้าง dropdown เสร็จ
    fetchAndRenderAttendanceSheet(); // แล้วค่อยดึงข้อมูลของคาบแรก
});
sessionSelect.addEventListener('change', fetchAndRenderAttendanceSheet);
cardsContainer.addEventListener('click', handleCardClick);
saveBtn.addEventListener('click', handleSave);