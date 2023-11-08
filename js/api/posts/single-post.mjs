import { fetchSinglePost } from "./fetch-posts.mjs";
import { renderSinglePost } from "./render-posts.mjs";
import { displayError } from "../../utilities/error-handler.mjs";

/**
 * Event listener that triggers on DOM content loaded.
 * Fetches and renders a single post based on 'postId' URL parameter.
 */

document.addEventListener("DOMContentLoaded", async () => {
  // Extract postId from URL parameters
  const { search } = window.location;
  const postId = new URLSearchParams(search).get("postId");

  if (postId) {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        console.error("No token retrieved, log in to watch posts.");
        window.location.href = "/index.html";
        return;
      }

      const post = await fetchSinglePost(postId, token);
      const singlePostContainer = document.getElementById("singlePostContainer");

      renderSinglePost(post, singlePostContainer.id);
    } catch (error) {
      console.error("Failed to render specific post", error);
      displayError(`Failed to load the post. Please try again later.`);
    }
  } else {
    console.error("postId not found in the URL");
    displayError(`Failed to load the post. Please try again later.`);
  }
});
