/**
 * Adds event listener to search bar. When user types something in search bar
 * the posts are filtered based on this input and renders the posts.
 * @param {Object[]} posts - Array of posts to be filtered.
 * @param {Function} renderPosts - Function to render the filtered posts.
 */

export function addSearchEventListener(posts, renderPosts) {
  const searchBar = document.getElementById("searchBar");

  if (searchBar) {
    searchBar.addEventListener("input", () => {
      const searchRequest = searchBar.value.trim().toLowerCase();

      const searchedPosts = posts.filter(({ title = "", body = "", authorName = "" }) => {
        const searchedTitle = title ? title.toLowerCase() : "";
        const searchedBody = body ? body.toLowerCase() : "";
        const searchedAuthor = authorName ? authorName.toLowerCase() : "";

        return searchedTitle.includes(searchRequest) || searchedBody.includes(searchRequest) || searchedAuthor.includes(searchRequest);
      });

      renderPosts(searchedPosts);
    });
  } else {
    console.warn("Search bar not available.");
  }
}
