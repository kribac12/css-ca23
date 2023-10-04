import { API_BASE_URL } from "../../../utilities/base-url.mjs";

export async function deletePost(postId) {
  const jwtToken = localStorage.getItem("jwtToken");
  if (!jwtToken) throw new Error("Token not found.");

  const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${jwtToken}` },
  });

  if (!response.ok) {
    console.error("Post deletion failed:", response);
    throw new Error(`HTTP error. Status: ${response.status}`);
  }
  console.log("Post deletion succeeded:", response);
}

export function updateLocalStorageDeleted(postId) {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  const initialPostCount = posts.length;
  posts = posts.filter((post) => post.id !== postId);
  console.log(`Deleted ${initialPostCount - posts.length} posts from localStorage.`);
  localStorage.setItem("posts", JSON.stringify(posts));
}
