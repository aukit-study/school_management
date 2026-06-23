const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;

    try {
        const data = await loginUser({ username, password });

        // 1. บันทึก Token ลงใน localStorage ของเบราว์เซอร์
        localStorage.setItem('token', data.token);

        // 2. แสดง SweetAlert ต้อนรับ
        Swal.fire({
            title: 'สำเร็จ!',
            text: data.message,
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
        }).then(() => {
            // 3. พาไปยังหน้า Dashboard (หรือหน้าแรกหลังล็อกอิน)
            window.location.href = './dashboard.html';
        });

    } catch (error) {
        Swal.fire('ผิดพลาด!', error.message, 'error');
    }
});