import { fetchPosts } from "./api/posts/fetch-posts.mjs";
import { renderPosts } from "./api/posts/render-posts.mjs";
import { applyFilter } from "./api/posts/apply-filter.mjs";

// Fetch and render posts upon DOMContentLoaded
document.addEventListener("DOMContentLoaded", async () => {
  const posts = await fetchPosts();
  renderPosts(posts);
});

// Filter button event listener
document.getElementById("filterButton").addEventListener("click", () => {
  applyFilter();
});
