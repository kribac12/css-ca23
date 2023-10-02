import { API_BASE_URL } from "../base-url.mjs";

export async function createPost(title, body, media) {
  try {
    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
      throw new Error("Token not found");
    }

    const response = await fetch(`${API_BASE_URL}/posts?_author=true`, {
      method: "POST",
      body: JSON.stringify({ title, body, media }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error. Status: ${response.status}`);
    }

    const newPost = await response.json();
    return newPost;
  } catch (error) {
    console.error("Failed creating post:", error);
    throw error;
  }
}

export async function handleCreatePostSubmission(formElement, onPostCreated) {
  formElement.addEventListener("submit", async function (event) {
    event.preventDefault();

    const { title, body, media } = event.target.elements;

    try {
      const newPost = await createPost(title.value, body.value, media.value);
      console.log("Post added:", newPost);

      if (typeof onPostCreated === "function") {
        onPostCreated(newPost);
        formElement.reset();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
}
