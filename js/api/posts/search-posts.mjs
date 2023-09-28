export function addSearchEventListener(posts, renderPosts) {
  const searchBar = document.getElementById("searchBar");

  searchBar.addEventListener("input", () => {
    const searchRequest = searchBar.value.trim().toLowerCase();

    const searchedPosts = posts.filter(({ title, body }) => {
      const searchedTitle = title ? title.toLowerCase() : "";
      const searchedBody = body ? body.toLowerCase() : "";

      return searchedTitle.includes(searchRequest) || searchedBody.includes(searchRequest);
    });

    renderPosts(searchedPosts);
  });
}
