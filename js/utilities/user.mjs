/**
 * Asynchronously loads and displays username.
 *
 * @function
 * @export
 * @throws throws error if username is not found in localStorage.
 * @returns {Promise<string>} Promise that resolves to the retrieved username.
 * @example
 *
 * ```js
 *  try {
 *   const userName = await loadAndDisplayUserName();
 *   console.log(`User Name: ${userName}`);
 * } catch (error) {
 *   console.error("Failed to load the username:", error.message);
 * }
 * ```
 */
export async function loadAndDisplayUserName() {
  const userNameElement = document.getElementById("userName");

  const userName = localStorage.getItem("userName");
  if (!userName) {
    throw new Error("No token received");
  }
  userNameElement.innerText = userName;
  return userName;
}
