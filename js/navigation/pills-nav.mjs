/**
 * Hides login form, displays register form.
 * Manages active tab styles.
 *
 * @function
 * @example
 * // Use in event listeners or other function calls.
 * switchToRegister();
 */
function switchToRegister() {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  loginForm.style.display = "none";
  registerForm.style.display = "block";

  // Manage active tab style
  activateTab("registerTab", "loginTab");
}

/**
 * Hides register form, displays login form.
 * Manages active tab styles.
 *
 * @function
 * @example
 * // Use in event listeners or other function calls.
 * switchToLogin();
 */
function switchToLogin() {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  loginForm.style.display = "block";
  registerForm.style.display = "none";

  // Manage active tab style
  activateTab("loginTab", "registerTab");
}

/**
 * Adds active class to specified tab, removes it from the other tab.
 *
 * @function
 * @param {string} activeTabId
 * @param {string} inactiveTabId
 * @example
 * activateTab('loginTab', 'registerTab');
 */

function activateTab(activeTabId, inactiveTabId) {
  document.getElementById(activeTabId).classList.add("active");
  document.getElementById(inactiveTabId).classList.remove("active");
}

/**
 * Event listener that triggers on DOM content loaded.
 * Initializes tab navigation and default visibility of the forms.
 */

document.addEventListener("DOMContentLoaded", function () {
  const loginTab = document.getElementById("loginTab");
  const registerTab = document.getElementById("registerTab");

  //Hiding register form before clicking on register
  registerForm.style.display = "none";

  loginTab.addEventListener("click", switchToLogin);
  registerTab.addEventListener("click", switchToRegister);
});
