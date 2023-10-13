import { viewPost } from "../../feed.mjs";
import { formatDate } from "../../utilities/date-formatter.mjs";
import { capitalizeFirstLetter } from "../../utilities/text-utils.mjs";
import { createAuthorHtml, createImageHtml, createSingleCommentHtml, renderComments, createReactionsHtml, createBodyHtml } from "./postHtmlCreate.mjs";
import { createCommentForm } from "./comment-post/comment-form.mjs";

export function createPostElement(post) {
  const {
    id,
    title,
    body,
    media,
    created,
    updated,
    comments = [],
    reactions = [],
    author: { name: authorName = "Anonymous", email: authorEmail, avatar: authorAvatar } = {},
  } = post;

  //Formatted dates
  const createdDateString = formatDate(created);
  const updatedDateString = formatDate(updated);

  // Create post element
  const postElement = document.createElement("div");
  postElement.id = `post-${id}`;
  postElement.classList.add("post", "card", "mb-3", "relative-position");

  // Getting HTML
  const imageHTML = createImageHtml(media, title);
  const authorHTML = createAuthorHtml(authorName, authorAvatar);
  const reactionsHTML = createReactionsHtml(reactions);
  const bodyHTML = createBodyHtml(title, body, authorHTML, createdDateString, updatedDateString);

  postElement.innerHTML =
    imageHTML +
    bodyHTML +
    `<div class="card-footer">
    <ul class="comments-list"></ul>
    ${reactionsHTML}
  </div>`;

  postElement.querySelector(".card-body").addEventListener("click", () => viewPost(id));
  postElement.querySelector(".post-image")?.addEventListener("click", () => viewPost(id));

  const commentForm = createCommentForm(id);
  postElement.querySelector(".card-footer").appendChild(commentForm);
  const commentsListElement = postElement.querySelector(".comments-list");
  renderComments(comments, commentsListElement, capitalizeFirstLetter);
  return postElement;
}
