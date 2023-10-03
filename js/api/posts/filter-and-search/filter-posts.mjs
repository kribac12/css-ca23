export function addFilterEventListener(posts, renderPosts) {
  //Add event listener for the filter checkboxes
  document.getElementById("filterContainer").addEventListener("change", () => {
    const filterAF = document.getElementById("filterAF").checked;
    const filterGL = document.getElementById("filterGL").checked;
    const filterMR = document.getElementById("filterMR").checked;
    const filterSX = document.getElementById("filterSX").checked;
    const filterYÅ = document.getElementById("filterYÅ").checked;

    let filteredPosts = posts;

    if (filterAF || filterGL || filterMR || filterSX || filterYÅ) {
      filteredPosts = posts.filter((post) => {
        if (!post.title) return false;
        const firstChar = post.title[0].toUpperCase();
        if (filterAF && firstChar >= "A" && firstChar <= "F") return true;
        if (filterGL && firstChar >= "G" && firstChar <= "L") return true;
        if (filterMR && firstChar >= "M" && firstChar <= "R") return true;
        if (filterSX && firstChar >= "S" && firstChar <= "X") return true;
        if (filterYÅ && firstChar >= "Y" && firstChar <= "Å") return true;
        return false;
      });
    }
    renderPosts(filteredPosts);
  });
}
