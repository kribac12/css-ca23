//Logout function

const logoutLink = document.getElementById("logoutLink");
console.log("Logout link:", logoutLink);

function logoutUser(event) {
  event.preventDefault();
  console.log("Logout function called");
  localStorage.removeItem("jwtToken");
  window.location.href = "/index.html";
}

if (logoutLink) {
  logoutLink.addEventListener("click", logoutUser);
} else {
  console.error("Logout link not found");
}
