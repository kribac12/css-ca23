import { fetchSinglePost } from "./fetch-posts.mjs";
import { renderSinglePost } from "./render-posts.mjs";
import "./api/login_signup/logout.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  // Extract postId from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("postId");

  if (postId) {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        console.error("No token retrieved, log in to watch posts.");
        window.location.href = "/index.html";
        return;
      }

      const post = await fetchSinglePost(postId, token);
      renderSinglePost(post);
    } catch (error) {
      console.error("Failed to render specific post", error);
    }
  } else {
    console.error("postId not found in the URL");
  }
});
