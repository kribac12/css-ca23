const API_BASE_URL = "https://api.noroff.dev/api/v1/social/auth";

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const registerEmail = document.getElementById("registerEmail");
const registerName = document.getElementById("registerName");
const registerPassword = document.getElementById("registerPassword");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

async function registerUser() {
  try {
    const userName = registerName.value;
    const userEmail = registerEmail.value;
    const userPassword = registerPassword.value;

    const newUser = {
      name: userName,
      email: userEmail,
      password: userPassword,
    };
    console.log(newUser);

    const response = await fetch(`${API_BASE_URL}/register`, {
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
    alert("Registration successful");
    console.log(json);

    //Store new user details in localStorage

    localStorage.setItem("registeredUser", JSON.stringify(newUser));
  } catch (error) {
    console.error("Registration failed", error);
    alert("Registration failed");
  }
}

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();
  registerUser();
});

async function loginUser() {
  try {
    const userEmail = loginEmail.value;
    const userPassword = loginPassword.value;
    const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));
    console.log(loginEmail.value);
    console.log(loginPassword.value);
    console.log(registeredUser);

    if (!registeredUser || registeredUser.email !== userEmail || registeredUser.password !== userPassword) {
      throw new Error("Invalid email or password");
    }

    const user = {
      email: userEmail,
      password: userPassword,
    };

    console.log(user);

    const response = await fetch(`${API_BASE_URL}/login`, {
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
    alert("Login failed");
  }
}

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  loginUser();
});
