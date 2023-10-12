export function createImageHtml(media, title) {
  return media ? `<img src="${media}" alt="${title}" class="post-image card-img-top" onerror="this.style.display='none'"/>` : "";
}

export function createAvatarHtml(authorAvatar, authorName) {
  return authorAvatar ? `<img src="${authorAvatar}" alt="${authorName}" class="author-avatar rounded-circle" onerror="this.style.display='none'"/>` : "";
}

export function createAuthorHtml(name, avatar) {
  const avatarHTML = createAvatarHtml(avatar, name);
  return `<p>Author: ${name}</p>${avatarHTML}`;
}

export function createSingleCommentHtml(comment, capitalizeFirstLetter) {
  const commentAuthor = comment.author || {};
  const commentAuthorName = commentAuthor.name || "Anonymous";
  const displayName = capitalizeFirstLetter(commentAuthorName);
  const commentAuthorAvatar = commentAuthor.avatar ? `<img src="${commentAuthor.avatar}" alt="${displayName}" class="author-avatar rounded-circle"/>` : "";
  return `<li class="mb-2"><p>${commentAuthorAvatar} ${displayName}: ${comment.body}</p></li>`;
}

export function renderComments(comments, commentsListElement, capitalizeFirstLetter) {
  comments.forEach((comment) => {
    commentsListElement.innerHTML += createSingleCommentHtml(comment, capitalizeFirstLetter);
  });
}

export function createReactionsHtml(reactions) {
  return `<ul class="reactions-list d-flex align-items-center"> ${reactions
    .map((reaction) => `<li class="mb-2 me-3"><p>${reaction.symbol} ${reaction.count}</p></li>`)
    .join("")}</ul>`;
}

export function createBodyHtml(title, body, authorHTML, createdDateString, updatedDateString) {
  return `
    <div class="card-body">
      <h3 class="card-title">${title}</h3>
      <p class="card-text">${body}</p>
      ${authorHTML}
      <p>Posted: ${createdDateString}</p>
      <p>Edited: ${updatedDateString}</p>
    </div>
  `;
}
