import { commentOnPost } from "./comment-API.mjs";

/**
 * Creates and returns comment form element.
 * Attaches event listener to handle comment posting.
 *
 * @function
 * @export
 * @param {string} postId - Id of the post to create the comment form.
 * @returns {HTMLFormElement} Form element to be appended to the DOM.
 * @example
 *
 * ```js
 * const commentForm = createCommentForm('hellohello');
 * document.querySelector('#comment-section').appendChild(commentForm);
 * ```
 */
export function createCommentForm(postId) {
  const form = document.createElement("form");
  const input = document.createElement("input");
  input.type = "text";
  input.name = "comment";
  input.placeholder = "Add a comment...";
  const submit = document.createElement("button");
  submit.type = "submit";
  submit.innerText = "Post comment";

  form.appendChild(input);
  form.appendChild(submit);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const comment = await commentOnPost(postId, input.value);

      const newCommentElement = createCommentElement(comment);
      const commentContainer = document.querySelector(`#post-${postId} .comments-list`);

      if (!commentContainer) {
        console.error(`No comment container found for post ${postId}`);
        console.log("Post element:", document.querySelector(`#post-${postId}`));
        console.log("HTML:", document.documentElement.innerHTML);
        return;
      }
      commentContainer.appendChild(newCommentElement);

      input.value = "";
    } catch (error) {
      console.error("Failed to post comment", error);
    }
  });
  return form;
}

/**
 * Creates and returns HTML list item element with comment.
 *
 * @function
 * @param {Object} comment - Comment object containing 'body' property with text content.
 * @param {string} comment.body - Text content of the comment.
 * @returns {HTMLElement} HTML li element containing comment,to be appended to DOM.
 */
function createCommentElement(comment) {
  const commentElement = document.createElement("li");
  commentElement.innerText = comment.body;
  return commentElement;
}
