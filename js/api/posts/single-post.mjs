import { fetchSinglePost } from "./fetch-posts.mjs";
import "./render-posts.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  // Extract postId from URL parameters

  const postId = new URLSearchParams(window.location.search).get("postId");

  if (postId) {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        console.error("No token retrieved, log in to watch posts.");
        window.location.href = "/index.html";
        return;
      }

      const post = await fetchSinglePost(postId, token);
      document.getElementById("singlePostContainer");

      renderSinglePost(post, "singlePostContainer");
    } catch (error) {
      console.error("Failed to render specific post", error);
    }
  } else {
    console.error("postId not found in the URL");
  }
});
