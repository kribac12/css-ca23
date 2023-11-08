import { API_BASE_URL } from "../../../utilities/base-url.mjs";
import { displayError } from "../../../utilities/error-handler.mjs";

/**
 * Deletes post via API.
 *
 * Sends DELETE request to the API to delete post specified
 * by its `postId`. Uses JWT token from `localStorage` for
 * authorization.
 * If deletion fails, error is logged and thrown.
 *
 * @async
 * @function
 * @param {*} postId - ID of the post to be deleted.
 * @throws {Error} - Throws error if token is not found or HTTP request fails.
 */

export async function deletePost(postId) {
  const jwtToken = localStorage.getItem("jwtToken");
  if (!jwtToken) throw new Error("Token not found.");

  const response = await fetch(`${API_BASE_URL}/posts/${postId}?_author=true&_comments=true&_reactions=true`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${jwtToken}` },
  });

  if (!response.ok) {
    console.error("Post deletion failed:", response);
    displayError(`Failed to delete. Please try again later.`);
    throw new Error(`HTTP error. Status: ${response.status}`);
  }
}

/**
 * Updates local storage after deleting a post.
 *
 * Filters out the deleted post from local storage using its id.
 *
 * @function
 * @param{string} postID - ID of the post to be removed from storage.
 */

export function updateLocalStorageDeleted(postId) {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  const initialPostCount = posts.length;
  posts = posts.filter((post) => post.id !== postId);
  console.log(`Deleted ${initialPostCount - posts.length} posts from localStorage.`);
  localStorage.setItem("posts", JSON.stringify(posts));
}
