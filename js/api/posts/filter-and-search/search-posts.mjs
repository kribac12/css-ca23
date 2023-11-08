/**
 * Adds event listener to search bar. When user types something in search bar
 * the posts are filtered based on this input and renders the posts.
 * @param {Object[]} posts - Array of posts to be filtered.
 * @param {Function} renderPosts - Function to render the filtered posts.
 *
 * @example
 * ```js
 * const posts = [
 * {title: 'Title1', body: 'Body1', authorName: 'Author1'},
 * {title: 'Title2', body: 'Body2', authorName: 'Author2'}
 * ];
 * const renderPosts = (filteredPosts, containerId) => {
 * // Code to render posts
 * };
 *
 * addSearchEventListener(posts, renderPosts);
 * ```
 */

export function addSearchEventListener(posts, renderPosts) {
  const searchBar = document.getElementById("searchBar");

  if (searchBar) {
    searchBar.addEventListener("input", () => {
      const searchRequest = searchBar.value.trim().toLowerCase();

      const searchedPosts = posts.filter((post) => {
        const title = post.title || "";
        const body = post.body || "";
        const authorName = post.author.name || "";

        return title.toLowerCase().includes(searchRequest) || body.toLowerCase().includes(searchRequest) || authorName.toLowerCase().includes(searchRequest);
      });

      renderPosts(searchedPosts, "postContainer");
    });
  } else {
    console.warn("Search bar not available.");
  }
}
