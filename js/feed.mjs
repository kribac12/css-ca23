import { fetchPosts } from "./api/posts/fetch-posts.mjs";
import { renderPosts } from "./api/posts/render-posts.mjs";
import { addFilterEventListener } from "./api/posts/filter-and-search/filter-posts.mjs";
import { addSearchEventListener } from "./api/posts/filter-and-search/search-posts.mjs";
import { loadAndDisplayUserName } from "./utilities/user.mjs";
import { displayError } from "./utilities/error-handler.mjs";
import "./api/login_signup/logout.mjs";

// Define viewPost function
export function viewPost(postId) {
  window.location.href = `/single-post.html?postId=${postId}`;
}

// Fetch and render posts upon DOMContentLoaded
document.addEventListener("DOMContentLoaded", async () => {
  try {
    await loadAndDisplayUserName();
    const posts = await fetchPosts();
    document.getElementById("postContainer");

    renderPosts(posts, "postContainer");

    if (document.body.hasAttribute("data-feed-page")) {
      //Call filter function
      addFilterEventListener(posts, renderPosts);

      //Call search function
      addSearchEventListener(posts, renderPosts);
    }
  } catch (error) {
    console.error(error.message);
  }
});
