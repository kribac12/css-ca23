import { API_BASE_URL } from "../baseUrl.mjs";

//Function for successful login, redirecting to feed page
function handleLoginSuccess() {
  window.location.href = "/feed/index.html";
}

//Function for successful registration, redirecting to new page
function handleRegisterSuccess() {
  window.location.href = "/feed/index.html";
}

// Handle login form submissions
const loginFormContent = document.getElementById("loginFormContent");
loginFormContent.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  console.log(email, password);

  try {
    //Make API request for authentication to log in
    const response = await fetch(`${API_BASE_URL} /api/v1/social/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      const json = await response.json();
      console.log("Successful login:", json);
      handleLoginSuccess();
    } else {
      const errorMessage = await response.json();
      console.log("Failed to login user:", errorMessage);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

// Handle login form submissions

const registerFormContent = document.getElementById("registerFormContent");
registerFormContent.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  console.log(name, email, password);

  /**
   * Register a new user with API
   *
   * @param {string} url
   * @param {Object} data
   * @returns {promise}
   */

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/social/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      const json = await response.json();
      console.log("Successful registration:", json);
      handleRegisterSuccess();
    } else {
      const errorMessage = await response.json();
      console.error("Failed to register user:", errorMessage);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
