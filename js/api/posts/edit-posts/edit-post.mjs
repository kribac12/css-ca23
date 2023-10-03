import { API_BASE_URL } from "../../../utilities/base-url.mjs";

export function toggleEditForm(formElement) {
  formElement.style.display = formElement.style.display === "none" ? "block" : "none";
}

export async function handleEditSubmit(event, postId) {
  event.preventDefault();
  const { title, body, media } = event.target.elements;

  try {
    const updatedPost = await updatePost(postId, title.value, body.value, media.value);
  } catch (error) {
    console.error("Error updating post:", error);
  }
}

export async function updatePost(postId, title, body, media) {
  try {
    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
      throw new Error("Token not found.");
    }

    const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
      method: "PUT",
      body: JSON.stringify({ title, body, media }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error. Status: ${response.status}`);
    }

    const updatedPost = await response.json();
    return updatedPost;
  } catch (error) {
    console.error("Failed updating post:", error);
    throw error;
  }
}
