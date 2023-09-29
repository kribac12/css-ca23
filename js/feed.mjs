import { fetchPosts } from "./api/posts/fetch-posts.mjs";
import { renderPosts } from "./api/posts/render-posts.mjs";
import { addFilterEventListener } from "./api/posts/filter-posts.mjs";
import { addSearchEventListener } from "./api/posts/search-posts.mjs";

// Fetch and render posts upon DOMContentLoaded
document.addEventListener("DOMContentLoaded", async () => {
  const posts = await fetchPosts();
  renderPosts(posts);

  //Call filter function
  addFilterEventListener(posts, renderPosts);

  //Call search function
  addSearchEventListener(posts, renderPosts);
});
