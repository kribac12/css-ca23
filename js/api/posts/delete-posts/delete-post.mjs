import { displayError } from "../../../utilities/error-handler.mjs";
import { makeApiRequest } from "../../api-service.mjs";
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
  try {
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) throw new Error("Token not found.");

    const headers = {
      Authorization: `Bearer ${jwtToken}`,
    };

    await makeApiRequest(`/posts/${postId}`, "DELETE", null, headers);
  } catch (error) {
    console.error("Post deletion failed:", error);
    displayError(`Failed tp delete. Please try again.`);
    throw error;
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
