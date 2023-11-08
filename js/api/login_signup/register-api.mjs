import { displayError } from "../../utilities/error-handler.mjs";
import { makeApiRequest } from "../api-service.mjs";

const registerForm = document.getElementById("registerForm");

/**
 * Registers a new user by sending user data to the API.
 * Name, email, password are obtained from input fields.
 * If registration is a successful, user's data is stored in local storage.
 * @async
 * @function
 * @throws {Error} Throws error if HTTP request fails.
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

    await makeApiRequest("/auth/register", "POST", newUser);

    //Display success message in HTML
    document.getElementById("registerMessage").innerText = "Registration successful, you can now login.";

    //Store new user details in localStorage

    localStorage.setItem("registeredUser", JSON.stringify(newUser));
  } catch (error) {
    console.error("Registration failed", error);

    //Display error message
    displayError(`Registration failed: ${error.message}`);
  }
}

/**
 * Adds event listener to registration forms, which prevents the default form submission
 * behavior and calls `registerUser` function.
 */

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();
  registerUser();
});
