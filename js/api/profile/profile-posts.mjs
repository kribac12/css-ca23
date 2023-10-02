import { API_BASE_URL } from "../base-url.mjs";
import { renderPosts } from "../posts/render-posts.mjs";

export async function fetchUserPosts(userName) {
  try {
    const userToken = localStorage.getItem("jwtToken");

    if (!userToken) {
      throw new Error("Token not found in localStorage");
    }

    const response = await fetch(`${API_BASE_URL}/profiles/${userName}/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer${userToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error.`);
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error(`Error fetching posts to profile for ${userName}:`, error);
    throw error;
  }
}
