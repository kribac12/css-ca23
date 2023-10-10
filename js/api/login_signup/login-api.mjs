import { API_BASE_URL } from "../../utilities/base-url.mjs";

const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

/**
 * Logs in a new user
 * @async
 */
export async function loginUser() {
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
    (document.getElementById("loginMessage").innerText = "Login failed."), error;
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
});*/
