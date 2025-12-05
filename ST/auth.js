// Authentication utility functions
function checkAuth() {
    return localStorage.getItem('isAuthenticated') === 'true';
}

function getUsername() {
    return localStorage.getItem('username') || 'User';
}

function logout() {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    localStorage.removeItem('isAdmin');
    window.location.href = 'index.html';
}

function initializeAuth() {
    const headerRight = document.querySelector('.header-right');
    const isAuthenticated = checkAuth();
    
    if (isAuthenticated) {
        const username = getUsername();
        
        // Create user dropdown
        const userDropdown = document.createElement('div');
        userDropdown.className = 'user-dropdown';
        userDropdown.innerHTML = `
            <button class="user-btn">
                <span class="user-icon"></span>
                <span class="username">${username}</span>
            </button>
            <div class="dropdown-menu">
                <button class="dropdown-item" onclick="logout()">
                    <span>🚪</span>
                    <span>Sign Out</span>
                </button>
            </div>
        `;
        
        // Replace existing user button
        const existingBtn = headerRight.querySelector('.icon-btn');
        if (existingBtn) {
            existingBtn.remove();
        }
        headerRight.appendChild(userDropdown);
        
        // Add dropdown functionality
        const userBtn = userDropdown.querySelector('.user-btn');
        const dropdownMenu = userDropdown.querySelector('.dropdown-menu');
        
        userBtn.addEventListener('mouseenter', () => {
            dropdownMenu.classList.add('show');
        });
        
        userDropdown.addEventListener('mouseleave', () => {
            dropdownMenu.classList.remove('show');
        });
    } else {
        // Show login/signup button
        const loginBtn = document.createElement('a');
        loginBtn.href = getLoginPath();
        loginBtn.className = 'login-btn';
        loginBtn.innerHTML = '<span></span> Login / Sign Up';
        
        // Replace existing user button
        const existingBtn = headerRight.querySelector('.icon-btn');
        if (existingBtn) {
            existingBtn.remove();
        }
        headerRight.appendChild(loginBtn);
    }
}

function getLoginPath() {
    // Detect current path depth and return appropriate login path
    const path = window.location.pathname;
    if (path.includes('/badminton/') || path.includes('/football/') || 
        path.includes('/hockey/') || path.includes('/basketball/') || 
        path.includes('/baseball/') || path.includes('/channel/')) {
        return '../login&signup/Login.html';
    }
    return 'login&signup/Login.html';
}

function requireAuth(redirectToLogin = true) {
    if (!checkAuth()) {
        if (redirectToLogin) {
            alert('Please login to access this page.');
            window.location.href = getLoginPath();
        }
        return false;
    }
    return true;
}

// Initialize auth on page load
document.addEventListener('DOMContentLoaded', initializeAuth);