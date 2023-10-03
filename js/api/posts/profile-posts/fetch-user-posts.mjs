import { API_BASE_URL } from "../../base-url.mjs";

export async function fetchUserPosts(username) {
  try {
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      throw new Error("JWT token not found");
    }

    const response = await fetch(`${API_BASE_URL}/profiles/${username}/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }

    const userPosts = await response.json();
    return userPosts;
  } catch (error) {
    console.error("Fetching posts failed", error);
    throw error;
  }
}
