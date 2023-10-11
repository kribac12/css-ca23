import { API_BASE_URL } from "../../utilities/base-url.mjs";

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
    //Fetch post feed from API
    const response = await fetch(`${API_BASE_URL}/posts?_author=true&_comments=true&_reactions=true`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    console.log(token);

    if (!response.ok) {
      throw new Error(`HTTP error. Status: ${response.status}`);
    }

    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error("Failed to fetch the post feed", error);
    return null;
  }
}

export async function fetchSinglePost(postId, token) {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}?_author=true&_comments=true&_reactions=true`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error. Status:${response.status}`);
    }
    const post = await response.json();
    return post;
  } catch (error) {
    console.error(`Failed to fetch post ${postId}`, error);
    throw error;
  }
}
