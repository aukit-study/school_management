// --- DOM Elements ---
const classSelect = document.getElementById('class-select');
const totalStudentsEl = document.getElementById('total-students');
const presentStudentsEl = document.getElementById('present-students');
const absentStudentsEl = document.getElementById('absent-students');
const studentsToWatchList = document.getElementById('students-to-watch-list');
const chartCanvas = document.getElementById('subject-chart');

let subjectChartInstance = null; // To hold the chart instance

// --- Functions ---

/** 1. Populates the class selection dropdown */
async function populateClassDropdown() {
    try {
        const classes = await getClasses();
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

/** 2. Renders the attendance summary widget */
function renderAttendanceSummary(data) {
    totalStudentsEl.textContent = data.totalStudents || '0';
    presentStudentsEl.textContent = data.presentStudents || '0';
    absentStudentsEl.textContent = data.absentStudents || '0';
}

/** 3. Renders the "Students to Watch" list */
function renderStudentsToWatch(students) {
    studentsToWatchList.innerHTML = ''; // Clear previous list
    if (students.length === 0) {
        studentsToWatchList.innerHTML = `<li class="text-gray-500 text-center pt-8">ไม่พบนักเรียนที่ต้องติดตาม</li>`;
        return;
    }
    students.forEach(student => {
        const li = document.createElement('li');
        li.className = 'flex justify-between items-center text-sm';
        li.innerHTML = `
            <span>${student.title} ${student.first_name} ${student.last_name}</span>
            <span class="font-semibold text-red-500">ขาด ${student.absent_count} ครั้ง</span>
        `;
        studentsToWatchList.appendChild(li);
    });
}

/** 4. Renders the subject performance bar chart */
function renderSubjectChart(averages) {
    // Destroy the old chart instance if it exists to prevent glitches
    if (subjectChartInstance) {
        subjectChartInstance.destroy();
    }

    const labels = averages.map(avg => avg.subject_name);
    const data = averages.map(avg => parseFloat(avg.average_percentage).toFixed(2));

    const ctx = chartCanvas.getContext('2d');
    subjectChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'คะแนนเฉลี่ย (%)',
                data: data,
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100, // Scores are in percentage
                    ticks: {
                        callback: function (value) {
                            return value + '%'
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false // Hide legend since there's only one dataset
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `คะแนนเฉลี่ย: ${context.raw}%`;
                        }
                    }
                }
            }
        }
    });
}


/** Main function to fetch all dashboard data */
async function fetchAndRenderDashboard(classId) {
    // Set loading states
    totalStudentsEl.textContent = '...';
    presentStudentsEl.textContent = '...';
    absentStudentsEl.textContent = '...';
    studentsToWatchList.innerHTML = `<li class="text-gray-500 text-center pt-8">กำลังโหลด...</li>`;

    try {
        // Use Promise.all to fetch all data concurrently
        const [
            attendanceSummary,
            studentsToWatch,
            subjectAverages
        ] = await Promise.all([
            getDashboardAttendance(classId),
            classId ? getDashboardStudentsToWatch(classId) : Promise.resolve([]), // Only fetch if a class is selected
            classId ? getDashboardSubjectAverages(classId) : Promise.resolve([])   // Only fetch if a class is selected
        ]);

        // Render each widget with the fetched data
        renderAttendanceSummary(attendanceSummary);
        renderStudentsToWatch(studentsToWatch);
        renderSubjectChart(subjectAverages);

    } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        // Display error messages in widgets
        totalStudentsEl.textContent = 'N/A';
        presentStudentsEl.textContent = 'N/A';
        absentStudentsEl.textContent = 'N/A';
        studentsToWatchList.innerHTML = `<li class="text-red-500 text-center pt-8">เกิดข้อผิดพลาด</li>`;
    }
}


// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    populateClassDropdown();
    // Fetch initial data for "All Classes" attendance summary
    fetchAndRenderDashboard(null);
});

classSelect.addEventListener('change', () => {
    const selectedClassId = classSelect.value || null;
    fetchAndRenderDashboard(selectedClassId);
});