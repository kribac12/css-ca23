import { API_BASE_URL } from "../baseUrl.mjs";
console.log(API_BASE_URL);

const name = document.querySelector("#registerName");
const email = document.querySelector("#registerEmail");
const password = document.querySelector("#registerPassword");
const register_error = document.querySelector("#registerErrorMessage");

/**
 * Register a new user
 */

export async function registerUser() {
  const postData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      password: password.value,
    }),
  };
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/social/auth/register`, postData);
    console.log(response);
    const { status } = await response.json();
    if (status === 200) {
      location.href = `/profile/index.html`;
    } else {
      register_error.innerHTML = message;
    }
  } catch (error) {
    console.log(error);
  }
}
