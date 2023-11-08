import { displayError } from "../../../utilities/error-handler.mjs";
import { makeApiRequest } from "../../api-service.mjs";
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

    // Construct additional headers for authorization
    const headers = {
      Authorization: `Bearer ${jwtToken}`,
    };

    // Use makeApiRequest instead of fetch
    return await makeApiRequest(`/posts/${postId}/comment`, "POST", { body: commentText }, headers);
  } catch (error) {
    console.error(`Failed to comment on post ${postId}`, error);
    displayError(`Failed to comment on the post. Please try again later.`);
    throw error;
  }
}
