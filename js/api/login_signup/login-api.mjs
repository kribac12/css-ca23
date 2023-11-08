import { displayError } from "../../utilities/error-handler.mjs";
import { makeApiRequest } from "../api-service.mjs";

const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

/**
 * Logs in a user.
 *
 * Sends POST request to authentication endpoint with user's email and password.
 * With success, response should include an access token to be stored in `localStorage`,
 * and user be directed to profile page. If authentication fails, an error is displayed.
 *
 * @async
 * @function
 * @throws {Error} If HTTP request fails or token is not received.
 */
export async function loginUser() {
  try {
    const { value: email } = loginEmail;
    const { value: password } = loginPassword;

    const user = {
      email,
      password,
    };

    const json = await makeApiRequest("/auth/login", "POST", user);

    const token = json.accessToken;
    const userName = json.name;

    console.log(token);

    if (token) {
      localStorage.setItem("jwtToken", token); // Store token in localStorage
      localStorage.setItem("userName", userName);
      window.location.href = "/profile/index.html";
    } else {
      throw new Error("No token received");
    }
  } catch (error) {
    console.error("Login failed", error);
    displayError(`Login failed: ${error.message}`);
  }
}

/**
 * Adds event listener to login form, preventing default form submission
 * behavior and calling the `loginUser` function instead.
 */
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  loginUser();
});

// Check if user is already logged in by checking token in localStorage
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    window.location.href = "/profile/index.html";
  }
});
