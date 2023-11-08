import { API_BASE_URL } from "../../utilities/base-url.mjs";
import { displayError } from "../../utilities/error-handler.mjs";
import { makeApiRequest } from "../api-service.mjs";
/**
 * Fetches posts from API
 * @async
 * @function
 * @returns {Promise<Object[]>} - The promise resolves to an array of objects.
 * @throws - Error if network request fails / if the user is not registered.
 */

export async function fetchPosts() {
  try {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      console.error("No token retrieved. User must log in to fetch posts. Redirecting to login page");
      window.location.href = "/index.html";
      return;
    }

    const headers = {
      Authorization: "Bearer " + token,
    };

    //Fetch post feed from API
    return await makeApiRequest("/posts?_author=true&_comments=true&_reactions=true", "GET", null, headers);
  } catch (error) {
    console.error("Failed to fetch the post feed", error);
    displayError(`Failed to load post feed. Please try again.`);
    return null;
  }
}

export async function fetchSinglePost(postId) {
  try {
    const token = localStorage.getItem("jwtToken");
    const headers = {
      Authorization: `Bearer ${jwtToken}`,
    };

    return await makeApiRequest(`/posts/${postId}?_author=true&_comments=true&_reactions=true`, "GET", null, headers);
  } catch (error) {
    console.error(error);
    displayError(`Failed to load post. Please try again.`);
    throw error;
  }
}
