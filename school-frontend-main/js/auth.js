// This script runs on every protected page

const token = localStorage.getItem('token');

// ถ้าไม่มี token และหน้านี้ไม่ใช่หน้า login.html
if (!token && !window.location.pathname.endsWith('login.html')) {
    // ส่งกลับไปหน้า login
    window.location.href = './login.html';
}

// ถ้ามี token แต่ดันมาอยู่หน้า login.html
if (token && window.location.pathname.endsWith('login.html')) {
    // ส่งไปหน้า dashboard
    window.location.href = './dashboard.html';
}

// --- 2. Decode token and display user name ---
function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("Error decoding JWT:", e);
        return null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // --- ★★★ เพิ่มตัวช่วยดีบั๊กที่นี่ ★★★ ---
    console.log('DOM Loaded. Starting auth script...');
    const currentToken = localStorage.getItem('token');
    console.log('Token from localStorage:', currentToken);
    // ------------------------------------

    if (currentToken) {
        const user = parseJwt(currentToken);

        // --- ★★★ เพิ่มตัวช่วยดีบั๊กที่นี่ ★★★ ---
        console.log('Decoded user object from token:', user);
        // ------------------------------------

        const userNameEl = document.getElementById('user-name');

        // --- ★★★ เพิ่มตัวช่วยดีบั๊กที่นี่ ★★★ ---
        console.log('Found user-name element:', userNameEl);
        // ------------------------------------

        if (userNameEl && user && user.name) {
            console.log('Setting user name to:', user.name);
            userNameEl.textContent = user.name;
        } else {
            console.error('Could not set user name. Either element not found, user object is invalid, or user.name is missing.');
        }
    }

    // --- 3. Handle Profile Dropdown Toggle ---
    const profileButton = document.getElementById('profile-button');
    const profileDropdown = document.getElementById('profile-dropdown');

    if (profileButton && profileDropdown) {
        profileButton.addEventListener('click', () => {
            profileDropdown.classList.toggle('hidden');
        });

        // Close dropdown if clicked outside
        window.addEventListener('click', (event) => {
            if (!profileButton.contains(event.target) && !profileDropdown.contains(event.target)) {
                profileDropdown.classList.add('hidden');
            }
        });
    }

    // --- 4. Handle Logout ---
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior

            Swal.fire({
                title: 'ยืนยันการออกจากระบบ',
                text: "คุณต้องการออกจากระบบใช่หรือไม่?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'ใช่, ออกจากระบบ',
                cancelButtonText: 'ยกเลิก'
            }).then((result) => {
                // ถ้าผู้ใช้กดยืนยัน (isConfirmed)
                if (result.isConfirmed) {
                    localStorage.removeItem('token');
                    window.location.href = './login.html';
                }
            });
        });
    }

    const mobileLogoutBtn = document.getElementById('mobile-logout-btn');
    if (mobileLogoutBtn) {
        mobileLogoutBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior

            Swal.fire({
                title: 'ยืนยันการออกจากระบบ',
                text: "คุณต้องการออกจากระบบใช่หรือไม่?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'ใช่, ออกจากระบบ',
                cancelButtonText: 'ยกเลิก'
            }).then((result) => {
                // ถ้าผู้ใช้กดยืนยัน (isConfirmed)
                if (result.isConfirmed) {
                    localStorage.removeItem('token');
                    window.location.href = './login.html';
                }
            });
        });
    }
});