import { API_BASE_URL } from "../base-url.mjs";

async function createPost(title, body, media) {
  try {
    const entryToken = localStorage.getItem("jwtToken");

    if (!entryToken) {
      throw new Error("Token not found");
    }

    const newPost = {
      title,
      body,
      media,
    };

    const response = await fetch(`${API_BASE_URL}/social/posts`, {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error. Status: ${response.status}`);
    }

    const json = await response.json();
    console.log("Post added:", json);

    return json;
  } catch (error) {
    console.error("Failed creating post:", error);
    throw error;
  }
}

export { createPost };
