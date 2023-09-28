import { formatDate } from "./date-formatter.mjs";

/**
 * Renders an array of post objects to the DOM
 * showing the posts on the page.
 * @async
 * @function
 */

export async function renderPosts(posts) {
  //Get post container element by ID
  const postContainer = document.getElementById("postContainer");
  if (!postContainer) return;

  //Clear existing posts
  postContainer.innerHTML = "";

  if (!posts) {
    //Handle if no posts are fetched
    console.error("No posts fetched.");
    return;
  }

  //Loop through every post in the array
  posts.forEach((post) => {
    const { title, body, media, created, updated, _count } = post;
    // Use formatDate function
    const createdDateString = formatDate(created);
    const updatedDateString = formatDate(updated);

    const imageHTML = media ? `<img src="${media}" alt="${title}" class="post-image card-img-top" onerror="this.style.display='none'"/>` : "";
    const bodyHTML = `
        <div class="card-body">
          <h3 class="card-title">${title}</h3>
          <p class="card-text">${body}</p>
          <p>Posted: ${createdDateString}</p>
          <p>Edited: ${updatedDateString}</p>
        </div>
        <div class="card-footer">
          <p>Comments: ${_count.comments}</p>
          <p>Reactions: ${_count.reactions}</p>
        </div>
      `;

    //Create div element for a post
    const postElement = document.createElement("div");
    postElement.classList.add("post", "card", "mb-3");
    postElement.innerHTML = imageHTML + bodyHTML;
    postContainer.appendChild(postElement);
  });
}
