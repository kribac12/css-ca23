/**
 * Creates and returns HTML list item element with comment.
 *
 * @function
 * @param {Object} comment - Comment object containing 'body' property with text content.
 * @param {string} comment.body - Text content of the comment.
 * @returns {HTMLElement} HTML li element containing comment,to be appended to DOM.
 * @example
 *
 * ```js
 * const comment = {body: 'Looks good!'};
 * const commentElement = createCommentElement(comment);
 * document.querySelector('.comments-list).appendChild(commentElement);
 * ```
 */
export function createCommentElement({ body }) {
  const commentElement = document.createElement("li");
  commentElement.innerText = body;
  return commentElement;
}
