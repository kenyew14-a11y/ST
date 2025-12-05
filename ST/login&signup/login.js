const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");
const registrationForm = document.getElementById("registrationForm");
const loginForm = document.getElementById("loginForm");

// Toggle between Sign In and Sign Up
registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

// Handle Registration
registrationForm.addEventListener("submit", function (event) {
  event.preventDefault();
  
  const name = document.querySelector('.sign-up input[name="name"]').value;
  const email = document.querySelector('.sign-up input[name="email"]').value;
  const password = document.querySelector('.sign-up input[name="password"]').value;

  // Check if the email is already registered
  if (localStorage.getItem(email)) {
    alert("Email is already registered. Please log in.");
    container.classList.remove("active");
    return;
  }

  const userData = {
    name,
    email,
    password,
  };

  // Store user data in localStorage
  localStorage.setItem(email, JSON.stringify(userData));
  
  alert("Registration successful. You can now log in.");
  container.classList.remove("active");
  registrationForm.reset();
});

// Handle Login
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.querySelector('.sign-in input[name="email"]').value;
  const password = document.querySelector('.sign-in input[name="password"]').value;

  // Hardcoded admin credentials
  const adminEmail = "admin@example.com";
  const adminPassword = "admin123";

  // Retrieve user data from localStorage
  const storedUser = JSON.parse(localStorage.getItem(email));

  // Check if the user is the admin
  if (email === adminEmail && password === adminPassword) {
    // Mark the user as authenticated and an admin
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("username", "Admin");
    localStorage.setItem("isAdmin", "true");

    alert("Admin login successful.");
    window.location.href = "../index.html";
  }
  // Check if the user is a normal user
  else if (storedUser && storedUser.password === password) {
    // Mark user as authenticated
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("username", storedUser.name);
    localStorage.setItem("isAdmin", "false");

    alert("Login successful.");
    window.location.href = "../index.html";
  } 
  else {
    alert("Invalid email or password.");
  }
});