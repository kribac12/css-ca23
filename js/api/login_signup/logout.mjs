import { displayError } from "../../utilities/error-handler.mjs";

const logoutLink = document.querySelector(".logoutLink");
console.log("Logout link:", logoutLink);

/**
 * Logs out the user.
 *
 * Clears JWT token from `localStorage`, logs user out and redirects
 * them to index (login and register) page.
 * Used as event handler for click event, and prevents default event behavior.
 *
 * @function
 * @param {Event} event
 */
function logoutUser(event) {
  event.preventDefault();
  console.log("Logout function called");
  localStorage.removeItem("jwtToken");
  window.location.href = "/index.html";
}

/**
 * Adds an event listener to element with class of `logoutLink`,
 * which calls `logoutUser` upon a click event.
 * If the element is not found, logs an error to the console.
 */
if (logoutLink) {
  logoutLink.addEventListener("click", logoutUser);
} else {
  console.error("Logout link not found");
  displayError(`Failed to log out. Please try again later.`);
}
