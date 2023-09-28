import { fetchPosts } from "./fetch-posts.mjs";
import { renderPosts } from "./render-posts.mjs";

/**
 * Applies filter and re-renders the posts in feed
 */

export async function applyFilter() {
  const filteredPosts = await fetchPosts({ _active: true });
  renderPosts(filteredPosts);
}
