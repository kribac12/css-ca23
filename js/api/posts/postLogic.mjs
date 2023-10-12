import { viewPost } from "../../feed.mjs";
import { formatDate } from "../../utilities/date-formatter.mjs";
import { capitalizeFirstLetter } from "../../utilities/text-utils.mjs";
import { createAuthorHtml, createAvatarHtml, createImageHtml, createCommentHtml, createReactionsHtml, createBodyHtml } from "./postHtmlCreate.mjs";

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
  postElement.classList.add("post", "card", "mb-3", "relative-position");

  // Getting HTML
  const imageHTML = createImageHtml(media, title);
  const authorHTML = createAuthorHtml(authorName, authorAvatar);
  const commentsHTML = createCommentHtml(comments, capitalizeFirstLetter);
  const reactionsHTML = createReactionsHtml(reactions);
  const bodyHTML = createBodyHtml(title, body, authorHTML, createdDateString, updatedDateString, commentsHTML, reactionsHTML);

  postElement.innerHTML = imageHTML + bodyHTML + `<div class="card-footer">${commentsHTML}${reactionsHTML}</div>`;
  postElement.addEventListener("click", () => viewPost(id));

  return postElement;
}
