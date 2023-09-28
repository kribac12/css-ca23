import { API_BASE_URL } from "../base-url.mjs";

export async function fetchPosts(filters = {}) {
  try {
    const url = new URL(`${API_BASE_URL}/posts`);
    Object.keys(filters).forEach((key) => url.searchParams.append(key, filters[key]));

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      console.error("No token retrieved. User must log in to fetch posts. Redirecting to login page");
      window.location.href = "/index.html";
      return;
    }
    //Fetch post feed from API
    const response = await fetch(url.toString(), {
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

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch the post feed", error);
    return [];
  }
}
