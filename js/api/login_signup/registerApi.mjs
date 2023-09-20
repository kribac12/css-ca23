import { API_BASE_URL } from "../baseUrl.mjs";

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
async function registerUser(email, username, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/vi/social/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "applications/json",
      },
      body: JSON.stringify({ email, username, password }),
    });

    if (response.ok) {
      //register success
      return true;
    } else {
      const userData = await response.json();
      //register fail
      throw new Error(userData.message);
    }
  } catch (error) {
    // other errors handled here
    throw error;
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

async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/social/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const userData = await response.json();
      //Store JWT token in localstorage
      localStorage.setItem("token", userData.token);
      // Login success
      return true;
    } else {
      const userData = await response.json();
      //Login fail
      throw new Error(userData.message);
    }
  } catch (error) {
    //Other errors handled here
    throw error;
  }
}

//Event listeners for submitting userdata
document.addEventListener('DOMContentLoaded', function(){
    const
})
