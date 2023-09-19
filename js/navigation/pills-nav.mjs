//function to navigate to register tab
function switchToRegister() {
  const loginTab = document.getElementById("loginTab");
  const registerTab = document.getElementById("registerTab");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  loginTab.classList.remove("active");
  registerTab.classList.add("active");
  loginForm.classList.remove("active");
  registerForm.classList.add("active");
}
//function to navigate to login tab

function switchToLogin() {
  const loginTab = document.getElementById("loginTab");
  const registerTab = document.getElementById("registerTab");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  registerTab.classList.remove("active");
  loginTab.classList.add("active");
  registerForm.classList.remove("active");
  loginForm.classList.add("active");
}
