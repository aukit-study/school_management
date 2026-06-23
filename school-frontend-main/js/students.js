// --- DOM Elements ---
const classSelect = document.getElementById('class-select');
const studentTableBody = document.getElementById('student-table-body');
let originalRowHTML = {}; // Store original state of a row before editing
let classesData = [];
const addStudentBtn = document.getElementById('add-student-btn');

// --- Functions ---

/** Populates the class selection dropdown */
async function populateClassDropdown() {
    try {
        const classes = await getClasses();
        classesData = classes;

        classes.forEach(cls => {
            const option = document.createElement('option');
            option.value = cls.class_id;
            option.textContent = `ประถมศึกษาปีที่ ${cls.class_name}`;
            classSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error populating classes:', error);
    }
}

/** Fetches and renders students for a given class ID */
async function renderStudents(classId) {
    studentTableBody.innerHTML = '<tr><td colspan="6" class="text-center p-4">Loading...</td></tr>'; // แก้ colspan เป็น 6
    if (!classId) {
        studentTableBody.innerHTML = '<tr><td colspan="6" class="text-center pt-10">กรุณาเลือกชั้นเรียนเพื่อแสดงข้อมูล</td></tr>'; // แก้ colspan เป็น 6
        return;
    }

    try {
        const students = await getStudentsByClassId(classId);
        studentTableBody.innerHTML = '';

        if (students.length === 0) {
            studentTableBody.innerHTML = '<tr><td colspan="6" class="text-center p-4">ไม่พบข้อมูลนักเรียนในชั้นเรียนนี้</td></tr>'; // แก้ colspan เป็น 6
            return;
        }

        students.forEach(student => {
            const row = document.createElement('tr');
            row.className = 'border-b border-gray-200 hover:bg-gray-50';
            row.setAttribute('data-student-id', student.student_id);
            row.setAttribute('data-class-id', student.class_id);

            // ตรวจสอบให้แน่ใจว่าทุก <td> มี data-field ที่ถูกต้อง
            row.innerHTML = `
                <td class="p-4 text-gray-700">${student.student_id}</td>
                <td class="p-4 text-gray-700" data-field="student_number">${student.student_number}</td>
                <td class="p-4 text-gray-700" data-field="name">${student.title} ${student.first_name} ${student.last_name}</td>
                <td class="p-4 text-gray-700" data-field="class">ประถมศึกษาปีที่ ${student.class_name}</td>
                <td class="p-4 text-gray-700" data-field="parent_name">${student.parent_name || '-'}</td>
                <td class="p-4 text-gray-700" data-field="parent_phone">${student.parent_phone || '-'}</td>
                
                <td class="p-4 text-right space-x-2" data-field="actions">
                    <button class="edit-btn text-blue-500 hover:text-blue-700 cursor-pointer" title="Edit">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" /></svg>
                    </button>
                    <button class="delete-btn text-red-500 hover:text-red-700 cursor-pointer" title="Delete">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>
                    </button>
                </td>
            `;
            studentTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error rendering students:', error);
        studentTableBody.innerHTML = '<tr><td colspan="6" class="text-center p-4 text-red-500">เกิดข้อผิดพลาดในการดึงข้อมูล</td></tr>'; // แก้ colspan เป็น 6
    }
}

// --- เพิ่มฟังก์ชันนี้เข้ามาใหม่ทั้งหมด ---
// แทนที่ฟังก์ชันเดิมทั้งหมดด้วยฟังก์ชันนี้
function showAddStudentForm() {
    const selectedClassId = classSelect.value;
    const selectedClassName = classSelect.options[classSelect.selectedIndex].text;


    Swal.fire({
        title: 'เพิ่มนักเรียนใหม่',
        html: `
            <div class="space-y-4 text-left p-4">
                <div>
                    <label class="block mb-1 font-semibold">ชั้นเรียน</label>
                    <div class="p-2 border rounded bg-gray-100 text-gray-700">${selectedClassName}</div>
                </div>
                <div>
                    <label class="block mb-1 font-semibold">เลขที่</label>
                    <input id="swal-student_number" class="swal2-input" type="number" placeholder="เลขที่" style="margin-top: 0.25rem; margin-left: 0; width: 100%;">
                </div>
                <div>
                    <label class="block mb-1 font-semibold">คำนำหน้า</label>
                    <select id="swal-title" class="swal2-select" style="margin-top: 0.25rem; margin-left: 0; width: 100%;">
                        <option value="ด.ช.">ด.ช.</option>
                        <option value="ด.ญ.">ด.ญ.</option>
                    </select>
                </div>
                <div>
                    <label class="block mb-1 font-semibold">ชื่อ</label>
                    <input id="swal-first_name" class="swal2-input" style="margin-top: 0.25rem; margin-left: 0; width: 100%; placeholder="ชื่อจริง">
                </div>
                <div>
                    <label class="block mb-1 font-semibold">นามสกุล</label>
                    <input id="swal-last_name" class="swal2-input" style="margin-top: 0.25rem; margin-left: 0; width: 100%;placeholder="นามสกุล">
                </div>
                <div>
                    <label class="block mb-1 font-semibold">ชื่อผู้ปกครอง</label>
                    <input id="swal-parent_name" class="swal2-input" style="margin-top: 0.25rem; margin-left: 0; width: 100%;placeholder="ชื่อ-สกุล ผู้ปกครอง">
                </div>
                <div>
                    <label class="block mb-1 font-semibold">เบอร์ผู้ปกครอง</label>
                    <input id="swal-parent_phone" class="swal2-input" style="margin-top: 0.25rem; margin-left: 0; width: 100%;placeholder="เบอร์โทรศัพท์">
                </div>
                <div>
                    <label class="block mb-1 font-semibold">รูปโปรไฟล์</label>
                    <input id="swal-profile_image" class="swal2-file cursor-pointer" type="file" accept="image/*" style="margin-top: 0.25rem;">
                </div>
            </div>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'บันทึก',
        cancelButtonText: 'ยกเลิก',
        preConfirm: () => {
            // === แก้ไขวิธีการดึงข้อมูลจากฟอร์มให้แน่นอนขึ้น ===
            const popup = Swal.getPopup();
            const profileImageInput = popup.querySelector('#swal-profile_image');

            const formData = new FormData();
            formData.append('class_id', selectedClassId);
            formData.append('title', popup.querySelector('#swal-title').value);
            formData.append('student_number', popup.querySelector('#swal-student_number').value);
            formData.append('first_name', popup.querySelector('#swal-first_name').value);
            formData.append('last_name', popup.querySelector('#swal-last_name').value);
            formData.append('parent_name', popup.querySelector('#swal-parent_name').value);
            formData.append('parent_phone', popup.querySelector('#swal-parent_phone').value);

            // ตรวจสอบว่ามีไฟล์ถูกเลือกหรือไม่
            if (profileImageInput.files.length > 0) {
                // 'profile_image' ต้องตรงกับชื่อที่ตั้งไว้ใน Route ของ Backend
                formData.append('profile_image', profileImageInput.files[0]);
            }

            // ตรวจสอบข้อมูลเบื้องต้น
            if (!formData.get('first_name') || !formData.get('last_name')) {
                Swal.showValidationMessage(`กรุณากรอกชื่อและนามสกุล`);
                return false;
            }

            return createStudent(formData).catch(error => {
                Swal.showValidationMessage(`เกิดข้อผิดพลาด: ${error.message}`);
            });
        }
    }).then((result) => {

        console.log('ขั้นตอนที่ 1: ปิดฟอร์ม SweetAlert แล้ว', result);

        if (result.isConfirmed) {

            console.log('ขั้นตอนที่ 2: การบันทึกสำเร็จ กำลังจะแสดงข้อความ "เพิ่มสำเร็จ!"');

            Swal.fire({
                title: 'เพิ่มสำเร็จ!',
                text: 'เพิ่มข้อมูลนักเรียนใหม่เรียบร้อยแล้ว',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            })
                .then(() => {
                    console.log('ขั้นตอนที่ 3: ข้อความ "เพิ่มสำเร็จ!" แสดงผลครบแล้ว กำลังจะโหลดตารางใหม่');
                    renderStudents(classSelect.value);
                });
        } else {
            console.log('ผู้ใช้กดยกเลิก');
        }
    });
}

// แทนที่ฟังก์ชัน handleTableClick เดิมทั้งหมดด้วยฟังก์ชันนี้
async function handleTableClick(event) {
    const target = event.target.closest('button');
    if (!target) return;

    const row = target.closest('tr');
    const studentId = row.dataset.studentId;

    if (target.classList.contains('edit-btn')) {
        originalRowHTML[studentId] = row.innerHTML;

        // --- ดึงค่าจาก cell ต่างๆ ---
        const numberCell = row.querySelector('[data-field="student_number"]');
        const nameCell = row.querySelector('[data-field="name"]');
        const [currentTitle, currentFirstName, ...lastNameParts] = nameCell.textContent.split(' ');
        const currentLastName = lastNameParts.join(' ');
        const classCell = row.querySelector('[data-field="class"]');
        const parentNameCell = row.querySelector('[data-field="parent_name"]');
        const parentPhoneCell = row.querySelector('[data-field="parent_phone"]');
        const currentClassId = row.dataset.classId;
        const currentNumber = numberCell.textContent;


        // สร้าง Dropdown สำหรับแก้ไขคำนำหน้า

        numberCell.innerHTML = `<input type="number" value="${currentNumber}" class="p-1 border rounded w-16 text-center" data-edit-field="student_number">`;

        nameCell.innerHTML = `
            <div class="flex items-center gap-2">
        <select class="p-1 border rounded" data-edit-field="title">
            <option value="ด.ช." ${currentTitle === 'ด.ช.' ? 'selected' : ''}>ด.ช.</option>
            <option value="ด.ญ." ${currentTitle === 'ด.ญ.' ? 'selected' : ''}>ด.ญ.</option>
        </select>
        <input type="text" value="${currentFirstName}" class="p-1 border rounded w-full" data-edit-field="first_name">
        <input type="text" value="${currentLastName}" class="p-1 border rounded w-full" data-edit-field="last_name">
    </div>
        `;


        let classOptions = classesData.map(cls => `<option value="${cls.class_id}" ${cls.class_id == currentClassId ? 'selected' : ''}>ประถมศึกษาปีที่ ${cls.class_name}</option>`).join('');

        parentNameCell.innerHTML = `<input type="text" value="${parentNameCell.textContent === '-' ? '' : parentNameCell.textContent}" class="px-2 py-1 border rounded w-40" data-edit-field="parent_name">`;
        parentPhoneCell.innerHTML = `<input type="text" value="${parentPhoneCell.textContent === '-' ? '' : parentPhoneCell.textContent}" class="px-2 py-1 border rounded w-32" data-edit-field="parent_phone">`;
        classCell.innerHTML = `<select class="px-2 py-1 border rounded" data-edit-field="class_id">${classOptions}</select>`;

        const actionsCell = row.querySelector('[data-field="actions"]');
        actionsCell.innerHTML = `
        <div class="flex items-center gap-2">
            <button class="save-btn bg-transparent text-green-600 text-sm font-bold py-2 px-4 rounded-lg border-2 border-green-600 hover:bg-green-600 hover:text-white transition-colors duration-300 cursor-pointer" title="Save">บันทึก</button>
            <button class="cancel-btn bg-transparent text-red-600 text-sm font-bold py-2 px-4 rounded-lg border-2 border-red-600 hover:bg-red-600 hover:text-white transition-colors duration-300 cursor-pointer" title="Cancel">ยกเลิก</button>
        </div>
        `;
    }
    else if (target.classList.contains('save-btn')) {
        const numberInput = row.querySelector('[data-edit-field="student_number"]').value;
        const titleInput = row.querySelector('[data-edit-field="title"]').value;
        const firstNameInput = row.querySelector('[data-edit-field="first_name"]').value;
        const lastNameInput = row.querySelector('[data-edit-field="last_name"]').value;
        const studentClassId = row.querySelector('[data-edit-field="class_id"]').value;
        const parentNameInput = row.querySelector('[data-edit-field="parent_name"]').value;
        const parentPhoneInput = row.querySelector('[data-edit-field="parent_phone"]').value;

        try {
            await updateStudent(studentId, {
                student_number: numberInput,
                title: titleInput,
                first_name: firstNameInput,
                last_name: lastNameInput,
                class_id: studentClassId,
                parent_name: parentNameInput,
                parent_phone: parentPhoneInput
            });
            Swal.fire({ title: 'บันทึกสำเร็จ!', icon: 'success', timer: 1500, showConfirmButton: false });
            renderStudents(classSelect.value);
        } catch (error) {
            console.error('Failed to save:', error);
            Swal.fire('เกิดข้อผิดพลาด!', 'ไม่สามารถบันทึกข้อมูลได้', 'error');
        }
    }
    else if (target.classList.contains('cancel-btn')) {
        row.innerHTML = originalRowHTML[studentId];
        delete originalRowHTML[studentId];
    }
    else if (target.classList.contains('delete-btn')) {
        const studentName = row.querySelector('[data-field="name"]').textContent;
        Swal.fire({
            title: 'ยืนยันการลบ',
            text: `คุณต้องการลบข้อมูลของ "${studentName}" ใช่หรือไม่?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ใช่, ลบเลย!',
            cancelButtonText: 'ยกเลิก'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteStudent(studentId);
                    row.remove();
                    Swal.fire('ลบสำเร็จ!', `ข้อมูลของ ${studentName} ถูกลบแล้ว`, 'success')
                } catch (error) {
                    console.error('Failed to delete student:', error);
                    Swal.fire('เกิดข้อผิดพลาด!', 'ไม่สามารถลบข้อมูลได้', 'error');
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    populateClassDropdown();
    renderStudents(null); // Initial empty state
});

classSelect.addEventListener('change', () => {
    const selectedClassId = classSelect.value;
    renderStudents(classSelect.value);

    if (selectedClassId) {
        // ถ้ามีการเลือกชั้นเรียน (ค่าไม่ใช่ "")
        addStudentBtn.classList.remove('hidden'); // ให้แสดงปุ่ม
    } else {
        // ถ้ากลับไปเลือก "-- กรุณาเลือกชั้นเรียน --"
        addStudentBtn.classList.add('hidden'); // ให้ซ่อนปุ่ม
    }
});

studentTableBody.addEventListener('click', handleTableClick);
addStudentBtn.addEventListener('click', (event) => {

    console.log('--- Add Student Button Click Handler v2 ---');

    event.preventDefault(); // <-- ★★★ เพิ่มบรรทัดนี้เข้ามา ★★★

    debugger;

    showAddStudentForm();
});