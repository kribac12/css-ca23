const API_BASE_URL = "https://api.noroff.dev/api/v1";
/**
 * Function for registering a new user
 * @param {string} email - Email address for user registration.
 * @param {string} username - Username for user registration.
 * @param {string} password - Password for user registration.
 * @returns {Promise} - Promise that resolves true if register success.
 * @throws{Error} - Throws error with register fail.
 * @example
 * ```js
 * try {
 * const result = await registerUser('user@email.com', 'user100', 'password100');
 * console.log('Register success:', result);
 * } catch (error) {
 * console.error('Register fail:', error.message);
 * }
 * ```
 *
 */

async function registerUser(registerEmail, registerName, registerPassword) {
  try {
    const response = await fetch(`${API_BASE_URL}/social/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: registerEmail, username: registerName, password: registerPassword }),
    });

    console.log(response);
    console.log(registerEmail, registerName, registerPassword);

    if (response.ok) {
      //register success
      const userData = await response.json();
      const userToken = userData.userToken;
      console.log(userToken);
      // store JWT token in localStorage
      localStorage.setItem("jwtToken", userToken);
      // redirect to feed if registration is a success
      window.location.href = "/feed/index.html";
    } else {
      const userData = await response.json();
      //register fail
      console.log("Server Error Details:", userData.errors);
      console.log("Error Path:", userData.errors[0].path);
      throw new Error(`Unable to register user:${userData.errors[0].message}`);
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * Function for logging in a registered user.
 * @param {*} email - Email address for user logging in.
 * @param {*} password - User password for logging in.
 * @returns {Promise} - Resolves true if login success.
 * @throws{Error} - Error thrown if login fails.
 * @example
 * ```js
 * try {
 * const result = await login('user@email.com', 'password100');
 * console.log('Login success:', result);
 * } catch(error) {
 * console.error('Failed to login:', error.message);
 * }
 * ```
 */

async function loginUser(loginEmail, loginPassword) {
  try {
    const response = await fetch(`${API_BASE_URL}/social/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
    });

    if (response.ok) {
      const userData = await response.json();
      const userToken = userData.userToken;
      //Store JWT token in localstorage
      localStorage.setItem("jwtToken", userData.userToken);
      // Login success
      window.location.href = "/feed/index.html";
    } else {
      const userData = await response.json();
      //Login fail
      throw new Error(userData.message);
    }
  } catch (error) {
    console.log(error);
  }
}

//Event listeners for submitting data inputs

document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");
  const message = document.getElementById("message");

  registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const registerEmail = document.getElementById("registerEmail");
    const registerName = document.getElementById("registerName");
    const registerPassword = document.getElementById("registerPassword");

    await registerUser(registerEmail.value, registerName.value, registerPassword.value);
  });

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const loginEmail = document.getElementById("loginEmail");
    const loginPassword = document.getElementById("loginPassword");

    await loginUser(loginEmail.value, loginPassword.value);
  });
});
