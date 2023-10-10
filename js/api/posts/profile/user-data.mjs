export async function loadUserName() {
  const userName = localStorage.getItem("userName");
  if (!userName) {
    throw new Error("No token received");
  }
  return userName;
}

export function setUserName(userName) {
  const userNameElement = document.getElementById("userName");
  userNameElement.innerText = userName;
}
