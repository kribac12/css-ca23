import { API_BASE_URL } from "../../utilities/base-url.mjs";

const registerForm = document.getElementById("registerForm");

/**
 * Registers a new user
 * @async
 */
export async function registerUser() {
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
    document.getElementById("registerMessage").innerText = "Registration successful, you can now login.";
    console.log(json);

    //Store new user details in localStorage

    localStorage.setItem("registeredUser", JSON.stringify(newUser));
  } catch (error) {
    console.error("Registration failed", error);
    //Display error message in HTML
    (document.getElementById("registerMessage").innerText = "Registration failed."), error;
  }
}

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();
  registerUser();
});
