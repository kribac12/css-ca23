import { viewPost } from "../../feed.mjs";
import { formatDate } from "./date-formatter.mjs";
import { capitalizeFirstLetter } from "../../utilities/text-utils.mjs";
import { createPost } from "./new-posts/create-post.mjs";

export function createPostElement(post) {
  const {
    id,
    title,
    body,
    media,
    created,
    updated,
    comments,
    reactions,
    author: { name: authorName = "Anonymous", email: authorEmail, avatar: authorAvatar } = {},
  } = post;

  // Format dates
  const createdDateString = formatDate(created);
  const updatedDateString = formatDate(updated);

  // Create post element
  const postElement = document.createElement("div");
  postElement.classList.add("post", "card", "mb-3", "relative-position");

  // HTML for the post

  const imageHTML = media ? `<img src="${media}" alt="${title}" class="post-image card-img-top" onerror="this.style.display='none'"/>` : "";
  const avatarHTML = authorAvatar ? `<img src="${authorAvatar}" alt="${authorName}" class="author-avatar rounded-circle"/>` : "";
  const authorHTML = `<p>Author: ${authorName} </p>
   ${avatarHTML} `;

  const commentsHTML = `
    <ul class="comments-list">
      ${comments
        .map((comment) => {
          const commentAuthor = comment.author || {};
          const commentAuthorName = commentAuthor.name || "Anonymous";
          const displayName = capitalizeFirstLetter(commentAuthorName);
          const commentAuthorAvatar = commentAuthor.avatar
            ? `<img src ="${commentAuthor.avatar}" alt="${displayName}" class="author-avatar rounded-circle"/>`
            : "";
          return `<li class="mb-2"><p>${commentAuthorAvatar} ${displayName}: ${comment.body}</p>
    </li>`;
        })
        .join("")}
    </ul>`;

  const reactionsHTML = `<ul class="reactions-list"> ${reactions
    .map((reaction) => `<li class="mb-2"><p>${reaction.symbol} ${reaction.count}</p></li>`)
    .join("")}</ul>`;

  const bodyHTML = `
       <div class="card-body">
         <h3 class="card-title">${title}</h3>
         <p class="card-text">${body}</p>
         ${authorHTML}
         <p>Posted: ${createdDateString}</p>
         <p>Edited: ${updatedDateString}</p>
        
       </div>
       <div class="card-footer">
       ${commentsHTML}
       ${reactionsHTML}
       </div>
     `;

  postElement.innerHTML = imageHTML + bodyHTML;
  postElement.addEventListener("click", () => {
    viewPost(id);
  });

  return postElement;
}

export function renderSinglePost(post, containerId) {
  const postContainer = document.getElementById(containerId);
  if (!postContainer || !post) return;

  //Clear existing posts
  postContainer.innerHTML = "";

  postContainer.appendChild(createPostElement(post));
}

export async function renderPosts(posts, containerId) {
  console.log("Rendering posts:", posts);
  const postContainer = document.getElementById(containerId);
  console.log("Post container:", postContainer);
  if (!postContainer || !posts) return;

  postContainer.innerHTML = "";

  posts.forEach((post) => {
    const postElement = createPostElement(post);
    postContainer.appendChild(postElement);
  });
}
