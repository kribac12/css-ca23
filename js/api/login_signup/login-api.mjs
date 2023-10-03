import { API_BASE_URL } from "../../utilities/base-url.mjs";

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

/**
 * Registers a new user
 * @async
 */
async function registerUser() {
  try {
    const { value: name } = registerName;
    const { value: email } = registerEmail;
    const { value: password } = registerPassword;

    const newUser = {
      name,
      email,
      password,
    };
    console.log(newUser);

    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error. Status: ${response.status}`);
    }

    const json = await response.json();
    //Display success message in HTML
    document.getElementById("registerMessage").innerHTML = "Registration successful, you can now login.";
    console.log(json);

    //Store new user details in localStorage

    localStorage.setItem("registeredUser", JSON.stringify(newUser));
  } catch (error) {
    console.error("Registration failed", error);
    //Display error message in HTML
    (document.getElementById("registerMessage").innerHTML = "Registration failed."), error;
  }
}

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();
  registerUser();
});

/**
 * Logs in a new user
 * @async
 */
async function loginUser() {
  try {
    const { value: email } = loginEmail;
    const { value: password } = loginPassword;

    const user = {
      email,
      password,
    };

    console.log(user);

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response);

    if (!response.ok) {
      throw new Error(`HTTP error. Status: ${response.status}`);
    }

    const json = await response.json();

    const token = json.accessToken;

    console.log(token);

    if (token) {
      localStorage.setItem("jwtToken", token); // Store token in localStorage
      window.location.href = "/profile/index.html";
    } else {
      throw new Error("No token received");
    }
  } catch (error) {
    console.error("Login failed", error);
    (document.getElementById("loginMessage").innerHTML = "Login failed."), error;
  }
}

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  loginUser();
});

/*
// Check if user is already logged in by checking token in localStorage
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    window.location.href = "/profile/index.html";
  }
});
*/
