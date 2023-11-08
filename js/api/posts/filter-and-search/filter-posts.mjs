/**
 * Adds event listener to filter container, that filters
 * posts based on the alphabet and renders them.
 *
 * @function
 * @param {Object[]} posts - Array of post objects to be filtered.
 * @param {function(Object[]):void} renderPosts - Takes an array of post objects, renders them to the UI.
 *
 * @example
 * ```js
 * addFilterEventListener(postsArray, renderFunction);
 * ```
 *
 */

export function addFilterEventListener(posts, renderPosts) {
  //Add event listener for the filter checkboxes
  document.getElementById("filterContainer").addEventListener("change", () => {
    const { checked: filterAF } = document.getElementById("filterAF");
    const { checked: filterGL } = document.getElementById("filterGL");
    const { checked: filterMR } = document.getElementById("filterMR");
    const { checked: filterSX } = document.getElementById("filterSX");
    const { checked: filterYÅ } = document.getElementById("filterYÅ");

    let filteredPosts = posts;

    if (filterAF || filterGL || filterMR || filterSX || filterYÅ) {
      filteredPosts = posts.filter(({ title }) => {
        if (!title) return false;

        const firstChar = title[0].toUpperCase();
        if (filterAF && firstChar >= "A" && firstChar <= "F") return true;
        if (filterGL && firstChar >= "G" && firstChar <= "L") return true;
        if (filterMR && firstChar >= "M" && firstChar <= "R") return true;
        if (filterSX && firstChar >= "S" && firstChar <= "X") return true;
        if (filterYÅ && firstChar >= "Y" && firstChar <= "Å") return true;
        return false;
      });
    }

    renderPosts(filteredPosts, "postContainer");
  });
}
