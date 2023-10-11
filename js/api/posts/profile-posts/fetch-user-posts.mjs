import { API_BASE_URL } from "../../../utilities/base-url.mjs";

export async function fetchUserPosts(userName) {
  try {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      throw new Error("No authentication token found");
    }
    const response = await fetch(`${API_BASE_URL}/profiles/${userName}/posts?_author=true&_comments=true&_reactions=true`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error. Status: ${response.status}`);
    }

    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error("Failed to fetch posts", error);
  }
}
