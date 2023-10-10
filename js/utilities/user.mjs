export async function loadAndDisplayUserName() {
  const userNameElement = document.getElementById("userName");
  const userName = localStorage.getItem("userName");
  if (!userName) {
    throw new Error("No token received");
  }
  userNameElement.innerText = userName;
  return userName;
}
