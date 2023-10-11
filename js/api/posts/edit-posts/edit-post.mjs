import { API_BASE_URL } from "../../../utilities/base-url.mjs";

/**
 * Toggles the display of form element for editing.
 *
 * Switches display property between "none" and "block" to show/hide form element.
 *
 * @function
 * @param {HTMLElement} formElement - Form element.
 */
export function toggleEditForm(formElement) {
  formElement.style.display = formElement.style.display === "none" ? "block" : "none";
  console.log(formElement);
}

/**
 * Handles submit event for editing posts.
 *
 * Prevents default form submission behavior, tries to update post specified
 * by its id with new data from the form.
 * Logs error if updating fails.
 *
 * @async
 * @function
 * @param {Event} event - The submit event from form.
 * @param {string} postId - ID of the post to edit.
 */
export async function handleEditSubmit(event, postId) {
  event.preventDefault();
  const { title, body, media } = event.target.elements;

  try {
    const updatedPost = await updatePost(postId, title.value, body.value, media.value);
  } catch (error) {
    console.error("Error updating post:", error);
  }
}

/**
 * Updates a post via API.
 *
 * Sends PUT request to the API to update post specified by `postId`
 * with new data. Uses JWT token from `localStorage` for authorization.
 * Error is logged and thrown if updating fails.
 *
 * @async
 * @function
 * @param {string} postId - ID of the post to update.
 * @param {string} title - New title.
 * @param {string} body - New body content.
 * @param {string} media - New media content.
 * @returns {Object} - Updated post data.
 * @throws {Error} - Throws error if token not found or HTTP request fails.
 */

export async function updatePost(postId, title, body, media) {
  try {
    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
      throw new Error("Token not found.");
    }

    const response = await fetch(`${API_BASE_URL}/posts/${postId}?_author=true&_comments=true&_reactions=true`, {
      method: "PUT",
      body: JSON.stringify({ title, body, media }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error. Status: ${response.status}`);
    }

    const updatedPost = await response.json();
    console.log("Updated Post:", updatedPost);
    return updatedPost;
  } catch (error) {
    console.error("Failed updating post:", error);
    throw error;
  }
}
