// Function to navigate to register tab

function switchToRegister() {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  loginForm.style.display = "none";
  registerForm.style.display = "block";

  // Manage active tab style
  activateTab("registerTab", "loginTab");
}

// Function to navigate to login tab

function switchToLogin() {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  loginForm.style.display = "block";
  registerForm.style.display = "none";

  // Manage active tab style
  activateTab("loginTab", "registerTab");
}

// Function to manage active tab style

function activateTab(activeTabId, inactiveTabId) {
  document.getElementById(activeTabId).classList.add("active");
  document.getElementById(inactiveTabId).classList.remove("active");
}
// Add event listeners to the login and register tabs

document.addEventListener("DOMContentLoaded", function () {
  const loginTab = document.getElementById("loginTab");
  const registerTab = document.getElementById("registerTab");

  //Hiding register form before clicking on register
  registerForm.style.display = "none";

  loginTab.addEventListener("click", switchToLogin);
  registerTab.addEventListener("click", switchToRegister);
});
