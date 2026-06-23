// --- DOM Elements ---
const classSelect = document.getElementById('class-select');
const subjectSelect = document.getElementById('subject-select');
const tableHead = document.getElementById('scores-table-head');
const tableBody = document.getElementById('scores-table-body');
const initialMessage = document.getElementById('initial-scores-message');
const actionButtonsContainer = document.getElementById('action-buttons');
const editBtn = document.getElementById('edit-scores-btn');
const saveBtn = document.getElementById('save-scores-btn');
const cancelBtn = document.getElementById('cancel-btn');
const addAssessmentBtn = document.getElementById('add-assessment-btn');


// --- Functions ---

async function initializeDropdowns() {
    try {
        const [classes, subjects] = await Promise.all([getClasses(), getSubjects()]);
        classSelect.innerHTML = '<option value="">-- เลือกชั้นเรียน --</option>';
        subjectSelect.innerHTML = '<option value="">-- เลือกวิชา --</option>';
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
        });
    } catch (error) {
        console.error("Initialization failed:", error);
    }
}

// แทนที่ฟังก์ชันเดิมทั้งหมด
async function fetchAndRenderScoresheet() {
    const classId = classSelect.value;
    const subjectId = subjectSelect.value;

    if (!classId || !subjectId) {
        tableHead.innerHTML = '';
        tableBody.innerHTML = '';
        initialMessage.classList.remove('hidden');
        actionButtonsContainer.classList.add('hidden');
        return;
    }

    initialMessage.innerHTML = 'Loading...';
    try {
        const { assessmentItems, students } = await getScoresheet(classId, subjectId);

        // --- คำนวณคะแนนเต็มทั้งหมดของวิชา ---
        const maxPossibleScore = assessmentItems.reduce((sum, item) => sum + parseFloat(item.max_score), 0);

        // --- Render Table Header ---
        tableHead.innerHTML = '';
        const headerRow = document.createElement('tr');
        let headerHTML = `<th class="p-4 text-left text-sm font-semibold text-gray-600 sticky left-0 bg-white z-10">ชื่อ-สกุล</th>`;
        assessmentItems.forEach(item => {
            // เพิ่ม div และ button สำหรับแก้ไขเข้าไปใน th
            headerHTML += `
        <th class="p-4 text-left text-sm font-semibold text-gray-600 relative group">
            ${item.assessment_name} (${item.max_score})
            <button class="edit-assessment-btn absolute top-1 left p-1 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    data-id="${item.assessment_id}"
                    data-name="${item.assessment_name}"
                    data-max-score="${item.max_score}">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>

            </button>
        </th>
    `;
        });
        // เพิ่ม Header ใหม่ 2 คอลัมน์
        headerHTML += `<th class="p-4 text-center text-sm font-semibold text-gray-600 bg-gray-50">คะแนนรวม</th>`;
        headerHTML += `<th class="p-4 text-center text-sm font-semibold text-gray-600 bg-gray-50">เกรด</th>`;
        headerRow.innerHTML = headerHTML;
        tableHead.appendChild(headerRow);

        // --- Render Table Body ---
        tableBody.innerHTML = '';
        students.forEach(student => {
            const row = document.createElement('tr');
            row.className = 'border-b border-gray-200';

            // คำนวณคะแนนรวมของนักเรียนแต่ละคน
            const totalScore = Object.values(student.scores).reduce((sum, score) => sum + parseFloat(score || 0), 0);
            const grade = calculateGrade(totalScore, maxPossibleScore);

            // ส่วนของชื่อ-สกุล (ให้ติดขอบซ้าย)
            let rowHTML = `<td class="p-2 font-medium text-gray-800 sticky left-0 bg-white z-10">${student.title} ${student.first_name} ${student.last_name}</td>`;

            // ส่วนของช่องกรอกคะแนน
            assessmentItems.forEach(item => {
                const score = student.scores[item.assessment_id] || '';
                rowHTML += `
                    <td class="p-2">
                        <input type="number" value="${score}" 
                               class="score-input w-20 text-center border rounded p-1 bg-gray-100" 
                               data-student-id="${student.student_id}" 
                               data-assessment-id="${item.assessment_id}"
                               max="${item.max_score}"
                               disabled>
                    </td>
                `;
            });

            // เพิ่ม Cell ใหม่ 2 คอลัมน์
            rowHTML += `<td class="p-2 text-center font-bold bg-gray-50" data-role="total-score">${totalScore.toFixed(2)}</td>`;
            rowHTML += `<td class="p-2 text-center font-bold bg-gray-50" data-role="grade">${grade}</td>`;

            row.innerHTML = rowHTML;
            tableBody.appendChild(row);
        });

        initialMessage.classList.add('hidden');
        actionButtonsContainer.classList.remove('hidden');
        setEditMode(false);

    } catch (error) {
        console.error("Failed to fetch scoresheet:", error);
        initialMessage.textContent = 'เกิดข้อผิดพลาดในการดึงข้อมูล';
    }
}

function setEditMode(isEditing) {
    const inputs = document.querySelectorAll('.score-input');
    inputs.forEach(input => {
        input.disabled = !isEditing;
        input.classList.toggle('bg-gray-100', !isEditing); // Gray background in view mode
        input.classList.toggle('bg-white', isEditing);     // White background in edit mode
    });

    editBtn.classList.toggle('hidden', isEditing);
    saveBtn.classList.toggle('hidden', !isEditing);
    cancelBtn.classList.toggle('hidden', !isEditing);
}

async function handleSave() {
    const scoresData = [];
    const inputs = document.querySelectorAll('.score-input');
    inputs.forEach(input => {
        // Add to data only if there is a value
        if (input.value !== '') {
            scoresData.push({
                student_id: input.dataset.studentId,
                assessment_id: input.dataset.assessmentId,
                score_value: input.value,
            });
        }
    });

    try {
        await saveScoresheet(scoresData);
        Swal.fire('บันทึกสำเร็จ!', 'ข้อมูลคะแนนถูกบันทึกแล้ว', 'success');
        setEditMode(false); // Go back to view mode
    } catch (error) {
        Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถบันทึกข้อมูลได้', 'error');
    }
}

function calculateGrade(score, maxScore) {
    if (maxScore === 0) return '-';
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return '4';
    if (percentage >= 75) return '3.5';
    if (percentage >= 70) return '3';
    if (percentage >= 65) return '2.5';
    if (percentage >= 60) return '2';
    if (percentage >= 55) return '1.5';
    if (percentage >= 50) return '1';
    return '0';
}

function updateRowSummary(inputElement) {
    const row = inputElement.closest('tr');
    if (!row) return;

    const allInputsInRow = row.querySelectorAll('.score-input');
    let totalScore = 0;
    allInputsInRow.forEach(input => {
        totalScore += parseFloat(input.value || 0);
    });

    // อัปเดตคะแนนรวมในแถว
    const totalScoreCell = row.querySelector('[data-role="total-score"]');
    totalScoreCell.textContent = totalScore.toFixed(2);

    // คำนวณคะแนนเต็มจาก Header
    let maxPossibleScore = 0;
    const headerItems = tableHead.querySelectorAll('th');
    // เราไม่นับ th แรก (ชื่อ) และ 2 th สุดท้าย (รวม, เกรด)
    for (let i = 1; i < headerItems.length - 2; i++) {
        const match = headerItems[i].textContent.match(/\((\d+\.?\d*)\)/);
        if (match) {
            maxPossibleScore += parseFloat(match[1]);
        }
    }

    // อัปเดตเกรดในแถว
    const gradeCell = row.querySelector('[data-role="grade"]');
    gradeCell.textContent = calculateGrade(totalScore, maxPossibleScore);
}

// --- เพิ่มฟังก์ชันนี้เข้ามาใหม่ทั้งหมด ---
function showAddAssessmentForm() {
    const classId = classSelect.value;
    const subjectId = subjectSelect.value;
    const className = classSelect.options[classSelect.selectedIndex].text;
    const subjectName = subjectSelect.options[subjectSelect.selectedIndex].text;

    Swal.fire({
        title: 'เพิ่มช่องคะแนนใหม่',
        html: `
            <div class="space-y-4 text-left p-4">
                <div>
                    <label class="block mb-1 font-semibold">ชั้นเรียน</label>
                    <div class="p-2 border rounded bg-gray-100">${className}</div>
                </div>
                <div>
                    <label class="block mb-1 font-semibold">วิชา</label>
                    <div class="p-2 border rounded bg-gray-100">${subjectName}</div>
                </div>
                <div>
                    <label class="block mb-1 font-semibold">ชื่องาน/การสอบ</label>
                    <input id="swal-assessment-name" class="swal2-input" style="margin-top: 0.25rem; margin-left: 0; width: 100%;" placeholder="">
                </div>
                <div>
                    <label class="block mb-1 font-semibold">คะแนนเต็ม</label>
                    <input id="swal-max-score" type="number" class="swal2-input" style="margin-top: 0.25rem; margin-left: 0; width: 100%; placeholder="">
                </div>
            </div>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'บันทึก',
        cancelButtonText: 'ยกเลิก',
        preConfirm: () => {
            const popup = Swal.getPopup();
            const data = {
                subject_id: subjectId,
                assessment_name: popup.querySelector('#swal-assessment-name').value,
                max_score: popup.querySelector('#swal-max-score').value,
            };

            if (!data.assessment_name || !data.max_score) {
                Swal.showValidationMessage('กรุณากรอกข้อมูลให้ครบถ้วน');
                return false;
            }

            return createAssessmentItem(data).catch(error => {
                Swal.showValidationMessage(`เกิดข้อผิดพลาด: ${error.message}`);
            });
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('เพิ่มสำเร็จ!', 'เพิ่มช่องคะแนนใหม่เรียบร้อยแล้ว', 'success');
            // โหลดตารางคะแนนใหม่เพื่อแสดงช่องคะแนนที่เพิ่มเข้ามา
            fetchAndRenderScoresheet();
        }
    });
}

// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', initializeDropdowns);

function handleDropdownChange() {
    fetchAndRenderScoresheet();
    // ซ่อน/แสดงปุ่ม "เพิ่มงาน"
    if (classSelect.value && subjectSelect.value) {
        addAssessmentBtn.classList.remove('hidden');
    } else {
        addAssessmentBtn.classList.add('hidden');
    }
}

function showEditAssessmentForm(id, name, maxScore) {
    Swal.fire({
        title: 'แก้ไข/ลบ ช่องคะแนน',
        html: `
            <div class="space-y-4 text-left p-4">
                <div>
                    <label class="block mb-1 font-semibold">ชื่องาน/การสอบ</label>
                    <input id="swal-edit-assessment-name" class="swal2-input" style="margin-top: 0.25rem; margin-left: 0; width: 100%; value="${name}">
                </div>
                <div>
                    <label class="block mb-1 font-semibold">คะแนนเต็ม</label>
                    <input id="swal-edit-max-score" type="number" class="swal2-input" style="margin-top: 0.25rem; margin-left: 0; width: 100%; value="${maxScore}">
                </div>
            </div>
        `,
        focusConfirm: false,
        showCancelButton: true,
        showDenyButton: true, // แสดงปุ่มลบ
        confirmButtonText: 'บันทึกการแก้ไข',
        cancelButtonText: 'ยกเลิก',
        denyButtonText: `ลบช่องคะแนนนี้`,
        denyButtonColor: '#d33',
    }).then((result) => {
        if (result.isConfirmed) {
            // --- Logic การบันทึก ---
            const newName = document.getElementById('swal-edit-assessment-name').value;
            const newMaxScore = document.getElementById('swal-edit-max-score').value;
            updateAssessmentItem(id, { assessment_name: newName, max_score: newMaxScore })
                .then(() => {
                    Swal.fire('สำเร็จ!', 'อัปเดตข้อมูลเรียบร้อย', 'success');
                    fetchAndRenderScoresheet();
                })
                .catch(error => Swal.fire('ผิดพลาด!', error.message, 'error'));

        } else if (result.isDenied) {
            // --- Logic การลบ ---
            Swal.fire({
                title: 'ยืนยันการลบ',
                text: `คุณต้องการลบ "${name}" จริงๆ หรือไม่? คะแนนทั้งหมดในช่องนี้จะถูกลบไปด้วย!`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'ใช่, ลบเลย',
                cancelButtonText: 'ยกเลิก'
            }).then((deleteResult) => {
                if (deleteResult.isConfirmed) {
                    deleteAssessmentItem(id)
                        .then(() => {
                            Swal.fire('สำเร็จ!', 'ลบช่องคะแนนเรียบร้อย', 'success');
                            fetchAndRenderScoresheet();
                        })
                        .catch(error => Swal.fire('ผิดพลาด!', error.message, 'error'));
                }
            });
        }
    });
}

classSelect.addEventListener('change', fetchAndRenderScoresheet);
subjectSelect.addEventListener('change', fetchAndRenderScoresheet);
classSelect.addEventListener('change', handleDropdownChange);
subjectSelect.addEventListener('change', handleDropdownChange);
addAssessmentBtn.addEventListener('click', showAddAssessmentForm);
editBtn.addEventListener('click', () => setEditMode(true));
cancelBtn.addEventListener('click', fetchAndRenderScoresheet); // Re-fetch data to cancel changes
saveBtn.addEventListener('click', handleSave);
tableBody.addEventListener('input', (event) => {
    if (event.target.classList.contains('score-input')) {
        updateRowSummary(event.target);
    }
});
tableHead.addEventListener('click', (event) => {
    const editButton = event.target.closest('.edit-assessment-btn');
    if (editButton) {
        const { id, name, maxScore } = editButton.dataset;
        showEditAssessmentForm(id, name, maxScore);
    }
});
