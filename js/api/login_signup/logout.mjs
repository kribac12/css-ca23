//Logout function

const logoutButton = document.getElementById("logoutButton");
console.log("Logout button:", logoutButton);

function logoutUser() {
  console.log("Logout function called");
  localStorage.removeItem("jwtToken");
  window.location.href = "/index.html";
}

if (logoutButton) {
  logoutButton.addEventListener("click", logoutUser);
} else {
  console.error("Logout button not found");
}
