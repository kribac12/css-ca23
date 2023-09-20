import { API_BASE_URL } from "../baseUrl.mjs";

async function registerUser(url, data) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, postData);
    console.log(response);
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("registerForm");
  registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    const user = {
      name: name,
      email: email,
      password: password,
    };

    registerUser(`${API_BASE_URL}/social/auth/register`, user);
  });
});
