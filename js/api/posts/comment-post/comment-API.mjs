import { API_BASE_URL } from "../../../utilities/base-url.mjs";

export async function commentOnPost(postId, commentText) {
  try {
    const jwtToken = localStorage.getItem("jwtToken");
    console.log("Token:", jwtToken);
    console.log("Payload:", JSON.stringify({ body: commentText }));

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
