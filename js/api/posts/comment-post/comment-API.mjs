import { API_BASE_URL } from "../../../utilities/base-url.mjs";

/**
 * Sends comment to a post using API.
 *
 * @function
 * @async
 * @param {string} postId - ID of the post to comment on.
 * @param {string} commentText - Text content of the comment.
 * @throws Throws error if the request is unsuccessful.
 * @returns {Promise<Object} Promise that resolves to the JSON response of API call.
 * @example
 *
 * ```js
 * commentOnPost('hello', 'Great post')
 * .then(response=> console.log(response))
 * .catch(error => console.error(error));
 * ```
 */
export async function commentOnPost(postId, commentText) {
  try {
    const jwtToken = localStorage.getItem("jwtToken");

    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtToken,
      },

      body: JSON.stringify({ body: commentText }),
    });

    if (!response.ok) {
      const responseBody = await response.clone().json();
      console.log("Response:", responseBody);
      throw new Error(`HTTP error. Status:${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to comment on post ${postId}`, error);
    throw error;
  }
}
